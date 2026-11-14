/** College Scorecard (US Dept. of Education) row, trimmed to what the site shows. */
export type ScorecardRow = {
  id: number;
  name: string;
  url: string | null;
  /** Average net price by family income: $0–30k, 30–48k, 48–75k, 75–110k, 110k+. */
  netPrice: (number | null)[];
  sat: number | null;
  /** Completion within 150% of normal time, 0–1. */
  grad: number | null;
  /** Median earnings 10 years after entry, USD. */
  earnings: number | null;
  /** Cost of attendance per academic year, USD. */
  coa: number | null;
};

export type ScorecardEntry = Omit<ScorecardRow, "id" | "name" | "url"> & { id: number };

const SECOND_LEVEL = new Set(["ac", "co", "edu", "com", "org", "gov"]);

/** Registrable domain of a URL-ish string: "college.harvard.edu/x" → "harvard.edu". */
export function normalizeHost(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const host = raw
    .replace(/\\/g, "")
    .replace(/^[a-z]+:\/\//i, "")
    .split(/[/?#]/)[0]
    .toLowerCase()
    .replace(/^www\./, "");
  const parts = host.split(".").filter(Boolean);
  if (parts.length < 2) return null;
  const tld = parts[parts.length - 1];
  const sld = parts[parts.length - 2];
  const keep = tld.length === 2 && SECOND_LEVEL.has(sld) && parts.length >= 3 ? 3 : 2;
  return parts.slice(-keep).join(".");
}

const fold = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[^\x00-\x7f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\b(the|of|at|main campus)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Full host without scheme, "www." and path: "https://www.baruch.cuny.edu/x" → "baruch.cuny.edu". */
export function fullHost(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const host = raw
    .replace(/\\/g, "")
    .replace(/^[a-z]+:\/\//i, "")
    .split(/[/?#]/)[0]
    .toLowerCase()
    .replace(/^www\./, "");
  return host.includes(".") ? host : null;
}

/**
 * Join Scorecard rows to our universities. Order: exact host, then the registrable domain
 * only when a single Scorecard row has it (campuses share domains like cuny.edu, erau.edu),
 * then the exact normalized name.
 */
export function matchScorecard(
  rows: ScorecardRow[],
  unis: { slug: string; name: string; website_domain: string | null }[],
): Record<string, ScorecardEntry> {
  const byHost = new Map<string, ScorecardRow>();
  const byDomain = new Map<string, ScorecardRow[]>();
  const byName = new Map<string, ScorecardRow>();
  for (const r of rows) {
    const h = fullHost(r.url);
    if (h && !byHost.has(h)) byHost.set(h, r);
    const d = normalizeHost(r.url);
    if (d) byDomain.set(d, [...(byDomain.get(d) || []), r]);
    byName.set(fold(r.name), r);
  }
  const uniqueDomain = (d: string | null) => {
    const list = d ? byDomain.get(d) : undefined;
    return list && list.length === 1 ? list[0] : undefined;
  };
  const out: Record<string, ScorecardEntry> = {};
  for (const u of unis) {
    const h = fullHost(u.website_domain);
    const r = (h && byHost.get(h)) || uniqueDomain(normalizeHost(u.website_domain)) || byName.get(fold(u.name));
    if (!r) continue;
    const { id, netPrice, sat, grad, earnings, coa } = r;
    out[u.slug] = { id, netPrice, sat, grad, earnings, coa };
  }
  return out;
}
