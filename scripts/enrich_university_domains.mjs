/* eslint-disable no-console */
/**
 * Deterministic university website_domain enrichment from Hipo UDL.
 *
 * Usage:
 *   node scripts/enrich_university_domains.mjs --dry-run
 *   node scripts/enrich_university_domains.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY for live updates.
 * --dry-run never writes to Supabase (still needs URL+anon or service key to read rows,
 *  or set SKIP_DB=1 to only download/match against a local JSON dump — not used here).
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "scripts", "enrich_reports");
const SOURCE_URL =
  "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";

const dryRun = process.argv.includes("--dry-run");

/** Map catalog country labels → Hipo country strings (and vice versa via normalize). */
const COUNTRY_ALIASES = {
  usa: "united states",
  "united states": "united states",
  "united states of america": "united states",
  uk: "united kingdom",
  "united kingdom": "united kingdom",
  "great britain": "united kingdom",
  uae: "united arab emirates",
  "united arab emirates": "united arab emirates",
  korea: "korea, republic of",
  "south korea": "korea, republic of",
  "korea, republic of": "korea, republic of",
  "hong kong": "hong kong",
  "czech republic": "czech republic",
  "turkish republic of northern cyprus": "cyprus",
};

function normalizeName(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeCountry(value) {
  const raw = normalizeName(value);
  return COUNTRY_ALIASES[raw] || raw;
}

function normalizeDomain(raw) {
  if (!raw) return null;
  let d = String(raw).trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "").replace(/^www\./, "");
  d = d.split("/")[0].split("?")[0].split("#")[0];
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(d)) return null;
  return d;
}

function pickSingleDomain(entry) {
  const domains = Array.isArray(entry.domains) ? entry.domains : [];
  const unique = [
    ...new Set(domains.map(normalizeDomain).filter(Boolean)),
  ];
  if (unique.length === 1) return { domain: unique[0], status: "ok" };
  if (unique.length === 0) return { domain: null, status: "no_domain" };
  return { domain: null, status: "multi_domain", domains: unique };
}

function csvEscape(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  fs.writeFileSync(filePath, lines.join("\n") + "\n", "utf8");
}

async function loadSource() {
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`Failed to download UDL: ${res.status}`);
  return res.json();
}

async function loadUniversities(sb) {
  const pageSize = 1000;
  let from = 0;
  const all = [];
  for (;;) {
    const { data, error } = await sb
      .from("universities")
      .select("id,slug,name,country,website_domain")
      .order("slug")
      .range(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    all.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

function buildIndex(source) {
  /** @type {Map<string, object[]>} */
  const map = new Map();
  for (const entry of source) {
    const key = `${normalizeName(entry.name)}||${normalizeCountry(entry.country)}`;
    const list = map.get(key) || [];
    list.push(entry);
    map.set(key, list);
  }
  return map;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL");
    process.exit(1);
  }

  // Abort before updates if service role absent (dry-run may still read with anon).
  if (!dryRun && !serviceKey) {
    console.error("Abort: SUPABASE_SERVICE_ROLE_KEY is required for updates (use --dry-run to skip writes).");
    process.exit(1);
  }

  const readKey = serviceKey || anonKey;
  if (!readKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY to read universities");
    process.exit(1);
  }

  console.log(dryRun ? "Mode: dry-run (no remote writes)" : "Mode: apply updates");
  console.log("Downloading Hipo university-domains-list…");
  const source = await loadSource();
  const index = buildIndex(source);

  const sb = createClient(url, readKey, { auth: { persistSession: false } });
  const universities = await loadUniversities(sb);

  const matched = [];
  const ambiguous = [];
  const unresolved = [];

  for (const uni of universities) {
    const key = `${normalizeName(uni.name)}||${normalizeCountry(uni.country)}`;
    const hits = index.get(key) || [];

    if (hits.length === 0) {
      unresolved.push({
        slug: uni.slug,
        name: uni.name,
        country: uni.country,
        reason: "no_exact_name_country_match",
      });
      continue;
    }

    if (hits.length > 1) {
      ambiguous.push({
        slug: uni.slug,
        name: uni.name,
        country: uni.country,
        reason: "multiple_source_rows",
        domains: hits
          .flatMap((h) => (h.domains || []).map(normalizeDomain).filter(Boolean))
          .join("|"),
      });
      continue;
    }

    const pick = pickSingleDomain(hits[0]);
    if (pick.status !== "ok") {
      ambiguous.push({
        slug: uni.slug,
        name: uni.name,
        country: uni.country,
        reason: pick.status,
        domains: (pick.domains || []).join("|"),
      });
      continue;
    }

    matched.push({
      id: uni.id,
      slug: uni.slug,
      name: uni.name,
      country: uni.country,
      website_domain: pick.domain,
      previous: uni.website_domain || "",
    });
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  writeCsv(
    path.join(OUT_DIR, "matched.csv"),
    ["slug", "website_domain", "name", "country", "previous"],
    matched,
  );
  writeCsv(
    path.join(OUT_DIR, "ambiguous.csv"),
    ["slug", "name", "country", "reason", "domains"],
    ambiguous,
  );
  writeCsv(
    path.join(OUT_DIR, "unresolved.csv"),
    ["slug", "name", "country", "reason"],
    unresolved,
  );

  let updated = 0;
  if (!dryRun) {
    const writeSb = createClient(url, serviceKey, { auth: { persistSession: false } });
    const batchSize = 50;
    for (let i = 0; i < matched.length; i += batchSize) {
      const batch = matched.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (row) => {
          const { error } = await writeSb
            .from("universities")
            .update({ website_domain: row.website_domain })
            .eq("id", row.id);
          if (error) throw new Error(`${row.slug}: ${error.message}`);
          updated += 1;
        }),
      );
    }
  }

  console.log("--- enrichment summary ---");
  console.log(`total universities: ${universities.length}`);
  console.log(`exact matches: ${matched.length}`);
  console.log(`ambiguous matches: ${ambiguous.length}`);
  console.log(`unresolved matches: ${unresolved.length}`);
  console.log(`updated rows: ${dryRun ? 0 : updated}`);
  console.log(`reports: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
