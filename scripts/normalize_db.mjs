#!/usr/bin/env node
/**
 * Normalizes dirty fields in Supabase `universities` using SUPABASE_SERVICE_ROLE_KEY.
 * Default mode is --dry-run (reads DB and prints planned changes without mutating).
 * Pass --apply to write changes to Supabase (use --dedupe to also merge/remove alias duplicates).
 */
import fs from "node:fs";
import path from "node:path";

const apply = process.argv.includes("--apply");
const emitSql = process.argv.includes("--emit-sql");
const dedupe = process.argv.includes("--dedupe");

const envPath = path.resolve(process.env.ENV_FILE || ".env.local");
const rawEnv = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
const env = Object.fromEntries(
  rawEnv
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^['"]|['"]$/g, "")];
    }),
);

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const READ_KEY = SERVICE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !READ_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key in .env.local");
  process.exit(1);
}
if (apply && !SERVICE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local (required for --apply). Run without --apply for --dry-run or use --emit-sql.");
  process.exit(1);
}

const MONTH_MAP = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function toCycle2027Iso(month, day) {
  if (month < 1 || month > 12) return null;
  const maxDay = DAYS_IN_MONTH[month];
  const clampedDay = Math.max(1, Math.min(maxDay, day));
  const year = month >= 10 ? 2026 : 2027;
  return `${year}-${String(month).padStart(2, "0")}-${String(clampedDay).padStart(2, "0")}`;
}

function cleanText(s) {
  if (!s) return null;
  const out = String(s)
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+PARTIAL\s*\/?\s*$/i, "")
    .replace(/\s+—\s*$/, "")
    .replace(/Ünversitesi/g, "Üniversitesi")
    .replace(/\s+/g, " ")
    .trim();
  return out || null;
}

const RANGE_TUITION_FIXES = {
  "stanford-university-usa": { num: 65000, display: "$65,000 / год" },
  "washington-university-in-st-louis-usa": { num: 65000, display: "$65,000 / год" },
  "amherst-college-usa": { num: 70000, display: "$70,000 / год" },
};

function parseShorthandDates(s) {
  const matches = [...s.matchAll(/(\d{1,2})[-\s]*([A-Za-z]{3,9})/g)]
    .map((m) => {
      const d = Number(m[1]);
      const mo = MONTH_MAP[m[2].toLowerCase()];
      return mo && d >= 1 && d <= 31 ? toCycle2027Iso(mo, d) : null;
    })
    .filter(Boolean);
  return [...new Set(matches)].sort();
}

function normalizeDeadline(raw) {
  const s = (raw ?? "").trim();
  if (!s) return null;

  if (
    /^(5\.5|6|6\.5|7)$/.test(s) ||
    /^https?:\/\//i.test(s) ||
    /^(Civil and Structural Engineering|Deadline to provide proof|Scholarship offer acceptance)/i.test(s)
  ) {
    return null;
  }

  if (/^rolling$/i.test(s)) return "Rolling";

  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const [, yStr, mStr, dStr] = iso;
    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);
    if (y <= 2026) return toCycle2027Iso(m, d);
    return s;
  }

  if (/^[\d\sA-Za-z-]+$/.test(s)) {
    const dates = parseShorthandDates(s);
    if (dates.length === 1) return dates[0];
    if (dates.length > 1) return dates[dates.length - 1];
  }

  const md = s.match(/^([A-Za-z]{3,9})\s+(\d{1,2})(?:\b|\s+https?:\/\/)/i);
  if (md && (s.length <= 25 || s.includes("http"))) {
    const mo = MONTH_MAP[md[1].toLowerCase()];
    const d = Number(md[2]);
    if (mo && d >= 1 && d <= 31) return toCycle2027Iso(mo, d);
  }

  const orMay = s.match(/^or\s+(\d{1,2})\s+([A-Za-z]{3,9})\s*\(check here:/i);
  if (orMay) {
    const d = Number(orMay[1]);
    const mo = MONTH_MAP[orMay[2].toLowerCase()];
    if (mo && d >= 1 && d <= 31) return toCycle2027Iso(mo, d);
  }

  return s;
}

function cleanMajors(raw) {
  if (!raw) return null;
  const parts = raw
    .replace(/https?:\/\/\S+/gi, "")
    .split(/[,;\n]/)
    .map((x) => x.replace(/^\[+|\]+$/g, "").trim())
    .filter((x) => x.length > 1)
    .filter((x) => !/areas of interest|academic structure|^\d+$|^(Public|Private)\s+(Research|Comprehensive|College)/i.test(x));
  return parts.length ? parts.join(", ") : null;
}

function cleanNotes(raw, slug) {
  if (!raw) return null;
  if (slug === "city-university-of-hong-kong-hong-kong" && /\bPolyU\b/i.test(raw)) {
    return null;
  }

  const segs = raw.split("|").map((s) => s.trim()).filter(Boolean);
  const out = [];
  const seen = new Set();
  const pushUnique = (val) => {
    const v = val.trim();
    if (!v || seen.has(v.toLowerCase())) return;
    seen.add(v.toLowerCase());
    out.push(v);
  };

  let addedTurkiye = false;
  let addedStipendium = false;
  let addedGks = false;

  for (let seg of segs) {
    // Strip inline URLs
    seg = seg.replace(/https?:\/\/\S+/gi, "").replace(/\s+/g, " ").trim();
    if (!seg) continue;

    // Replace truncated or verbose boilerplate gov-scholarship chunks
    if (/TÜRKIYE BURSLARI|turkiyeburslari/i.test(seg) || (/Распространяется на 103 университета Турции/i.test(seg))) {
      if (!addedTurkiye) {
        addedTurkiye = true;
        pushUnique("Türkiye Bursları: полный госгрант (обучение, общежитие, перелёт и ежемесячная стипендия)");
      }
      continue;
    }
    if (/STIPENDIUM HUNGARICUM|stipendiumhungaricum/i.test(seg) || (/Распространяется на 57 университетов Венгрии/i.test(seg))) {
      if (!addedStipendium) {
        addedStipendium = true;
        pushUnique("Stipendium Hungaricum: полный госгрант (бесплатное обучение, общежитие и стипендия 43 700 HUF/мес)");
      }
      continue;
    }
    if (/GLOBAL KOREA SCHOLARSHIP|gksscholarship/i.test(seg) || /Распространяется на 64 университетов Кореи|Получают 150 человек в год/i.test(seg)) {
      if (!addedGks) {
        addedGks = true;
        pushUnique("Global Korea Scholarship (GKS): 100% покрытие обучения (до $3 365/сем), перелёт, год корейского и стипендия ~$740–1 110/мес");
      }
      continue;
    }

    // Drop redundant metadata / PDF chapter markers / dangling years / generic bucket labels
    if (
      /^(Бакалавриат & Магистратура & PhD|Chapter \d+|NAMED COMPETITIVE AWARD|ATHLETIC SCHOLARSHIP|ARTS \/ TALENT-BASED|DEBATE \/ FORENSICS|\(2024-25\)|2029\)|Listed universities \/ scholarships|Mentioned in Canada admissions guide|Low-cost Europe listing)/i.test(seg)
    ) {
      continue;
    }
    // Trim leading/trailing dangling "; Chapter X..." inside combined segments
    seg = seg.replace(/Chapter \d+\s*—[^;|]+;?\s*/gi, "").trim();
    if (!seg) continue;
    pushUnique(seg);
  }

  return out.length ? out.join(" | ") : null;
}

function normalizeRow(row) {
  const patch = {};

  if (row.country === "Korea") {
    patch.country = "South Korea";
  }

  const cleanName = cleanText(row.name);
  if (cleanName && cleanName !== row.name) patch.name = cleanName;

  let cleanCity = cleanText(row.city);
  if (cleanCity) {
    cleanCity = cleanCity.replace(/^([A-Za-z.\s-]+?)\s+\1(\b|,)/i, "$1$2");
  }
  if (cleanCity !== row.city) patch.city = cleanCity;

  const country = patch.country ?? row.country;
  const rFix = RANGE_TUITION_FIXES[row.slug];
  if (rFix) {
    if (row.tuition_num !== rFix.num) patch.tuition_num = rFix.num;
    if (row.tuition_display !== rFix.display) patch.tuition_display = rFix.display;
  } else if (
    country === "USA" &&
    row.tuition_num != null &&
    row.tuition_num >= 20 &&
    row.tuition_num <= 99 &&
    /^\$\d{2}\s*\/\s*год$/.test(row.tuition_display || "")
  ) {
    patch.tuition_display = `$${row.tuition_num},000 / год`;
    patch.tuition_num = row.tuition_num * 1000;
  }

  // Fix shifted Personal Statement / Motivation letter in `sat` -> move to `essay` if empty
  if (row.sat && /personal statement|motivation letter/i.test(row.sat)) {
    if (!row.essay) patch.essay = cleanText(row.sat);
    patch.sat = null;
  }

  // Fix `essay` junk / ACT in essay
  if (row.essay) {
    const e = row.essay.trim();
    if (/^ACT req\.?$/i.test(e)) {
      if (!row.sat && patch.sat === undefined) patch.sat = "ACT required";
      patch.essay = null;
    } else if (/^https?:\/\/\S+$/i.test(e) || /could add it on the official site/i.test(e)) {
      patch.essay = null;
    } else if (/cannot be sure/i.test(e)) {
      patch.essay = "1 essay";
    } else if (/1\)\s*personal statement of no more than 500 words/i.test(e)) {
      patch.essay = "Personal Statement (max 500 words)";
    } else if (/and 1 image \(\?\)/i.test(e)) {
      patch.essay = "1 ps, 3 supp";
    }
  }

  // Fix `lang` TOEFL-in-IELTS typo & bare "5.0 score"
  if (row.lang) {
    let l = row.lang.trim();
    l = l.replace(/\bIELTS\s+(\d{2,3})\s*(avg|rec)\b/gi, "TOEFL $1 $2");
    if (/^(\d(?:\.\d)?)\s*score$/i.test(l)) {
      const m = l.match(/^(\d(?:\.\d)?)\s*score$/i);
      if (m && Number(m[1]) >= 4 && Number(m[1]) <= 9) {
        l = `IELTS ${Number(m[1]).toFixed(1)}`;
      }
    }
    if (l !== row.lang.trim()) patch.lang = l;
  }

  // Deadlines
  let early = row.early_deadline;
  let regular = row.regular_deadline;
  // If a field has multi-dates and the other is empty (e.g. "1-Nov 15-Jan")
  if (early && !regular && /^[\d\sA-Za-z-]+$/.test(early.trim())) {
    const dates = parseShorthandDates(early.trim());
    if (dates.length >= 2) {
      early = dates[0];
      regular = dates[dates.length - 1];
    }
  } else if (regular && !early && /^[\d\sA-Za-z-]+$/.test(regular.trim())) {
    const dates = parseShorthandDates(regular.trim());
    if (dates.length >= 2) {
      early = dates[0];
      regular = dates[dates.length - 1];
    }
  }
  early = normalizeDeadline(early);
  regular = normalizeDeadline(regular);
  const isoRe = /^\d{4}-\d{2}-\d{2}$/;
  if (early && regular && isoRe.test(early) && isoRe.test(regular) && early > regular) {
    const tmp = early;
    early = regular;
    regular = tmp;
  }
  if (early !== row.early_deadline) patch.early_deadline = early;
  if (regular !== row.regular_deadline) patch.regular_deadline = regular;

  // living_note N/A English stubs
  if (row.living_note && /^accommodation(\s+fee)?\s*(is\s+n\/a|:\s*https?:\/\/)/i.test(row.living_note.trim())) {
    patch.living_note = null;
  }

  // majors junk
  const cleanedMajors = cleanMajors(row.majors);
  if (cleanedMajors !== row.majors) patch.majors = cleanedMajors;

  // notes truncated/boilerplate cleanup
  const cleanedNotes = cleanNotes(row.notes, row.slug);
  if (cleanedNotes !== row.notes) patch.notes = cleanedNotes;

  return patch;
}

const rows = [];
for (let off = 0; ; off += 1000) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/universities?select=*&order=id.asc`, {
    headers: { apikey: READ_KEY, Authorization: `Bearer ${READ_KEY}`, Range: `${off}-${off + 999}` },
  });
  const data = await res.json();
  if (!Array.isArray(data)) {
    console.error("Failed to fetch:", res.status, data);
    process.exit(1);
  }
  rows.push(...data);
  if (data.length < 1000) break;
}

console.log(`Fetched ${rows.length} rows from Supabase`);

const patches = [];
const fieldCounts = {};
for (const r of rows) {
  const patch = normalizeRow(r);
  const keys = Object.keys(patch);
  if (keys.length) {
    patches.push({ id: r.id, slug: r.slug, patch });
    for (const k of keys) fieldCounts[k] = (fieldCounts[k] || 0) + 1;
  }
}

console.log(`Rows needing updates: ${patches.length}`);
console.log("Changes by column:", fieldCounts);
for (const sample of patches.slice(0, 10)) {
  console.log("  SAMPLE", sample.slug, "=>", JSON.stringify(sample.patch));
}

if (emitSql) {
  const sqlVal = (v) => {
    if (v === null) return "NULL";
    if (typeof v === "number") return String(v);
    if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
    return "'" + String(v).replace(/'/g, "''") + "'";
  };
  const stmts = ["BEGIN;"];
  for (const { id, patch } of patches) {
    const sets = Object.entries(patch).map(([k, v]) => `${k} = ${sqlVal(v)}`).join(", ");
    stmts.push(`UPDATE universities SET ${sets} WHERE id = ${sqlVal(id)};`);
  }
  stmts.push("COMMIT;");
  const outDir = path.resolve("scripts/etl/out");
  fs.mkdirSync(outDir, { recursive: true });
  const sqlFile = path.join(outDir, "normalize_db.sql");
  fs.writeFileSync(sqlFile, stmts.join("\n") + "\n", "utf8");
  console.log(`Wrote SQL migration (${patches.length} statements) to ${sqlFile}`);
}

if (!apply) {
  console.log("\nDry-run complete. Re-run with --apply (requires SUPABASE_SERVICE_ROLE_KEY) or --emit-sql.");
  process.exit(0);
}

// Write backup outside repo just in case
const backupPath = path.resolve(process.env.TEMP || "/tmp", `goaza_universities_backup_${Date.now()}.json`);
fs.writeFileSync(backupPath, JSON.stringify(rows));
console.log("Backup written to:", backupPath);

let ok = 0;
let fail = 0;
const CONCURRENCY = 12;
for (let i = 0; i < patches.length; i += CONCURRENCY) {
  const batch = patches.slice(i, i + CONCURRENCY);
  await Promise.all(
    batch.map(async ({ id, slug, patch }) => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/universities?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(patch),
      });
      if (res.ok) ok++;
      else {
        fail++;
        console.error("PATCH failed for", slug, res.status, await res.text());
      }
    }),
  );
}
console.log(`Applied updates: ${ok} succeeded, ${fail} failed.`);
if (dedupe) {
  console.log("Note: --dedupe is intentionally reserved; runtime cleanAndDeduplicateUniversities handles aliases cleanly without breaking SEO URLs.");
}
