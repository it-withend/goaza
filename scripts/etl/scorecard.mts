/**
 * Join US Dept. of Education College Scorecard data to our US universities.
 *
 *   node --experimental-strip-types --env-file=.env.local scripts/etl/scorecard.mts [cacheDir]
 *
 * Uses the public api.data.gov endpoint (SCORECARD_API_KEY or DEMO_KEY — 10 requests/hour).
 * Only selective 4-year colleges (admission rate ≤ 75%) are fetched: that is our catalog.
 * Raw pages are cached in cacheDir so a rerun does not spend the rate limit.
 * Output: lib/scorecard.json — { [slug]: ScorecardEntry }, plus "_meta".
 */
import fs from "node:fs";
import path from "node:path";
import { matchScorecard, type ScorecardRow } from "../../lib/scorecard-match.ts";

const KEY = process.env.SCORECARD_API_KEY || "DEMO_KEY";
const CACHE = process.argv[2] || path.join(process.cwd(), ".superpowers", "scorecard-cache");
const NP = ["0-30000", "30001-48000", "48001-75000", "75001-110000", "110001-plus"];
const FIELDS = [
  "id",
  "school.name",
  "school.school_url",
  ...NP.map((b) => `latest.cost.net_price.private.by_income_level.${b}`),
  ...NP.map((b) => `latest.cost.net_price.public.by_income_level.${b}`),
  "latest.admissions.sat_scores.average.overall",
  "latest.completion.completion_rate_4yr_150nt",
  "latest.earnings.10_yrs_after_entry.median",
  "latest.cost.attendance.academic_year",
].join(",");

type Raw = Record<string, unknown>;
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);

async function page(n: number): Promise<{ total: number; results: Raw[] }> {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, `page-${n}.json`);
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf8"));
  const url =
    "https://api.data.gov/ed/collegescorecard/v1/schools.json" +
    `?api_key=${KEY}&school.degrees_awarded.predominant=3` +
    "&latest.admissions.admission_rate.overall__range=0..0.75" +
    `&per_page=100&page=${n}&fields=${FIELDS}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`scorecard page ${n}: HTTP ${r.status}`);
  const json = (await r.json()) as { metadata: { total: number }; results: Raw[] };
  const out = { total: json.metadata.total, results: json.results };
  fs.writeFileSync(file, JSON.stringify(out));
  return out;
}

function toRow(r: Raw): ScorecardRow {
  const priv = NP.map((b) => num(r[`latest.cost.net_price.private.by_income_level.${b}`]));
  const pub = NP.map((b) => num(r[`latest.cost.net_price.public.by_income_level.${b}`]));
  return {
    id: Number(r.id),
    name: String(r["school.name"] ?? ""),
    url: typeof r["school.school_url"] === "string" ? (r["school.school_url"] as string) : null,
    netPrice: priv.some((x) => x != null) ? priv : pub,
    sat: num(r["latest.admissions.sat_scores.average.overall"]),
    grad: num(r["latest.completion.completion_rate_4yr_150nt"]),
    earnings: num(r["latest.earnings.10_yrs_after_entry.median"]),
    coa: num(r["latest.cost.attendance.academic_year"]),
  };
}

async function ourUsUniversities() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env missing");
  const rows: { slug: string; name: string; website_domain: string | null }[] = [];
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${url}/rest/v1/universities?select=slug,name,website_domain&country=eq.USA`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` },
    });
    const p = (await r.json()) as typeof rows;
    rows.push(...p);
    if (p.length < 1000) break;
  }
  return rows;
}

const first = await page(0);
const pages = Math.ceil(first.total / 100);
const raw = [...first.results];
for (let n = 1; n < pages; n++) raw.push(...(await page(n)).results);

const unis = await ourUsUniversities();
const matched = matchScorecard(raw.map(toRow), unis);
const out = { _meta: { source: "College Scorecard, U.S. Department of Education", fetched: new Date().toISOString().slice(0, 10) }, ...matched };
const target = path.join(process.cwd(), "lib", "scorecard.json");
fs.writeFileSync(target, JSON.stringify(out));
console.log(`scorecard rows ${raw.length}, our US ${unis.length}, matched ${Object.keys(matched).length}, ${fs.statSync(target).size} bytes`);
