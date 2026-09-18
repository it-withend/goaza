# Routes

Framework: Next.js 15 App Router.

## UI routes

- `/` → `app/page.tsx`
  - Uses `app/layout.tsx`.
  - Server-loads up to 1,000 universities and Telegram session state.
  - Renders the entire current catalog through `components/CatalogClient.tsx`.

## API routes

- `/api/universities` → `app/api/universities/route.ts`
  - Authenticated filtered university query.
- `/api/auth/telegram` → `app/api/auth/telegram/route.ts`
  - Verifies Telegram Login payload and channel membership; creates/deletes the session cookie.
- `/api/auth/status` → `app/api/auth/status/route.ts`
  - Returns current Telegram session status.

## Planned route split

- `/` — public product landing page and Telegram connection entry point.
- `/dashboard` — authenticated university explorer with search, filters, results, and university detail panel.
