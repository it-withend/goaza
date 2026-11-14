const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const MONTHS_NOM = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
const MONTHS_UZ = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

type Lang = "ru" | "uz";

export type DeadlineInfo = {
  /** Human label: "1 ноября 2026" or localized text. */
  label: string;
  /** Whole days from `now` (negative = passed); null when the text is not a date. */
  daysLeft: number | null;
  /** Target academic intake year such as "2027/28", or null if text/unknown. */
  academicYear?: string | null;
};

/**
 * Northern-hemisphere intake mapping:
 * deadlines in Aug–Dec of year Y target academic year (Y+1)/(Y+2);
 * deadlines in Jan–Jul of year Y target academic year Y/(Y+1).
 */
export function academicYearForDate(y: number, m: number): string {
  const start = m >= 8 ? y + 1 : y;
  return `${start}/${String((start + 1) % 100).padStart(2, "0")}`;
}

export function defaultIntakeYear(now: Date = new Date()): string {
  return academicYearForDate(now.getUTCFullYear(), now.getUTCMonth() + 1);
}

function translateDeadlineText(s: string, lang: Lang): string {
  const l = s.trim().toLowerCase();
  const t = (ru: string, uz: string) => (lang === "uz" ? uz : ru);
  if (/^rolling$/.test(l)) return t("Круглогодичный приём (Rolling)", "Yil davomida qabul (Rolling)");
  if (/зависит от программы/.test(l)) return t("Зависит от программы", "Dasturga bog'liq");
  if (/deadlines may vary|different for each course/.test(l)) return t("Зависит от программы — смотрите сайт вуза", "Dasturga bog'liq — universitet saytidan qarang");
  if (/usually until august 30/.test(l)) return t("Обычно до 30 августа", "Odatda 30-avgustgacha");
  if (/^every may\/october$/.test(l)) return t("Два набора в год: май и октябрь", "Yiliga ikki qabul: may va oktabr");
  if (/^nov to dec$/.test(l)) return t("ноябрь — декабрь", "noyabr — dekabr");
  if (/^april to may$/.test(l)) return t("апрель — май", "aprel — may");
  const monthIdx = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].indexOf(l);
  if (monthIdx >= 0) return lang === "uz" ? MONTHS_UZ[monthIdx] : MONTHS_NOM[monthIdx];
  return s;
}

/** Parse "YYYY-MM-DD" deadlines; humanize known text deadlines. */
export function describeDeadline(
  raw: string | null | undefined,
  now: Date = new Date(),
  lang: Lang = "ru",
): DeadlineInfo | null {
  const s = (raw ?? "").trim();
  if (!s) return null;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) {
    return {
      label: translateDeadlineText(s, lang),
      daysLeft: null,
      academicYear: defaultIntakeYear(now),
    };
  }
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return { label: s, daysLeft: null, academicYear: null };
  const due = Date.UTC(y, mo - 1, d);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const label = lang === "uz" ? `${y}-yil ${d}-${MONTHS_UZ[mo - 1]}` : `${d} ${MONTHS[mo - 1]} ${y}`;
  return {
    label,
    daysLeft: Math.round((due - today) / 86_400_000),
    academicYear: academicYearForDate(y, mo),
  };
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

/** Plain summary sentence explaining which academic year and window the deadlines cover. */
export function describeDeadlineWindow(
  earlyRaw: string | null | undefined,
  regularRaw: string | null | undefined,
  now: Date = new Date(),
  lang: Lang = "ru",
): string | null {
  const e = (earlyRaw ?? "").trim();
  const r = (regularRaw ?? "").trim();
  if (!e && !r) return null;

  const ei = describeDeadline(e, now, lang);
  const ri = describeDeadline(r, now, lang);
  const isIso = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
  const isRolling = (v: string) => /^rolling$/i.test(v);
  const t = (ru: string, uz: string) => (lang === "uz" ? uz : ru);

  if (isRolling(e) && isIso(r) && ri) {
    const ay = ri.academicYear ?? defaultIntakeYear(now);
    return t(
      `Приём на ${ay} уч. год: заявки принимают по мере поступления (Rolling) до ${ri.label}.`,
      `${ay} o'quv yili uchun qabul: arizalar kelib tushishi bilan (Rolling) ${ri.label}gacha qabul qilinadi.`,
    );
  }
  if ((isRolling(e) && !r) || (isRolling(r) && !e)) {
    const ay = defaultIntakeYear(now);
    return t(
      `Набор на ${ay} уч. год: круглогодичный приём (Rolling) — лучше подавать заранее.`,
      `${ay} o'quv yili uchun qabul: yil davomida (Rolling) — ertaroq topshirgan ma'qul.`,
    );
  }
  if (isIso(e) && isIso(r) && ei && ri && e !== r) {
    const ay = ri.academicYear ?? ei.academicYear ?? defaultIntakeYear(now);
    return t(
      `Подача на ${ay} уч. год: с ${ei.label} (ранний) до ${ri.label} (основной).`,
      `${ay} o'quv yili uchun hujjat topshirish: ${ei.label}dan (erta) ${ri.label}gacha (asosiy).`,
    );
  }
  const single = isIso(r) ? ri : isIso(e) ? ei : null;
  if (single) {
    const ay = single.academicYear ?? defaultIntakeYear(now);
    return t(
      `Набор на ${ay} уч. год: крайний срок подачи — до ${single.label}.`,
      `${ay} o'quv yili uchun qabul: oxirgi muddat — ${single.label}gacha.`,
    );
  }
  const fallback = ei ?? ri;
  if (!fallback) return null;
  const ay = fallback.academicYear ?? defaultIntakeYear(now);
  return t(`Ориентир на ${ay} уч. год: ${fallback.label}.`, `${ay} o'quv yili uchun mo'ljal: ${fallback.label}.`);
}
