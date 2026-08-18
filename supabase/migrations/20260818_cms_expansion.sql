-- MIC Pulse CMS expansion. Apply after supabase/schema.sql.
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  website text,
  country text,
  industry text,
  logo_url text,
  published boolean not null default false,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.startups (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  name text not null,
  slug text not null unique,
  stage text,
  founded_year integer,
  funding_total numeric,
  published boolean not null default false,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.founders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  bio text,
  photo_url text,
  company_id uuid references public.companies(id) on delete set null,
  published boolean not null default false,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.market_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  value numeric,
  unit text,
  source_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  filename text not null,
  mime_type text not null,
  size_bytes bigint,
  alt_text text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text,
  published boolean not null default false,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  confirmed boolean not null default false,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists articles_published_category_idx on public.articles (published, category, published_at desc);
create index if not exists opportunities_published_deadline_idx on public.opportunities (published, deadline);
create index if not exists events_published_starts_at_idx on public.events (published, starts_at);
create index if not exists companies_published_idx on public.companies (published);
create index if not exists startups_published_idx on public.startups (published);
create index if not exists founders_published_idx on public.founders (published);
create index if not exists market_updates_published_idx on public.market_updates (published, published_at desc);
create index if not exists pages_published_idx on public.pages (published);

alter table public.categories enable row level security;
alter table public.companies enable row level security;
alter table public.startups enable row level security;
alter table public.founders enable row level security;
alter table public.market_updates enable row level security;
alter table public.media enable row level security;
alter table public.pages enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "published categories are public" on public.categories for select using (true);
create policy "published companies are public" on public.companies for select using (published = true);
create policy "published startups are public" on public.startups for select using (published = true);
create policy "published founders are public" on public.founders for select using (published = true);
create policy "published market updates are public" on public.market_updates for select using (published = true);
create policy "published media is public" on public.media for select using (true);
create policy "published pages are public" on public.pages for select using (published = true);

create policy "staff can manage categories" on public.categories for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff can manage companies" on public.companies for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff can manage startups" on public.startups for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff can manage founders" on public.founders for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff can manage market updates" on public.market_updates for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff can manage media" on public.media for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff can manage pages" on public.pages for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "public can subscribe" on public.newsletter_subscribers for insert with check (true);
create policy "staff can manage subscribers" on public.newsletter_subscribers for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
