# Page Dependency Trees

## `/` — Current catalog

Entry: `app/page.tsx`

Dependencies:
- `components/CatalogClient.tsx`
  - `components/UniversityCard.tsx`
    - `lib/types.ts`
  - `components/TelegramLogin.tsx`
  - `components/ToTop.tsx`
  - `lib/types.ts`
- `lib/universities.ts`
  - `lib/supabase.ts`
  - `lib/types.ts`
- `lib/telegram-auth.ts`
- `app/layout.tsx`
  - `app/globals.css`

Visual render branch:
- `app/page.tsx` always renders `CatalogClient` after server-side data/session loading.
- `CatalogClient` renders a sticky header, Telegram auth, gated filters, summary, country tabs, grouped university cards, and a scroll-to-top control.

## `/dashboard` — Planned

No source exists yet. It will reuse the Telegram session, university query/data types, filter behavior, university cards, and global brand assets while introducing a dedicated authenticated app shell.
