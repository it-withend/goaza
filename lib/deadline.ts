const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const MONTHS_UZ = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

type Lang = "ru" | "uz";

export type DeadlineInfo = {
  /** Human label: "1 ноября 2026" or the raw text when it is not an ISO date. */
  label: string;
  /** Whole days from `now` (negative = passed); null when the text is not a date. */
  daysLeft: number | null;
};

/** Parse "YYYY-MM-DD" deadlines; anything else is shown verbatim. */
export function describeDeadline(
  raw: string | null | undefined,
  now: Date = new Date(),
  lang: Lang = "ru",
): DeadlineInfo | null {
  const s = (raw ?? "").trim();
  if (!s) return null;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return { label: s, daysLeft: null };
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return { label: s, daysLeft: null };
  const due = Date.UTC(y, mo - 1, d);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const label = lang === "uz" ? `${y}-yil ${d}-${MONTHS_UZ[mo - 1]}` : `${d} ${MONTHS[mo - 1]} ${y}`;
  return { label, daysLeft: Math.round((due - today) / 86_400_000) };
}

export function daysLeftLabel(days: number, lang: Lang = "ru"): string {
  if (lang === "uz") {
    if (days < 0) return "o'tib ketdi";
    if (days === 0) return "bugun";
    return `${days} kundan keyin`;
  }
  if (days < 0) return "прошёл";
  if (days === 0) return "сегодня";
  const n = Math.abs(days) % 100;
  const n1 = n % 10;
  const word = n > 10 && n < 20 ? "дней" : n1 === 1 ? "день" : n1 >= 2 && n1 <= 4 ? "дня" : "дней";
  return `через ${days} ${word}`;
}

/** Pick the genuinely nearest upcoming deadline between early and regular. */
export function pickNearestDeadline(
  earlyRaw: string | null | undefined,
  regularRaw: string | null | undefined,
  now: Date = new Date(),
  lang: Lang = "ru",
): { raw: string; info: DeadlineInfo } | null {
  const e = earlyRaw?.trim() || "";
  const r = regularRaw?.trim() || "";
  const ei = describeDeadline(e, now, lang);
  const ri = describeDeadline(r, now, lang);
  if (!ei && !ri) return null;
  if (ei && !ri) return { raw: e, info: ei };
  if (ri && !ei) return { raw: r, info: ri };

  const eUp = ei!.daysLeft != null && ei!.daysLeft >= 0;
  const rUp = ri!.daysLeft != null && ri!.daysLeft >= 0;
  if (eUp && rUp) {
    return ri!.daysLeft! < ei!.daysLeft! ? { raw: r, info: ri! } : { raw: e, info: ei! };
  }
  if (rUp && !eUp) return { raw: r, info: ri! };
  if (eUp && !rUp) return { raw: e, info: ei! };
  return ei!.daysLeft == null && ri!.daysLeft == null ? { raw: e, info: ei! } : { raw: r, info: ri! };
}
