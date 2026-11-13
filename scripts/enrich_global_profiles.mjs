/* eslint-disable no-console */
/**
 * Multi-source enrichment for missing university profiles:
 *   1. US College Scorecard API (tuition, acceptance rate, SAT 25-75, enrollment, intl %, city, ownership)
 *   2. OpenAlex Institutions API (homepage domain verification, city, top fields -> majors, inst_type)
 *   3. Wikipedia REST API (ru.wikipedia -> en.wikipedia concise summary for missing/broken notes)
 *
 * Updates lib/university-enrichment.json cleanly (preserving existing verified patches)
 * and writes supabase/migrations/20261114_global_profile_enrichment.sql.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = process.cwd();
const ENRICH_PATH = path.join(ROOT, "lib", "university-enrichment.json");
const DOMAINS_PATH = path.join(ROOT, "scripts", "logo-output", "domains.json");
const MIGRATION_PATH = path.join(ROOT, "supabase", "migrations", "20261114_global_profile_enrichment.sql");

function loadEnv() {
  for (const f of [".env.local", ".env"]) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[2].trim()) {
        process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "").trim();
      }
    }
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !anon) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const sb = createClient(url, anon, { auth: { persistSession: false } });

const COUNTRY_ISO2 = {
  Australia: "AU",
  Austria: "AT",
  Belgium: "BE",
  Canada: "CA",
  China: "CN",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Finland: "FI",
  France: "FR",
  Germany: "DE",
  "Hong Kong": "HK",
  Hungary: "HU",
  Italy: "IT",
  Japan: "JP",
  Korea: "KR",
  "South Korea": "KR",
  Latvia: "LV",
  Netherlands: "NL",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Singapore: "SG",
  Spain: "ES",
  Sweden: "SE",
  Switzerland: "CH",
  Turkey: "TR",
  "Turkish Republic of Northern Cyprus": "CY",
  UAE: "AE",
  UK: "GB",
  USA: "US",
};

const TOPIC_MAP = {
  "computer science": "Computer Science & IT",
  "artificial intelligence": "AI & Data Science",
  engineering: "Engineering",
  "electrical and electronic engineering": "Electrical Engineering",
  "mechanical engineering": "Mechanical Engineering",
  "civil engineering": "Civil Engineering",
  medicine: "Medicine & Health",
  "public health": "Health Sciences",
  biology: "Biological Sciences",
  biochemistry: "Biochemistry & Biotech",
  chemistry: "Chemistry",
  physics: "Physics",
  mathematics: "Mathematics",
  economics: "Economics",
  business: "Business & Management",
  finance: "Finance",
  "political science": "Political Science",
  sociology: "Social Sciences",
  psychology: "Psychology",
  law: "Law",
  education: "Education",
  history: "History & Humanities",
  "environmental science": "Environmental Science",
  "materials science": "Materials Science",
  architecture: "Architecture & Design",
  "arts and humanities": "Arts & Humanities",
};

function normHost(raw) {
  if (!raw) return null;
  const h = String(raw)
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split("?")[0]
    .replace(/:\d+$/, "");
  return h || null;
}

function normName(s) {
  return String(s || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\bthe\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function formatNum(n) {
  return Number(n).toLocaleString("en-US");
}

function cleanWikiExtract(text) {
  if (!text) return null;
  const cleaned = String(text)
    .replace(/\s+/g, " ")
    .replace(/\([^)]*listen[^)]*\)/gi, "")
    .trim();
  const sentences = cleaned.match(/[^.!?]+[.!?]+/g) || [cleaned];
  const short = sentences.slice(0, 2).join(" ").trim();
  return short.length > 420 ? `${short.slice(0, 417).trimEnd()}...` : short;
}

async function fetchJson(endpoint, timeoutMs = 9000, attempt = 0) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(endpoint, {
      signal: ac.signal,
      headers: { "User-Agent": "StudyazaAtlasEnricher/1.0 (mailto:atlas@goaza.xyz)" },
    });
    if (res.status === 429 && attempt < 2) {
      await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
      return await fetchJson(endpoint, timeoutMs, attempt + 1);
    }
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function fetchAllUniversities() {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb.from("universities").select("*").range(from, from + 999);
    if (error) throw error;
    rows.push(...data);
    if (data.length < 1000) break;
  }
  return rows;
}

async function loadCollegeScorecardMap() {
  const fields = [
    "id",
    "school.name",
    "school.alias",
    "school.city",
    "school.state",
    "school.school_url",
    "school.ownership",
    "latest.admissions.admission_rate.overall",
    "latest.admissions.sat_scores.25th_percentile.critical_reading",
    "latest.admissions.sat_scores.75th_percentile.critical_reading",
    "latest.admissions.sat_scores.25th_percentile.math",
    "latest.admissions.sat_scores.75th_percentile.math",
    "latest.admissions.sat_scores.average.overall",
    "latest.cost.tuition.out_of_state",
    "latest.student.size",
    "latest.student.demographics.race_ethnicity.non_resident_alien",
  ].join(",");

  const byHost = new Map();
  const byName = new Map();

  for (let page = 0; page < 22; page++) {
    const endpoint = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=DEMO_KEY&school.degrees_awarded.predominant=3&per_page=100&page=${page}&fields=${fields}`;
    const json = await fetchJson(endpoint, 15000);
    if (!json || !Array.isArray(json.results) || json.results.length === 0) break;
    for (const item of json.results) {
      const host = normHost(item["school.school_url"]);
      if (host && !byHost.has(host)) byHost.set(host, item);
      const n1 = normName(item["school.name"]);
      if (n1 && !byName.has(n1)) byName.set(n1, item);
      if (item["school.alias"]) {
        for (const al of String(item["school.alias"]).split(/[,|/]/)) {
          const na = normName(al);
          if (na.length >= 4 && !byName.has(na)) byName.set(na, item);
        }
      }
    }
    if (json.results.length < 100) break;
  }

  console.log(`[scorecard] indexed ${byHost.size} hosts, ${byName.size} names`);
  return { byHost, byName };
}

function extractOpenAlexMajors(inst) {
  const buckets = [];
  const src = Array.isArray(inst?.topics) && inst.topics.length
    ? inst.topics
    : Array.isArray(inst?.x_concepts)
      ? inst.x_concepts
      : [];
  for (const item of src) {
    const raw = String(item.display_name || "").trim();
    const mapped = TOPIC_MAP[raw.toLowerCase()];
    const label = mapped || (item.level === 0 || item.level === 1 ? raw : null);
    if (label && !buckets.includes(label)) {
      buckets.push(label);
    }
    if (buckets.length >= 6) break;
  }
  return buckets.length >= 2 ? buckets.slice(0, 6).join(", ") : null;
}

async function fetchOpenAlexMatch(name, country, domain) {
  const iso2 = COUNTRY_ISO2[country] || null;
  const searchUrl = `https://api.openalex.org/institutions?search=${encodeURIComponent(name)}&per-page=5&mailto=atlas@goaza.xyz`;
  const data = await fetchJson(searchUrl);
  const candidates = data?.results;
  if (!Array.isArray(candidates) || candidates.length === 0) return null;

  const targetHost = normHost(domain);
  const targetName = normName(name);

  for (const c of candidates) {
    const cHost = normHost(c.homepage_url);
    if (targetHost && cHost && (cHost === targetHost || cHost.endsWith(`.${targetHost}`) || targetHost.endsWith(`.${cHost}`))) {
      return c;
    }
  }
  for (const c of candidates) {
    const cIso = String(c.country_code || "").toUpperCase();
    const cName = normName(c.display_name);
    if (iso2 && cIso === iso2 && (cName === targetName || cName.includes(targetName) || targetName.includes(cName))) {
      return c;
    }
  }
  return null;
}

async function fetchWikipediaSummary(name, country, openAlexInst) {
  // 1. Try OpenAlex wikipedia URL first (highest entity accuracy!)
  const wikiUrl = openAlexInst?.ids?.wikipedia;
  let enTitle = null;
  if (wikiUrl && /wikipedia\.org\/wiki\/(.+)$/i.test(wikiUrl)) {
    enTitle = decodeURIComponent(wikiUrl.split("/wiki/")[1]).replace(/_/g, " ");
  }

  // 2. Try Russian Wikipedia directly via search or Wikidata langlinks? Start with ru.wikipedia search if University match holds
  const tryTitles = [...new Set([enTitle, name].filter(Boolean))];
  for (const title of tryTitles) {
    const summary = await fetchJson(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/\s+/g, "_"))}`
    );
    if (summary?.type === "standard" && summary.extract && /universit|college|institut|school|academy|polytechnic|conservatory/i.test(summary.extract)) {
      // Check if ruwiki counterpart exists via MediaWiki API
      const langData = await fetchJson(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(summary.title)}&prop=langlinks&lllang=ru&format=json`
      );
      const pages = langData?.query?.pages ? Object.values(langData.query.pages) : [];
      const ruTitle = pages[0]?.langlinks?.[0]?.["*"];
      if (ruTitle) {
        const ruSummary = await fetchJson(
          `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ruTitle.replace(/\s+/g, "_"))}`
        );
        if (ruSummary?.type === "standard" && ruSummary.extract) {
          return cleanWikiExtract(ruSummary.extract);
        }
      }
      return cleanWikiExtract(summary.extract);
    }
  }

  // 3. Fallback search on en.wikipedia with country context
  const q = `${name} ${country === "USA" ? "university OR college" : country}`.trim();
  const sr = await fetchJson(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srlimit=3&format=json`
  );
  const hits = sr?.query?.search || [];
  const normTarget = normName(name);
  for (const hit of hits) {
    const nh = normName(hit.title);
    if (nh === normTarget || nh.includes(normTarget) || normTarget.includes(nh)) {
      const summary = await fetchJson(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(hit.title.replace(/\s+/g, "_"))}`
      );
      if (summary?.type === "standard" && summary.extract && /universit|college|institut|school|academy|polytechnic/i.test(summary.extract)) {
        return cleanWikiExtract(summary.extract);
      }
    }
  }
  return null;
}

async function mapPool(items, concurrency, worker) {
  let idx = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (idx < items.length) {
      const current = idx++;
      await worker(items[current], current);
    }
  });
  await Promise.all(runners);
}

function sqlEscape(val) {
  if (val == null) return "NULL";
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function main() {
  const enrich = JSON.parse(fs.readFileSync(ENRICH_PATH, "utf8"));
  const domains = JSON.parse(fs.readFileSync(DOMAINS_PATH, "utf8"));
  const rows = await fetchAllUniversities();
  console.log(`[db] loaded ${rows.length} rows`);

  const scorecard = await loadCollegeScorecardMap();

  let scHits = 0;
  let oaHits = 0;
  let wikiHits = 0;

  const needNetwork = [];

  for (const r of rows) {
    const patch = enrich[r.slug] ? { ...enrich[r.slug] } : {};
    const host = normHost(r.website_domain || domains[r.slug]);

    // Step 1: US College Scorecard fill
    if (r.country === "USA") {
      const sc = (host && scorecard.byHost.get(host)) || scorecard.byName.get(normName(r.name));
      if (sc) {
        scHits++;
        if (!r.city && !patch.city && sc["school.city"] && sc["school.state"]) {
          patch.city = `${sc["school.city"]}, ${sc["school.state"]}`;
        }
        const tuitionOut = sc["latest.cost.tuition.out_of_state"];
        if (!r.tuition_num && !r.tuition_display && !patch.tuition_num && typeof tuitionOut === "number" && tuitionOut > 1000) {
          patch.tuition_num = Math.round(tuitionOut);
          patch.tuition_display = `$${formatNum(Math.round(tuitionOut))} / год`;
        }
        const adm = sc["latest.admissions.admission_rate.overall"];
        if (r.rate_num == null && !r.acceptance_rate && patch.rate_num == null && typeof adm === "number" && adm > 0 && adm <= 1) {
          const pct = Math.round(adm * 1000) / 10;
          patch.rate_num = pct;
          patch.acceptance_rate = `${pct}%`;
        }
        const cr25 = sc["latest.admissions.sat_scores.25th_percentile.critical_reading"];
        const cr75 = sc["latest.admissions.sat_scores.75th_percentile.critical_reading"];
        const m25 = sc["latest.admissions.sat_scores.25th_percentile.math"];
        const m75 = sc["latest.admissions.sat_scores.75th_percentile.math"];
        const satAvg = sc["latest.admissions.sat_scores.average.overall"];
        if (!r.sat && !patch.sat) {
          if (cr25 && cr75 && m25 && m75) {
            patch.sat = `SAT ${cr25 + m25}–${cr75 + m75}`;
          } else if (satAvg) {
            patch.sat = `SAT ~${Math.round(satAvg)}`;
          }
        }
        const size = sc["latest.student.size"];
        if (!r.undergrad_enrollment && !patch.undergrad_enrollment && typeof size === "number" && size > 0) {
          patch.undergrad_enrollment = formatNum(Math.round(size));
          const nra = sc["latest.student.demographics.race_ethnicity.non_resident_alien"];
          if (!r.intl_undergrad_pct && !patch.intl_undergrad_pct && typeof nra === "number" && nra >= 0) {
            const pct = Math.round(nra * 1000) / 10;
            patch.intl_undergrad_pct = `${pct}%`;
            patch.intl_undergrad_count = formatNum(Math.round(size * nra));
          }
        }
        if (!r.inst_type && !patch.inst_type && sc["school.ownership"]) {
          patch.inst_type = sc["school.ownership"] === 1 ? "Public university" : "Private university";
        }
        if ((!r.inst_tags || r.inst_tags.length === 0) && (!patch.inst_tags || patch.inst_tags.length === 0) && sc["school.ownership"]) {
          patch.inst_tags = [sc["school.ownership"] === 1 ? "public" : "private"];
        }
      }
    }

    const hasPolyUError = r.slug === "city-university-of-hong-kong-hong-kong" && /\bPolyU\b/i.test(r.notes || "");
    const effectiveNotes = hasPolyUError ? null : (patch.notes || r.notes);
    const effectiveMajors = patch.majors || r.majors;
    const effectiveCity = patch.city || r.city;

    if (Object.keys(patch).length > 0) {
      enrich[r.slug] = patch;
    }

    if (!effectiveNotes || !effectiveMajors || !effectiveCity) {
      needNetwork.push({
        slug: r.slug,
        name: r.name,
        country: r.country,
        domain: host,
        needNotes: !effectiveNotes,
        needMajors: !effectiveMajors,
        needCity: !effectiveCity,
      });
    }
  }

  console.log(`[scorecard] matched ${scHits} US rows; fetching OpenAlex/Wikipedia for ${needNetwork.length} remaining rows...`);

  let done = 0;
  await mapPool(needNetwork, 2, async (item) => {
    const patch = enrich[item.slug] ? { ...enrich[item.slug] } : {};
    let oa = null;
    if (item.needCity || item.needMajors || item.needNotes) {
      oa = await fetchOpenAlexMatch(item.name, item.country, item.domain);
    }
    if (oa) {
      oaHits++;
      if (item.needCity && oa.geo?.city) {
        patch.city = oa.geo.region && item.country === "USA"
          ? `${oa.geo.city}, ${oa.geo.region}`
          : oa.geo.city;
      }
      if (item.needMajors) {
        const maj = extractOpenAlexMajors(oa);
        if (maj) patch.majors = maj;
      }
    }
    if (item.needNotes) {
      const summary = await fetchWikipediaSummary(item.name, item.country, oa);
      if (summary) {
        wikiHits++;
        patch.notes = summary;
      }
    }
    if (Object.keys(patch).length > 0) {
      enrich[item.slug] = patch;
    }
    done++;
    if (done % 50 === 0 || done === needNetwork.length) {
      console.log(`[net] progress ${done}/${needNetwork.length} (oa=${oaHits}, wiki=${wikiHits})`);
    }
    await new Promise((r) => setTimeout(r, 150));
  });

  // Sort keys cleanly and save lib/university-enrichment.json
  const sorted = Object.fromEntries(
    Object.entries(enrich).sort(([a], [b]) => a.localeCompare(b))
  );
  fs.writeFileSync(ENRICH_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8");
  console.log(`[done] wrote ${Object.keys(sorted).length} enriched entries to lib/university-enrichment.json`);

  // Also write a SQL migration for optional direct DB synchronization
  const sqlLines = [
    "-- Auto-generated global enrichment & bugfix migration (College Scorecard + OpenAlex + Wikipedia)",
    "-- Safe to re-run: only updates NULL/empty columns except fixing CityU Hong Kong PolyU mismatch.",
    "",
    "update public.universities",
    "set notes = null",
    "where slug = 'city-university-of-hong-kong-hong-kong' and notes ilike '%PolyU%';",
    "",
  ];
  for (const [slug, p] of Object.entries(sorted)) {
    const sets = [];
    if (p.city) sets.push(`city = coalesce(nullif(city, ''), ${sqlEscape(p.city)})`);
    if (p.tuition_num) sets.push(`tuition_num = coalesce(tuition_num, ${p.tuition_num})`);
    if (p.tuition_display) sets.push(`tuition_display = coalesce(nullif(tuition_display, ''), ${sqlEscape(p.tuition_display)})`);
    if (p.rate_num != null) sets.push(`rate_num = coalesce(rate_num, ${p.rate_num})`);
    if (p.acceptance_rate) sets.push(`acceptance_rate = coalesce(nullif(acceptance_rate, ''), ${sqlEscape(p.acceptance_rate)})`);
    if (p.sat) sets.push(`sat = coalesce(nullif(sat, ''), ${sqlEscape(p.sat)})`);
    if (p.undergrad_enrollment) sets.push(`undergrad_enrollment = coalesce(nullif(undergrad_enrollment, ''), ${sqlEscape(p.undergrad_enrollment)})`);
    if (p.intl_undergrad_pct) sets.push(`intl_undergrad_pct = coalesce(nullif(intl_undergrad_pct, ''), ${sqlEscape(p.intl_undergrad_pct)})`);
    if (p.intl_undergrad_count) sets.push(`intl_undergrad_count = coalesce(nullif(intl_undergrad_count, ''), ${sqlEscape(p.intl_undergrad_count)})`);
    if (p.majors) sets.push(`majors = coalesce(nullif(majors, ''), ${sqlEscape(p.majors)})`);
    if (p.notes) sets.push(`notes = coalesce(nullif(notes, ''), ${sqlEscape(p.notes)})`);
    if (sets.length > 0) {
      sqlLines.push(`update public.universities set ${sets.join(", ")} where slug = ${sqlEscape(slug)};`);
    }
  }
  fs.writeFileSync(MIGRATION_PATH, sqlLines.join("\n") + "\n", "utf8");
  console.log(`[done] wrote SQL migration ${MIGRATION_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
