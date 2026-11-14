# Applicant cabinet ("Мой план") — design

## Why
Users found the hub landing "half a site" and the catalog filters unclear. Competitors that work
(1609plus, CollegeVine, BigFuture) are built around *the applicant*: a profile, a personal list,
deadlines and next steps. Studyaza's niche is families without money: grants and free study first.

## Decisions (agreed)
- **Approach A — personal cabinet.** A short profile questionnaire drives everything.
- **Look: mix of mockups 1 ("Свет и золото") and 3 ("Тетрадь абитуриента")**
  (canvas: claude.ai/artifact/GxZPBDNfLofDG14WkT35eQ). Light warm base, clear structure of 1;
  big numbers, colored basket tiles and "что делать дальше" hints of 3. Must not feel bare:
  real logos, per-university chance bar, deadline countdown, per-university document progress.

## Screens
1. **Landing** — first screen shows a live preview of the cabinet; one CTA "Составить мой план".
   Below: how it works (3 steps), what's inside (catalog, grants, guides), real numbers from the DB.
2. **Onboarding (6 questions)** — class, family budget, English, SAT, countries, major.
   Works without login; the result is saved and the subscription unlocks the full list.
3. **Cabinet `/plan`** — greeting + days to the nearest deadline; tiles: chance to get into at
   least one with a grant, list size by basket, documents ready, test scores with a hint;
   "Мой список" in three baskets (dream / target / safety); tasks for the week with due dates;
   matching grant with "добавить в план".
4. **Catalog** — plain-language presets instead of raw sliders: «Полный грант иностранцам»,
   «Бесплатное обучение», «Без SAT», «Need-blind», «Успею подать», «До $10 000 в год»;
   each card shows *my* chance and money type; one-click "в мой список".
5. **University page** — tabs (Обзор · Деньги · Поступление · Сроки), top strip of 5 key numbers,
   my chance from the profile, net price by family income (US), add to list / add deadline.

## Visual system
- Base `#FFFAF2` (warm paper), surfaces `#FFFFFF`, ink `#1D2433`, muted `#5A6275`, line `#ECE3D3`.
- Accent gold `#F2C230` (CTA, progress); basket colors: dream `#7A2A63` on `#F6E3F0`,
  target `#9A4B07` on `#FFE7CF`, safety `#1F6B4A` on `#DFF3EA`; info `#1F4F8B` on `#E3ECFB`.
- Type: Unbounded (display numbers and headings), Manrope (UI and text). Cyrillic-capable.
- Radii 16–24 px, pill nav; no gradients-as-decoration, no emoji.

## Data
- Profile + "my list" + task state: stored in the browser (localStorage) for the MVP, tied to the
  Telegram session later (needs a service-role key on Vercel for server writes).
- New sources: **College Scorecard** (US, public, free bulk CSV) for net price by family income,
  SAT ranges, graduation rate; **Wikidata** for non-US basics (founded, students, city, website).
  Every imported number keeps its source and year.

## Non-goals (for now)
AI essay review, payments, a native app.
