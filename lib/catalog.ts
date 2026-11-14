import { describeDeadline, pickNearestDeadline } from "@/lib/deadline";
import type { University } from "@/lib/types";

/**
 * Slim card model shipped to the dashboard client. Only the fields the card and the
 * in-browser filters need — keeps the RSC payload small (≈4x smaller than University).
 */
export type CatalogUni = {
  slug: string;
  name: string;
  country: string;
  city: string | null;
  full_grant: boolean;
  need_blind: boolean;
  inst_tags: string[];
  aid_types: string[];
  deadline: string | null;
  tuition_display: string | null;
  tuition_num: number | null;
  acceptance_rate: string | null;
  rate_num: number | null;
  aid_max: string | null;
  aid_num: number | null;
  total_aid_millions: string | null;
  total_aid_num: number | null;
  intl_receiving_aid_pct: string | null;
  avg_aid_award: string | null;
  avg_aid_num: number | null;
  intl_aid_policy: string | null;
  lang: string | null;
  sat: string | null;
  logo: boolean;
  /** Lowercased haystack for search. */
  s: string;
};

export type PresetId = "full_grant" | "free_tuition" | "no_sat" | "need_blind" | "can_apply" | "under_10k";

/** Plain-language filters shown as chips in the catalog. */
export const PRESETS: { id: PresetId; label: string; labelUz: string }[] = [
  { id: "full_grant", label: "Полный грант иностранцам", labelUz: "Chet elliklarga to'liq grant" },
  { id: "free_tuition", label: "Бесплатное обучение", labelUz: "Bepul ta'lim" },
  { id: "no_sat", label: "Без SAT", labelUz: "SAT siz" },
  { id: "need_blind", label: "Need-blind", labelUz: "Need-blind" },
  { id: "can_apply", label: "Успею подать", labelUz: "Topshirishga ulguraman" },
  { id: "under_10k", label: "До $10 000 в год", labelUz: "Yiliga $10 000 gacha" },
];

export function presetLabel(pr: { label: string; labelUz: string }, lang: "ru" | "uz"): string {
  return lang === "uz" ? pr.labelUz : pr.label;
}

const NO_SAT = /optional|не требуется|not required|test[- ]?blind|не нужен/i;

export function matchesPreset(u: CatalogUni, id: PresetId, now: Date): boolean {
  switch (id) {
    case "full_grant":
      return u.full_grant;
    case "free_tuition":
      return u.tuition_num === 0;
    case "no_sat":
      return !u.sat || !u.sat.trim() || NO_SAT.test(u.sat);
    case "need_blind":
      return u.need_blind;
    case "can_apply": {
      const d = describeDeadline(u.deadline, now);
      return Boolean(d && d.daysLeft != null && d.daysLeft >= 14);
    }
    case "under_10k":
      return u.tuition_num != null && u.tuition_num <= 10000;
  }
}

export type CatalogFilters = {
  presets?: PresetId[];
  q?: string;
  country?: string;
  grantOnly?: boolean;
  needBlind?: boolean;
  hasIntlAid?: boolean;
  urgentDeadline?: boolean;
  favSlugs?: Set<string> | string[];
  tuitionMax?: number;
  aidMin?: number;
  rateMax?: number;
  inst?: string[];
  aidTypes?: string[];
  sort?: "name" | "grant" | "intl_aid" | "intl_avg" | "rate" | "tuition" | "aid" | string;
};

function list(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      /* comma separated */
    }
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

function shortLang(v: string | null): string | null {
  const s = (v ?? "").replace(/\s+/g, " ").trim();
  if (!s) return null;
  return s.length > 70 ? `${s.slice(0, 67).trimEnd()}…` : s;
}

/** Parses e.g. "$7.7m" -> 7.7 (USD millions) or "$500k" -> 0.5 or "$2,500,000" -> 2.5. */
export function parseAidMillions(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const s = raw.replace(/,/g, "").trim();
  const m = s.match(/\$?\s*(\d+(?:\.\d+)?)\s*([mkb])?/i);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n) || n <= 0) return null;
  const unit = (m[2] || "").toLowerCase();
  if (unit === "b") return n * 1000;
  if (unit === "m") return n;
  if (unit === "k") return n / 1000;
  return n >= 1000 ? n / 1_000_000 : n;
}

/** Parses currency string like "$31,303" -> 31303. */
export function parseCurrencyAmount(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const m = raw.replace(/,/g, "").match(/\$?\s*(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

export function toCatalogUni(u: University, hasLogo: boolean): CatalogUni {
  // search_text already holds name/country/tuition; only add what it may lack.
  const searchText = ((u as { search_text?: string }).search_text || "").toLowerCase();
  const extra = [u.name, u.city, u.country]
    .filter((x): x is string => Boolean(x))
    .map((x) => x.toLowerCase())
    .filter((x) => !searchText.includes(x));
  const haystack = [searchText, ...extra].filter(Boolean).join(" ");
  const nextDeadline = pickNearestDeadline(u.early_deadline, u.regular_deadline)?.raw ?? null;

  return {
    slug: u.slug,
    name: u.name,
    country: u.country,
    city: u.city,
    full_grant: Boolean(u.full_grant),
    need_blind: Boolean(u.need_blind),
    inst_tags: list(u.inst_tags),
    aid_types: list(u.aid_types),
    deadline: nextDeadline,
    tuition_display: u.tuition_display,
    tuition_num: u.tuition_num,
    acceptance_rate: u.acceptance_rate,
    rate_num: u.rate_num,
    aid_max: u.aid_max,
    aid_num: u.aid_num,
    total_aid_millions: u.total_aid_millions || null,
    total_aid_num: parseAidMillions(u.total_aid_millions),
    intl_receiving_aid_pct: u.intl_receiving_aid_pct || null,
    avg_aid_award: u.avg_aid_award || null,
    avg_aid_num: parseCurrencyAmount(u.avg_aid_award),
    intl_aid_policy: u.intl_aid_policy || null,
    lang: shortLang(u.lang),
    sat: u.sat ? u.sat.slice(0, 80) : null,
    logo: hasLogo,
    s: haystack,
  };
}

const byName = (a: CatalogUni, b: CatalogUni) => a.name.localeCompare(b.name);
const nullsLast = (a: number | null, b: number | null, dir: 1 | -1) => {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return (a - b) * dir;
};

/** Same semantics as the old PostgREST query in lib/universities.ts, but in memory. */
export function filterCatalog(all: CatalogUni[], f: CatalogFilters, now = new Date()): CatalogUni[] {
  const terms = (f.q || "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  const inst = f.inst || [];
  const aidTypes = f.aidTypes || [];
  const favSet = f.favSlugs
    ? f.favSlugs instanceof Set
      ? f.favSlugs
      : new Set(f.favSlugs)
    : null;
  const presets = f.presets || [];
  const out = all.filter((u) => {
    if (presets.length && !presets.every((p) => matchesPreset(u, p, now))) return false;
    if (f.country && u.country !== f.country) return false;
    if (f.grantOnly && !u.full_grant) return false;
    if (f.needBlind && !u.need_blind) return false;
    if (f.hasIntlAid && u.total_aid_num == null && u.avg_aid_num == null) return false;
    if (f.urgentDeadline) {
      const info = describeDeadline(u.deadline, now);
      if (!info || info.daysLeft == null || info.daysLeft < 0 || info.daysLeft > 60) return false;
    }
    if (favSet && !favSet.has(u.slug)) return false;
    if (f.tuitionMax != null && Number.isFinite(f.tuitionMax)) {
      if (u.tuition_num == null || u.tuition_num > f.tuitionMax) return false;
    }
    if (
      f.aidMin != null &&
      f.aidMin > 0 &&
      !(
        u.full_grant ||
        (u.aid_num != null && u.aid_num >= f.aidMin) ||
        (u.avg_aid_num != null && u.avg_aid_num >= f.aidMin)
      )
    ) {
      return false;
    }
    if (f.rateMax != null && f.rateMax < 100 && (u.rate_num == null || u.rate_num > f.rateMax)) return false;
    if (inst.length && !inst.every((t) => u.inst_tags.includes(t))) return false;
    if (aidTypes.length && !aidTypes.every((t) => u.aid_types.includes(t))) return false;
    for (const t of terms) if (!u.s.includes(t)) return false;
    return true;
  });

  switch (f.sort) {
    case "grant":
      return out.sort((a, b) => Number(b.full_grant) - Number(a.full_grant) || byName(a, b));
    case "intl_aid":
      return out.sort(
        (a, b) =>
          nullsLast(a.total_aid_num, b.total_aid_num, -1) ||
          nullsLast(a.avg_aid_num, b.avg_aid_num, -1) ||
          nullsLast(a.aid_num, b.aid_num, -1) ||
          Number(b.full_grant) - Number(a.full_grant) ||
          byName(a, b),
      );
    case "intl_avg":
      return out.sort(
        (a, b) =>
          nullsLast(a.avg_aid_num, b.avg_aid_num, -1) ||
          nullsLast(a.total_aid_num, b.total_aid_num, -1) ||
          nullsLast(a.aid_num, b.aid_num, -1) ||
          Number(b.full_grant) - Number(a.full_grant) ||
          byName(a, b),
      );
    case "rate":
      return out.sort((a, b) => nullsLast(a.rate_num, b.rate_num, 1) || byName(a, b));
    case "tuition":
      return out.sort((a, b) => nullsLast(a.tuition_num, b.tuition_num, 1) || byName(a, b));
    case "aid":
      return out.sort((a, b) => nullsLast(a.aid_num, b.aid_num, -1) || byName(a, b));
    default:
      return out.sort(byName);
  }
}
