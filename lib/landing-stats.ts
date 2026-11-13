import { getSupabaseAnon } from "@/lib/supabase";
import { canonicalSlug } from "@/lib/university-clean";

export type LandingStats = {
  total: number;
  countries: number;
  grants: number;
  byCountry: { country: string; count: number }[];
};

type LandingRow = { slug?: string; country: string; full_grant: boolean };

export function summarizeLandingRows(rows: LandingRow[]): LandingStats {
  const deduped: LandingRow[] = [];
  const bySlug = new Map<string, LandingRow>();
  for (const r of rows) {
    if (r.slug) {
      const country = r.country === "Korea" ? "South Korea" : r.country;
      const target = canonicalSlug(r.slug);
      const prev = bySlug.get(target);
      if (prev) {
        prev.full_grant = Boolean(prev.full_grant || r.full_grant);
      } else {
        const entry = { slug: target, country, full_grant: Boolean(r.full_grant) };
        bySlug.set(target, entry);
        deduped.push(entry);
      }
    } else {
      deduped.push({ country: r.country, full_grant: Boolean(r.full_grant) });
    }
  }

  const map = new Map<string, number>();
  let grants = 0;
  for (const row of deduped) {
    map.set(row.country, (map.get(row.country) || 0) + 1);
    if (row.full_grant) grants += 1;
  }
  return {
    total: deduped.length,
    countries: map.size,
    grants,
    byCountry: [...map.entries()]
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count),
  };
}

export async function fetchLandingStats(): Promise<LandingStats> {
  const sb = getSupabaseAnon();
  const page = 1000;
  const rows: LandingRow[] = [];
  let from = 0;
  for (;;) {
    const { data, error } = await sb
      .from("universities")
      .select("slug,country,full_grant")
      .range(from, from + page - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows.push(...(data as LandingRow[]));
    if (data.length < page) break;
    from += page;
  }
  return summarizeLandingRows(rows);
}
