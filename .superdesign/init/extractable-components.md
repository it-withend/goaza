# Extractable Components

## TelegramLogin
- Source: `components/TelegramLogin.tsx`
- Category: basic
- Description: Telegram Login Widget container with busy and error states.
- Extractable props: `botUsername`, `onSubscribed`.
- Hardcoded: Telegram widget sizing/radius and Russian error copy.

## UniversityCard
- Source: `components/UniversityCard.tsx`
- Category: basic
- Description: University summary and expandable financial/admissions facts.
- Extractable props: `u`.
- Hardcoded: fact labels, badge labels, details structure.

## ToTop
- Source: `components/ToTop.tsx`
- Category: basic
- Description: Floating scroll-to-top action.
- Extractable props: none.
- Hardcoded: arrow glyph, 420px visibility threshold.

## CurrentCatalogHeader
- Source: `components/CatalogClient.tsx`
- Category: layout
- Description: Current sticky brand/auth/search/filter header, lines 157–366.
- Extractable props: `subscribed`, `username`, `filtersOpen`, filter values and callbacks.
- Hardcoded: Studyaza logo path, 2026 badge, Telegram channel link.

The planned LandingHeader and DashboardShell do not exist yet and should be created as new reusable components after the design is approved.
