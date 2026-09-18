/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing env");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });
const SRC = path.join("E:", "goo", "USAfiles", "_extract", "merged_catalog.json");

const COUNTRY_RU = {
  Australia: "Австралия", Austria: "Австрия", Belgium: "Бельгия", Canada: "Канада",
  China: "Китай", "Czech Republic": "Чехия", Denmark: "Дания", Finland: "Финляндия",
  France: "Франция", Germany: "Германия", "Hong Kong": "Гонконг", Hungary: "Венгрия",
  Italy: "Италия", Japan: "Япония", Korea: "Корея", Latvia: "Латвия",
  Netherlands: "Нидерланды", Poland: "Польша", Portugal: "Португалия", Qatar: "Катар",
  Singapore: "Сингапур", "South Korea": "Южная Корея", Spain: "Испания", Sweden: "Швеция",
  Switzerland: "Швейцария", Turkey: "Турция", UK: "Великобритания", USA: "США", UAE: "ОАЭ",
};

function slugify(name, country, used) {
  const base = (name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "uni";
  const c = (country || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let slug = c ? `${base}-${c}` : base;
  if (used.has(slug)) {
    let i = 2;
    while (used.has(`${slug}-${i}`)) i++;
    slug = `${slug}-${i}`;
  }
  used.add(slug);
  return slug;
}

function aidTypes(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  return String(v).split(",").map((s) => s.trim()).filter(Boolean);
}

function tags(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  return String(v).split(/\s+/).filter(Boolean);
}

function mapRow(r, used) {
  const name = (r.name || "").trim();
  const country = (r.country || "USA").trim();
  const at = aidTypes(r.aid_type);
  const it = tags(r.inst_tags);
  const search = [
    name, country, COUNTRY_RU[country] || "", r.city, r.majors, r.aid_max, r.notes,
    r.inst_type, r.intl_aid_policy, at.join(" "), it.join(" "),
  ].filter(Boolean).join(" ").toLowerCase();
  const needBlind = /need-blind/i.test(`${r.intl_aid_policy || ""} ${r.notes || ""}`);
  return {
    slug: slugify(name, country, used),
    name,
    country,
    city: r.city || null,
    tuition_display: r.tuition || null,
    tuition_num: r.tuition_num ?? null,
    acceptance_rate: r.acceptance_rate || null,
    rate_num: r.rate_num ?? null,
    full_grant: r.full_grant === true,
    aid_max: r.aid_max || null,
    aid_num: r.aid_num ?? null,
    aid_types: at,
    early_deadline: r.early_deadline || null,
    regular_deadline: r.regular_deadline || null,
    lang: r.lang || null,
    undergrad_enrollment: r.undergrad_enrollment || null,
    intl_undergrad_pct: r.intl_undergrad_pct || null,
    intl_undergrad_count: r.intl_undergrad_count || null,
    total_aid_millions: r.total_aid_millions || null,
    intl_receiving_aid_pct: r.intl_receiving_aid_pct || null,
    avg_aid_award: r.avg_aid_award || null,
    inst_tags: it,
    inst_type: r.inst_type || null,
    intl_aid_policy: r.intl_aid_policy || null,
    need_blind: needBlind,
    majors: r.majors || null,
    notes: r.notes ? String(r.notes).slice(0, 800) : null,
    living_note: r.living_note || null,
    sat: r.sat || null,
    essay: r.essay || null,
    how_apply_aid: r.how_apply_aid || null,
    coa_after_aid_pct: r.coa_after_aid_pct || null,
    countries_represented: r.countries_represented || null,
    intl_acceptance_rate: r.intl_acceptance_rate || null,
    intl_yield: r.intl_yield || null,
    merit_scholarship_name: r.merit_scholarship_name || null,
    search_text: search,
  };
}

async function main() {
  const rows = JSON.parse(fs.readFileSync(SRC, "utf8"));
  const used = new Set();
  const mapped = rows.filter((r) => (r.name || "").trim()).map((r) => mapRow(r, used));
  console.log("rows", mapped.length);
  const size = 50;
  let ok = 0;
  for (let i = 0; i < mapped.length; i += size) {
    const chunk = mapped.slice(i, i + size);
    const { error } = await sb.from("universities").upsert(chunk, { onConflict: "slug" });
    if (error) {
      console.error("chunk", i, error.message);
    } else {
      ok += chunk.length;
      console.log("upserted", ok);
    }
  }
  const { count } = await sb.from("universities").select("*", { count: "exact", head: true });
  console.log("final count", count);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
