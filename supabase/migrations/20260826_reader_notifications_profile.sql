-- MIC Pulse reader profile expansion and notifications.
-- No service-role credentials or public write access are introduced.

alter table public.profiles add column if not exists headline text;
alter table public.profiles add column if not exists organization text;
alter table public.profiles add column if not exists location text;
alter table public.profiles add column if not exists website text;

create table if not exists public.user_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.user_notifications enable row level security;
revoke all on public.user_notifications from anon;
grant select, update, delete on public.user_notifications to authenticated;

create index if not exists user_notifications_user_idx on public.user_notifications (user_id, created_at desc);

drop policy if exists "users read own notifications" on public.user_notifications;
create policy "users read own notifications" on public.user_notifications for select using (user_id = auth.uid());
drop policy if exists "users update own notifications" on public.user_notifications;
create policy "users update own notifications" on public.user_notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "users delete own notifications" on public.user_notifications;
create policy "users delete own notifications" on public.user_notifications for delete using (user_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), ''), 'reader')
  on conflict (id) do nothing;

  insert into public.user_notifications (user_id, title, body, href)
  values (new.id, 'Welcome to MIC Pulse', 'Your account is ready. Save stories, follow the signal and stay close to what is being built across East Africa.', '/profile');

  return new;
end;
$$;

notify pgrst, 'reload schema';
