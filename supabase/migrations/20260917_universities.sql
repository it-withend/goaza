-- Universities catalog schema (already applied on Supabase project gogrant / yeuqhccglieulidrhphf)
-- Kept for documentation / re-apply on a fresh project.

create extension if not exists pgcrypto;

create table if not exists public.universities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country text not null,
  city text,
  tuition_display text,
  tuition_num double precision,
  acceptance_rate text,
  rate_num double precision,
  full_grant boolean not null default false,
  aid_max text,
  aid_num double precision,
  aid_types text[] not null default '{}',
  early_deadline text,
  regular_deadline text,
  lang text,
  undergrad_enrollment text,
  intl_undergrad_pct text,
  intl_undergrad_count text,
  total_aid_millions text,
  intl_receiving_aid_pct text,
  avg_aid_award text,
  inst_tags text[] not null default '{}',
  inst_type text,
  intl_aid_policy text,
  need_blind boolean not null default false,
  majors text,
  notes text,
  living_note text,
  sat text,
  essay text,
  how_apply_aid text,
  coa_after_aid_pct text,
  countries_represented text,
  intl_acceptance_rate text,
  intl_yield text,
  merit_scholarship_name text,
  search_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists universities_country_idx on public.universities (country);
create index if not exists universities_full_grant_idx on public.universities (full_grant);
create index if not exists universities_tuition_num_idx on public.universities (tuition_num);
create index if not exists universities_rate_num_idx on public.universities (rate_num);
create index if not exists universities_inst_tags_gin on public.universities using gin (inst_tags);
create index if not exists universities_aid_types_gin on public.universities using gin (aid_types);
create index if not exists universities_search_trgm on public.universities (search_text);

alter table public.universities enable row level security;

drop policy if exists universities_select_public on public.universities;
create policy universities_select_public
  on public.universities for select
  to anon, authenticated
  using (true);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists universities_touch_updated_at on public.universities;
create trigger universities_touch_updated_at
  before update on public.universities
  for each row execute function public.touch_updated_at();
