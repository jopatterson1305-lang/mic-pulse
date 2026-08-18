-- MIC Pulse CMS / admin foundation
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  category text not null default 'Business',
  cover_image text,
  published boolean not null default false,
  published_at timestamptz,
  author_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null default 'Opportunity',
  organization text,
  url text,
  deadline timestamptz,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  starts_at timestamptz,
  url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.opportunities enable row level security;
alter table public.events enable row level security;

create policy "published articles are public" on public.articles for select using (published = true);
create policy "published opportunities are public" on public.opportunities for select using (published = true);
create policy "published events are public" on public.events for select using (published = true);

create or replace function public.is_admin_or_editor()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','editor')
  );
$$;

create policy "staff can manage articles" on public.articles for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff can manage opportunities" on public.opportunities for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff can manage events" on public.events for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

-- After creating your first Supabase Auth user, promote that user's UUID:
-- insert into public.profiles (id, full_name, role) values ('YOUR-USER-UUID', 'MIC Admin', 'admin');
