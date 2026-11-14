import type { Lang } from "@/lib/i18n";
import { countryName, instLabel, type University } from "@/lib/types";

/**
 * Public, indexable slice of a university profile. Only these fields may leave the
 * server for anonymous visitors; everything else stays behind the Telegram gate.
 */
export type UniTeaser = {
  slug: string;
  name: string;
  countryRu: string;
  city: string | null;
  tuitionBand: string | null;
  acceptance: string | null;
  fullGrant: boolean;
  needBlind: boolean;
  instType: string | null;
  majors: string[];
  enrollment: string | null;
  intlPct: string | null;
  /** Labels of the gated fields that actually have data for this university. */
  locked: string[];
};

export function tuitionBand(n: number | null | undefined, lang: Lang = "ru"): string | null {
  if (n == null || !Number.isFinite(n) || n < 0) return null;
  if (lang === "uz") {
    if (n === 0) return "Bepul";
    if (n < 5000) return "yiliga $5 000 gacha";
    if (n < 15000) return "yiliga $5–15 ming";
    if (n < 30000) return "yiliga $15–30 ming";
    if (n < 50000) return "yiliga $30–50 ming";
    return "yiliga $50 mingdan";
  }
  if (n === 0) return "Бесплатно";
  if (n < 5000) return "до $5 000 / год";
  if (n < 15000) return "$5–15 тыс. / год";
  if (n < 30000) return "$15–30 тыс. / год";
  if (n < 50000) return "$30–50 тыс. / год";
  return "от $50 тыс. / год";
}

function clean(v: string | null | undefined): string | null {
  const s = (v ?? "").trim();
  return s ? s : null;
}

function instTypeOf(u: Pick<University, "inst_type" | "inst_tags">, lang: Lang = "ru"): string | null {
  const t = clean(u.inst_type);
  if (t && lang === "ru") return t;
  const tags = Array.isArray(u.inst_tags) ? u.inst_tags : [];
  const labels = tags.map((x) => instLabel(x, lang)).filter(Boolean);
  return labels.length ? labels.join(" / ") : t;
}

function majorsOf(raw: string | null): string[] {
  const s = clean(raw);
  if (!s) return [];
  return s
    .split(/[,;]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 1 && x.length < 60)
    .slice(0, 4);
}

const LOCKED_FIELDS: [keyof University, string, string][] = [
  ["tuition_display", "Точная стоимость обучения", "Aniq o'qish narxi"],
  ["aid_max", "Максимальная финансовая помощь", "Maksimal moliyaviy yordam"],
  ["avg_aid_award", "Средний размер гранта", "O'rtacha grant miqdori"],
  ["intl_aid_policy", "Политика помощи иностранцам", "Chet elliklarga yordam siyosati"],
  ["regular_deadline", "Дедлайны подачи", "Ariza dedlaynlari"],
  ["lang", "Языковые требования", "Til talablari"],
  ["sat", "SAT / экзамены", "SAT / imtihonlar"],
  ["essay", "Эссе", "Esse"],
  ["how_apply_aid", "Как подать на грант", "Grantga qanday topshiriladi"],
  ["merit_scholarship_name", "Стипендии за успеваемость", "Muvaffaqiyat stipendiyalari"],
  ["living_note", "Проживание и расходы", "Yashash va xarajatlar"],
];

export function toTeaser(u: University, lang: Lang = "ru"): UniTeaser {
  const locked = LOCKED_FIELDS.filter(([k]) => {
    const v = u[k];
    return typeof v === "string" ? v.trim() !== "" : v != null;
  }).map(([, ru, uz]) => (lang === "uz" ? uz : ru));

  return {
    slug: u.slug,
    name: u.name,
    countryRu: countryName(u.country, lang),
    city: clean(u.city),
    tuitionBand: tuitionBand(u.tuition_num, lang),
    acceptance: clean(u.acceptance_rate),
    fullGrant: Boolean(u.full_grant),
    needBlind: Boolean(u.need_blind),
    instType: instTypeOf(u, lang),
    majors: majorsOf(u.majors),
    enrollment: clean(u.undergrad_enrollment),
    intlPct: clean(u.intl_undergrad_pct),
    locked,
  };
}

/** Short factual sentence for meta description / intro copy. */
export function teaserSummary(t: UniTeaser, lang: Lang = "ru"): string {
  const parts: string[] = [];
  const place = [t.countryRu, t.city].filter(Boolean).join(", ");
  if (lang === "uz") {
    parts.push(`${t.name} — universitet (${place}).`);
    if (t.acceptance) parts.push(`Qabul foizi — ${t.acceptance}.`);
    if (t.tuitionBand) parts.push(`O'qish narxi: ${t.tuitionBand}.`);
    parts.push(
      t.fullGrant
        ? "Chet ellik talabalar uchun to'liq grant mavjud."
        : "Chet elliklar uchun to'liq grant yo'q — qisman yordamni atlasda ko'ring.",
    );
    return parts.join(" ");
  }
  parts.push(`${t.name} — университет (${place}).`);
  if (t.acceptance) parts.push(`Acceptance rate — ${t.acceptance}.`);
  if (t.tuitionBand) parts.push(`Стоимость обучения: ${t.tuitionBand}.`);
  parts.push(
    t.fullGrant
      ? "Есть полный грант для иностранных студентов."
      : "Полного гранта для иностранцев нет — смотри частичную помощь в атласе.",
  );
  return parts.join(" ");
}
