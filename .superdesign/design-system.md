# Studyaza — Global Academic Atlas

## Product

Studyaza is a Russian-language university and financial-aid explorer for international students. Its database currently contains 1,213 universities across 31 countries, including 419 records marked with full-grant availability. Public visitors first see a product landing page. Verified subscribers to `@studyaza` enter an authenticated dashboard.

Primary journey:
1. Understand the breadth and value of the database on `/`.
2. Subscribe and authenticate through Telegram.
3. Redirect to `/dashboard`.
4. Search, combine filters, compare records, and inspect university details.

## Creative direction: Global Academic Atlas

The product should feel like a living global research instrument—not a generic SaaS template, AI chatbot, corporate admissions portal, or maximal glassmorphism demo.

Visual metaphors:
- a digital atlas;
- an aviation route display;
- an academic archive;
- a precise research instrument.

Use v0.app only as a composition reference: a focused hero, immediate product preview, restrained navigation, and strong whitespace. Do not copy v0's monochrome brand or AI prompt interface.

## Palette

- Atlas ultramarine: `#1636D9` — primary brand field and active navigation.
- Deep ink: `#101528` — text and instrument chrome.
- Warm paper: `#F4F0E6` — primary reading surface.
- Porcelain: `#FCFBF7` — raised panels.
- Signal orange: `#FF5A36` — deadlines, key CTA, selected map points.
- Cyan signal: `#36D8D0` — data paths and secondary status.
- Moss success: `#2D8A62` — grants and verified states.
- Hairline: `rgba(16,21,40,.14)`.

Avoid purple AI gradients. Color should appear as decisive fields, route lines, markers, and status codes rather than decorative rainbow glow.

## Typography

- Display: editorial serif with sharp, cartographic character; use `"Source Serif 4"` initially.
- UI/data: `Manrope`.
- Hero: 64–92px desktop, 42–54px mobile, tight line-height.
- Dashboard title: 28–36px.
- Card title: 17–20px.
- Labels/data: 11–14px with deliberate tracking for coordinate-like metadata.
- Use tabular numerals for statistics and prices.

## Shape and material

- Base surfaces are warm paper or solid ink, not translucent.
- Liquid glass is reserved for floating navigation, authentication, command search, map controls, and detail overlays.
- Glass recipe: translucent porcelain/ink, 18–28px blur, 1px highlight edge, subtle inner highlight; never place glass over noisy text.
- Cards are structured dossiers with asymmetrical grid lines, clipped corners or restrained 12–16px radii—not identical rounded SaaS tiles.
- Hairlines, coordinate labels, map grids, and route arcs build the atlas identity.

## Motion

- Slow route-line drawing and map-point pulse in the hero.
- Numbers count up once when entering the viewport.
- Dashboard cards reveal with 20–40ms stagger, under 300ms total.
- Detail panel slides in from the right with a subtle glass refraction.
- Respect `prefers-reduced-motion`; no continuous movement behind dense reading areas.

## Landing `/`

Tone:
- Student-first, energetic, curious, and useful; never corporate, sales-led, or artificially formal.
- The service is free and should not imply that Studyaza sells admissions or guarantees outcomes.
- Use natural conversational Russian without forced slang or childish gamification.

Header:
- Actual Studyaza logo plus wordmark.
- Keep navigation minimal; do not link to nonexistent marketing sections.
- Primary CTA: `Открыть атлас`.

Hero:
- Eyebrow: `GLOBAL ACADEMIC ATLAS · 2026`.
- Headline: `1 213 университетов. 31 страна. Один атлас возможностей.`
- Supporting copy about tuition, aid, admission, and deadlines.
- Primary CTA opens Telegram authentication.
- Telegram authentication appears in a focused overlay over the same screen.
- A large active globe/map composition shows real university markers, route lines, floating university labels, and a small factual grant signal.

Proof/data rail:
- Live values only: 1,213 universities; 31 countries; 419 full grants.

Scope:
- The public landing ends after the hero and factual data rail.
- Do not add product-preview, feature-grid, testimonial, journey, pricing, or extended footer sections.
- After successful Telegram verification, redirect directly to `/dashboard`.

## Dashboard `/dashboard`

App shell:
- Narrow left rail with real Studyaza logo, Explorer, Saved, Grants, and Profile.
- Top command search with keyboard hint.
- User/Telegram verified control at top-right.
- Main content supports `Список / Карта`.

Filters:
- Desktop: persistent compact left instrument panel.
- Mobile: bottom-sheet/drawer.
- Active filters appear as removable tokens above results.
- Preserve strict AND behavior.

University cards:
- Every card begins with a 44–52px university logo.
- Use a university-domain-driven logo URL; when missing, render a deterministic monogram with the same footprint.
- Show name, city/country, institution type, tuition, acceptance rate, aid amount, full-grant/need-blind status, and nearest deadline.
- Signal orange is reserved for deadlines/urgency; moss for funding.
- Selecting a card opens a right-side detail panel without losing result position.

Logo data requirement:
- Add `website_domain` (preferred) or `logo_url` to each university record.
- Resolve logos at render time through a restricted public logo CDN such as Context.dev Logo Link.
- Never scrape or permanently re-host third-party university logos through the client.
- Fallback must never break layout or show a broken image.

## Responsive behavior

- Landing hero becomes text-first with the map visual below.
- Dashboard rail becomes a compact bottom nav.
- Filters become a full-width bottom sheet.
- University dossier cards collapse to one primary metric row plus expandable details.
- Logo, university name, grant state, and deadline remain visible above the fold.
- Landing gets a mobile-only sticky `Открыть атлас` action with 44px minimum touch targets.

## Accessibility and performance

- WCAG AA contrast on solid and glass surfaces.
- Visible keyboard focus and semantic controls.
- No information communicated by color alone.
- Lazy-load below-the-fold logos; reserve dimensions to avoid layout shift.
- Decorative map motion must not block interaction or increase input latency.
