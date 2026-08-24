-- Supabase PostgREST requires table privileges in addition to RLS policies.
-- These grants are intentionally broad enough for policy evaluation; RLS remains the
-- authoritative row/action boundary for admin and editor roles.

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.articles to authenticated;
grant select, insert, update, delete on public.opportunities to authenticated;
grant select, insert, update, delete on public.events to authenticated;
grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.companies to authenticated;
grant select, insert, update, delete on public.startups to authenticated;
grant select, insert, update, delete on public.founders to authenticated;
grant select, insert, update, delete on public.market_updates to authenticated;
grant select, insert, update, delete on public.media to authenticated;
grant select, insert, update, delete on public.pages to authenticated;
grant select, insert, update, delete on public.newsletter_subscribers to authenticated;

grant select on public.articles to anon;
grant select on public.opportunities to anon;
grant select on public.events to anon;
grant select on public.categories to anon;
grant select on public.companies to anon;
grant select on public.startups to anon;
grant select on public.founders to anon;
grant select on public.market_updates to anon;
grant select on public.media to anon;
grant select on public.pages to anon;
grant insert on public.newsletter_subscribers to anon;

-- No anon INSERT/UPDATE/DELETE grants are provided for CMS content tables.
