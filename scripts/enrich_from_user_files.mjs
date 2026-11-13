import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCRATCH =
  "C:/Users/Acer/.gemini/antigravity/brain/4074aec8-2abe-4c1b-b987-67b38eb17beb/scratch";
const ENRICH_PATH = path.join(ROOT, "lib/university-enrichment.json");
const SQL_OUT = path.join(ROOT, "supabase/migrations/20261115_user_files_enrichment.sql");

const db = JSON.parse(fs.readFileSync(path.join(SCRATCH, "db_snapshot.json"), "utf8"));
const bundle = JSON.parse(fs.readFileSync(path.join(SCRATCH, "extracted_bundle.json"), "utf8"));
const parsed = JSON.parse(fs.readFileSync(path.join(SCRATCH, "parsed_pdfs.json"), "utf8"));
const enrichment = JSON.parse(fs.readFileSync(ENRICH_PATH, "utf8"));

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’`Õ]/g, "")
    .replace(/\u2013|\u2014|-/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Canonical name aliases -> DB slug (or canonical norm name)
const SLUG_ALIASES = new Map([
  ["nyuad", "nyu-abu-dhabi-uae"],
  ["nyu abu dhabi", "nyu-abu-dhabi-uae"],
  ["georgetown in qatar", "georgetown-university-in-qatar-qatar"],
  ["georgetown university in qatar", "georgetown-university-in-qatar-qatar"],
  ["northwestern in qatar", "northwestern-university-in-qatar-qatar"],
  ["northwestern university in qatar", "northwestern-university-in-qatar-qatar"],
  ["hk baptist university", "hong-kong-baptist-university-hong-kong"],
  ["hkust", "hong-kong-university-of-science-and-technology-hong-kong"],
  ["hong kong university of science and technology", "hong-kong-university-of-science-and-technology-hong-kong"],
  ["washington and lee university", "washington-and-lee-usa"],
  ["washington and lee", "washington-and-lee-usa"],
  ["george washington university", "the-george-washington-university-usa"],
  ["university of pennsylvania", "the-university-of-pennsylvania-usa"],
  ["university of chicago", "the-university-of-chicago-usa"],
  ["cooper union for the advancement of science and art", "cooper-union-usa"],
  ["franklin w olin college of engineering", "olin-college-of-engineering-usa"],
  ["washington university saint louis", "washington-university-in-st-louis-usa"],
  ["washington university st louis", "washington-university-in-st-louis-usa"],
  ["washu st louis", "washington-university-in-st-louis-usa"],
  ["university of north carolina", "university-of-north-carolina-at-chapel-hill-usa"],
  ["unc chapel hill", "university-of-north-carolina-at-chapel-hill-usa"],
  ["richmond university", "university-of-richmond-usa"],
  ["denison college", "denison-university-usa"],
  ["notre dame university", "university-of-notre-dame-usa"],
  ["mit", "massachusetts-institute-of-technology-usa"],
  ["caltech", "california-institute-of-technology-usa"],
  ["kaist", "kaist-south-korea"],
  ["nus", "national-university-of-singapore-singapore"],
  ["ntu", "nanyang-technological-university-singapore"],
  ["uoft", "university-of-toronto-canada"],
  ["ubc", "university-of-british-columbia-canada"],
  ["mun", "memorial-university-of-newfoundland-mun-canada"],
  ["upei", "university-of-prince-edward-island-upei-canada"],
  ["cbu", "cape-breton-university-cbu-canada"],
  ["sfu", "simon-fraser-university-canada"],
  ["simon fraser university", "simon-fraser-university-canada"],
  ["johns hopkins", "johns-hopkins-university-usa"],
  ["claremont mckenna", "claremont-mckenna-college-usa"],
  ["u of rochester", "university-of-rochester-usa"],
  ["university of mississippi ole miss", "university-of-mississippi-usa"],
  ["university at buffalo", "suny-university-at-buffalo-usa"],
  ["university of buffalo", "suny-university-at-buffalo-usa"],
  ["rutgers university", "rutgers-the-state-university-of-new-jersey-usa"],
  ["st peters university", "saint-peters-university-usa"],
  ["wake forest university", "wake-forest-university-usa"],
  ["boston university", "boston-university-usa"],
  ["tulane university", "tulane-university-usa"],
  ["duke university", "duke-university-usa"],
  ["university of georgia", "university-of-georgia-usa"],
  ["university of north carolina at chapel hill", "university-of-north-carolina-at-chapel-hill-usa"],
]);

const bySlug = new Map();
const byNorm = new Map();
const byCountryNorm = new Map();

for (const u of db) {
  bySlug.set(u.slug, u);
  const k = norm(u.name);
  if (!byNorm.has(k)) byNorm.set(k, u);
  const ck = `${norm(u.country)}::${k}`;
  if (!byCountryNorm.has(ck)) byCountryNorm.set(ck, u);
}

function findUni(rawName, countryHint = "") {
  let clean = String(rawName || "")
    .replace(/^(School Name|University Name)\s+/i, "")
    .replace(/Õ/g, "'")
    .trim();
  const n = norm(clean);
  if (!n) return null;
  if (SLUG_ALIASES.has(n)) {
    const slug = SLUG_ALIASES.get(n);
    if (bySlug.has(slug)) return bySlug.get(slug);
  }
  if (countryHint) {
    const ck = `${norm(countryHint)}::${n}`;
    if (byCountryNorm.has(ck)) return byCountryNorm.get(ck);
  }
  if (byNorm.has(n)) return byNorm.get(n);
  // Try stripping trailing parenthesis like "(merit)" or " - need blind"
  const stripped = clean
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+-\s+.*$/, "")
    .trim();
  const ns = norm(stripped);
  if (ns && SLUG_ALIASES.has(ns) && bySlug.has(SLUG_ALIASES.get(ns))) {
    return bySlug.get(SLUG_ALIASES.get(ns));
  }
  if (ns && byNorm.has(ns)) return byNorm.get(ns);
  return null;
}

const stats = { patchedSlugs: new Set(), sources: {} };
const bump = (src) => {
  stats.sources[src] = (stats.sources[src] || 0) + 1;
};

function getPatch(slug) {
  if (!enrichment[slug]) enrichment[slug] = {};
  return enrichment[slug];
}

function setIfMissing(dbRow, patch, key, val, src) {
  if (val == null || String(val).trim() === "") return;
  const existing = patch[key] ?? dbRow[key];
  if (existing == null || String(existing).trim() === "") {
    patch[key] = val;
    stats.patchedSlugs.add(dbRow.slug);
    bump(`${src}.${key}`);
  }
}

function promoteBool(dbRow, patch, key, src) {
  if (!patch[key]) {
    patch[key] = true;
    if (!dbRow[key]) {
      stats.patchedSlugs.add(dbRow.slug);
      bump(`${src}.${key}`);
    }
  }
}

function mergeAidTypes(dbRow, patch, types, src) {
  const cur = new Set([...(dbRow.aid_types || []), ...(patch.aid_types || [])].map((x) => x.trim()).filter(Boolean));
  let added = false;
  for (const t of types) {
    if (!cur.has(t)) {
      cur.add(t);
      added = true;
    }
  }
  if (added) {
    patch.aid_types = [...cur];
    stats.patchedSlugs.add(dbRow.slug);
    bump(`${src}.aid_types`);
  }
}

function appendNote(dbRow, patch, snippet, src) {
  const clean = String(snippet || "").trim();
  if (!clean) return;
  const cur = String(patch.notes ?? dbRow.notes ?? "").trim();
  if (!cur) {
    patch.notes = clean;
    stats.patchedSlugs.add(dbRow.slug);
    bump(`${src}.notes`);
    return;
  }
  // Avoid repeating same key facts
  const marker = clean.slice(0, 28).toLowerCase();
  if (cur.toLowerCase().includes(marker)) return;
  if (cur.length < 1800) {
    patch.notes = `${cur}\n\n${clean}`;
    stats.patchedSlugs.add(dbRow.slug);
    bump(`${src}.notes_append`);
  }
}

// ------------------------------------------------------------
// 1. US_universities_with_100__financial_aid.xlsx (81 rows)
// ------------------------------------------------------------
const us100 = bundle.xlsx["media_1794577212552_880240b0.xlsx"]["Лист1"].slice(1);
for (const r of us100) {
  const [name, loc, accRaw, aidTypeRaw, aidMaxRaw, policyRaw, howApplyRaw, cssWaiverRaw] = r;
  const u = findUni(name, "USA");
  if (!u) continue;
  const p = getPatch(u.slug);
  if (loc) setIfMissing(u, p, "city", loc, "us100");
  if (accRaw && !Number.isNaN(Number(accRaw))) {
    const pct = Math.round(Number(accRaw) * 1000) / 10;
    if (pct > 0 && pct <= 100) {
      setIfMissing(u, p, "rate_num", pct, "us100");
      setIfMissing(u, p, "acceptance_rate", `${pct}%`, "us100");
    }
  }
  if (aidTypeRaw) {
    const types = [];
    if (/need/i.test(aidTypeRaw)) types.push("Need-based");
    if (/merit/i.test(aidTypeRaw)) types.push("Merit");
    if (types.length) mergeAidTypes(u, p, types, "us100");
  }
  if (/full\s*ride|100%/i.test(aidMaxRaw || "")) {
    promoteBool(u, p, "full_grant", "us100");
    setIfMissing(u, p, "aid_max", aidMaxRaw, "us100");
  } else if (aidMaxRaw) {
    setIfMissing(u, p, "aid_max", aidMaxRaw, "us100");
  }
  if (/need-?blind/i.test(policyRaw || "")) {
    promoteBool(u, p, "need_blind", "us100");
    setIfMissing(u, p, "intl_aid_policy", "need-blind", "us100");
  } else if (policyRaw) {
    setIfMissing(u, p, "intl_aid_policy", policyRaw, "us100");
  }
  if (howApplyRaw || cssWaiverRaw) {
    const rawCur = String(u.how_apply_aid ?? "").trim();
    const cleanBase = rawCur && howApplyRaw && rawCur.toLowerCase().includes(howApplyRaw.toLowerCase())
      ? rawCur
      : rawCur && howApplyRaw
        ? `${rawCur} • ${howApplyRaw}`
        : rawCur || howApplyRaw;
    const withWaiver =
      cssWaiverRaw && !cleanBase.toLowerCase().includes("waiver")
        ? `${cleanBase}${cleanBase ? " | " : ""}CSS Waiver: ${cssWaiverRaw}`
        : cleanBase;
    if (!rawCur) {
      setIfMissing(u, p, "how_apply_aid", withWaiver, "us100");
    } else if (!/waiver|isfaa|pfaa|ifaw|wisfaa/i.test(rawCur) && withWaiver !== rawCur) {
      p.how_apply_aid = withWaiver;
      stats.patchedSlugs.add(u.slug);
      bump("us100.how_apply_aid_enrich");
    } else if (p.how_apply_aid && p.how_apply_aid.includes(" • ")) {
      p.how_apply_aid = withWaiver;
    }
  }
}

// ------------------------------------------------------------
// 2. FULL_LIST_Universities_with_full_aid_@tsvirkkoo.pdf (73)
// ------------------------------------------------------------
const TSVIRKKOO = [
  ["Amherst College", "need-blind, покрывает 100% доказанной финансовой потребности", true],
  ["Babson College", "Global Scholars Program / full-need full ride для иностранцев", false],
  ["Bard College", "full-ride возможен через combination need + merit (CSS/ISFAA)", false],
  ["Barnard College", "женский колледж при Columbia, встречает 100% demonstrated need", false],
  ["Bates College", "100% demonstrated need без кредитов (grants + work-study)", false],
  ["Bennington College", "полное покрытие возможным пакетом need + Brockway/merit", false],
  ["Berea College", "обучение 100% бесплатно (Tuition Promise Scholarship + стипендия на кампусе)", false],
  ["Bowdoin College", "need-blind для всех, включая иностранных студентов", true],
  ["Brandeis University", "100% demonstrated need для принятых иностранцев (CSS Profile)", false],
  ["Brown University", "need-blind для иностранцев начиная с Class of 2029", true],
  ["Bryn Mawr College", "женский LAC, meets 100% demonstrated need (CSS/Waiver form)", false],
  ["Bucknell University", "значительный пакет + Arts/Presidential стипендии до full ride", false],
  ["Carleton College", "meets 100% demonstrated need (CSS/ISFAA, конкурентный конкурс)", false],
  ["Centre College", "Lincoln Scholars / Brown Fellows — полный грант по merit", false],
  ["Claremont McKenna College", "full ride возможен (редко), meets 100% demonstrated need", false],
  ["Colby College", "meets 100% demonstrated need для иностранцев, без application fee", false],
  ["Colorado College", "block plan, meets 100% demonstrated need", false],
  ["Columbia University", "meets 100% demonstrated need для принятых иностранцев", false],
  ["Cornell University", "meets 100% demonstrated need (need-aware для иностранцев)", false],
  ["Dartmouth College", "need-blind для всех абитуриентов включая иностранцев, 100% need", true],
  ["Davidson College", "meets 100% need без займов (The Davidson Trust)", false],
  ["Denison University", "щедрые пакеты; ориентир EFC часто от $5,000–10,000/год", false],
  ["Dickinson College", "комбинация merit + need-based aid до полного покрытия", false],
  ["Duke University", "Karsh International Scholars + need-based до 100%", false],
  ["Emory University", "Emory Scholars / need-based до 100% (покрывает полную нужду)", false],
  ["Franklin & Marshall College", "только need-based / 100% need (один из самых доступных селективных LAC)", false],
  ["Georgetown in Qatar", "кампус Georgetown в Катаре, щедрая need-based помощь Education City", false],
  ["Grinnell College", "meets 100% demonstrated need + крупные merit-стипендии", false],
  ["Hamilton College", "meets 100% demonstrated need для всех принятых", false],
  ["Harvard University", "need-blind для всех включая иностранцев; при доходе <$85k — $0", true],
  ["Harvey Mudd College", "лучший инженерный LAC; комбинация merit + need", false],
  ["Haverford College", "meets 100% demonstrated need (без займов при доходе <$60k)", false],
  ["HK Baptist University", "Admission Scholarship до 100% обучения + проживание в Гонконге", false],
  ["HKUST", "Global Learners / Admission Scholarship до full tuition + stipend", false],
  ["Johns Hopkins University", "meets 100% demonstrated need для принятых иностранцев", false],
  ["Kenyon College", "meets 100% demonstrated need (для иностранцев ориентир EFC ~$5,000+)", false],
  ["Lafayette College", "meets 100% need + Marquis Fellowship (full tuition/ride)", false],
  ["Lehigh University", "meets 100% demonstrated need (need-aware)", false],
  ["Macalester College", "meets 100% demonstrated need + DeWitt Wallace merit", false],
  ["MIT", "need-blind для всех стран мира, покрывает 100% need", true],
  ["Minerva Schools at KGI", "need-based гранты + work-study; обучение в 7 городах мира", false],
  ["Mount Holyoke College", "meets 100% demonstrated need + крупные merit awards", false],
  ["University of Notre Dame", "need-blind политика для всех абитуриентов с полным покрытием нужды", true],
  ["Northwestern University", "meets 100% demonstrated need без займов", false],
  ["Northwestern in Qatar", "кампус Education City в Катаре с грантами и беспроцентными опциями", false],
  ["NYUAD", "NYU Abu Dhabi — полная стипендия (обучение, общежитие, перелёт, карманные)", false],
  ["Pitzer College", "100% demonstrated need (ограниченный бюджет для иностранцев)", false],
  ["Pomona College", "meets 100% demonstrated need (высокий средний грант)", false],
  ["Princeton University", "need-blind; бесплатная своя форма PFAA вместо CSS Profile", true],
  ["Rice University", "meets 100% demonstrated need для принятых иностранцев", false],
  ["Rhodes College", "Bellingrath / Trustees — до полного покрытия по merit + need", false],
  ["University of Richmond", "Richmond Scholars (полное обучение + жильё) + 100% need", false],
  ["Simmons University", "Kotzen Scholarship — full tuition + жильё (для девушек, merit)", false],
  ["Skidmore College", "meets 100% demonstrated need (очень высокий средний грант ~$58k)", false],
  ["Smith College", "meets 100% demonstrated need + STRIDE merit (женский колледж)", false],
  ["Stanford University", "meets 100% demonstrated need (need-aware для иностранцев)", false],
  ["Swarthmore College", "meets 100% need без займов + McCabe/Evans awards", false],
  ["Trinity College", "meets 100% demonstrated need для принятых иностранцев", false],
  ["Tufts University", "meets 100% demonstrated need для принятых иностранцев", false],
  ["Tulane University", "Dean's Honor / Paul Tulane full-tuition + Stamps full ride", false],
  ["University of North Carolina at Chapel Hill", "Morehead-Cain / Robertson Scholars — full ride по merit", false],
  ["Union College", "щедрый need + merit для иностранцев (STEM/LAC)", false],
  ["University of Chicago", "Odyssey / Stamps / IFAW (бесплатная подача вместо CSS)", false],
  ["University of Pennsylvania", "meets 100% demonstrated need без займов (Penn Grant)", false],
  ["University of Rochester", "Handler Scholarship + Alan & Jane Handler / need-based", false],
  ["Vanderbilt University", "Cornelius Vanderbilt / Ingram / Chancellor's — full tuition + летняя стипендия", false],
  ["Vassar College", "meets 100% demonstrated need (need-aware)", false],
  ["Washington and Lee", "need-blind для иностранцев + Johnson Scholarship (full ride по merit)", true],
  ["Washington University in St. Louis", "Danforth / Ervin / Rodriguez full-tuition + 100% need", false],
  ["Wellesley College", "meets 100% demonstrated need для принятых иностранцев", false],
  ["Wesleyan University", "Freeman Asian Scholars + 100% demonstrated need", false],
  ["Whitman College", "WISFAA (бесплатная форма помощи), комбинация merit + need", false],
  ["Williams College", "meets 100% demonstrated need включая бесплатные учебники (Book Grant)", false],
  ["Yale University", "need-blind для всех стран мира, 100% demonstrated need без займов", true],
];

for (const [name, note, isNeedBlind] of TSVIRKKOO) {
  const u = findUni(name);
  if (!u) continue;
  const p = getPatch(u.slug);
  promoteBool(u, p, "full_grant", "tsvirkkoo");
  if (isNeedBlind) {
    promoteBool(u, p, "need_blind", "tsvirkkoo");
    setIfMissing(u, p, "intl_aid_policy", "need-blind", "tsvirkkoo");
  }
  appendNote(u, p, `Полное финансирование: ${note}.`, "tsvirkkoo");
}

// ------------------------------------------------------------
// 3. Full-ride_scholarships4.pdf (103 Merit Scholarships)
// ------------------------------------------------------------
const cleanMerit = [];
for (const row of parsed.merit_103) {
  const cleanRow = {
    state: row.state.replace(/^State\s+/i, "").trim(),
    school: row.school.replace(/^School Name\s+/i, "").replace(/Õ/g, "'").trim(),
    scholarship: row.scholarship.replace(/^Scholarship Name\s+/i, "").replace(/Õ/g, "'").trim(),
    value: row.value.replace(/^Value\s+/i, "").trim(),
    requirements: row.requirements.replace(/^Minimum Requirements\s+/i, "").replace(/\s+/g, " ").trim(),
  };
  cleanMerit.push(cleanRow);
  const u = findUni(cleanRow.school, "USA");
  if (!u) continue;
  const p = getPatch(u.slug);
  mergeAidTypes(u, p, ["Merit"], "merit103");
  if (/full\s*ride/i.test(cleanRow.value)) {
    promoteBool(u, p, "full_grant", "merit103");
  }
  const scholLabel =
    cleanRow.scholarship && cleanRow.scholarship !== "Various"
      ? `${cleanRow.scholarship} (${cleanRow.value})`
      : cleanRow.value;
  setIfMissing(u, p, "merit_scholarship_name", scholLabel, "merit103");
  setIfMissing(u, p, "aid_max", cleanRow.value, "merit103");
  if (cleanRow.requirements && !/case by case/i.test(cleanRow.requirements)) {
    appendNote(
      u,
      p,
      `Стипендия ${cleanRow.scholarship || "Merit"} (${cleanRow.value}): мин. требования — ${cleanRow.requirements}.`,
      "merit103",
    );
  }
}
fs.writeFileSync(path.join(SCRATCH, "merit_103_clean.json"), JSON.stringify(cleanMerit, null, 2));

// ------------------------------------------------------------
// 4. Financial_Aid_for_International_students.pdf (59 colleges)
// ------------------------------------------------------------
for (const r of parsed.fin_aid_47) {
  const u = findUni(r.university, "USA");
  if (!u) continue;
  const p = getPatch(u.slug);
  if (/\$[0-9,]+/.test(r.total_aid || "")) {
    const rawNum = Number(r.total_aid.replace(/[^0-9]/g, ""));
    if (rawNum >= 500000) {
      const m = `$${(rawNum / 1e6).toFixed(1)}m`;
      setIfMissing(u, p, "total_aid_millions", m, "finaid47");
    }
  }
  if (/\$[0-9,]+/.test(r.avg_aid || "")) {
    setIfMissing(u, p, "avg_aid_award", r.avg_aid, "finaid47");
  }
  if (r.aid_type) {
    if (/need-?blind/i.test(r.aid_type)) promoteBool(u, p, "need_blind", "finaid47");
    if (/full/i.test(r.aid_type)) promoteBool(u, p, "full_grant", "finaid47");
  }
  if (r.comments && r.comments.length > 30) {
    appendNote(u, p, `Официальная политика помощи: ${r.comments}`, "finaid47");
  }
}

// ------------------------------------------------------------
// 5. Uni_list_full.xlsx (DREAM, TARGET, BACKUP, fin aid, EDEARD)
// ------------------------------------------------------------
function parseMoneyNum(str) {
  const s = String(str || "").trim();
  if (!s || /^#/.test(s)) return null;
  // Handle Excel "18.191" thousands separator vs "$73,236.00"
  const clean = s.replace(/\$/g, "").replace(/\.00$/, "");
  const num = Number(clean.replace(/,/g, ""));
  return Number.isFinite(num) && num > 0 ? Math.round(num) : null;
}
function parsePct(str) {
  const s = String(str || "").trim();
  if (!s || /^#/.test(s)) return null;
  if (s.endsWith("%")) {
    const n = Number(s.slice(0, -1));
    return Number.isFinite(n) && n >= 0 && n <= 100 ? Math.round(n * 10) / 10 : null;
  }
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  if (n > 0 && n <= 1) return Math.round(n * 1000) / 10;
  return n <= 100 ? Math.round(n * 10) / 10 : null;
}

const fullSheets = bundle.xlsx["media_1794577212545_1352fade.xlsx"];
for (const [sname, rows] of Object.entries(fullSheets)) {
  if (!rows.length) continue;
  const hdr = rows[0].map((h) => String(h || "").toLowerCase().trim());
  const col = (sub) => hdr.findIndex((h) => h.includes(sub));
  const iInst = col("institution");
  const iType = hdr.indexOf("institution type");
  const iCoa = col("total cost");
  const iAvgAid = col("average aid");
  const iRd = col("rd acceptance");
  const iEd = col("ed acceptance");
  const iClassEd = col("percent of class filled");
  const iUg = col("full-time undergraduates");
  const iIntlCount = col("full-time nonresident");
  const iIntlPct = col("percentage of nonresident aliens to all");
  const iNeed = col("policy: need");
  const iMerit = col("policy: merit");
  const iIntlRecv = col("percentage of nonresident aliens receiving");
  const iPlans = col("additional admission");
  const iMajors = hdr.findIndex((h) => h.includes("strong programm") || h.includes("top 5 major"));
  const iLoc = col("location");
  const iSatRw = col("reading");
  const iSatMath = col("math");

  for (const r of rows.slice(1)) {
    const u = findUni(r[iInst], "USA");
    if (!u) continue;
    const p = getPatch(u.slug);
    if (iLoc >= 0 && r[iLoc]) setIfMissing(u, p, "city", r[iLoc], "unilist");
    if (iType >= 0 && r[iType]) setIfMissing(u, p, "inst_type", r[iType], "unilist");
    if (iCoa >= 0) {
      const coa = parseMoneyNum(r[iCoa]);
      if (coa && coa >= 5000 && coa <= 120000) {
        setIfMissing(u, p, "tuition_num", coa, "unilist");
        setIfMissing(u, p, "tuition_display", `$${coa.toLocaleString("en-US")} / год (COA)`, "unilist");
      }
    }
    if (iAvgAid >= 0) {
      const aid = parseMoneyNum(r[iAvgAid]);
      if (aid && aid >= 1000 && aid <= 110000) {
        setIfMissing(u, p, "avg_aid_award", `$${aid.toLocaleString("en-US")}`, "unilist");
      }
    }
    if (iRd >= 0) {
      const pct = parsePct(r[iRd]);
      if (pct != null && pct > 0) {
        setIfMissing(u, p, "rate_num", pct, "unilist");
        setIfMissing(u, p, "acceptance_rate", `${pct}%`, "unilist");
      }
    }
    if (iIntlRecv >= 0) {
      const pct = parsePct(r[iIntlRecv]);
      if (pct != null && pct > 0) setIfMissing(u, p, "intl_receiving_aid_pct", `${pct}%`, "unilist");
    }
    if (iUg >= 0 && r[iUg]) {
      const ugRaw = String(r[iUg]).replace(/\.(?=\d{3}$)/, "").replace(/\.0$/, "");
      const ug = Number(ugRaw.replace(/,/g, ""));
      if (ug > 50) setIfMissing(u, p, "undergrad_enrollment", ug.toLocaleString("en-US"), "unilist");
    }
    if (iIntlCount >= 0 && r[iIntlCount]) {
      const icRaw = String(r[iIntlCount]).replace(/\.(?=\d{3}$)/, "").replace(/\.0$/, "");
      const ic = Number(icRaw.replace(/,/g, ""));
      if (ic >= 0 && ic < 40000) setIfMissing(u, p, "intl_undergrad_count", String(ic), "unilist");
    }
    if (iIntlPct >= 0) {
      const ip = parsePct(r[iIntlPct]);
      if (ip != null && ip > 0) setIfMissing(u, p, "intl_undergrad_pct", `${ip}%`, "unilist");
    }
    const at = [];
    if (iNeed >= 0 && String(r[iNeed]).toLowerCase() === "x") at.push("Need-based");
    if (iMerit >= 0 && String(r[iMerit]).toLowerCase() === "x") at.push("Merit");
    if (at.length) mergeAidTypes(u, p, at, "unilist");

    if (iSatRw >= 0 && iSatMath >= 0 && r[iSatRw] && r[iSatMath]) {
      const rw = r[iSatRw].match(/(\d{3})\s*-\s*(\d{3})/);
      const mt = r[iSatMath].match(/(\d{3})\s*-\s*(\d{3})/);
      if (rw && mt) {
        const lo = Number(rw[1]) + Number(mt[1]);
        const hi = Number(rw[2]) + Number(mt[2]);
        setIfMissing(u, p, "sat", `${lo}–${hi} (CDS 25–75%)`, "unilist");
      }
    }
    if (iMajors >= 0) {
      const maj = r.slice(iMajors, iMajors + 5).filter((x) => x && !/^#/.test(x) && !/25th|location|sat/i.test(x));
      if (maj.length && sname === "DREAM") {
        setIfMissing(u, p, "majors", maj.join(", "), "unilist");
      } else if (maj[0]) {
        setIfMissing(u, p, "majors", maj[0], "unilist");
      }
    }
    const edPct = iEd >= 0 ? parsePct(r[iEd]) : null;
    const classEdPct = iClassEd >= 0 ? parsePct(r[iClassEd]) : null;
    const plans = iPlans >= 0 ? r[iPlans] : "";
    if (edPct || plans) {
      const parts = [];
      if (edPct) parts.push(`ED acceptance: ${edPct}%`);
      if (classEdPct) parts.push(`доля класса по ED: ${classEdPct}%`);
      if (plans) parts.push(`раунды подачи: ${plans}`);
      appendNote(u, p, `Статистика CDS (${sname}): ${parts.join(", ")}.`, "unilist");
    }
  }
}

// ------------------------------------------------------------
// 6. Universities_List.xlsx (26 Country Tabs)
// ------------------------------------------------------------
function cleanExcelDeadline(val) {
  const s = String(val || "").trim();
  if (!s || /^#/.test(s) || /^(no|none|n\/a|-)$/i.test(s)) return null;
  // Convert "2022-11-01 00:00:00" -> "1 ноября"
  const m = s.match(/^20\d{2}-(\d{2})-(\d{2})/);
  if (m) {
    const months = [
      "",
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const mo = Number(m[1]);
    const day = Number(m[2]);
    if (mo >= 1 && mo <= 12 && day >= 1 && day <= 31) {
      return `${day} ${months[mo]}`;
    }
  }
  return s.length <= 60 ? s : null;
}

const countrySheets = bundle.xlsx["media_1794577212546_3d50caa2.xlsx"];
for (const [tabName, rows] of Object.entries(countrySheets)) {
  if (rows.length < 3) continue;
  const hdr = rows[1].map((h) => String(h || "").toLowerCase().trim());
  const idx = (sub) => hdr.findIndex((h) => h.includes(sub));
  const iUni = idx("университет");
  const iCountry = idx("страна");
  const iCity = idx("город");
  const iCost = idx("стоимость обучения");
  const iRate = idx("процент поступления");
  const iAid = idx("максимальная финансовая");
  const iFull = idx("полный грант");
  const iEd = idx("дедлайн ранней");
  const iRd = idx("дедлайн основной");
  const iLang = idx("toefl");
  const iSat = idx("sat");
  const iEssay = idx("эссе");
  const iMaj = idx("профессии");

  for (const r of rows.slice(2)) {
    const u = findUni(r[iUni], r[iCountry] || tabName);
    if (!u) continue;
    const p = getPatch(u.slug);
    if (iCity >= 0 && r[iCity]) setIfMissing(u, p, "city", r[iCity], "unilists");
    if (iCost >= 0 && r[iCost] && !Number.isNaN(Number(r[iCost]))) {
      const c = Math.round(Number(r[iCost]));
      if (c > 0 && c < 200000) {
        setIfMissing(u, p, "tuition_num", c, "unilists");
        setIfMissing(u, p, "tuition_display", `$${c.toLocaleString("en-US")} / год`, "unilists");
      }
    }
    if (iRate >= 0) {
      const pct = parsePct(r[iRate]);
      if (pct != null && pct > 0) {
        setIfMissing(u, p, "rate_num", pct, "unilists");
        setIfMissing(u, p, "acceptance_rate", `${pct}%`, "unilists");
      }
    }
    if (iAid >= 0 && r[iAid] && r[iAid] !== "0") setIfMissing(u, p, "aid_max", r[iAid], "unilists");
    if (iFull >= 0 && /^(true|да|yes|1)$/i.test(String(r[iFull]).trim())) {
      promoteBool(u, p, "full_grant", "unilists");
    }
    if (iEd >= 0) {
      const d = cleanExcelDeadline(r[iEd]);
      if (d) setIfMissing(u, p, "early_deadline", d, "unilists");
    }
    if (iRd >= 0) {
      const d = cleanExcelDeadline(r[iRd]);
      if (d) setIfMissing(u, p, "regular_deadline", d, "unilists");
    }
    if (iLang >= 0 && r[iLang]) setIfMissing(u, p, "lang", r[iLang], "unilists");
    if (iSat >= 0 && r[iSat]) setIfMissing(u, p, "sat", r[iSat], "unilists");
    if (iEssay >= 0 && r[iEssay]) setIfMissing(u, p, "essay", r[iEssay], "unilists");
    if (iMaj >= 0 && r[iMaj]) setIfMissing(u, p, "majors", r[iMaj], "unilists");
  }
}

// ------------------------------------------------------------
// 7. Canada_unis.pdf (24 Canadian institutions)
// ------------------------------------------------------------
for (const c of parsed.canada_24) {
  const u = findUni(c.name, "Canada");
  if (!u) continue;
  const p = getPatch(u.slug);
  if (c.region) setIfMissing(u, p, "city", c.region, "canada24");
  if (c.specializations) setIfMissing(u, p, "majors", c.specializations, "canada24");
  if (c.acceptance_rate) {
    const nums = c.acceptance_rate.match(/\d+/g);
    if (nums?.length) {
      const avg = nums.length >= 2 ? Math.round((Number(nums[0]) + Number(nums[1])) / 2) : Number(nums[0]);
      setIfMissing(u, p, "rate_num", avg, "canada24");
      setIfMissing(u, p, "acceptance_rate", c.acceptance_rate, "canada24");
    }
  }
  if (/full\s*ride|100%|full\s*tuition/i.test(c.financial_aid)) {
    promoteBool(u, p, "full_grant", "canada24");
  }
  if (c.financial_aid) {
    appendNote(u, p, `Финансирование в Канаде (CAD): ${c.financial_aid}.`, "canada24");
  }
}

// ------------------------------------------------------------
// 8. UNION 800+ Internal Scholarships & Affordable EU Unis
// ------------------------------------------------------------
const UNION_PATCHES = [
  [
    "university-of-toronto-canada",
    {
      merit_scholarship_name: "Lester B. Pearson International Scholarship (~37 чел./год, полное покрытие)",
      majors: "Computer Science, Business, Engineering, Economics, Life Sciences, Psychology",
      full_grant: true,
    },
  ],
  [
    "university-of-british-columbia-canada",
    {
      merit_scholarship_name: "International Scholars Program (~50–60 чел./год, need + merit)",
      majors: "Computer Science, Business, Engineering, Economics, Environmental Science",
      full_grant: true,
    },
  ],
  [
    "york-university-canada",
    {
      merit_scholarship_name: "President's International Scholarship of Excellence (PISE, до ~45,000 CAD / 4 года)",
      majors: "Business, Computer Science, Engineering, Psychology, Law, Media",
    },
  ],
  [
    "sciences-po-france",
    {
      merit_scholarship_name: "Emile Boutmy Scholarship (до ~€19,000/год на обучение и проживание)",
      majors: "Economics, Political Science, International Relations",
      aid_max: "До ~€19,000/год (Emile Boutmy)",
    },
  ],
  [
    "university-of-padua-italy",
    {
      merit_scholarship_name: "Padua International Excellence Scholarship (обучение + €8,000/год, квота 67)",
      majors: "Data Science, Information Engineering, Psychology",
      full_grant: true,
    },
  ],
  [
    "ie-university-spain",
    {
      merit_scholarship_name: "IE Scholarship for Personal Excellence (до full ride, квота 2 на курс)",
      majors: "Economics, Business, Data Analytics",
      full_grant: true,
    },
  ],
  [
    "kaist-south-korea",
    {
      merit_scholarship_name: "KAIST International Student Scholarship (100% обучение + стипендия + общежитие)",
      majors: "AI, Computer Science, Robotics, Engineering",
      full_grant: true,
    },
  ],
  [
    "hong-kong-university-of-science-and-technology-hong-kong",
    {
      merit_scholarship_name: "HKUST Global Learners / Admission Scholarship (100% освобождение от оплаты)",
      majors: "Computer Science, Economics, Business, Quantitative Finance",
      full_grant: true,
    },
  ],
  [
    "national-university-of-singapore-singapore",
    {
      merit_scholarship_name: "NUS International Undergraduate Scholarship (100% + S$4,500/г + S$3,900 общ. + S$1,300 ПК, квота ~20–30)",
      majors: "Computer Science, Data Science, Business, Engineering",
      full_grant: true,
    },
  ],
  [
    "nanyang-technological-university-singapore",
    {
      merit_scholarship_name: "NTU President Award ($10,000 пособие + 4 года общежития + $10,000 на поездки + bursaries)",
      majors: "AI, Computer Science, Engineering, Data Science",
      full_grant: true,
    },
  ],
  [
    "university-of-lisbon-portugal",
    {
      tuition_display: "€1,000–2,500 / год",
      living_note: "Стоимость жизни в Лиссабоне: ~€900/мес",
      majors: "Data Science, Engineering, Applied Mathematics",
    },
  ],
  [
    "university-of-porto-portugal",
    {
      tuition_display: "€1,000–2,500 / год",
      living_note: "Стоимость жизни в Порту: ~€800/мес",
      majors: "Computer Science, Business, Economics",
    },
  ],
  [
    "ku-leuven-belgium",
    {
      tuition_display: "€2,000–3,000 / год",
      living_note: "Стоимость жизни в Лёвене: ~€900/мес",
      majors: "Economics, Business, Engineering",
    },
  ],
  [
    "ghent-university-belgium",
    {
      tuition_display: "€1,800–4,800 / год",
      living_note: "Стоимость жизни в Генте: ~€900/мес",
      majors: "Computer Science, Engineering, Social Sciences",
    },
  ],
];

for (const [slug, info] of UNION_PATCHES) {
  const u = bySlug.get(slug);
  if (!u) continue;
  const p = getPatch(slug);
  if (info.full_grant) promoteBool(u, p, "full_grant", "union");
  if (info.merit_scholarship_name) setIfMissing(u, p, "merit_scholarship_name", info.merit_scholarship_name, "union");
  if (info.aid_max) setIfMissing(u, p, "aid_max", info.aid_max, "union");
  if (info.majors) setIfMissing(u, p, "majors", info.majors, "union");
  if (info.living_note) setIfMissing(u, p, "living_note", info.living_note, "union");
  if (info.tuition_display && !u.tuition_display) {
    setIfMissing(u, p, "tuition_display", info.tuition_display, "union");
  }
}

fs.writeFileSync(ENRICH_PATH, JSON.stringify(enrichment, null, 2));

// Write idempotent SQL migration for all enriched columns
const esc = (v) => `'${String(v).replace(/'/g, "''")}'`;
const sqlLines = [
  "-- Enrich university rows from verified admissions spreadsheets, CSS waiver tables, merit full-ride & Canada datasets",
  "BEGIN;",
];
for (const slug of [...stats.patchedSlugs].sort()) {
  const p = enrichment[slug];
  if (!p) continue;
  const sets = [];
  if (p.city) sets.push(`city = COALESCE(NULLIF(city, ''), ${esc(p.city)})`);
  if (p.tuition_num && p.tuition_display) {
    sets.push(`tuition_num = COALESCE(tuition_num, ${p.tuition_num})`);
    sets.push(`tuition_display = COALESCE(NULLIF(tuition_display, ''), ${esc(p.tuition_display)})`);
  } else if (p.tuition_display) {
    sets.push(`tuition_display = COALESCE(NULLIF(tuition_display, ''), ${esc(p.tuition_display)})`);
  }
  if (p.rate_num != null && p.acceptance_rate) {
    sets.push(`rate_num = COALESCE(rate_num, ${p.rate_num})`);
    sets.push(`acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), ${esc(p.acceptance_rate)})`);
  }
  if (p.full_grant) sets.push(`full_grant = true`);
  if (p.need_blind) sets.push(`need_blind = true`);
  if (p.aid_max) sets.push(`aid_max = COALESCE(NULLIF(aid_max, ''), ${esc(p.aid_max)})`);
  if (p.total_aid_millions) sets.push(`total_aid_millions = COALESCE(NULLIF(total_aid_millions, ''), ${esc(p.total_aid_millions)})`);
  if (p.avg_aid_award) sets.push(`avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), ${esc(p.avg_aid_award)})`);
  if (p.intl_receiving_aid_pct) sets.push(`intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), ${esc(p.intl_receiving_aid_pct)})`);
  if (p.intl_aid_policy) sets.push(`intl_aid_policy = COALESCE(NULLIF(intl_aid_policy, ''), ${esc(p.intl_aid_policy)})`);
  if (p.how_apply_aid) sets.push(`how_apply_aid = ${esc(p.how_apply_aid)}`);
  if (p.merit_scholarship_name) sets.push(`merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), ${esc(p.merit_scholarship_name)})`);
  if (p.early_deadline) sets.push(`early_deadline = COALESCE(NULLIF(early_deadline, ''), ${esc(p.early_deadline)})`);
  if (p.regular_deadline) sets.push(`regular_deadline = COALESCE(NULLIF(regular_deadline, ''), ${esc(p.regular_deadline)})`);
  if (p.lang) sets.push(`lang = COALESCE(NULLIF(lang, ''), ${esc(p.lang)})`);
  if (p.sat) sets.push(`sat = COALESCE(NULLIF(sat, ''), ${esc(p.sat)})`);
  if (p.essay) sets.push(`essay = COALESCE(NULLIF(essay, ''), ${esc(p.essay)})`);
  if (p.majors) sets.push(`majors = COALESCE(NULLIF(majors, ''), ${esc(p.majors)})`);
  if (p.living_note) sets.push(`living_note = COALESCE(NULLIF(living_note, ''), ${esc(p.living_note)})`);
  if (p.notes) sets.push(`notes = ${esc(p.notes)}`);
  if (sets.length) {
    sqlLines.push(`UPDATE public.universities SET ${sets.join(", ")} WHERE slug = ${esc(slug)};`);
  }
}
sqlLines.push("COMMIT;");
fs.writeFileSync(SQL_OUT, sqlLines.join("\n"));

console.log(`Enrichment total entries: ${Object.keys(enrichment).length}`);
console.log(`Newly enriched slugs from user files: ${stats.patchedSlugs.size}`);
console.log("Breakdown:", stats.sources);
console.log("Clean Merit 103 count:", cleanMerit.length);
