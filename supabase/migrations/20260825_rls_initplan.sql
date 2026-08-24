-- Evaluate auth.uid() once per statement rather than once per candidate row.
drop policy if exists "users read own likes" on public.content_likes;
create policy "users read own likes" on public.content_likes for select using (user_id = (select auth.uid()));
drop policy if exists "users create own likes" on public.content_likes;
create policy "users create own likes" on public.content_likes for insert with check (user_id = (select auth.uid()));
drop policy if exists "users remove own likes" on public.content_likes;
create policy "users remove own likes" on public.content_likes for delete using (user_id = (select auth.uid()));
drop policy if exists "users read own saves" on public.content_saves;
create policy "users read own saves" on public.content_saves for select using (user_id = (select auth.uid()));
drop policy if exists "users create own saves" on public.content_saves;
create policy "users create own saves" on public.content_saves for insert with check (user_id = (select auth.uid()));
drop policy if exists "users remove own saves" on public.content_saves;
create policy "users remove own saves" on public.content_saves for delete using (user_id = (select auth.uid()));
drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile" on public.profiles for select using (id = (select auth.uid()) or private.is_admin());
drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile" on public.profiles for update using (id = (select auth.uid())) with check (id = (select auth.uid()) and role = (select p.role from public.profiles p where p.id = (select auth.uid())));
