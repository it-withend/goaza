# Studyaza as an admissions hub — design

## Intent
Turn Studyaza from a gated university catalog into a one-stop admissions helper for
Russian-speaking applicants, especially families who cannot afford consultants. It should
answer: which universities fit me, what documents and tests I need, which grants exist,
how and when to apply, how to write essays.

## Decisions (agreed)
- **Access model A:** knowledge is public (guides, checklists, deadlines, grants directory,
  core university facts). The Telegram subscription unlocks *tools*: personal shortlist
  builder, catalog filters/sorting, full financial-aid detail.
- Stack stays: Next.js App Router + Supabase. Guides and the grants directory live as typed
  content in the repo (`content/`), university facts stay in Supabase.

## Information architecture
Top navigation (all pages): **С чего начать · Вузы · Гранты · Гайды · Сроки** + CTA «Подобрать вузы».
- `/` — hub: one-sentence promise, "путь поступающего" (5 steps, each linking to a guide),
  quick entry points (бесплатное обучение / полный грант в США / по странам), live numbers.
- `/start` — step-by-step roadmap by school grade and by month.
- `/guides`, `/guides/[slug]` — original guides (RU). No copied text from third-party PDFs.
- `/grants` — government and university scholarship programs (country, coverage, level,
  who can apply, deadline window, official link).
- `/deadlines` — application rounds (ED/EA/REA/RD) + typical calendar.
- `/unis`, `/unis/[slug]` — public directory and university page with core facts.
- `/dashboard` (gated) — catalog with filters + shortlist builder.

## Content sources (files in D:/goo/goazaBD)
Facts (numbers, policies, lists) may be reused; prose from books/guides may not
("50 Successful Essays" is a published book; Stasi/AYFC/UniOn guides are authored).
Data is mostly 2021–2023: every imported number carries `data_year`; deadlines are shown
as typical windows, not exact current dates.

## Non-goals / anti-goals
- No copied essays or guide text.
- No fabricated numbers: unknown stays "—".
- Don't make the public site feel like a paywall teaser.

## Left to the builder
Visual details within the existing Academic Night palette; exact guide wording; matcher
scoring heuristics (documented in code).
