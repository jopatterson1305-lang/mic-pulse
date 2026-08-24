-- Reconcile the live articles table with the repository CMS contract.
-- The article editor writes these fields; keeping them nullable/defaulted is backward-compatible.
alter table public.articles add column if not exists seo_title text;
alter table public.articles add column if not exists seo_description text;
alter table public.articles add column if not exists tags text[] not null default '{}';
alter table public.articles add column if not exists updated_by uuid references public.profiles(id);

notify pgrst, 'reload schema';
