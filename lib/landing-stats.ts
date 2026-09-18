import { getSupabaseAnon } from "@/lib/supabase";

export type LandingStats = { total: number; countries: number; grants: number };
type LandingRow = { country: string; full_grant: boolean };

export function summarizeLandingRows(rows: LandingRow[]): LandingStats {
  return {
    total: rows.length,
    countries: new Set(rows.map((row) => row.country)).size,
    grants: rows.filter((row) => row.full_grant).length,
  };
}

export async function fetchLandingStats(): Promise<LandingStats> {
  const { data, error } = await getSupabaseAnon()
    .from("universities")
    .select("country,full_grant")
    .limit(2000);
  if (error) throw new Error(error.message);
  return summarizeLandingRows(data ?? []);
}
