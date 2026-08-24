-- MIC Pulse role/RLS repair. Apply after the original schema and Pass 2 migrations.
-- This migration repairs the existing admin account by email without storing credentials.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_admin_or_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

insert into public.profiles (id, full_name, role)
select u.id, coalesce(nullif(u.raw_user_meta_data->>'full_name', ''), 'MIC Admin'), 'admin'
from auth.users u
where lower(u.email) = lower('micpulse2026@gmail.com')
on conflict (id) do update set role = 'admin';

-- Remove the original broad policies before replacing them with explicit commands.
drop policy if exists "staff can manage articles" on public.articles;
drop policy if exists "staff can manage opportunities" on public.opportunities;
drop policy if exists "staff can manage events" on public.events;
drop policy if exists "staff can manage categories" on public.categories;
drop policy if exists "staff can manage companies" on public.companies;
drop policy if exists "staff can manage startups" on public.startups;
drop policy if exists "staff can manage founders" on public.founders;
drop policy if exists "staff can manage market updates" on public.market_updates;
drop policy if exists "staff can manage media" on public.media;
drop policy if exists "staff can manage pages" on public.pages;
drop policy if exists "staff can manage subscribers" on public.newsletter_subscribers;
drop policy if exists "users can read own profile" on public.profiles;
drop policy if exists "admins manage profiles" on public.profiles;

-- Profiles: users may read only themselves; admins may manage profiles and roles.
create policy "users read own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- Content: admins have full control; editors can read/create/update but cannot delete.
create policy "admins manage articles" on public.articles for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read articles" on public.articles for select using (public.is_admin_or_editor());
create policy "editors create articles" on public.articles for insert with check (public.is_admin_or_editor());
create policy "editors update articles" on public.articles for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage opportunities" on public.opportunities for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read opportunities" on public.opportunities for select using (public.is_admin_or_editor());
create policy "editors create opportunities" on public.opportunities for insert with check (public.is_admin_or_editor());
create policy "editors update opportunities" on public.opportunities for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage events" on public.events for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read events" on public.events for select using (public.is_admin_or_editor());
create policy "editors create events" on public.events for insert with check (public.is_admin_or_editor());
create policy "editors update events" on public.events for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read categories" on public.categories for select using (public.is_admin_or_editor());
create policy "editors create categories" on public.categories for insert with check (public.is_admin_or_editor());
create policy "editors update categories" on public.categories for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage companies" on public.companies for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read companies" on public.companies for select using (public.is_admin_or_editor());
create policy "editors create companies" on public.companies for insert with check (public.is_admin_or_editor());
create policy "editors update companies" on public.companies for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage startups" on public.startups for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read startups" on public.startups for select using (public.is_admin_or_editor());
create policy "editors create startups" on public.startups for insert with check (public.is_admin_or_editor());
create policy "editors update startups" on public.startups for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage founders" on public.founders for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read founders" on public.founders for select using (public.is_admin_or_editor());
create policy "editors create founders" on public.founders for insert with check (public.is_admin_or_editor());
create policy "editors update founders" on public.founders for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage market updates" on public.market_updates for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read market updates" on public.market_updates for select using (public.is_admin_or_editor());
create policy "editors create market updates" on public.market_updates for insert with check (public.is_admin_or_editor());
create policy "editors update market updates" on public.market_updates for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage media" on public.media for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read media" on public.media for select using (public.is_admin_or_editor());
create policy "editors create media" on public.media for insert with check (public.is_admin_or_editor());
create policy "editors update media" on public.media for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage pages" on public.pages for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read pages" on public.pages for select using (public.is_admin_or_editor());
create policy "editors create pages" on public.pages for insert with check (public.is_admin_or_editor());
create policy "editors update pages" on public.pages for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "admins manage subscribers" on public.newsletter_subscribers for all using (public.is_admin()) with check (public.is_admin());
create policy "editors read subscribers" on public.newsletter_subscribers for select using (public.is_admin_or_editor());

-- Storage: public reads remain public; editors can upload/update, only admins can delete.
drop policy if exists "staff can upload MIC media" on storage.objects;
drop policy if exists "staff can update MIC media" on storage.objects;
drop policy if exists "staff can delete MIC media" on storage.objects;
create policy "editors upload MIC media" on storage.objects for insert with check (bucket_id = 'mic-media' and public.is_admin_or_editor());
create policy "editors update MIC media" on storage.objects for update using (bucket_id = 'mic-media' and public.is_admin_or_editor()) with check (bucket_id = 'mic-media' and public.is_admin_or_editor());
create policy "admins delete MIC media" on storage.objects for delete using (bucket_id = 'mic-media' and public.is_admin());
