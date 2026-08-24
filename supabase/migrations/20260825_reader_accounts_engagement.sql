-- MIC Pulse reader accounts, profile preferences, and database-backed engagement.
-- This migration extends the existing CMS; it does not disable RLS or expose service-role credentials.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('owner','admin','editor','author','reader'));
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists theme_preference text not null default 'system' check (theme_preference in ('system','light','dark'));
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

create table if not exists public.content_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null check (content_type in ('article','company','startup','founder','opportunity','event')),
  content_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, content_type, content_id)
);

create table if not exists public.content_saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null check (content_type in ('article','company','startup','founder','opportunity','event')),
  content_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, content_type, content_id)
);

alter table public.content_likes enable row level security;
alter table public.content_saves enable row level security;

create index if not exists content_likes_content_idx on public.content_likes (content_type, content_id);
create index if not exists content_saves_content_idx on public.content_saves (content_type, content_id);
create index if not exists content_saves_user_idx on public.content_saves (user_id, created_at desc);

revoke all on public.content_likes from anon;
revoke all on public.content_saves from anon;
grant select, insert, delete on public.content_likes to authenticated;
grant select, insert, delete on public.content_saves to authenticated;

drop policy if exists "users manage own likes" on public.content_likes;
create policy "users read own likes" on public.content_likes for select using (user_id = auth.uid());
create policy "users create own likes" on public.content_likes for insert with check (user_id = auth.uid());
create policy "users remove own likes" on public.content_likes for delete using (user_id = auth.uid());

drop policy if exists "users manage own saves" on public.content_saves;
create policy "users read own saves" on public.content_saves for select using (user_id = auth.uid());
create policy "users create own saves" on public.content_saves for insert with check (user_id = auth.uid());
create policy "users remove own saves" on public.content_saves for delete using (user_id = auth.uid());

-- Reader profile access is self-service only. Staff can administer profiles through existing policies.
drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = (select p.role from public.profiles p where p.id = auth.uid()));

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
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Keep the existing helper name used by CMS policies while including the owner role.
do $$
begin
  if to_regnamespace('private') is not null then
    execute $fn$create or replace function private.is_admin()
    returns boolean language sql stable security definer set search_path = public
    as $body$select exists (select 1 from public.profiles where id = auth.uid() and role in ('owner','admin'));$body$;$fn$;
    execute $fn$create or replace function private.is_admin_or_editor()
    returns boolean language sql stable security definer set search_path = public
    as $body$select exists (select 1 from public.profiles where id = auth.uid() and role in ('owner','admin','editor'));$body$;$fn$;
  end if;
end $$;

notify pgrst, 'reload schema';

-- Readers may manage only objects under their own profile folder; staff policies remain unchanged.
drop policy if exists "users manage own profile media" on storage.objects;
create policy "users upload own profile media" on storage.objects for insert with check (bucket_id = 'mic-media' and (storage.foldername(name))[1] = 'profiles' and (storage.foldername(name))[2] = auth.uid()::text);
create policy "users update own profile media" on storage.objects for update using (bucket_id = 'mic-media' and (storage.foldername(name))[1] = 'profiles' and (storage.foldername(name))[2] = auth.uid()::text) with check (bucket_id = 'mic-media' and (storage.foldername(name))[1] = 'profiles' and (storage.foldername(name))[2] = auth.uid()::text);
create policy "users delete own profile media" on storage.objects for delete using (bucket_id = 'mic-media' and (storage.foldername(name))[1] = 'profiles' and (storage.foldername(name))[2] = auth.uid()::text);
