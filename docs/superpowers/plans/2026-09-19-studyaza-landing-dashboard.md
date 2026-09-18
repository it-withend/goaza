# Studyaza Landing and Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current single catalog page with the approved one-screen landing, Telegram gate, and authenticated university dashboard with account identity and university logos.

**Architecture:** `/` becomes a lightweight public server page that redirects existing sessions and renders a client landing/auth modal. `/dashboard` becomes a server-protected route that loads catalog data and passes it into a focused client dashboard. Existing Telegram signature and membership verification remain authoritative; successful auth redirects to `/dashboard`. University logos are domain-driven with a deterministic monogram fallback.

**Tech Stack:** Next.js 15.5.9 App Router, React 19.1, TypeScript, Supabase, Telegram Login Widget, Context.dev Logo Link, CSS Modules, Vitest, Testing Library.

## Global Constraints

- The public landing consists only of the approved hero, animated university map, and factual database rail.
- Do not display unsupported accuracy, admission-guarantee, or outcome-guarantee claims.
- Telegram membership remains server-verified through `getChatMember`; never trust client subscription state.
- Canonical production host remains `goaza.xyz`.
- All current catalog filters retain strict AND semantics.
- Dashboard cards show an official logo when `website_domain` and `NEXT_PUBLIC_LOGOLINK_KEY` are available; otherwise show a stable monogram without layout shift.
- Liquid glass is limited to floating controls and overlays.
- Mobile controls are at least 44px and support `prefers-reduced-motion`.
- Do not modify unrelated tables in the shared Supabase project.

---

## Planned file structure

```text
app/
  page.tsx                         # public landing and existing-session redirect
  dashboard/page.tsx              # authenticated server boundary
  globals.css                     # reset, fonts, shared tokens only
components/
  landing/
    LandingPage.tsx               # one-screen hero, map, stats, modal state
    LandingPage.module.css
    TelegramGateModal.tsx         # accessible dialog around TelegramLogin
  dashboard/
    DashboardClient.tsx           # filter/query state and result rendering
    DashboardShell.tsx            # rail, search chrome, verified account, logout
    Dashboard.module.css
  UniversityCard.tsx              # redesigned dossier card
  UniversityLogo.tsx              # logo CDN and monogram fallback
  TelegramLogin.tsx               # existing widget with typed success callback
lib/
  landing-stats.ts                # minimal Supabase stats query
  university-logo.ts              # URL and initials helpers
supabase/migrations/
  20260919_university_domains.sql # `website_domain` schema addition
scripts/
  enrich_university_domains.mjs   # deterministic HIPO dataset matching/report
tests/
  setup.ts
  landing-stats.test.ts
  university-logo.test.ts
  landing-page.test.tsx
  dashboard-shell.test.tsx
vitest.config.ts
```

---

### Task 1: Establish tests and split public/authenticated routes

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `lib/landing-stats.ts`
- Create: `tests/landing-stats.test.ts`
- Modify: `app/page.tsx`
- Create: `app/dashboard/page.tsx`

**Interfaces:**
- Produces: `LandingStats = { total: number; countries: number; grants: number }`
- Produces: `fetchLandingStats(): Promise<LandingStats>`
- `/` redirects verified sessions to `/dashboard`.
- `/dashboard` redirects missing/invalid sessions to `/`.

- [ ] **Step 1: Add the test harness**

Add scripts and dev dependencies:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.8"
  }
}
```

Configure aliases and jsdom:

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

```ts
// tests/setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 2: Write the failing landing-stat test**

```ts
// tests/landing-stats.test.ts
import { describe, expect, it } from "vitest";
import { summarizeLandingRows } from "@/lib/landing-stats";

describe("summarizeLandingRows", () => {
  it("counts rows, distinct countries, and full grants", () => {
    expect(
      summarizeLandingRows([
        { country: "USA", full_grant: true },
        { country: "USA", full_grant: false },
        { country: "Korea", full_grant: true },
      ]),
    ).toEqual({ total: 3, countries: 2, grants: 2 });
  });
});
```

- [ ] **Step 3: Run the focused test and confirm RED**

Run: `npm test -- tests/landing-stats.test.ts`

Expected: FAIL because `lib/landing-stats.ts` does not exist.

- [ ] **Step 4: Implement minimal stats loading**

```ts
// lib/landing-stats.ts
import { getSupabaseAnon } from "@/lib/supabase";

export type LandingStats = { total: number; countries: number; grants: number };
type LandingRow = { country: string; full_grant: boolean };

export function summarizeLandingRows(rows: LandingRow[]): LandingStats {
  return {
    total: rows.length,
    countries: new Set(rows.map((row) => row.country)).size,
    grants: rows.filter((row) => row.full_grant).length,
  };
}

export async function fetchLandingStats(): Promise<LandingStats> {
  const { data, error } = await getSupabaseAnon()
    .from("universities")
    .select("country,full_grant")
    .limit(2000);
  if (error) throw new Error(error.message);
  return summarizeLandingRows(data ?? []);
}
```

- [ ] **Step 5: Split the route boundaries**

`app/page.tsx`:

```tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { fetchLandingStats } from "@/lib/landing-stats";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (session?.subscribed) redirect("/dashboard");
  const stats = await fetchLandingStats();
  return (
    <LandingPage
      stats={stats}
      botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || ""}
    />
  );
}
```

`app/dashboard/page.tsx`:

```tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { fetchBrowseUniversities, computeMeta } from "@/lib/universities";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (!session?.subscribed) redirect("/");
  const initial = await fetchBrowseUniversities();
  return (
    <DashboardClient
      initial={initial}
      meta={computeMeta(initial)}
      accountName={session.username || session.firstName || "Telegram user"}
    />
  );
}
```

- [ ] **Step 6: Run tests and build**

Run: `npm test -- tests/landing-stats.test.ts && npm run build`

Expected: test PASS; Next.js build PASS with `/` and `/dashboard`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tests/setup.ts tests/landing-stats.test.ts lib/landing-stats.ts app/page.tsx app/dashboard/page.tsx
git commit -m "Split landing and authenticated dashboard routes"
```

---

### Task 2: Build the approved one-screen landing and Telegram overlay

**Files:**
- Create: `components/landing/LandingPage.tsx`
- Create: `components/landing/TelegramGateModal.tsx`
- Create: `components/landing/LandingPage.module.css`
- Modify: `components/TelegramLogin.tsx`
- Create: `tests/landing-page.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `LandingPage({ stats, botUsername })`
- `TelegramGateModal({ open, onClose, botUsername })`
- `TelegramLogin.onSubscribed(username)` remains the verified success boundary.

- [ ] **Step 1: Write failing interaction tests**

```tsx
// tests/landing-page.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LandingPage } from "@/components/landing/LandingPage";

vi.mock("@/components/TelegramLogin", () => ({
  TelegramLogin: ({ onSubscribed }: { onSubscribed: (name: string) => void }) => (
    <button onClick={() => onSubscribed("student")}>Telegram test login</button>
  ),
}));

describe("LandingPage", () => {
  it("shows only factual database metrics and opens Telegram gate", async () => {
    render(
      <LandingPage
        stats={{ total: 1213, countries: 31, grants: 419 }}
        botUsername="goazabot"
      />,
    );
    expect(screen.getByText("1 213")).toBeInTheDocument();
    expect(screen.queryByText(/100%/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /открыть атлас/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/landing-page.test.tsx`

Expected: FAIL because landing components do not exist.

- [ ] **Step 3: Implement the accessible auth overlay**

```tsx
// components/landing/TelegramGateModal.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TelegramLogin } from "@/components/TelegramLogin";
import styles from "./LandingPage.module.css";

export function TelegramGateModal({
  open,
  onClose,
  botUsername,
}: {
  open: boolean;
  onClose: () => void;
  botUsername: string;
}) {
  const router = useRouter();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="telegram-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className={styles.close} type="button" aria-label="Закрыть" onClick={onClose}>×</button>
        <h2 id="telegram-title">Открой атлас</h2>
        <p>Подпишись на @studyaza и войди через Telegram.</p>
        <TelegramLogin
          botUsername={botUsername}
          onSubscribed={() => {
            router.replace("/dashboard");
            router.refresh();
          }}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Implement the single-screen landing**

Build `LandingPage.tsx` from approved draft v5:
- exact Studyaza logo from `/logo.png`;
- heading `Найди вуз, который подходит именно тебе`;
- animated CSS/SVG route map and three university labels;
- CTA buttons wired to `setGateOpen(true)`;
- data rail from `stats.total`, `stats.countries`, `stats.grants`;
- no lower marketing sections;
- no hardcoded `100%`.

The component root:

```tsx
"use client";

import { useState } from "react";
import type { LandingStats } from "@/lib/landing-stats";
import { TelegramGateModal } from "./TelegramGateModal";
import styles from "./LandingPage.module.css";

export function LandingPage({
  stats,
  botUsername,
}: {
  stats: LandingStats;
  botUsername: string;
}) {
  const [gateOpen, setGateOpen] = useState(false);
  const number = new Intl.NumberFormat("ru-RU");
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <img src="/logo.png" width="36" height="36" alt="" />
        <strong>Studyaza</strong>
        <button type="button" onClick={() => setGateOpen(true)}>Подключиться</button>
      </header>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Живой атлас возможностей · 2026</span>
          <h1>Найди вуз, который подходит <em>именно тебе.</em></h1>
          <p>Стоимость, гранты, шансы поступления и дедлайны — в одной понятной базе.</p>
          <button type="button" onClick={() => setGateOpen(true)}>Открыть атлас</button>
        </div>
        <div className={styles.map} aria-label="Карта университетов">
          <svg viewBox="0 0 700 520" aria-hidden="true">
            <path className={styles.route} d="M65 390 Q250 70 620 250" />
            <path className={styles.route} d="M110 155 Q330 360 605 105" />
            <circle cx="65" cy="390" r="6" />
            <circle cx="620" cy="250" r="6" />
          </svg>
          <span className={styles.mapLabel}>Harvard University · полный грант</span>
          <span className={styles.mapLabel}>KAIST · full coverage</span>
          <span className={styles.mapLabel}>ANU · 20 программ</span>
        </div>
      </section>
      <section className={styles.stats} aria-label="Размер базы">
        <div><small>Университетов</small><strong>{number.format(stats.total)}</strong></div>
        <div><small>Стран</small><strong>{number.format(stats.countries)}</strong></div>
        <div><small>Полных грантов</small><strong>{number.format(stats.grants)}</strong></div>
      </section>
      <TelegramGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        botUsername={botUsername}
      />
    </main>
  );
}
```

Copy visual values from `.superdesign/design-system.md`; do not copy Tailwind CDN from the draft into production.

- [ ] **Step 5: Implement mobile and reduced-motion CSS**

`LandingPage.module.css` must contain:

```css
.page { min-height: 100svh; overflow-x: clip; }
.cta { min-height: 44px; }

@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; padding: 48px 18px 96px; }
  .title { font-size: clamp(2.5rem, 12vw, 3.25rem); }
  .map { min-height: 360px; }
  .mobileCta {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: max(10px, env(safe-area-inset-bottom));
    min-height: 54px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .route, .marker, .floatingUniversity { animation: none; }
}
```

- [ ] **Step 6: Run tests and verify both viewports**

Run: `npm test -- tests/landing-page.test.tsx && npm run build`

Browser checks:
- Desktop 1440×900: hero and all three metrics visible without marketing content below.
- Mobile 390×844: no horizontal overflow; CTA remains reachable; modal fits viewport.

- [ ] **Step 7: Commit**

```bash
git add components/landing components/TelegramLogin.tsx app/globals.css tests/landing-page.test.tsx
git commit -m "Build single-screen Studyaza landing and Telegram gate"
```

---

### Task 3: Convert the catalog into the authenticated dashboard

**Files:**
- Create: `components/dashboard/DashboardClient.tsx`
- Create: `components/dashboard/DashboardShell.tsx`
- Create: `components/dashboard/Dashboard.module.css`
- Create: `tests/dashboard-shell.test.tsx`
- Modify: `components/UniversityCard.tsx`
- Delete after parity: `components/CatalogClient.tsx`

**Interfaces:**
- `DashboardClient({ initial, meta, accountName })`
- `DashboardShell({ accountName, children, onLogout })`
- `/api/universities` remains the filtered data source.

- [ ] **Step 1: Write the failing account/logout test**

```tsx
// tests/dashboard-shell.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

it("shows the verified Telegram account and calls logout", async () => {
  const onLogout = vi.fn();
  render(<DashboardShell accountName="student" onLogout={onLogout}><div>Results</div></DashboardShell>);
  expect(screen.getByText("@student")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /выйти/i }));
  expect(onLogout).toHaveBeenCalledOnce();
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/dashboard-shell.test.tsx`

Expected: FAIL because `DashboardShell` does not exist.

- [ ] **Step 3: Implement the dashboard shell**

Create the approved narrow rail, command search chrome, list/map control, verified account chip, and logout button. Do not add nonfunctional Saved/Grants routes; render only Explorer plus account/logout until those features exist.

Normalize account text:

```ts
const displayAccount = accountName.startsWith("@") ? accountName : `@${accountName}`;
```

- [ ] **Step 4: Move catalog state without changing semantics**

Move query/filter logic from `CatalogClient.tsx` into `DashboardClient.tsx` unchanged:
- 220ms search debounce;
- `grantOnly`, `needBlind`, tuition, aid, rate, institution tags, aid types, sort;
- URL request to `/api/universities`;
- all active filters combined;
- 401 response redirects to `/`.

Logout implementation:

```tsx
async function logout() {
  await fetch("/api/auth/telegram", { method: "DELETE" });
  router.replace("/");
  router.refresh();
}
```

- [ ] **Step 5: Implement responsive dashboard styling**

Desktop: 72px rail + 280px filters + results + optional detail panel.

Mobile:
- rail becomes bottom navigation;
- filters open in an accessible drawer;
- cards become one-column dossiers;
- account remains visible;
- no desktop UI is scaled down.

- [ ] **Step 6: Verify filter parity**

Run:

```bash
npm test
npm run build
```

Browser acceptance:
- unauthenticated `/dashboard` redirects to `/`;
- authenticated dashboard displays account;
- Ivy + STEM sends both values in `inst`;
- all previous range/sort filters still work;
- logout returns to landing.

- [ ] **Step 7: Commit**

```bash
git add app/dashboard components/dashboard components/UniversityCard.tsx tests/dashboard-shell.test.tsx
git rm components/CatalogClient.tsx
git commit -m "Build authenticated university explorer dashboard"
```

---

### Task 4: Add university-domain enrichment and resilient logos

**Files:**
- Create: `supabase/migrations/20260919_university_domains.sql`
- Modify: `lib/types.ts`
- Create: `lib/university-logo.ts`
- Create: `components/UniversityLogo.tsx`
- Create: `tests/university-logo.test.ts`
- Create: `scripts/enrich_university_domains.mjs`
- Modify: `.env.example`
- Modify: `next.config.ts`
- Modify: `components/UniversityCard.tsx`

**Interfaces:**
- `University.website_domain: string | null`
- `universityInitials(name: string): string`
- `logoLinkUrl(domain: string | null, clientId: string | undefined): string | null`
- `UniversityLogo({ name, domain, size })`

- [ ] **Step 1: Write failing logo helper tests**

```ts
import { describe, expect, it } from "vitest";
import { logoLinkUrl, universityInitials } from "@/lib/university-logo";

describe("university logo helpers", () => {
  it("builds a restricted public Logo Link URL", () => {
    expect(logoLinkUrl("harvard.edu", "brandLL_test")).toBe(
      "https://logos.context.dev/?publicClientId=brandLL_test&domain=harvard.edu",
    );
  });
  it("falls back to stable initials", () => {
    expect(universityInitials("Australian National University")).toBe("ANU");
    expect(logoLinkUrl(null, "brandLL_test")).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/university-logo.test.ts`

Expected: FAIL because `lib/university-logo.ts` does not exist.

- [ ] **Step 3: Add the database field safely**

```sql
-- supabase/migrations/20260919_university_domains.sql
alter table public.universities
  add column if not exists website_domain text;

create index if not exists universities_website_domain_idx
  on public.universities (website_domain)
  where website_domain is not null;

alter table public.universities
  add constraint universities_website_domain_format
  check (
    website_domain is null
    or website_domain ~ '^[a-z0-9.-]+\.[a-z]{2,}$'
  ) not valid;
```

Apply only this migration to the shared project, then validate:

```sql
alter table public.universities
  validate constraint universities_website_domain_format;
```

- [ ] **Step 4: Implement URL and monogram helpers**

```ts
// lib/university-logo.ts
export function universityInitials(name: string): string {
  const words = name.match(/[\p{L}\p{N}]+/gu) ?? [];
  const compact = words.filter((word) => !["of", "the", "and"].includes(word.toLowerCase()));
  return compact.slice(0, 3).map((word) => word[0]?.toUpperCase()).join("") || "?";
}

export function logoLinkUrl(domain: string | null, clientId?: string): string | null {
  if (!domain || !clientId) return null;
  const query = new URLSearchParams({ publicClientId: clientId, domain });
  return `https://logos.context.dev/?${query.toString()}`;
}
```

- [ ] **Step 5: Implement image fallback**

`UniversityLogo.tsx` uses a fixed square wrapper, `loading="lazy"`, and switches to the monogram on `onError`. `next.config.ts` allows `logos.context.dev`; no private key is exposed.

```tsx
"use client";

import { useState } from "react";
import { logoLinkUrl, universityInitials } from "@/lib/university-logo";

export function UniversityLogo({ name, domain, size = 48 }: {
  name: string;
  domain: string | null;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const src = logoLinkUrl(domain, process.env.NEXT_PUBLIC_LOGOLINK_KEY);
  if (!src || failed) return <span aria-hidden>{universityInitials(name)}</span>;
  return <img src={src} width={size} height={size} loading="lazy" alt="" onError={() => setFailed(true)} />;
}
```

- [ ] **Step 6: Add deterministic domain enrichment**

`scripts/enrich_university_domains.mjs`:
- downloads `https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json`;
- normalizes names with Unicode NFKD, punctuation removal, whitespace collapse, and lowercasing;
- matches only exact normalized `(name, country)` pairs automatically;
- writes matched `slug,website_domain` rows and unresolved/ambiguous rows to separate CSV reports;
- never guesses among multiple domains;
- applies matched values using `SUPABASE_SERVICE_ROLE_KEY` only from the local environment.

The script must print: total universities, exact matches, ambiguous matches, unresolved matches, and updated rows. Abort before updates if `SUPABASE_SERVICE_ROLE_KEY` is absent.

- [ ] **Step 7: Configure Logo Link**

Add:

```dotenv
NEXT_PUBLIC_LOGOLINK_KEY=
```

In Context.dev Logo Link, restrict the public client ID to:
- `goaza.xyz`
- `www.goaza.xyz`
- `localhost:3000`

The site remains functional with monograms until the public ID is configured.

- [ ] **Step 8: Test and verify**

Run:

```bash
npm test -- tests/university-logo.test.ts
node scripts/enrich_university_domains.mjs --dry-run
npm run build
```

Expected:
- helper tests PASS;
- enrichment prints counts without remote writes;
- cards reserve identical space for logos and monograms;
- failed logo requests never display broken-image icons.

- [ ] **Step 9: Commit**

```bash
git add supabase/migrations/20260919_university_domains.sql lib/types.ts lib/university-logo.ts components/UniversityLogo.tsx components/UniversityCard.tsx tests/university-logo.test.ts scripts/enrich_university_domains.mjs .env.example next.config.ts
git commit -m "Add university logos with domain enrichment and fallback"
```

---

### Task 5: End-to-end verification and production handoff

**Files:**
- Modify only if verification finds a scoped defect.

**Interfaces:**
- Verifies browser → Telegram auth → cookie → dashboard → filtered API → logout.

- [ ] **Step 1: Run the complete local quality gate**

```bash
npm test
npm run lint
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 2: Verify public landing**

At 1440×900 and 390×844:
- only hero/map/data rail are present;
- values equal current database totals;
- no horizontal overflow;
- reduced-motion disables route and marker animation;
- Telegram modal opens, closes by button, backdrop, and Escape.

- [ ] **Step 3: Verify authentication**

On `https://goaza.xyz`:
- `/`, `www`, and `goaza.vercel.app` resolve to canonical `goaza.xyz`;
- Login Widget displays `@goazabot` without `Bot domain invalid`;
- a non-subscriber receives the Russian 403 guidance;
- a subscriber receives the httpOnly `goaza_tg` cookie and lands on `/dashboard`.

- [ ] **Step 4: Verify dashboard and account**

- Telegram username/first name appears in account control.
- Refresh keeps the session.
- Search and every filter call `/api/universities`.
- Combined filters retain AND behavior.
- Card logos or monograms render without layout shift.
- Logout clears the cookie and returns to `/`.

- [ ] **Step 5: Deploy and smoke-test**

Deploy only after the previous checks pass. Verify Vercel Production contains:
- `TELEGRAM_BOT_TOKEN`
- `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=goazabot`
- `TELEGRAM_CHANNEL=@studyaza`
- `AUTH_SECRET`
- Supabase URL/key
- `NEXT_PUBLIC_LOGOLINK_KEY`

Then smoke-test the production landing, real Telegram login, dashboard account, one combined filter, and logout.

- [ ] **Step 6: Final commit for scoped verification fixes**

```bash
git add app components lib tests
git commit -m "Verify Studyaza landing to dashboard flow"
```

If verification required no source changes, skip this commit.
