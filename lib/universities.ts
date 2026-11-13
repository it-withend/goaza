import { unstable_cache } from "next/cache";
import { parseAidMillions, parseCurrencyAmount, toCatalogUni, type CatalogUni } from "@/lib/catalog";
import { hasLogo } from "@/lib/logos";
import {
  canonicalSlug,
  cleanAndDeduplicateUniversities,
  DUPLICATE_SLUG_MAP,
  normalizeUniversityRow,
} from "@/lib/university-clean";
import { getSupabaseAnon } from "./supabase";
import type { University } from "./types";

export type UniQuery = {
  q?: string;
  country?: string;
  grantOnly?: boolean;
  needBlind?: boolean;
  tuitionMax?: number;
  aidMin?: number;
  rateMax?: number;
  inst?: string[];
  aidTypes?: string[];
  sort?: "name" | "grant" | "intl_aid" | "intl_avg" | "rate" | "tuition" | "aid";
  limit?: number;
};

const PAGE = 1000;

function applyFilters(sb: ReturnType<typeof getSupabaseAnon>, query: UniQuery) {
  let q = sb.from("universities").select("*");

  if (query.country) {
    if (query.country === "South Korea" || query.country === "Korea") {
      q = q.in("country", ["South Korea", "Korea"]);
    } else {
      q = q.eq("country", query.country);
    }
  }
  if (query.grantOnly) q = q.eq("full_grant", true);
  if (query.needBlind) q = q.eq("need_blind", true);
  if (query.tuitionMax != null && Number.isFinite(query.tuitionMax)) {
    q = q.not("tuition_num", "is", null).lte("tuition_num", query.tuitionMax);
  }
  if (query.aidMin != null && query.aidMin > 0) {
    q = q.or(`full_grant.eq.true,aid_num.gte.${query.aidMin}`);
  }
  if (query.rateMax != null && query.rateMax < 100) {
    q = q.not("rate_num", "is", null).lte("rate_num", query.rateMax);
  }
  if (query.inst && query.inst.length) {
    q = q.contains("inst_tags", query.inst);
  }
  if (query.aidTypes && query.aidTypes.length) {
    q = q.contains("aid_types", query.aidTypes);
  }
  if (query.q) {
    const terms = query.q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    for (const t of terms) {
      q = q.ilike("search_text", `%${t}%`);
    }
  }

  switch (query.sort) {
    case "grant":
      q = q.order("full_grant", { ascending: false }).order("name");
      break;
    case "rate":
      q = q.order("rate_num", { ascending: true, nullsFirst: false }).order("name");
      break;
    case "tuition":
      q = q.order("tuition_num", { ascending: true, nullsFirst: false }).order("name");
      break;
    case "aid":
    case "intl_aid":
    case "intl_avg":
      q = q.order("aid_num", { ascending: false, nullsFirst: false }).order("name");
      break;
    default:
      q = q.order("country").order("name");
  }

  return q;
}

export async function fetchUniversities(query: UniQuery = {}): Promise<University[]> {
  const sb = getSupabaseAnon();
  const hardLimit = query.limit ?? 5000;
  const all: University[] = [];
  let from = 0;

  while (from < hardLimit) {
    const to = Math.min(from + PAGE - 1, hardLimit - 1);
    const { data, error } = await applyFilters(sb, query).range(from, to);
    if (error) throw new Error(error.message);
    const page = (data || []) as University[];
    all.push(...page);
    if (page.length < PAGE) break;
    from += PAGE;
  }

  const cleaned = cleanAndDeduplicateUniversities(all);
  if (query.sort === "intl_aid" || query.sort === "intl_avg") {
    const numDesc = (a: number | null, b: number | null) =>
      a == null && b == null ? 0 : a == null ? 1 : b == null ? -1 : b - a;
    cleaned.sort((a, b) => {
      const aTotal = parseAidMillions(a.total_aid_millions);
      const bTotal = parseAidMillions(b.total_aid_millions);
      const aAvg = parseCurrencyAmount(a.avg_aid_award);
      const bAvg = parseCurrencyAmount(b.avg_aid_award);
      const primary = query.sort === "intl_aid" ? numDesc(aTotal, bTotal) : numDesc(aAvg, bAvg);
      const secondary = query.sort === "intl_aid" ? numDesc(aAvg, bAvg) : numDesc(aTotal, bTotal);
      return (
        primary ||
        secondary ||
        numDesc(a.aid_num, b.aid_num) ||
        Number(b.full_grant) - Number(a.full_grant) ||
        a.name.localeCompare(b.name)
      );
    });
  }
  return cleaned;
}

export async function fetchBrowseUniversities(): Promise<University[]> {
  return fetchUniversities({ sort: "name", limit: 5000 });
}

/**
 * Catalog for the dashboard, cached for 10 minutes across requests (the data changes
 * rarely; the session check stays per-request in the page).
 */
export const fetchCatalog = unstable_cache(
  async (): Promise<CatalogUni[]> => {
    const rows = await fetchUniversities({ sort: "name", limit: 5000 });
    return rows.map((u) => toCatalogUni(u, hasLogo(u.slug)));
  },
  ["dashboard-catalog-v3"],
  { revalidate: 600, tags: ["universities"] },
);

/** Slugs are generated as lowercase ascii + dashes; anything else is a 404, not a DB call. */
export const SLUG_RE = /^[a-z0-9-]{1,160}$/;

export async function fetchUniversityBySlug(slug: string): Promise<University | null> {
  if (typeof slug !== "string" || !SLUG_RE.test(slug)) return null;
  const target = canonicalSlug(slug);
  const aliases = [
    target,
    ...(target.endsWith("-usa") ? [target.replace(/-usa$/, "-partial-usa")] : []),
    ...Object.entries(DUPLICATE_SLUG_MAP)
      .filter(([, dst]) => dst === target)
      .map(([src]) => src),
  ];
  const sb = getSupabaseAnon();
  const { data, error } = await sb.from("universities").select("*").in("slug", aliases);
  if (error) throw new Error(error.message);
  const rows = (data || []) as University[];
  if (!rows.length) return null;
  const merged = cleanAndDeduplicateUniversities(rows);
  return merged[0] ?? normalizeUniversityRow(rows[0]);
}

export function groupByCountry(unis: University[]) {
  const map = new Map<string, University[]>();
  for (const u of unis) {
    const list = map.get(u.country) || [];
    list.push(u);
    map.set(u.country, list);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

function normalizeTagList(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String).map((t) => t.trim()).filter(Boolean);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return normalizeTagList(parsed);
    } catch {
      /* ignore */
    }
    return raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

type MetaRow = Pick<University, "country" | "full_grant" | "tuition_num" | "aid_num"> & {
  inst_tags: unknown;
  aid_types: unknown;
};

export function computeMeta(unis: MetaRow[]) {
  const countries = new Map<string, number>();
  const inst = new Map<string, number>();
  const aidTypes = new Map<string, number>();
  let grants = 0;
  let tMax = 0;
  let aMax = 0;
  for (const u of unis) {
    countries.set(u.country, (countries.get(u.country) || 0) + 1);
    if (u.full_grant) grants++;
    if (u.tuition_num && u.tuition_num > tMax) tMax = u.tuition_num;
    if (u.aid_num && u.aid_num > aMax) aMax = u.aid_num;
    for (const t of normalizeTagList(u.inst_tags)) inst.set(t, (inst.get(t) || 0) + 1);
    for (const t of normalizeTagList(u.aid_types)) {
      aidTypes.set(t, (aidTypes.get(t) || 0) + 1);
    }
  }
  return {
    total: unis.length,
    grants,
    countries: [...countries.entries()].sort((a, b) => b[1] - a[1]),
    inst: [...inst.entries()].sort((a, b) => b[1] - a[1]),
    aidTypes: [...aidTypes.entries()].sort((a, b) => b[1] - a[1]),
    tuitionMax: Math.ceil(tMax / 500) * 500 || 120000,
    aidMax: Math.ceil(aMax / 500) * 500 || 100000,
  };
}

export type UniDirectoryEntry = Pick<University, "slug" | "name" | "country" | "city" | "full_grant">;

/** Lightweight public directory (names + links only) for SEO hub pages. */
export async function fetchUniversityDirectory(): Promise<UniDirectoryEntry[]> {
  const sb = getSupabaseAnon();
  const all: University[] = [];
  for (let from = 0; from < 10000; from += PAGE) {
    const { data, error } = await sb
      .from("universities")
      .select("slug,name,country,city,full_grant")
      .order("country")
      .order("name")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const page = (data || []) as University[];
    all.push(...page);
    if (page.length < PAGE) break;
  }
  return cleanAndDeduplicateUniversities(all).map((u) => ({
    slug: u.slug,
    name: u.name,
    country: u.country,
    city: u.city,
    full_grant: Boolean(u.full_grant),
  }));
}

/** A few other universities in the same country, for internal linking. */
export async function fetchRelatedUniversities(
  country: string,
  excludeSlug: string,
  limit = 8,
): Promise<UniDirectoryEntry[]> {
  const sb = getSupabaseAnon();
  const countries =
    country === "South Korea" || country === "Korea" ? ["South Korea", "Korea"] : [country];
  const { data, error } = await sb
    .from("universities")
    .select("slug,name,country,city,full_grant")
    .in("country", countries)
    .neq("slug", excludeSlug)
    .order("full_grant", { ascending: false })
    .order("name")
    .limit(limit * 3);
  if (error) throw new Error(error.message);
  const cleaned = cleanAndDeduplicateUniversities((data || []) as University[]).filter(
    (u) => u.slug !== canonicalSlug(excludeSlug),
  );
  return cleaned.slice(0, limit).map((u) => ({
    slug: u.slug,
    name: u.name,
    country: u.country,
    city: u.city,
    full_grant: Boolean(u.full_grant),
  }));
}

/** Rows for the shortlist builder (server-only, cached 10 min). */
export const fetchMatchRows = unstable_cache(
  async () => {
    const rows = await fetchUniversities({ sort: "name", limit: 5000 });
    return rows.map((u) => ({
      slug: u.slug,
      name: u.name,
      country: u.country,
      city: u.city,
      tuition_num: u.tuition_num,
      rate_num: u.rate_num,
      full_grant: Boolean(u.full_grant),
      aid_num: u.aid_num,
      need_blind: Boolean(u.need_blind),
      lang: u.lang,
      sat: u.sat,
      majors: u.majors,
      logo: hasLogo(u.slug),
    }));
  },
  ["match-rows-v2"],
  { revalidate: 600, tags: ["universities"] },
);
