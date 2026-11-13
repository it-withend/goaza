-- Extra admissions facts imported from the Studyaza source spreadsheets (CDS-based, 2021–2023).
alter table public.universities
  add column if not exists recommendations text,
  add column if not exists app_fee text,
  add column if not exists fee_waiver text,
  add column if not exists apply_url text,
  add column if not exists finaid_url text,
  add column if not exists rank_national text,
  add column if not exists rank_world text,
  add column if not exists ed_acceptance_rate text,
  add column if not exists rd_acceptance_rate text,
  add column if not exists early_rounds text,
  add column if not exists aid_forms text,
  add column if not exists css_fee_waiver text,
  add column if not exists avg_gpa text,
  add column if not exists admission_factors jsonb,
  add column if not exists data_year int,
  add column if not exists sources text[] not null default '{}';

comment on column public.universities.admission_factors is
  'Common Data Set C7: factor -> "Very Important" | "Important" | "Considered" | "Not Considered"';
