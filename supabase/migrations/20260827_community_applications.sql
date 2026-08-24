-- MIC Pulse community showcase and founder/investor applications.

create table if not exists public.community_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  founder_name text,
  summary text not null,
  website text,
  location text default 'Tanzania',
  published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_stories_published_idx on public.community_stories (published, created_at desc);
alter table public.community_stories enable row level security;
revoke all on public.community_stories from anon;
grant select on public.community_stories to anon, authenticated;
grant insert, update, delete on public.community_stories to authenticated;

drop policy if exists "published community stories are public" on public.community_stories;
create policy "published community stories are public" on public.community_stories
  for select using (published = true);
drop policy if exists "editors read community stories" on public.community_stories;
create policy "editors read community stories" on public.community_stories
  for select using (private.is_admin_or_editor());
drop policy if exists "editors create community stories" on public.community_stories;
create policy "editors create community stories" on public.community_stories
  for insert with check (private.is_admin_or_editor());
drop policy if exists "editors update community stories" on public.community_stories;
create policy "editors update community stories" on public.community_stories
  for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());
drop policy if exists "admins delete community stories" on public.community_stories;
create policy "admins delete community stories" on public.community_stories
  for delete using (private.is_admin());

create table if not exists public.community_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid not null references auth.users(id) on delete cascade,
  application_type text not null check (application_type in ('founder', 'investor')),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254),
  organization text check (organization is null or char_length(organization) <= 160),
  website text check (website is null or char_length(website) <= 500),
  stage text check (stage is null or char_length(stage) <= 120),
  message text not null check (char_length(message) between 20 and 4000),
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'approved', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_applications_applicant_idx on public.community_applications (applicant_id, created_at desc);
create index if not exists community_applications_status_idx on public.community_applications (status, created_at desc);
alter table public.community_applications enable row level security;
revoke all on public.community_applications from anon;
grant insert, select on public.community_applications to authenticated;
grant select, update, delete on public.community_applications to authenticated;

drop policy if exists "users create own community applications" on public.community_applications;
create policy "users create own community applications" on public.community_applications
  for insert with check (applicant_id = (select auth.uid()));
drop policy if exists "users read own community applications" on public.community_applications;
create policy "users read own community applications" on public.community_applications
  for select using (applicant_id = (select auth.uid()) or private.is_admin_or_editor());
drop policy if exists "admins update community applications" on public.community_applications;
create policy "admins update community applications" on public.community_applications
  for update using (private.is_admin()) with check (private.is_admin());
drop policy if exists "admins delete community applications" on public.community_applications;
create policy "admins delete community applications" on public.community_applications
  for delete using (private.is_admin());
