import { pickNearestDeadline } from "@/lib/deadline";

/**
 * Shortlist builder: sorts universities into dream / target / safety for one applicant.
 * Pure and deterministic — heuristics are documented inline so they can be tuned.
 */

export type EnglishTest = "ielts" | "toefl" | "duolingo" | "none";
export type Grades = "excellent" | "good" | "average";

export type Profile = {
  /** What the family can pay per year, USD. */
  budget: number;
  countries: string[];
  english: { test: EnglishTest; score: number | null };
  sat: number | null;
  grades: Grades;
  major: string;
};

export type MatchUni = {
  slug: string;
  name: string;
  country: string;
  city: string | null;
  tuition_num: number | null;
  rate_num: number | null;
  full_grant: boolean;
  aid_num: number | null;
  need_blind: boolean;
  lang: string | null;
  sat: string | null;
  majors: string | null;
  logo?: boolean;
  early_deadline?: string | null;
  regular_deadline?: string | null;
};

export type Basket = "dream" | "target" | "safety";
export type Money = "grant" | "pay" | "partial";

export type Match = {
  slug: string;
  name: string;
  country: string;
  city: string | null;
  logo: boolean;
  basket: Basket;
  money: Money;
  /** Nearest upcoming deadline (ISO or free text), null when unknown. */
  deadline: string | null;
  chance: number;
  reasons: string[];
};

/** Rough IELTS equivalent of a TOEFL / Duolingo score. */
export function ieltsEquivalent(test: EnglishTest, score: number | null): number | null {
  if (score == null || test === "none") return null;
  if (test === "ielts") return score;
  const table: [number, number][] =
    test === "toefl"
      ? [[110, 8], [102, 7.5], [94, 7], [79, 6.5], [60, 6], [46, 5.5]]
      : [[140, 8], [130, 7.5], [120, 7], [110, 6.5], [95, 6], [80, 5.5]];
  for (const [min, band] of table) if (score >= min) return band;
  return 5;
}

/** Minimum IELTS band mentioned in free-text requirements ("IELTS 6.5", "7.0", "87/120 IBT ..."). */
export function requiredIelts(lang: string | null): number | null {
  if (!lang) return null;
  const s = lang.toLowerCase();
  const ielts = s.match(/ie?lts[^0-9]{0,15}(\d(?:[.,]\d)?)/);
  if (ielts) return Number(ielts[1].replace(",", "."));
  const bare = s.match(/(?:^|[^\d])([4-8](?:[.,][05])?)(?:\s*(?:score|overall|band))?(?:$|[^\d])/);
  if (bare) {
    const n = Number(bare[1].replace(",", "."));
    if (n >= 4 && n <= 9) return n;
  }
  const toefl = s.match(/(\d{2,3})\s*(?:\/\s*120)?\s*(?:ibt|toefl)/) || s.match(/toefl[^0-9]{0,10}(\d{2,3})/);
  if (toefl) return ieltsEquivalent("toefl", Number(toefl[1]));
  return null;
}

/** Middle-50% SAT band from text like "1450-1550" or "Reading&Writing 700-760, Math 750-800". */
export function satRange(sat: string | null): { low: number; high: number } | null {
  if (!sat) return null;
  const pairs = [...sat.matchAll(/(\d{3,4})\s*[-–]\s*(\d{3,4})/g)].map((m) => [Number(m[1]), Number(m[2])]);
  if (pairs.length >= 2 && pairs.every(([a, b]) => a <= 800 && b <= 800)) {
    return { low: pairs[0][0] + pairs[1][0], high: pairs[0][1] + pairs[1][1] };
  }
  if (pairs.length && pairs[0][0] >= 400) return { low: pairs[0][0], high: pairs[0][1] };
  const single = sat.match(/\b(1[0-6]\d{2}|[89]\d{2})\b/);
  if (single) return { low: Number(single[1]), high: Number(single[1]) + 100 };
  return null;
}

const GRADE_FACTOR: Record<Grades, number> = { excellent: 1.15, good: 1, average: 0.7 };

function moneyFor(u: MatchUni, p: Profile): Money | null {
  const cost = u.tuition_num;
  if (u.full_grant) return "grant";
  if (cost != null && cost <= p.budget) return "pay";
  if (cost != null && u.aid_num != null && cost - u.aid_num <= p.budget) return "partial";
  return null;
}

/** Required IELTS band when the applicant's score is below it, else null. */
function englishGap(u: MatchUni, userIelts: number | null): number | null {
  const req = requiredIelts(u.lang);
  return req != null && userIelts != null && userIelts + 0.001 < req ? req : null;
}

/** Why the matcher drops a university for this profile (Russian, user-facing), or null. */
export function exclusionReason(u: MatchUni, p: Profile, lang: "ru" | "uz" = "ru"): string | null {
  if (!moneyFor(u, p)) return lang === "uz" ? "Byudjetga to'g'ri kelmaydi" : "Не проходит по бюджету";
  const gap = englishGap(u, ieltsEquivalent(p.english.test, p.english.score));
  if (gap != null) return lang === "uz" ? `Ingliz tili yuqoriroq kerak: IELTS ${gap}` : `Нужен английский выше: IELTS ${gap}`;
  return null;
}

export function matchUniversities(all: MatchUni[], p: Profile, lang: "ru" | "uz" = "ru"): Match[] {
  const tr = (ru: string, uz: string) => (lang === "uz" ? uz : ru);
  const userIelts = ieltsEquivalent(p.english.test, p.english.score);
  const majorTerms = p.major
    .toLowerCase()
    .split(/[,;/]|\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 2);
  const out: Match[] = [];
  const fitBySlug = new Map<string, number>();

  for (const u of all) {
    if (p.countries.length && !p.countries.includes(u.country)) continue;
    const reasons: string[] = [];

    // 1) Money first: a school the family cannot pay for is not an option.
    const money = moneyFor(u, p);
    if (!money) continue;
    const cost = u.tuition_num;
    if (money === "grant") reasons.push(tr("Полный грант для иностранцев", "Chet elliklar uchun to'liq grant"));
    if (money === "pay") reasons.push(cost === 0 ? tr("Бесплатное обучение", "Bepul ta'lim") : tr("Укладывается в ваш бюджет", "Byudjetingizga mos keladi"));
    if (money === "partial") reasons.push(tr("С частичной помощью укладывается в бюджет", "Qisman yordam bilan byudjetga mos keladi"));

    // 2) English requirement is a hard filter when both sides are known.
    if (englishGap(u, userIelts) != null) continue;

    // 3) Chance estimate (%), starting from the published acceptance rate.
    // Unknown rate: assume a selective school rather than an easy one.
    let chance = u.rate_num ?? (u.country === "USA" ? 25 : 35);
    if (u.rate_num == null) reasons.push(tr("Процент приёма неизвестен — оценка осторожная", "Qabul foizi noma'lum — baho ehtiyotkor"));
    const needsAid = money === "grant" && p.budget < 20000;
    if (needsAid && u.country === "USA" && !u.need_blind) {
      // US need-aware colleges admit far fewer internationals who ask for full aid.
      chance *= 0.5;
      reasons.push(tr("Need-aware: просьба о помощи снижает шансы", "Need-aware: yordam so'rash imkoniyatni pasaytiradi"));
    } else if (needsAid && u.country !== "USA") {
      // Outside the US a full grant is a separate merit/government contest with few places:
      // being admitted is not the same as getting the money.
      chance *= 0.35;
      reasons.push(tr("Грант конкурсный: получить его сложнее, чем поступить", "Grant tanlov asosida: uni olish o'qishga kirishdan qiyinroq"));
    }
    const range = satRange(u.sat);
    if (range && p.sat != null) {
      if (p.sat >= range.high) chance *= 1.4;
      else if (p.sat < range.low) chance *= 0.6;
      if (p.sat >= range.low) reasons.push(tr(`SAT ${p.sat} в диапазоне поступивших`, `SAT ${p.sat} qabul qilinganlar oralig'ida`));
    }
    chance *= GRADE_FACTOR[p.grades];
    chance = Math.max(1, Math.min(95, Math.round(chance)));

    let fit = 0;
    if (majorTerms.length && u.majors) {
      const m = u.majors.toLowerCase();
      if (majorTerms.some((t) => m.includes(t))) {
        fit = 1;
        reasons.push(tr("Сильное направление по вашей специальности", "Mutaxassisligingiz bo'yicha kuchli yo'nalish"));
      }
    }

    const basket: Basket = chance < 15 ? "dream" : chance < 45 ? "target" : "safety";
    out.push({
      slug: u.slug,
      name: u.name,
      country: u.country,
      city: u.city,
      logo: Boolean(u.logo),
      basket,
      money,
      chance,
      deadline: pickNearestDeadline(u.early_deadline, u.regular_deadline)?.raw ?? null,
      reasons: reasons.slice(0, 3),
    });
    fitBySlug.set(u.slug, fit);
  }

  const moneyRank: Record<Money, number> = { grant: 0, pay: 1, partial: 2 };
  return out.sort((a, b) => {
    const fa = fitBySlug.get(a.slug) ?? 0;
    const fb = fitBySlug.get(b.slug) ?? 0;
    return fb - fa || moneyRank[a.money] - moneyRank[b.money] || b.chance - a.chance || a.name.localeCompare(b.name);
  });
}

export function shortlist(matches: Match[], perBasket = 8) {
  const pick = (b: Basket) => matches.filter((m) => m.basket === b);
  const dream = pick("dream");
  const target = pick("target");
  const safety = pick("safety");
  return {
    counts: { dream: dream.length, target: target.length, safety: safety.length },
    dream: dream.slice(0, perBasket),
    target: target.slice(0, perBasket),
    safety: safety.slice(0, perBasket),
  };
}
