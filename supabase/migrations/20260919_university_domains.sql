-- Add website_domain for Logo Link lookups (Context.dev).
-- Apply to shared gogrant Supabase; validate constraint after backfill.

alter table public.universities
  add column if not exists website_domain text;

create index if not exists universities_website_domain_idx
  on public.universities (website_domain)
  where website_domain is not null;

alter table public.universities
  drop constraint if exists universities_website_domain_format;

alter table public.universities
  add constraint universities_website_domain_format
  check (
    website_domain is null
    or website_domain ~ '^[a-z0-9.-]+\.[a-z]{2,}$'
  ) not valid;

-- After enrichment, run:
-- alter table public.universities validate constraint universities_website_domain_format;
