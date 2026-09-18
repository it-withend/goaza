# Studyaza Global Academic Atlas — Design Specification

## Goal

Replace the current single catalog page with a two-stage product experience:

1. A public landing page that explains Studyaza, demonstrates database scale, and initiates Telegram authentication.
2. A modern authenticated dashboard for exploring universities, grants, costs, admissions, and deadlines.

The approved visual concept is **Global Academic Atlas**: a digital atlas and research instrument with editorial typography, cartographic details, precise data presentation, and restrained liquid-glass controls.

## Information architecture

### Public landing `/`

- Global navigation with Studyaza identity and `Открыть атлас` CTA.
- Hero with value proposition and animated university map.
- Live database metrics.
- Embedded dashboard preview.
- Feature explanation focused on decisions students make.
- Three-step Telegram-to-search journey.
- Final authentication CTA.

### Authenticated dashboard `/dashboard`

- Dedicated app shell.
- University explorer as the default view.
- Combined AND filters.
- List/map view switch.
- University cards with logos.
- University detail side panel.
- Telegram session/profile controls.

Unauthenticated requests to `/dashboard` redirect to `/`. Successful Telegram verification redirects to `/dashboard`.

## Landing interaction

The hero should communicate utility before decoration. The map contains selected real university points and subtle route lines. The primary CTA launches Telegram Login. The secondary CTA scrolls to the live dashboard preview.

Metrics are computed from database metadata rather than hardcoded where practical:
- university count;
- country count;
- full-grant count.

## Dashboard interaction

Desktop uses a narrow navigation rail, compact filter panel, and fluid results area. Mobile converts the navigation to a bottom bar and filters to a bottom sheet.

Search and filter behavior remains server-backed. Existing strict AND semantics are preserved. Result state should be represented in the URL so links can be shared after authentication.

Selecting a university should open a detail side panel without navigating away or losing scroll position. Direct detail URLs may be added later.

## University logos

Each card and detail panel includes the university's official mark where available.

Data and rendering strategy:
- introduce `website_domain` as the stable lookup key;
- use a domain-based logo CDN with a public, referrer-restricted client identifier;
- reserve fixed image dimensions;
- lazy-load logos below the fold;
- fall back to a deterministic monogram when no official logo resolves;
- do not show broken image states;
- do not persist or re-host externally supplied logo files through the browser.

The existing dataset does not currently expose a website/domain field, so enrichment is a required implementation step. Automated matches should be reviewable because similarly named institutions can resolve to the wrong domain.

## Visual system

- Ultramarine brand fields, warm paper reading surfaces, signal orange, cyan route lines, and moss funding states.
- Editorial serif display typography paired with Manrope UI typography.
- Cartographic grids, coordinates, routes, markers, and dossier-like cards.
- Liquid glass only on floating navigation, command search, map controls, authentication, and detail overlays.
- No generic purple AI gradients, excessive pills, or glass on every surface.

## Motion

- Route drawing and point pulse in the landing hero.
- One-time metric count-up.
- Fast result-card stagger.
- Right-side detail panel transition.
- Full reduced-motion fallback.

## Authentication

Telegram authentication remains server-verified with the existing `getChatMember` flow and httpOnly session cookie. The canonical host remains `goaza.xyz` to prevent origin mismatches in Telegram Login.

Successful login changes the product state rather than simply unlocking controls on the landing page: the user is redirected into `/dashboard`.

## Acceptance criteria

- Public visitors see a complete landing page, not disabled catalog controls.
- Landing communicates live database scale and clearly explains Telegram access.
- Verified users arrive at `/dashboard`.
- Dashboard preserves all current search/filter capabilities.
- Cards display a university logo or stable monogram fallback.
- Landing and dashboard share one recognizable Global Academic Atlas system.
- Desktop and mobile both remain readable and usable.
- UI meets keyboard, contrast, reduced-motion, and layout-shift requirements.

## Deferred

- Saved universities and saved searches.
- Side-by-side university comparison.
- Personalized recommendations.
- Full map-based geospatial filtering.
- Admin workflow for reviewing domain/logo enrichment.
