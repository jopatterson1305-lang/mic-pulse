-- Keep SECURITY DEFINER role helpers out of the exposed public API schema.
-- Policies still call them, but clients cannot invoke them through PostgREST RPC.

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function private.is_admin_or_editor()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'));
$$;

grant execute on function private.is_admin() to anon, authenticated;
grant execute on function private.is_admin_or_editor() to anon, authenticated;

-- Replace every policy that referenced the exposed public helper functions.
do $$
declare r record;
begin
  for r in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and (coalesce(qual, '') like '%is_admin%' or coalesce(with_check, '') like '%is_admin%')
  loop
    execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

drop policy if exists "staff can upload MIC media" on storage.objects;
drop policy if exists "staff can update MIC media" on storage.objects;
drop policy if exists "staff can delete MIC media" on storage.objects;
drop policy if exists "editors upload MIC media" on storage.objects;
drop policy if exists "editors update MIC media" on storage.objects;
drop policy if exists "admins delete MIC media" on storage.objects;

drop function if exists public.is_admin();
drop function if exists public.is_admin_or_editor();

create policy "users read own profile" on public.profiles for select using (id = auth.uid() or private.is_admin());
create policy "admins manage profiles" on public.profiles for all using (private.is_admin()) with check (private.is_admin());

create policy "admins manage articles" on public.articles for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read articles" on public.articles for select using (private.is_admin_or_editor());
create policy "editors create articles" on public.articles for insert with check (private.is_admin_or_editor());
create policy "editors update articles" on public.articles for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage opportunities" on public.opportunities for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read opportunities" on public.opportunities for select using (private.is_admin_or_editor());
create policy "editors create opportunities" on public.opportunities for insert with check (private.is_admin_or_editor());
create policy "editors update opportunities" on public.opportunities for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage events" on public.events for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read events" on public.events for select using (private.is_admin_or_editor());
create policy "editors create events" on public.events for insert with check (private.is_admin_or_editor());
create policy "editors update events" on public.events for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage categories" on public.categories for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read categories" on public.categories for select using (private.is_admin_or_editor());
create policy "editors create categories" on public.categories for insert with check (private.is_admin_or_editor());
create policy "editors update categories" on public.categories for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage companies" on public.companies for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read companies" on public.companies for select using (private.is_admin_or_editor());
create policy "editors create companies" on public.companies for insert with check (private.is_admin_or_editor());
create policy "editors update companies" on public.companies for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage startups" on public.startups for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read startups" on public.startups for select using (private.is_admin_or_editor());
create policy "editors create startups" on public.startups for insert with check (private.is_admin_or_editor());
create policy "editors update startups" on public.startups for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage founders" on public.founders for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read founders" on public.founders for select using (private.is_admin_or_editor());
create policy "editors create founders" on public.founders for insert with check (private.is_admin_or_editor());
create policy "editors update founders" on public.founders for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage market updates" on public.market_updates for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read market updates" on public.market_updates for select using (private.is_admin_or_editor());
create policy "editors create market updates" on public.market_updates for insert with check (private.is_admin_or_editor());
create policy "editors update market updates" on public.market_updates for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage media" on public.media for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read media" on public.media for select using (private.is_admin_or_editor());
create policy "editors create media" on public.media for insert with check (private.is_admin_or_editor());
create policy "editors update media" on public.media for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage pages" on public.pages for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read pages" on public.pages for select using (private.is_admin_or_editor());
create policy "editors create pages" on public.pages for insert with check (private.is_admin_or_editor());
create policy "editors update pages" on public.pages for update using (private.is_admin_or_editor()) with check (private.is_admin_or_editor());

create policy "admins manage subscribers" on public.newsletter_subscribers for all using (private.is_admin()) with check (private.is_admin());
create policy "editors read subscribers" on public.newsletter_subscribers for select using (private.is_admin_or_editor());

create policy "editors upload MIC media" on storage.objects for insert with check (bucket_id = 'mic-media' and private.is_admin_or_editor());
create policy "editors update MIC media" on storage.objects for update using (bucket_id = 'mic-media' and private.is_admin_or_editor()) with check (bucket_id = 'mic-media' and private.is_admin_or_editor());
create policy "admins delete MIC media" on storage.objects for delete using (bucket_id = 'mic-media' and private.is_admin());
