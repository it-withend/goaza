const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

export type DeadlineInfo = {
  /** Human label: "1 ноября 2026" or the raw text when it is not an ISO date. */
  label: string;
  /** Whole days from `now` (negative = passed); null when the text is not a date. */
  daysLeft: number | null;
};

/** Parse "YYYY-MM-DD" deadlines; anything else is shown verbatim. */
export function describeDeadline(raw: string | null | undefined, now: Date = new Date()): DeadlineInfo | null {
  const s = (raw ?? "").trim();
  if (!s) return null;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return { label: s, daysLeft: null };
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return { label: s, daysLeft: null };
  const due = Date.UTC(y, mo - 1, d);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return { label: `${d} ${MONTHS[mo - 1]} ${y}`, daysLeft: Math.round((due - today) / 86_400_000) };
}

export function daysLeftLabel(days: number): string {
  if (days < 0) return "прошёл";
  if (days === 0) return "сегодня";
  const n = Math.abs(days) % 100;
  const n1 = n % 10;
  const word = n > 10 && n < 20 ? "дней" : n1 === 1 ? "день" : n1 >= 2 && n1 <= 4 ? "дня" : "дней";
  return `через ${days} ${word}`;
}
