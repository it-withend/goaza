/**
 * Build-time sitemap for Google (static file in /public).
 * Avoids cold-start timeouts that cause Search Console "Couldn't fetch".
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://goaza.xyz";

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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("[sitemap] Missing Supabase env; writing core routes only");
    return [];
  }

  const sb = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const slugs = [];
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
      if (row.slug) slugs.push(row.slug);
    }
    if (data.length < page) break;
    from += page;
  }
  return slugs;
}

/** Guide slugs are read from content/guides.ts (top-level `slug:` entries of GUIDES). */
function guideSlugs() {
  const src = readFileSync(resolve(process.cwd(), "content", "guides.ts"), "utf8");
  return [...src.matchAll(/^    slug: "([a-z0-9-]+)",$/gm)].map((m) => m[1]);
}

async function main() {
  const slugs = await fetchSlugs();
  const urls = [
    urlEntry(`${SITE}/`, "1.0", "daily"),
    urlEntry(`${SITE}/start`, "0.9", "monthly"),
    urlEntry(`${SITE}/podbor`, "0.9", "monthly"),
    urlEntry(`${SITE}/grants`, "0.9", "weekly"),
    urlEntry(`${SITE}/guides`, "0.9", "weekly"),
    urlEntry(`${SITE}/deadlines`, "0.8", "monthly"),
    ...guideSlugs().map((slug) => urlEntry(`${SITE}/guides/${slug}`, "0.8", "monthly")),
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
