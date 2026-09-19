import { getSupabaseAnon } from "@/lib/supabase";

export type LandingStats = {
  total: number;
  countries: number;
  grants: number;
  byCountry: { country: string; count: number }[];
};

type LandingRow = { country: string; full_grant: boolean };

export function summarizeLandingRows(rows: LandingRow[]): LandingStats {
  const map = new Map<string, number>();
  let grants = 0;
  for (const row of rows) {
    map.set(row.country, (map.get(row.country) || 0) + 1);
    if (row.full_grant) grants += 1;
  }
  return {
    total: rows.length,
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
      .select("country,full_grant")
      .range(from, from + page - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows.push(...(data as LandingRow[]));
    if (data.length < page) break;
    from += page;
  }
  return summarizeLandingRows(rows);
}
