#!/usr/bin/env node
/**
 * Apply fill-only updates produced by import_sources.py.
 * Needs SUPABASE_SERVICE_ROLE_KEY in .env.local (anon cannot write).
 *
 *   node scripts/etl/apply_updates.mjs <updates.json> [--dry]
 *
 * Every column is written with a PATCH filtered by `col=is.null`, so existing values are
 * never overwritten, even if the database changed after the snapshot.
 */
import fs from "node:fs";

const [file, flag] = process.argv.slice(2);
const DRY = flag === "--dry";
const env = Object.fromEntries(
  fs
    .readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    }),
);
const URL_ = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!KEY) {
  console.error("SUPABASE_SERVICE_ROLE_KEY is empty in .env.local");
  process.exit(1);
}
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" };
const updates = JSON.parse(fs.readFileSync(file, "utf8"));

async function patch(slug, filter, body) {
  if (DRY) return 204;
  const qs = `slug=eq.${encodeURIComponent(slug)}${filter ? `&${filter}` : ""}`;
  const r = await fetch(`${URL_}/rest/v1/universities?${qs}`, { method: "PATCH", headers: H, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`${slug}: ${r.status} ${await r.text()}`);
  return r.status;
}

const jobs = Object.entries(updates);
let done = 0;
let failed = 0;
async function worker() {
  while (jobs.length) {
    const [slug, u] = jobs.shift();
    try {
      for (const [col, val] of Object.entries(u)) {
        if (col === "sources") continue;
        if (col === "full_grant") await patch(slug, "full_grant=is.false", { full_grant: true });
        else await patch(slug, `${col}=is.null`, { [col]: val });
      }
      // merge provenance
      const cur = await fetch(`${URL_}/rest/v1/universities?slug=eq.${encodeURIComponent(slug)}&select=sources`, { headers: H }).then((r) => r.json());
      const merged = [...new Set([...(cur[0]?.sources || []), ...(u.sources || [])])].sort();
      await patch(slug, "", { sources: merged });
      done++;
    } catch (e) {
      failed++;
      console.error(String(e).slice(0, 200));
    }
    if ((done + failed) % 100 === 0) console.log(`${done + failed} processed`);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log({ done, failed, dry: DRY });
