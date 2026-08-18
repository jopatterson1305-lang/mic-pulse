-- MIC Pulse Pass 2 CMS migration. Apply after the existing schema and CMS expansion migration.

alter table public.articles add column if not exists seo_title text;
alter table public.articles add column if not exists seo_description text;
alter table public.articles add column if not exists tags text[] not null default '{}';
alter table public.articles add column if not exists updated_by uuid references public.profiles(id);
alter table public.opportunities add column if not exists slug text;
alter table public.opportunities add column if not exists location text;
alter table public.opportunities add column if not exists image_url text;
alter table public.events add column if not exists slug text;
alter table public.events add column if not exists venue text;
alter table public.events add column if not exists end_at timestamptz;
alter table public.events add column if not exists registration_url text;
alter table public.events add column if not exists image_url text;
alter table public.companies add column if not exists founded_year integer;
alter table public.companies add column if not exists founder_id uuid references public.founders(id) on delete set null;
alter table public.startups add column if not exists description text;
alter table public.startups add column if not exists website text;
alter table public.startups add column if not exists industry text;
alter table public.startups add column if not exists country text;
alter table public.startups add column if not exists logo_url text;
alter table public.startups add column if not exists founder_id uuid references public.founders(id) on delete set null;
alter table public.founders add column if not exists role text;
alter table public.founders add column if not exists location text;
alter table public.founders add column if not exists website text;
alter table public.founders add column if not exists social_links jsonb not null default '{}'::jsonb;
alter table public.market_updates add column if not exists content text;
alter table public.market_updates add column if not exists metric text;
alter table public.market_updates add column if not exists change numeric;
alter table public.market_updates add column if not exists change_percentage numeric;

create unique index if not exists opportunities_slug_unique_idx on public.opportunities (slug) where slug is not null;
create unique index if not exists events_slug_unique_idx on public.events (slug) where slug is not null;
create index if not exists articles_tags_idx on public.articles using gin(tags);

create table if not exists public.article_categories (
  article_id uuid not null references public.articles(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (article_id, category_id)
);
alter table public.article_categories enable row level security;
create policy "published article categories are public" on public.article_categories for select using (exists (select 1 from public.articles a where a.id = article_id and a.published = true));
create policy "staff can manage article categories" on public.article_categories for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

create policy "users can read own profile" on public.profiles for select using (id = auth.uid() or public.is_admin_or_editor());
create policy "admins manage profiles" on public.profiles for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

insert into storage.buckets (id, name, public)
values ('mic-media', 'mic-media', true)
on conflict (id) do update set public = true;

create policy "public can view MIC media" on storage.objects for select using (bucket_id = 'mic-media');
create policy "staff can upload MIC media" on storage.objects for insert with check (bucket_id = 'mic-media' and public.is_admin_or_editor());
create policy "staff can update MIC media" on storage.objects for update using (bucket_id = 'mic-media' and public.is_admin_or_editor()) with check (bucket_id = 'mic-media' and public.is_admin_or_editor());
create policy "staff can delete MIC media" on storage.objects for delete using (bucket_id = 'mic-media' and public.is_admin_or_editor());

create or replace function public.prevent_duplicate_subscriber()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.email = lower(trim(new.email));
  return new;
end;
$$;
drop trigger if exists newsletter_normalize_email on public.newsletter_subscribers;
create trigger newsletter_normalize_email before insert or update on public.newsletter_subscribers for each row execute function public.prevent_duplicate_subscriber();
