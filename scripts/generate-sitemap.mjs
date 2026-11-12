/**
 * Build-time sitemap for Google (static file in /public).
 * Avoids cold-start timeouts that cause Search Console "Couldn't fetch".
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://goaza.xyz";

function loadEnvLocal() {
  const envFile = resolve(process.cwd(), ".env.local");
  if (!existsSync(envFile)) return;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i > 0 && !line.startsWith("#")) {
      const k = line.slice(0, i).trim();
      const v = line.slice(i + 1).trim().replace(/^"|"$/g, "");
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

function loadDuplicateSlugSet() {
  const cleanFile = resolve(process.cwd(), "lib", "university-clean.ts");
  if (!existsSync(cleanFile)) return new Set();
  const src = readFileSync(cleanFile, "utf8");
  const m = src.match(/DUPLICATE_SLUG_MAP:\s*Record<string,\s*string>\s*=\s*\{([\s\S]*?)\};/);
  if (!m) return new Set();
  const set = new Set();
  for (const pair of m[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) {
    set.add(pair[1]);
  }
  return set;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc, priority, changefreq) {
  const lastmod = new Date().toISOString().slice(0, 10);
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function fetchSlugs() {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("[sitemap] Missing Supabase env; writing core routes only");
    return [];
  }

  const sb = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const duplicateSlugs = loadDuplicateSlugSet();
  const slugs = new Set();
  const page = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await sb
      .from("universities")
      .select("slug")
      .order("slug")
      .range(from, from + page - 1);
    if (error) {
      console.warn("[sitemap] Supabase error:", error.message);
      break;
    }
    if (!data?.length) break;
    for (const row of data) {
      const s = row.slug;
      if (!s) continue;
      if (duplicateSlugs.has(s) || s.endsWith("-partial-usa")) continue;
      slugs.add(s);
    }
    if (data.length < page) break;
    from += page;
  }
  return [...slugs].sort();
}

async function main() {
  const slugs = await fetchSlugs();
  const urls = [
    urlEntry(`${SITE}/`, "1.0", "daily"),
    urlEntry(`${SITE}/unis`, "0.9", "daily"),
    ...slugs.map((slug) => urlEntry(`${SITE}/unis/${slug}`, "0.7", "weekly")),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  const out = resolve(process.cwd(), "public", "sitemap.xml");
  writeFileSync(out, xml, "utf8");
  console.log(`[sitemap] Wrote ${urls.length} URLs → public/sitemap.xml`);
}

main().catch((err) => {
  console.error("[sitemap] Failed:", err);
  process.exit(1);
});
