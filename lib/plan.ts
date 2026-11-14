import { describeDeadline } from "@/lib/deadline";
import type { Basket, Match } from "@/lib/matcher";
import type { ApplicantProfile } from "@/lib/profile";

export type PlanTask = {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD) or null when the task has no fixed date. */
  due: string | null;
  daysLeft: number | null;
  guide?: string;
};

const DAY = 86_400_000;

/** Probability of at least one admission, assuming independent decisions (rounded %, capped at 95). */
export function chanceAtLeastOne(matches: Pick<Match, "chance">[]): number {
  if (!matches.length) return 0;
  const none = matches.reduce((acc, m) => acc * (1 - Math.max(0, Math.min(100, m.chance)) / 100), 1);
  // Decisions are not truly independent (same profile everywhere) — never promise near-certainty.
  return Math.min(95, Math.round(100 * (1 - none)));
}

export function basketCounts(matches: Pick<Match, "basket">[]): Record<Basket, number> {
  const out: Record<Basket, number> = { dream: 0, target: 0, safety: 0 };
  for (const m of matches) out[m.basket] += 1;
  return out;
}

type Dated = { slug: string; name: string; iso: string; label: string; daysLeft: number };

function upcoming(matches: Match[], now: Date): Dated[] {
  const out: Dated[] = [];
  for (const m of matches) {
    const d = describeDeadline(m.deadline, now);
    if (d && d.daysLeft != null && d.daysLeft >= 0 && m.deadline) {
      out.push({ slug: m.slug, name: m.name, iso: m.deadline.trim(), label: d.label, daysLeft: d.daysLeft });
    }
  }
  return out.sort((a, b) => a.daysLeft - b.daysLeft);
}

export function nextDeadline(matches: Match[], now: Date = new Date()) {
  const first = upcoming(matches, now)[0];
  return first ? { slug: first.slug, name: first.name, label: first.label, daysLeft: first.daysLeft } : null;
}

function shift(iso: string, days: number): string {
  const t = Date.parse(`${iso}T00:00:00Z`) - days * DAY;
  return new Date(t).toISOString().slice(0, 10);
}

function daysUntil(iso: string, now: Date): number {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((Date.parse(`${iso}T00:00:00Z`) - today) / DAY);
}

const GOV_COUNTRIES: Record<string, string> = {
  Turkey: "Türkiye Bursları",
  Hungary: "Stipendium Hungaricum",
  Korea: "Global Korea Scholarship",
  "South Korea": "Global Korea Scholarship",
  Japan: "MEXT",
  China: "Chinese Government Scholarship",
};

/**
 * Concrete next steps derived from the profile and the list. Dates are counted back from the
 * nearest upcoming deadline: recommendations −42 days, personal statement −30, transcripts −21.
 */
export function planTasks(
  profile: ApplicantProfile,
  matches: Match[],
  now: Date = new Date(),
  lang: "ru" | "uz" = "ru",
): PlanTask[] {
  const tr = (ru: string, uz: string) => (lang === "uz" ? uz : ru);
  const tasks: PlanTask[] = [];
  const dated = upcoming(matches, now);
  const first = dated[0];
  const at = (id: string, title: string, iso: string | null, guide?: string) =>
    tasks.push({ id, title, due: iso, daysLeft: iso ? daysUntil(iso, now) : null, ...(guide ? { guide } : {}) });

  if (profile.english.test === "none") at("english", tr("Сдать IELTS, TOEFL или Duolingo", "IELTS, TOEFL yoki Duolingo topshirish"), first ? shift(first.iso, 60) : null, "testy");
  if (profile.sat == null && matches.some((m) => m.country === "USA")) {
    at("sat", tr("Сдать SAT — он помогает в вузах США", "SAT topshirish — AQSH universitetlarida yordam beradi"), first ? shift(first.iso, 50) : null, "testy");
  }
  if (first) {
    at("recommendations", tr("Попросить 2 рекомендации у учителей", "O'qituvchilardan 2 ta tavsiyanoma so'rash"), shift(first.iso, 42), "rekomendacii");
    at("statement", tr("Черновик personal statement", "Personal statement qoralamasi"), shift(first.iso, 30), "esse");
    at("transcripts", tr("Перевести оценки 9–11 классов", "9–11-sinf baholarini tarjima qilish"), shift(first.iso, 21), "dokumenty");
  }
  for (const d of dated) {
    const m = matches.find((x) => x.slug === d.slug);
    if (m?.country === "USA" && m.money === "grant") at(`css-${m.slug}`, tr(`CSS Profile для ${m.name}`, `${m.name} uchun CSS Profile`), d.iso, "finansovaya-pomoshch");
  }
  for (const d of dated) at(`apply-${d.slug}`, tr(`Подать заявку в ${d.name}`, `${d.name} ga ariza topshirish`), d.iso);

  const programs = new Set(matches.map((m) => GOV_COUNTRIES[m.country]).filter(Boolean));
  for (const p of programs) at(`gov-${p}`, tr(`Подать на ${p}`, `${p} ga ariza topshirish`), null, "besplatnoe-obuchenie");

  return tasks.sort((a, b) => {
    if (a.due && b.due) return a.due.localeCompare(b.due);
    if (a.due) return -1;
    if (b.due) return 1;
    return 0;
  });
}
