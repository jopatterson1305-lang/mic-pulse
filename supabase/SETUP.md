# MIC Pulse Supabase setup

Apply these files in order using the Supabase SQL editor or Supabase CLI migrations:

1. `supabase/schema.sql`
2. `supabase/migrations/20260818_cms_expansion.sql`
3. `supabase/migrations/20260819_pass2_cms.sql`

The migrations create the CMS tables, indexes, RLS policies, newsletter normalization trigger, and the public `mic-media` Storage bucket. Do not run the migration files out of order.

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Only the public anon key is used by the browser and server-rendered public reads. Never add a service-role key to the repository or client environment.

## Auth and first admin

Enable Email provider under Supabase Auth → Providers. Create the first user under Authentication → Users, then run the following SQL with that user’s UUID:

```sql
insert into public.profiles (id, full_name, role)
values ('AUTH-USER-UUID', 'MIC Admin', 'admin')
on conflict (id) do update set role = 'admin';
```

Create editors in Auth, then add a matching `public.profiles` row with `role = 'editor'`. The admin UI does not grant privileges by itself; RLS remains authoritative.

## Storage

The Pass 2 migration creates a public bucket named `mic-media` and policies allowing public reads and admin/editor uploads, updates, and deletes. Uploaded files are stored in Storage and referenced by `public_url` in `public.media`; no image is stored as base64 in PostgreSQL.

If the bucket already exists, confirm that it is public and that the four `storage.objects` policies are present. If you prefer a private bucket, update the public-read policy and replace stored public URLs with signed URL generation before deployment.

## Verification checklist

After applying migrations, verify that an unauthenticated client can select only rows where `published = true`, a signed-in editor can create and publish content, an editor cannot modify profiles or settings, and an admin can manage profiles. Upload and delete one test image in `/admin/media`, then remove the test record before production use.
