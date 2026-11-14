# Applicant Cabinet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hub landing and the slider-based catalog with a profile-driven cabinet ("Мой план"), plain-language catalog presets, a tabbed university page with the user's chance, and US net-price-by-income data.

**Architecture:** The profile and "my list" live in localStorage (pure helpers in `lib/`, React hook on top). Chances come from the existing `lib/matcher.ts`, served per slug by a new `/api/plan` route. Pages reuse the existing data layer (`lib/universities.ts`, which already cleans/dedups). College Scorecard data is joined at build time into a static JSON keyed by slug.

**Tech Stack:** Next.js 15 App Router, React 19, CSS Modules, Vitest + Testing Library, Supabase (read-only anon).

**Spec:** `docs/superpowers/specs/2026-11-14-applicant-cabinet-design.md`

## Global Constraints

- Colors: base `#FFFAF2`, surface `#FFFFFF`, ink `#1D2433`, muted `#5A6275`, line `#ECE3D3`, accent `#F2C230`; dream `#7A2A63`/`#F6E3F0`, target `#9A4B07`/`#FFE7CF`, safety `#1F6B4A`/`#DFF3EA`, info `#1F4F8B`/`#E3ECFB`.
- Fonts: Unbounded (display/numbers/headings, weights 500/700) + Manrope (UI/text), both via `next/font/google` with `cyrillic`.
- Radii 16–24px, pill navigation, touch targets ≥44px, no emoji, no decorative gradients.
- Copy in Russian, plain words; every imported number shows its source and year.
- The catalog API stays gated (`/api/universities` 401 without session); the shortlist preview stays limited for guests (2 per basket).
- "My list" reuses the existing localStorage key `goaza_favs_v1` (array of slugs) so current favorites carry over.

## Review Focus

- Corrupted or old localStorage (invalid JSON, wrong shape, unknown slugs) → the cabinet falls back to an empty profile/list, never crashes. Test in Task 1.
- Profile not filled yet → `/plan` shows the onboarding call-to-action instead of empty tiles. Test in Task 4.
- A university with no deadlines → excluded from countdown/tasks, still listed. Test in Task 2.
- All deadlines already passed this cycle → countdown says the cycle is over and points to next year, not a negative number. Test in Task 2.
- `/api/plan` called with junk slugs or >30 slugs → 400 / truncated, no DB error leak. Test in Task 3.

---

### Task 1: Profile and list storage

**Files:**
- Create: `lib/profile.ts`, `lib/use-applicant.ts`
- Test: `tests/profile.test.ts`

**Interfaces:**
- Produces: `type ApplicantProfile = Profile & { grade: "9" | "10" | "11" | "12" | "gap"; name?: string; updatedAt: string }` (Profile from `lib/matcher.ts`);
  `parseProfile(raw: string | null): ApplicantProfile | null`; `serializeProfile(p: ApplicantProfile): string`;
  `parseList(raw: string | null): string[]` (slugs matching `/^[a-z0-9-]{1,160}$/`, deduped, max 60);
  `PROFILE_KEY = "goaza_profile_v1"`, `LIST_KEY = "goaza_favs_v1"`;
  hook `useApplicant(): { profile, setProfile, list, toggle(slug), has(slug), ready }` (SSR-safe; `ready` false until mounted).

- [ ] Step 1: tests — `parseProfile("not json") === null`; `parseProfile(JSON.stringify({budget:"x"})) === null`; a valid object round-trips through `serializeProfile`; `parseList('["mit-usa","mit-usa","../x"]')` → `["mit-usa"]`; `parseList(null)` → `[]`.
- [ ] Step 2: run `npx vitest run tests/profile.test.ts` → FAIL.
- [ ] Step 3: implement both files (try/catch around every storage access; hook syncs across tabs via the `storage` event).
- [ ] Step 4: run → PASS. Commit.

### Task 2: Plan engine (countdown, tasks, overall chance)

**Files:**
- Create: `lib/plan.ts`
- Test: `tests/plan.test.ts`

**Interfaces:**
- Consumes: `Match` (extended in Task 3 with `deadline: string | null`), `describeDeadline`/`pickNearestDeadline` from `lib/deadline.ts`.
- Produces: `chanceAtLeastOne(matches: Pick<Match,"chance">[]): number` = round(100 × (1 − Π(1 − chance/100)));
  `nextDeadline(matches, now): { slug: string; name: string; label: string; daysLeft: number } | null` (only `daysLeft >= 0`);
  `planTasks(profile: ApplicantProfile, matches, now): PlanTask[]` with `type PlanTask = { id: string; title: string; due: string | null; daysLeft: number | null; guide?: string; done?: boolean }`.
  Task rules: English test task if `english.test === "none"`; SAT task if `sat === null` and any US uni in list; recommendations due = nearest deadline − 42 days; personal statement due = nearest deadline − 30; transcript translation due = nearest deadline − 21; CSS Profile task per US grant uni = its deadline; government grant windows from `content/timeline.ts` `PROGRAM_WINDOWS` when list has Turkey/Hungary/Korea/Japan/China.
  `basketCounts(matches): Record<Basket, number>`.

- [ ] Step 1: tests — `chanceAtLeastOne([{chance:50},{chance:50}]) === 75`; `chanceAtLeastOne([]) === 0`; `nextDeadline` ignores passed and null deadlines and returns `null` when all passed; `planTasks` for a profile with `english.test:"none"` contains a task titled "Сдать IELTS, TOEFL или Duolingo"; recommendation task due 42 days before `2027-01-01` = `2026-11-20`.
- [ ] Step 2: run → FAIL. Step 3: implement. Step 4: run → PASS. Commit.

### Task 3: Matcher deadline + `/api/plan`

**Files:**
- Modify: `lib/matcher.ts` (add `early_deadline`, `regular_deadline` to `MatchUni`; `deadline` to `Match` via `pickNearestDeadline(...)?.raw ?? null`), `lib/universities.ts` (`fetchMatchRows` passes both deadlines; bump cache key to `match-rows-v3`)
- Create: `app/api/plan/route.ts`
- Test: `tests/matcher.test.ts` (extend), `tests/plan-api.test.ts`

**Interfaces:**
- Produces: `POST /api/plan` body `{ profile: Profile, slugs: string[] }` → `{ matches: (Match | { slug: string; name: string; excluded: string })[] }` for the requested slugs only (excluded = reason when the matcher drops it: money or English), `400` on bad body, slugs filtered by the slug regex and capped at 30. Public (chance is derived from public numbers).

- [ ] Step 1: tests — matcher returns `deadline: "2027-01-01"` for a row with regular `2027-01-01` and passed early; API: 400 on `{}`, 31 slugs → 30 processed, unknown slug omitted, unaffordable slug returns `excluded: "Не проходит по бюджету"`.
- [ ] Step 2–4: fail → implement (mock `fetchMatchRows` in the API test like `tests/universities-api.test.ts`) → pass. Commit.

### Task 4: Design tokens + cabinet page `/plan`

**Files:**
- Modify: `app/layout.tsx` (add Unbounded as `--font-display`), `app/globals.css` (new tokens from Global Constraints under `--sz-*` names)
- Create: `app/plan/page.tsx` (server shell, metadata, noindex), `components/plan/PlanClient.tsx`, `components/plan/plan.module.css`, `components/plan/BasketColumn.tsx`, `components/plan/TaskList.tsx`
- Test: `tests/plan-client.test.tsx`

**Interfaces:**
- Consumes: `useApplicant` (Task 1), `planTasks`/`nextDeadline`/`chanceAtLeastOne`/`basketCounts` (Task 2), `POST /api/plan` (Task 3), `UniversityLogo`.
- Layout (from spec): greeting "{name}, до первого дедлайна N дней" (or "Цикл подачи закрыт — готовимся к следующему"); 4 tiles (chance at least one, list size by basket, documents ready x/y from task `done`, tests with hint "+80 к SAT — и шанс вырастет" when SAT below a list uni's range); 3 basket columns with logo, country, chance bar, money badge, deadline countdown; right column: tasks for the week (checkbox state saved in localStorage key `goaza_tasks_v1`) and one matching grant from `content/grants.ts` by list countries.

- [ ] Step 1: tests (Testing Library, mock fetch) — without profile shows link "Составить мой план" to `/plan/start`; with profile + 2 slugs renders both names under the right basket headings and the tile "≈ 75%" for chances 50/50.
- [ ] Step 2–4: fail → implement → pass. Commit.

### Task 5: Onboarding `/plan/start`

**Files:**
- Create: `app/plan/start/page.tsx`, `components/plan/Onboarding.tsx`
- Modify: `app/podbor/PodborForm.tsx` → extract question fieldsets into `components/plan/ProfileFields.tsx` reused by both
- Test: `tests/onboarding.test.tsx`

**Interfaces:**
- Consumes: `ProfileFields`, `useApplicant`, `POST /api/podbor`.
- Flow: 6 steps one per screen (grade, budget, English, SAT, countries, major) with progress "Шаг k из 6"; on finish saves profile, calls `/api/podbor`, adds returned dream/target/safety slugs to the list (max 10 for subscribers, the preview 6 for guests), routes to `/plan`. `/podbor` keeps working with the shared fields.

- [ ] Step 1: test — completing 6 steps writes `goaza_profile_v1` with the chosen budget and navigates to `/plan` (mock `next/navigation`).
- [ ] Step 2–4: fail → implement → pass. Commit.

### Task 6: Catalog presets + add-to-list

**Files:**
- Modify: `lib/catalog.ts` (add `presets?: PresetId[]`), `components/dashboard/DashboardClient.tsx` (replace slider block with preset chips; keep advanced sliders under a collapsed "Точные фильтры"), `components/UniversityCard.tsx` (button "В мой план"/"В плане" using `useApplicant().toggle`)
- Test: `tests/catalog.test.ts` (extend)

**Interfaces:**
- Produces: `type PresetId = "full_grant" | "free_tuition" | "no_sat" | "need_blind" | "can_apply" | "under_10k"`; semantics: full_grant = `full_grant`; free_tuition = `tuition_num === 0`; no_sat = SAT text empty or contains "optional"/"не требуется"/"not required"; need_blind = `need_blind`; can_apply = nearest deadline ≥ today+14 days; under_10k = `tuition_num !== null && tuition_num <= 10000`. Labels: «Полный грант иностранцам», «Бесплатное обучение», «Без SAT», «Need-blind», «Успею подать», «До $10 000 в год».

- [ ] Step 1: tests — each preset filters a fixture correctly; presets combine with AND.
- [ ] Step 2–4: fail → implement → pass. Commit.

### Task 7: University page tabs + my chance

**Files:**
- Modify: `components/uni/UniProfile.tsx` (tabs Обзор · Деньги · Поступление · Сроки via `?tab=`; top strip of 5 numbers: стоимость, приём, помощь иностранцам, SAT, ближайший дедлайн), `components/uni/university.module.css`
- Create: `components/uni/MyChance.tsx` (client: reads profile, POSTs `/api/plan` for this slug, shows "Ваш шанс ≈ N% · корзина" or "Заполните профиль"; button "В мой план")
- Test: `tests/my-chance.test.tsx`

- [ ] Step 1: test — with profile shows "≈ 28%" from mocked API; without profile shows link to `/plan/start`.
- [ ] Step 2–4: fail → implement → pass. Commit.

### Task 8: Landing with cabinet preview

**Files:**
- Modify: `components/home/HomeHub.tsx`, `components/home/home.module.css`
- Create: `components/home/CabinetPreview.tsx` (static, uses real university names/numbers from `fetchLandingStats` + three featured unis from DB)

**Interfaces:** hero = headline + one CTA «Составить мой план» → `/plan/start` + preview card of the cabinet; sections: «Как это работает» (3 steps), «Что внутри» (каталог, гранты, гайды with real counts), Telegram block.

- [ ] Step 1: update `tests/landing-page.test.tsx` → expects CTA link to `/plan/start`. Step 2–4: fail → implement → pass. Commit.

### Task 9: College Scorecard (US net price by income)

**Files:**
- Create: `scripts/etl/scorecard.mjs` (reads the public "Most-Recent-Cohorts-Institution" CSV from collegescorecard.ed.gov, matches by name+state to our US slugs, writes `lib/scorecard.json`: `{ [slug]: { npt41..npt45 (net price by income band), sat_avg, grad_rate, earnings_10y, year } }`), `lib/scorecard.ts` (`scorecardFor(slug)`)
- Modify: `components/uni/UniProfile.tsx` «Деньги» tab: table «Цена после помощи по доходу семьи» (5 bands: $0–30k … $110k+), source line "College Scorecard, {year}".
- Test: `tests/scorecard.test.ts` (matching normalizer on fixtures).

- [ ] Steps: test → fail → implement → pass; run the ETL once, commit the JSON (size check < 400 KB). Commit.

---

Out of this plan (next): Wikidata enrichment for non-US universities; syncing profile/list to the Telegram account (needs `SUPABASE_SERVICE_ROLE_KEY` on Vercel).
