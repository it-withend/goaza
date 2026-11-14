import data from "@/lib/scorecard.json";
import type { ScorecardEntry } from "@/lib/scorecard-match";

const TABLE = data as unknown as Record<string, ScorecardEntry> & { _meta: { source: string; fetched: string } };

export const SCORECARD_META = TABLE._meta;

export const INCOME_BANDS = ["до $30 000", "$30–48 тыс.", "$48–75 тыс.", "$75–110 тыс.", "больше $110 тыс."];

/** College Scorecard numbers for one of our US universities, or null. */
export function scorecardFor(slug: string): ScorecardEntry | null {
  if (slug === "_meta") return null;
  return TABLE[slug] ?? null;
}
