#!/usr/bin/env node
/**
 * Resolve and download sharp university logos into public/logos/<slug>.webp.
 *
 * For every university with a website domain it gathers icon candidates
 * (Google faviconV2 @256, apple-touch-icon / <link rel=icon sizes> from the homepage,
 * SVG icons), keeps the largest raster >= MIN_SIDE px and writes a 128x128 WebP.
 * Writes lib/logo-manifest.json: { [slug]: sourceSidePx } (read by the app to know which logos exist).
 *
 * Usage: node scripts/fetch-logos.mjs [--domains extra.json] [--only slug1,slug2] [--force] [--trust]
 *   extra.json: { "<slug>": "domain.tld" } — candidate domains for rows without website_domain.
 *   Candidate domains are verified against the homepage <title> before use and reported in
 *   scripts/logo-output/domains.json so they can be written back to the database.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const OUT = path.join(ROOT, "public", "logos");
const OUT_SIZE = 128;
const MIN_SIDE = 32;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

const args = process.argv.slice(2);
const argVal = (k) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : undefined;
};
const FORCE = args.includes("--force");
// --trust: skip the homepage-title check for --domains candidates (sites that block bots).
const TRUST = args.includes("--trust");
const ONLY = argVal("--only")?.split(",").filter(Boolean);
const EXTRA = argVal("--domains") ? JSON.parse(fs.readFileSync(argVal("--domains"), "utf8")) : {};

function loadEnv() {
  const file = path.join(ROOT, ".env.local");
  const env = { ...process.env };
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const i = line.indexOf("=");
      if (i > 0 && !line.startsWith("#")) env[line.slice(0, i).trim()] ??= line.slice(i + 1).trim().replace(/^"|"$/g, "");
    }
  }
  return env;
}

async function fetchRows(env) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${url}/rest/v1/universities?select=slug,name,website_domain&order=slug`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` },
    });
    if (!r.ok) throw new Error(`supabase ${r.status}`);
    const page = await r.json();
    rows.push(...page);
    if (page.length < 1000) break;
  }
  return rows;
}

async function get(url, { timeout = 12000, accept } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": UA, ...(accept ? { Accept: accept } : {}) },
    });
    return res;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/** .ico files embed PNG frames or BMP/DIB frames; decode largest frame for sharp. */
function decodeIco(buf) {
  if (buf.length < 22 || buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) return null;
  const count = buf.readUInt16LE(4);
  let best = null;
  for (let i = 0; i < count; i++) {
    const e = 6 + i * 16;
    if (e + 16 > buf.length) break;
    const w = buf[e] || 256;
    const h = buf[e + 1] || 256;
    const side = Math.min(w, h);
    const size = buf.readUInt32LE(e + 8);
    const off = buf.readUInt32LE(e + 12);
    if (off + size > buf.length || size < 8) continue;
    const frame = buf.subarray(off, off + size);
    const isPng = frame[0] === 0x89 && frame[1] === 0x50 && frame[2] === 0x4e && frame[3] === 0x47;
    if (isPng && (!best || side > best.side)) {
      best = { side, type: "png", buf: Buffer.from(frame) };
      continue;
    }
    // Check BITMAPINFOHEADER (size 40, planes 1, bpp 32 or 24)
    if (frame.length >= 40 && frame.readUInt32LE(0) === 40) {
      const bw = frame.readInt32LE(4);
      const bh = Math.floor(Math.abs(frame.readInt32LE(8)) / 2);
      const bpp = frame.readUInt16LE(14);
      const comp = frame.readUInt32LE(16);
      if (bw > 0 && bh > 0 && bw <= 512 && bh <= 512 && comp === 0 && (bpp === 32 || bpp === 24)) {
        const rowStride = Math.floor((bw * bpp + 31) / 32) * 4;
        const maskStride = Math.floor((bw + 31) / 32) * 4;
        const xorOff = 40;
        const andOff = xorOff + rowStride * bh;
        if (xorOff + rowStride * bh <= frame.length) {
          const rgba = Buffer.alloc(bw * bh * 4);
          const hasMask = andOff + maskStride * bh <= frame.length;
          let anyAlpha = false;
          for (let y = 0; y < bh; y++) {
            const srcY = bh - 1 - y;
            const rowStart = xorOff + srcY * rowStride;
            const maskStart = andOff + srcY * maskStride;
            for (let x = 0; x < bw; x++) {
              const di = (y * bw + x) * 4;
              const si = rowStart + x * (bpp >> 3);
              rgba[di] = frame[si + 2];
              rgba[di + 1] = frame[si + 1];
              rgba[di + 2] = frame[si];
              let a = bpp === 32 ? frame[si + 3] : 255;
              if (a > 0) anyAlpha = true;
              if (bpp === 24 && hasMask) {
                const maskBit = (frame[maskStart + (x >> 3)] >> (7 - (x & 7))) & 1;
                if (maskBit) a = 0;
              }
              rgba[di + 3] = a;
            }
          }
          if (bpp === 32 && !anyAlpha) {
            for (let p = 3; p < rgba.length; p += 4) rgba[p] = 255;
          }
          const bSide = Math.min(bw, bh);
          if (!best || bSide > best.side) {
            best = { side: bSide, type: "raw", buf: rgba, width: bw, height: bh };
          }
        }
      }
    }
  }
  return best;
}

async function imageFrom(url) {
  const res = await get(url, { accept: "image/*,*/*;q=0.8" });
  if (!res || !res.ok) return null;
  let buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 100 || buf.length > 5_000_000) return null;
  const ico = decodeIco(buf);
  if (ico && ico.type === "raw") {
    return { url, buf: ico.buf, raw: { width: ico.width, height: ico.height, channels: 4 }, side: ico.side, isSvg: false };
  }
  if (ico && ico.type === "png") buf = ico.buf;
  try {
    const isSvg = /svg/.test(res.headers.get("content-type") || "") || /^\s*(<\?xml|<svg)/.test(buf.subarray(0, 200).toString());
    const img = sharp(buf, isSvg ? { density: 300 } : { pages: 1 });
    const meta = await img.metadata();
    if (!meta.width || !meta.height) return null;
    // SVGs are resolution independent: treat as large.
    const side = isSvg ? 512 : Math.min(meta.width, meta.height);
    return { url, buf, side, isSvg };
  } catch {
    return null; // e.g. .ico that sharp cannot decode
  }
}

const fold = (s) =>
  (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ıİ]/g, "i")
    .replace(/&#x27;|&#39;|&amp;/g, " ")
    .toLowerCase();
const STOP = new Set(
  "the of university universitesi universiteti universitat universitaet universite universidad universita universitet college and at in de di du la le for institute technology school state campus main partial nversitesi niversitesi".split(
    " ",
  ),
);
const tokens = (s) => fold(s).replace(/[^a-z0-9]+/g, " ").split(" ").filter((t) => t.length > 2 && !STOP.has(t));

function verifyTitle(name, domain, html) {
  const title = fold(
    (html.match(/<title[^>]*>([\s\S]{0,300}?)<\/title>/i)?.[1] || "") +
      " " +
      (html.match(/property=["']og:site_name["'][^>]*content=["']([^"']+)/i)?.[1] || ""),
  );
  const nameTokens = tokens(name);
  if (nameTokens.some((t) => title.includes(t))) return true;
  // Acronym domains (mit.edu, lse.ac.uk): accept if the label appears in the title.
  const label = domain.split(".")[0];
  return label.length >= 3 && title.includes(label);
}

function iconLinks(html, base) {
  const out = [];
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    const rel = tag.match(/rel=["']([^"']+)["']/i)?.[1]?.toLowerCase() || "";
    if (!/icon/.test(rel)) continue;
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (!href || href.startsWith("data:")) continue;
    try {
      out.push(new URL(href, base).toString());
    } catch {
      /* ignore */
    }
  }
  return out;
}

async function resolveLogo(row, domain, needVerify) {
  const bare = domain.replace(/^www\./, "");
  const fastCandidates = [
    `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${bare}&size=256`,
    `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.${bare}&size=256`,
    `https://www.google.com/s2/favicons?domain=${bare}&sz=256`,
    `https://www.google.com/s2/favicons?domain=www.${bare}&sz=256`,
    `https://icon.horse/icon/${bare}`,
    `https://icons.duckduckgo.com/ip3/${bare}.ico`,
  ];
  const seen = new Set();
  let best = null;

  if (!needVerify) {
    for (const c of fastCandidates) {
      if (seen.has(c)) continue;
      seen.add(c);
      const img = await imageFrom(c);
      if (img && (!best || img.side > best.side)) best = img;
      if (best && best.side >= 64) break;
    }
  }

  if (needVerify || !best || best.side < MIN_SIDE) {
    let home = await get(`https://${bare}/`, { timeout: 5000, accept: "text/html" });
    if (!home || !home.ok) {
      home = await get(`https://www.${bare}/`, { timeout: 5000, accept: "text/html" });
    }
    let html = "";
    let base = `https://${bare}/`;
    if (home && home.ok) {
      base = home.url || base;
      html = (await home.text()).slice(0, 400_000);
    }
    if (needVerify && !(html && verifyTitle(row.name, domain, html))) return { verified: false };

    const homeCandidates = [
      ...(needVerify ? fastCandidates : []),
      ...iconLinks(html, base),
      new URL("/apple-touch-icon.png", base).toString(),
      new URL("/favicon.ico", base).toString(),
    ];
    for (const c of homeCandidates) {
      if (seen.has(c)) continue;
      seen.add(c);
      const img = await imageFrom(c);
      if (img && (!best || img.side > best.side)) best = img;
      if (best && best.side >= 180) break;
    }
  }

  if (!best || best.side < MIN_SIDE) return { verified: true, logo: null, side: best?.side ?? 0 };

  const sharpOpts = best.raw ? { raw: best.raw } : best.isSvg ? { density: 300 } : { pages: 1 };
  const out = await sharp(best.buf, sharpOpts)
    .resize(OUT_SIZE, OUT_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toBuffer();
  return { verified: true, logo: out, side: best.side, source: best.url };
}

async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const idx = i++;
        await fn(items[idx], idx);
      }
    }),
  );
}

const env = loadEnv();
fs.mkdirSync(OUT, { recursive: true });
const manifestPath = path.join(ROOT, "lib", "logo-manifest.json");
const META = path.join(ROOT, "scripts", "logo-output");
fs.mkdirSync(META, { recursive: true });
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
const domainsPath = path.join(META, "domains.json");
const newDomains = fs.existsSync(domainsPath) ? JSON.parse(fs.readFileSync(domainsPath, "utf8")) : {};

// Network edge cases in undici can throw outside our awaits; keep going.
process.on("uncaughtException", (e) => console.error("[uncaught]", e?.message || e));
process.on("unhandledRejection", (e) => console.error("[unhandled]", e?.message || e));

let rows = await fetchRows(env);
// Recover state from files on disk (e.g. after a crash before the manifest was saved).
for (const f of fs.readdirSync(OUT)) {
  const slug = f.endsWith(".webp") ? f.slice(0, -5) : null;
  if (!slug) continue;
  manifest[slug] ??= OUT_SIZE;
  const row = rows.find((r) => r.slug === slug);
  if (row && !row.website_domain && EXTRA[slug]) newDomains[slug] ??= EXTRA[slug];
}
if (ONLY) rows = rows.filter((r) => ONLY.includes(r.slug));
const work = rows
  .map((r) => ({ row: r, domain: EXTRA[r.slug] || r.website_domain || newDomains[r.slug], isNew: !r.website_domain }))
  .filter((w) => w.domain && (FORCE || !manifest[w.row.slug]));

const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
const save = () => {
  fs.writeFileSync(manifestPath, JSON.stringify(sorted(manifest), null, 0) + "\n");
  fs.writeFileSync(domainsPath, JSON.stringify(sorted(newDomains), null, 1) + "\n");
};
const stats = { ok: 0, small: 0, unverified: 0 };
const report = [];
await pool(work, 6, async ({ row, domain, isNew }, idx) => {
  let r;
  try {
    r = await resolveLogo(row, domain, isNew && !TRUST && !newDomains[row.slug]);
  } catch (e) {
    report.push(`ERROR ${row.slug} ${domain} ${e?.message || e}`);
    return;
  }
  if (!r.verified) {
    stats.unverified++;
    report.push(`UNVERIFIED ${row.slug} ${domain}`);
    return;
  }
  if (isNew) newDomains[row.slug] = domain;
  if (!r.logo) {
    stats.small++;
    report.push(`SMALL(${r.side}) ${row.slug} ${domain}`);
    return;
  }
  fs.writeFileSync(path.join(OUT, `${row.slug}.webp`), r.logo);
  manifest[row.slug] = r.side;
  stats.ok++;
  if (idx % 25 === 0) {
    save();
    console.log(`${idx}/${work.length}`, stats);
  }
});

save();
fs.writeFileSync(path.join(META, "report.txt"), report.sort().join("\n") + "\n");
console.log("done", stats, "logos total", Object.keys(manifest).length, "rows", rows.length);
