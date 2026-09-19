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
  sort?: "name" | "grant" | "rate" | "tuition" | "aid";
  limit?: number;
};

export async function fetchUniversities(query: UniQuery = {}): Promise<University[]> {
  const sb = getSupabaseAnon();
  let q = sb.from("universities").select("*");

  if (query.country) q = q.eq("country", query.country);
  if (query.grantOnly) q = q.eq("full_grant", true);
  if (query.needBlind) q = q.eq("need_blind", true);
  if (query.tuitionMax != null && Number.isFinite(query.tuitionMax)) {
    // Active tuition filter: unknown tuition fails out
    q = q.not("tuition_num", "is", null).lte("tuition_num", query.tuitionMax);
  }
  if (query.aidMin != null && query.aidMin > 0) {
    q = q.or(`full_grant.eq.true,aid_num.gte.${query.aidMin}`);
  }
  if (query.rateMax != null && query.rateMax < 100) {
    q = q.not("rate_num", "is", null).lte("rate_num", query.rateMax);
  }
  if (query.inst && query.inst.length) {
    // AND across tags: contains all
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
      q = q.order("aid_num", { ascending: false, nullsFirst: false }).order("name");
      break;
    default:
      q = q.order("country").order("name");
  }

  q = q.limit(query.limit ?? 2000);

  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data || []) as University[];
}

export async function fetchBrowseUniversities(): Promise<University[]> {
  return fetchUniversities({ sort: "name", limit: 2000 });
}

export async function fetchUniversityBySlug(slug: string): Promise<University | null> {
  const sb = getSupabaseAnon();
  const { data, error } = await sb.from("universities").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as University | null) ?? null;
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

export function computeMeta(unis: University[]) {
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
    for (const t of u.inst_tags || []) inst.set(t, (inst.get(t) || 0) + 1);
    for (const t of u.aid_types || []) {
      const key = t.trim();
      if (key) aidTypes.set(key, (aidTypes.get(key) || 0) + 1);
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
