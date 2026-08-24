-- Cover CMS foreign keys used by joins, RLS checks, and admin relationship views.
create index if not exists articles_author_id_idx on public.articles (author_id);
create index if not exists articles_updated_by_idx on public.articles (updated_by);
create index if not exists companies_created_by_idx on public.companies (created_by);
create index if not exists companies_updated_by_idx on public.companies (updated_by);
create index if not exists startups_company_id_idx on public.startups (company_id);
create index if not exists startups_created_by_idx on public.startups (created_by);
create index if not exists startups_updated_by_idx on public.startups (updated_by);
create index if not exists founders_company_id_idx on public.founders (company_id);
create index if not exists founders_created_by_idx on public.founders (created_by);
create index if not exists founders_updated_by_idx on public.founders (updated_by);
create index if not exists market_updates_created_by_idx on public.market_updates (created_by);
create index if not exists market_updates_updated_by_idx on public.market_updates (updated_by);
create index if not exists media_uploaded_by_idx on public.media (uploaded_by);
create index if not exists pages_created_by_idx on public.pages (created_by);
create index if not exists pages_updated_by_idx on public.pages (updated_by);
create index if not exists content_likes_user_idx on public.content_likes (user_id, created_at desc);
