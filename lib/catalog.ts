import { pickNearestDeadline } from "@/lib/deadline";
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
  lang: string | null;
  logo: boolean;
  /** Lowercased haystack for search. */
  s: string;
};

export type CatalogFilters = {
  q?: string;
  country?: string;
  grantOnly?: boolean;
  needBlind?: boolean;
  tuitionMax?: number;
  aidMin?: number;
  rateMax?: number;
  inst?: string[];
  aidTypes?: string[];
  sort?: "name" | "grant" | "rate" | "tuition" | "aid" | string;
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
    lang: shortLang(u.lang),
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
export function filterCatalog(all: CatalogUni[], f: CatalogFilters): CatalogUni[] {
  const terms = (f.q || "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  const inst = f.inst || [];
  const aidTypes = f.aidTypes || [];
  const out = all.filter((u) => {
    if (f.country && u.country !== f.country) return false;
    if (f.grantOnly && !u.full_grant) return false;
    if (f.needBlind && !u.need_blind) return false;
    if (f.tuitionMax != null && Number.isFinite(f.tuitionMax)) {
      if (u.tuition_num == null || u.tuition_num > f.tuitionMax) return false;
    }
    if (f.aidMin != null && f.aidMin > 0 && !(u.full_grant || (u.aid_num != null && u.aid_num >= f.aidMin))) {
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
