import domainsJson from "@/scripts/logo-output/domains.json";
import enrichmentJson from "@/lib/university-enrichment.json";
import type { University } from "./types";

const EXTRA_DOMAINS: Record<string, string> = domainsJson as Record<string, string>;

interface EnrichmentPatch {
  city?: string;
  tuition_num?: number;
  tuition_display?: string;
  rate_num?: number;
  acceptance_rate?: string;
  undergrad_enrollment?: string;
  intl_undergrad_pct?: string;
  intl_undergrad_count?: string;
  sat?: string;
  inst_type?: string;
  inst_tags?: string[];
  majors?: string;
  notes?: string;
}

const ENRICHMENT: Record<string, EnrichmentPatch> = enrichmentJson as Record<string, EnrichmentPatch>;

/**
 * Explicit duplicate university slug mappings: duplicateSlug -> canonicalSlug.
 * In addition, any `*-partial-usa` slug automatically maps to `*-usa` unless overridden here.
 */
export const DUPLICATE_SLUG_MAP: Record<string, string> = {
  // MIT (4 -> 1)
  "massachusetts-inst-of-technology-usa": "massachusetts-institute-of-technology-usa",
  "massachusetts-institute-usa": "massachusetts-institute-of-technology-usa",
  "mit-usa": "massachusetts-institute-of-technology-usa",

  // RIT (3 US -> 1; Dubai campus kept separate)
  "rochester-institute-of-usa": "rochester-institute-of-technology-usa",
  "rochester-institute-usa": "rochester-institute-of-technology-usa",

  // Caltech (5 -> 1)
  "california-institute-of-usa": "california-institute-of-technology-usa",
  "california-institute-usa": "california-institute-of-technology-usa",
  "california-institute-of-technology-caltech-usa": "california-institute-of-technology-usa",
  "caltech-usa": "california-institute-of-technology-usa",

  // Brandeis (4 -> 1)
  "brandeis-univeristy-usa": "brandeis-university-usa",
  "brandeis-usa": "brandeis-university-usa",
  "brandeis-university-partial-usa": "brandeis-university-usa",

  // Spilled name-into-city duplicates
  "florida-institute-usa": "florida-institute-of-technology-usa",
  "franklin-w-olin-college-usa": "olin-college-of-engineering-usa",
  "georgia-institute-usa": "georgia-institute-of-technology-usa",
  "illinois-institute-usa": "illinois-institute-of-technology-usa",
  "new-jersey-institute-usa": "new-jersey-institute-of-technology-usa",
  "new-york-institute-usa": "new-york-institute-of-technology-usa",
  "rensselaer-polytechnic-usa": "rensselaer-polytechnic-institute-usa",
  "rose-hulman-institute-usa": "rose-hulman-inst-of-technology-usa",
  "stevens-institute-usa": "stevens-institute-of-technology-usa",
  "worcester-polytechnic-usa": "worcester-polytechnic-institute-usa",
  "soka-university-usa": "soka-university-of-america-usa",
  "the-college-usa": "college-of-wooster-usa",
  "wooster-college-of-partial-usa": "college-of-wooster-usa",
  "university-of-central-usa": "university-of-central-florida-usa",
  "university-of-usa": "university-of-alabama-birmingham-usa",
  "loyola-university-usa": "loyola-university-chicago-usa",
  "westminster-college-usa": "westminster-college-ut-usa",
  "california-polytechnic-state-university-usa": "california-state-poly-u-pomona-usa",
  "missouri-university-usa": "missouri-u-of-science-and-technology-usa",
  "indiana-u-purdue-usa": "indiana-u-purdue-u-indianapolis-usa",

  // US same-campus duplicates & typos
  "arizona-state-university-tempe-usa": "arizona-state-university-usa",
  "brigham-young-university-provo-usa": "brigham-young-university-usa",
  "california-state-university-long-beach-long-usa": "california-state-university-long-beach-usa",
  "california-state-university-los-angeles-los-usa": "california-state-university-los-angeles-usa",
  "college-of-the-atlantic-bar-usa": "college-of-the-atlantic-usa",
  "colorado-state-university-fort-collins-fort-usa": "colorado-state-university-fort-collins-usa",
  "university-of-colorado-usa": "university-of-colorado-boulder-usa",
  "columbia-university-college-and-seas-usa": "columbia-university-usa",
  "connecticut-colege-usa": "connecticut-college-usa",
  "baruch-college-usa": "cuny-baruch-college-usa",
  "cuny-bernard-m-baruch-college-usa": "cuny-baruch-college-usa",
  "university-of-south-florida-main-campus-usa": "university-of-south-florida-tampa-usa",
  "grinnel-college-usa": "grinnell-college-usa",
  "hobart-william-smith-usa": "hobart-and-william-smith-colleges-usa",
  "university-of-illinois-at-chicago-usa": "university-of-illinois-chicago-usa",
  "u-of-illinios-chicago-usa": "university-of-illinois-chicago-usa",
  "university-of-illinois-urbana-champaign-usa": "university-of-illinois-at-urbana-champaign-usa",
  "indiana-university-usa": "indiana-university-bloomington-usa",
  "long-island-university-liu-usa": "long-island-university-liu-post-usa",
  "mt-holyoke-college-usa": "mount-holyoke-college-usa",
  "northwestern-usa": "northwestern-university-usa",
  "oberlin-college-and-conservatory-usa": "oberlin-college-usa",
  "penn-state-u-university-park-usa": "pennsylvania-state-university-usa",
  "purdue-university-west-lafayette-west-usa": "purdue-university-west-lafayette-usa",
  "university-of-maryland-college-usa": "university-of-maryland-usa",
  "university-of-maryland-college-park-usa": "university-of-maryland-usa",
  "miami-university-oxford-usa": "miami-university-ohio-usa",
  "university-of-new-mexico-main-campus-usa": "university-of-new-mexico-usa",
  "north-carolina-state-university-raleigh-usa": "north-carolina-state-university-usa",
  "university-of-north-carolina-chapel-hill-usa": "university-of-north-carolina-at-chapel-hill-usa",
  "university-of-north-carolina-charlotte-usa": "university-of-north-carolina-at-charlotte-usa",
  "uiversity-of-notre-dame-usa": "university-of-notre-dame-usa",
  "ohio-state-university-columbus-usa": "ohio-state-university-usa",
  "ohio-state-university-main-campus-usa": "ohio-state-university-usa",
  "university-of-oklahoma-norman-campus-usa": "university-of-oklahoma-usa",
  "sewanee-university-of-the-south-usa": "sewanee-the-university-of-the-south-usa",
  "university-of-the-south-partial-usa": "sewanee-the-university-of-the-south-usa",
  "skidmore-college-saratoga-springsny-usa": "skidmore-college-usa",
  "st-john-s-college-annapolis-md-usa": "st-john-s-college-annapolis-usa",
  "st-john-s-college-partial-usa": "st-john-s-college-annapolis-usa",
  "st-john-s-college-santa-fe-nm-usa": "st-john-s-college-santa-fe-usa",
  "suny-binghamton-usa": "suny-binghamton-university-usa",
  "suny-stony-brook-usa": "suny-stony-brook-university-usa",
  "susquehanna-college-usa": "susquehanna-university-usa",
  "texas-a-m-university-college-station-college-usa": "texas-a-m-university-usa",
  "university-of-texas-austin-usa": "university-of-texas-at-austin-usa",
  "university-of-texas-dallas-usa": "university-of-texas-at-dallas-usa",
  "trinity-college-usa": "trinity-college-ct-usa",
  "union-college-usa": "union-college-ny-usa",
  "union-college-partial-usa": "union-college-ny-usa",
  "university-of-cincinnati-main-campus-usa": "university-of-cincinnati-usa",
  "university-of-hawaii-manoa-usa": "university-of-hawaii-at-manoa-usa",
  "university-of-south-carolina-columbia-usa": "university-of-south-carolina-usa",
  "university-of-st-thomas-st-usa": "university-of-st-thomas-usa",
  "university-of-tennesee-knoxville-usa": "university-of-tennessee-knoxville-usa",
  "university-of-utah-salt-lake-usa": "university-of-utah-usa",
  "university-of-virginia-main-campus-usa": "university-of-virginia-usa",
  "washington-amp-lee-university-usa": "washington-and-lee-usa",
  "washington-university-usa": "washington-university-in-st-louis-usa",
  "wheaton-college-usa": "wheaton-college-il-usa",
  "wheaton-college-partial-usa": "wheaton-college-il-usa",

  // International duplicates (Canada, Germany, Hungary, Belgium, Hong Kong, South Korea, Turkey)
  "queen-x27-s-university-at-kingston-canada": "queen-s-university-at-kingston-canada",
  "simon-fraser-university-sfu-canada": "simon-fraser-university-canada",
  "uofwindsor-canada": "university-of-windsor-canada",
  "eberhard-karls-universit-t-t-bingen-germany": "university-of-t-bingen-germany",
  "eszterh-zy-k-roly-catholic-university-hungary": "eszterh-zy-k-roly-university-hungary",
  "k-roli-g-sp-r-university-of-the-reformed-church-in-hungary-hungary":
    "k-roli-g-sp-r-university-of-the-reformed-church-hungary",
  "ghent-univeristy-belgium": "ghent-university-belgium",
  "hong-kong-university-of-science-and-technology-hkust-hong-kong":
    "hong-kong-university-of-science-and-technology-hong-kong",
  "kaist-korea-advanced-institute-of-science-and-technology-korea": "kaist-south-korea",
  "pohang-university-south-korea": "postech-pohang-university-of-science-and-technology-korea",
  "sungkyunkwan-university-korea": "sungkyunkwan-university-skku-south-korea",
  "yonsei-university-underwood-international-college-south-korea": "yonsei-university-korea",
  "hufs-south-korea": "hankuk-university-of-foreign-studies-korea",

  // Turkish duplicates (Turkish-name rows merged into English-name rows where both exist)
  "a-r-i-brahim-ecen-ahi-evran-niversitesi-turkey": "a-r-i-brahim-e-en-niversitesi-turkey",
  "anadolu-niversitesi-turkey": "anadolu-university-turkey",
  "ankara-niversitesi-turkey": "ankara-university-turkey",
  "at-l-m-niversitesi-turkey": "atilim-university-turkey",
  "atat-rk-niversitesi-turkey": "atat-rk-university-turkey",
  "bah-e-ehir-niversitesi-turkey": "bahcesehir-university-turkey",
  "ba-kent-niversitesi-turkey": "baskent-university-turkey",
  "bo-azi-i-niversitesi-turkey": "bo-azi-i-university-bosphorus-university-turkey",
  "ankaya-niversitesi-turkey": "cankaya-university-turkey",
  "dokuz-eyl-l-niversitesi-turkey": "dokuz-eyl-l-university-turkey",
  "f-rat-niversitesi-turkey": "firat-university-turkey",
  "hacettepe-niversitesi-turkey": "hacettepe-university-turkey",
  "i-hsan-do-ramac-bilkent-niversitesi-turkey": "bilkent-university-turkey",
  "i-stanbul-bilgi-niversitesi-turkey": "istanbul-bilgi-university-turkey",
  "i-stanbul-k-lt-r-niversitesi-turkey": "istanbul-culture-university-turkey",
  "i-stanbul-medipol-niversitesi-turkey": "istanbul-medipol-university-turkey",
  "i-stanbul-ehir-niversitesi-turkey": "istanbul-sehir-university-turkey",
  "i-stanbul-teknik-niversitesi-turkey": "istanbul-technical-university-turkey",
  "i-zmir-ekonomi-niversitesi-turkey": "izmir-university-of-economics-turkey",
  "kadir-has-niversitesi-turkey": "kadir-has-university-turkey",
  "kafkas-niversitesi-kahramanmara-turkey": "kafkas-niversitesi-turkey",
  "s-t-i-mam-niversitesi-turkey": "kahramanmara-s-t-i-mam-niversitesi-turkey",
  "ko-niversitesi-turkey": "ko-university-turkey",
  "orta-do-u-teknik-niversitesi-turkey": "middle-east-technical-university-turkey",
  "zye-in-niversitesi-turkey": "ozyegin-university-turkey",
  "pamukkale-niversitesi-turkey": "pamukkale-university-turkey",
  "sabanc-niversitesi-turkey": "sabanci-university-turkey",
  "ya-ar-niversitesi-turkey": "yasar-university-turkey",
  "y-ld-z-teknik-niversitesi-turkey": "yildiz-technical-university-istanbul-turkey",
};

/** Resolve any duplicate or partial slug to its canonical slug. */
export function canonicalSlug(slug: string): string {
  if (DUPLICATE_SLUG_MAP[slug]) return DUPLICATE_SLUG_MAP[slug];
  if (slug.endsWith("-partial-usa")) return slug.replace(/-partial-usa$/, "-usa");
  return slug;
}

const NAME_FIXES: Record<string, { name?: string; city?: string }> = {
  "suny-university-usa": { name: "SUNY - University at Albany", city: "Albany, NY" },
  "suny-usa": { name: "SUNY Oneonta", city: "Oneonta, NY" },
  "e-tv-s-lor-nd-university-hungary": { city: "Budapest" },
  "medical-university-of-vienna-austria": { city: "Vienna" },
  "queen-s-university-at-kingston-canada": { city: "Kingston, Ontario" },
  "cyprys-international-university-turkish-republic-of-northern-cyprus": {
    name: "Cyprus International University",
    city: "Northern Nicosia",
  },
  "stockholm-unversity-sweden": { name: "Stockholm University" },
  "ngee-ann-singapore": { name: "Ngee Ann Polytechnic", city: "Singapore" },
  "gebze-y-ksek-teknoloji-enstit-s-giresun-niversitesi-turkey": {
    name: "Gebze Technical University",
  },
  "the-academy-of-perfoming-arts-in-prague-czech-republic": {
    name: "The Academy of Performing Arts in Prague",
  },
  "washington-and-lee-usa": { name: "Washington and Lee University" },
};

const RANGE_TUITION_FIXES: Record<string, { display: string; num: number }> = {
  "daugavpils-university-latvia": { display: "€400–€3,000 / год", num: 3000 },
  "riga-international-school-of-economics-and-business-administration-latvia": {
    display: "€610–€6,000 / год",
    num: 6000,
  },
  "riga-stradins-university-latvia": { display: "€800–€14,000 / год", num: 14000 },
  "riga-technical-university-latvia": { display: "€600–€4,000 / год", num: 4000 },
  "university-of-latvia-riga-latvia": { display: "€200–€15,000 / год", num: 15000 },
  "zayed-university-uae": { display: "AED 75,000 / год", num: 20400 },
};

const MONTH_MAP: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

function toCycle2027Iso(month: number, day: number): string {
  // Admissions cycle 2026/2027: Oct 1 – Dec 31 is Fall 2026 (Early Action / Early Decision / Sem 1);
  // Jan 1 – Sep 30 is 2027 (Regular Decision / Spring & Autumn 2027 intakes).
  const year = month >= 10 ? 2026 : 2027;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Explicit cleanup for messy multi-phrase/ambiguous text deadlines across countries. */
const DEADLINE_FIXES: Record<string, { early?: string | null; regular?: string | null }> = {
  // Hungary
  "university-of-p-cs-hungary": { early: "2027-01-15", regular: "2027-06-30" },
  "p-zm-ny-p-ter-catholic-university-hungary": { early: "2027-03-31", regular: "2027-05-30" },
  // Spain
  "u-tad-university-of-technology-arts-and-design-spain": { early: "2027-06-30" },
  "united-international-business-school-spain": { early: "2027-05-31" },
  "ie-university-spain": { early: "Rolling", regular: "2027-05-31" },
  "istituto-europeo-di-design-spain": { early: "2027-06-30" },
  // UAE
  "the-british-university-in-dubai-uae": { early: "Зависит от программы", regular: null },
  "zayed-university-uae": { early: "2027-06-30", regular: null },
  "ajman-university-uae": { early: "2027-08-15", regular: null },
  "canadian-university-in-dubai-uae": { early: "2027-01-15", regular: "2027-08-31" },
  "united-arab-emirates-university-uae": { early: "2027-05-31", regular: "2027-07-31" },
  // Netherlands
  "utrecht-university-netherlands": { early: "2027-02-01", regular: "2027-04-01" },
  "university-of-amsterdam-netherlands": { early: "2027-01-15", regular: "2027-03-01" },
  "radboud-university-nijmegen-netherlands": { early: "2027-01-15", regular: "2027-04-01" },
  // Poland
  "jagiellonian-university-poland": { early: "2027-04-07", regular: "2027-06-13" },
  "university-of-gdansk-poland": { early: "2027-07-05", regular: "2027-09-09" },
  "university-of-rzesz-w-poland": { early: "2027-07-16", regular: null },
  "university-of-wroclaw-poland": { early: "2027-06-21", regular: "2027-08-31" },
  // Denmark (Quota 2 intl: Mar 15, Quota 1: Jul 5)
  "roskilde-university-denmark": { early: "2027-03-15", regular: "2027-07-05" },
  // South Korea
  "dongguk-university-south-korea": { early: "2027-05-15", regular: "2027-10-15" },
  "sogang-university-south-korea": { early: "2026-11-30", regular: "2027-05-15" },
  // Turkey
  "sabanci-university-turkey": { early: "2027-05-14", regular: "2027-07-02" },
  // Australia
  "university-of-new-south-wales-unsw-australia": { early: "2026-11-30", regular: "2027-03-31" },
  "university-of-adelaide-australia": { early: "Rolling", regular: null },
  // Singapore
  "singapore-management-university-singapore": { early: "2027-03-19", regular: "2027-07-15" },
  // Czech Republic
  "charles-university-czech-republic": { early: "2027-02-28", regular: "2027-04-30" },
  // Northern Cyprus
  "cyprys-international-university-turkish-republic-of-northern-cyprus": { early: "2027-08-30", regular: null },
  // UK (UCAS 2027 Equal Consideration: 2027-01-13; Oxbridge/Med: 2026-10-15)
  "ucl-university-college-of-london-uk": { early: null, regular: "2027-01-13" },
};

/**
 * Clean corrupted deadlines (shifted IELTS scores, raw URLs) and update past dates to the 2026/2027 cycle.
 */
export function normalizeDeadlineTo2027(raw: string | null | undefined): string | null {
  const s = (raw ?? "").trim();
  if (!s) return null;

  // Shifted IELTS scores or invalid non-deadline labels
  if (
    /^(5\.5|6|6\.5|7)$/.test(s) ||
    /^https?:\/\//i.test(s) ||
    /^(Civil and Structural Engineering|Deadline to provide proof|Scholarship offer acceptance)/i.test(s)
  ) {
    return null;
  }

  if (/^rolling$/i.test(s)) return "Rolling";

  // ISO date YYYY-MM-DD
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const [, yStr, mStr, dStr] = iso;
    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);
    if (y <= 2026) {
      return toCycle2027Iso(m, d);
    }
    return s;
  }

  // Concatenated multiple shorthand dates like "1-Nov 15-Jan" or "1-Nov15-Jan" -> take last date if Jan/Dec, or first
  const multi = [...s.matchAll(/(\d{1,2})[-\s]*([A-Za-z]{3,9})/g)];
  if (multi.length >= 1 && /^[\d\sA-Za-z-]+$/.test(s)) {
    const chosen = multi[multi.length - 1];
    const d = Number(chosen[1]);
    const m = MONTH_MAP[chosen[2].toLowerCase()];
    if (m && d >= 1 && d <= 31) {
      return toCycle2027Iso(m, d);
    }
  }

  // "Month Day" like "January 15", "February 1", "November 26", "May 15 https://..."
  const md = s.match(/^([A-Za-z]{3,9})\s+(\d{1,2})(?:\b|\s+https?:\/\/)/i);
  if (md && (s.length <= 20 || s.includes("http"))) {
    const m = MONTH_MAP[md[1].toLowerCase()];
    const d = Number(md[2]);
    if (m && d >= 1 && d <= 31) {
      return toCycle2027Iso(m, d);
    }
  }

  // "or 1 may (check here: https://...)"
  const orMay = s.match(/^or\s+(\d{1,2})\s+([A-Za-z]{3,9})\s*\(check here:/i);
  if (orMay) {
    const d = Number(orMay[1]);
    const m = MONTH_MAP[orMay[2].toLowerCase()];
    if (m && d >= 1 && d <= 31) return toCycle2027Iso(m, d);
  }

  return s;
}

function cleanText(s: string | null | undefined): string | null {
  if (!s) return null;
  const out = s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+PARTIAL\s*\/?\s*$/i, "")
    .replace(/\s+—\s*$/, "")
    .replace(/Ünversitesi/g, "Üniversitesi")
    .replace(/\s+/g, " ")
    .trim();
  return out || null;
}

function normalizeList(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String).map((x) => x.trim()).filter(Boolean);
  if (typeof raw === "string" && raw.trim()) {
    try {
      const p = JSON.parse(raw);
      if (Array.isArray(p)) return p.map(String).map((x) => x.trim()).filter(Boolean);
    } catch {
      /* ignore */
    }
    return raw.split(",").map((x) => x.trim()).filter(Boolean);
  }
  return [];
}

function normalizeAidTypes(raw: unknown): string[] {
  const tokens = normalizeList(raw);
  const out = new Set<string>();
  for (const t of tokens) {
    const low = t.toLowerCase();
    if (low === "need-based") out.add("Need-based");
    else if (low === "merit" || low === "merit-based") out.add("Merit-based");
    else if (low === "both" || low === "mixed" || low === "need+a") {
      out.add("Need-based");
      out.add("Merit-based");
    } else if (low === "scholarship") out.add("Scholarship");
    else if (low === "full funding") out.add("Full funding");
    else if (low === "jobs") out.add("Campus jobs");
    else out.add(t);
  }
  return [...out];
}

function normalizeLang(raw: string | null | undefined): string | null {
  const s = cleanText(raw);
  if (!s) return null;
  // Bare numeric IELTS scores (e.g. "6.0", "6.5", "7") -> "IELTS 6.0"
  if (/^\d(?:\.\d)?$/.test(s)) {
    const num = Number(s);
    if (num >= 4.0 && num <= 9.0) {
      return `IELTS ${num.toFixed(1)}`;
    }
  }
  return s;
}

/** Normalize a single University row (domain, name, city, country, tuition, deadlines). */
export function normalizeUniversityRow(raw: University): University {
  const u: University = { ...raw };

  // 1. Country normalization ("Korea" -> "South Korea")
  if (u.country === "Korea") {
    u.country = "South Korea";
  }

  // 2. Clean HTML entities & broken suffixes in name and city
  u.name = cleanText(u.name) || u.name;
  u.city = cleanText(u.city);

  const fix = NAME_FIXES[u.slug];
  if (fix) {
    if (fix.name) u.name = fix.name;
    if (fix.city !== undefined) u.city = fix.city;
  }

  // Deduplicate repeated city words like "Chicago Chicago, IL" -> "Chicago, IL"
  if (u.city) {
    u.city = u.city.replace(/^([A-Za-z.\s-]+?)\s+\1(\b|,)/i, "$1$2");
  }

  // 3. Domain enrichment from verified domains.json
  const extraDom = EXTRA_DOMAINS[u.slug];
  if (extraDom && (!u.website_domain || extraDom !== u.website_domain)) {
    u.website_domain = extraDom;
  }
  if (u.slug === "ku-leuven-belgium" && u.website_domain === "student.kuleuven.be") {
    u.website_domain = "kuleuven.be";
  }

  // 4. Fix truncated tuition_display ("$62 / год", num=62 -> "$62,000 / год", num=62000)
  const rangeFix = RANGE_TUITION_FIXES[u.slug];
  if (rangeFix) {
    u.tuition_display = rangeFix.display;
    u.tuition_num = rangeFix.num;
  } else if (
    u.country === "USA" &&
    u.tuition_num != null &&
    u.tuition_num >= 20 &&
    u.tuition_num <= 99 &&
    /^\$\d{2}\s*\/\s*год$/.test(u.tuition_display || "")
  ) {
    u.tuition_display = `$${u.tuition_num},000 / год`;
    u.tuition_num = u.tuition_num * 1000;
  }

  // 5. Normalize deadlines to 2026/2027 cycle
  const dfix = DEADLINE_FIXES[u.slug];
  if (dfix) {
    if (dfix.early !== undefined) u.early_deadline = dfix.early;
    else u.early_deadline = normalizeDeadlineTo2027(u.early_deadline);
    if (dfix.regular !== undefined) u.regular_deadline = dfix.regular;
    else u.regular_deadline = normalizeDeadlineTo2027(u.regular_deadline);
  } else {
    u.early_deadline = normalizeDeadlineTo2027(u.early_deadline);
    u.regular_deadline = normalizeDeadlineTo2027(u.regular_deadline);
  }

  // Country-level official deadlines where absent in DB:
  // UK UCAS 2027 Equal Consideration Deadline = 2027-01-13 (Oxbridge is 2026-10-15)
  if (
    u.country === "UK" &&
    !u.regular_deadline &&
    u.slug !== "university-of-oxford-uk" &&
    u.slug !== "university-of-cambridge-uk"
  ) {
    u.regular_deadline = "2027-01-13";
  }
  // Turkey: Türkiye Bursları government scholarship annual window closes Feb 20
  if (u.country === "Turkey" && !u.early_deadline && !u.regular_deadline && /TÜRKIYE BURSLARI/i.test(u.notes || "")) {
    u.early_deadline = "2027-02-20";
  }
  // Hungary: Stipendium Hungaricum annual deadline = Jan 15
  if (u.country === "Hungary" && /STIPENDIUM HUNGARICUM/i.test(u.notes || "")) {
    if (!u.early_deadline && !u.regular_deadline) {
      u.early_deadline = "2027-01-15";
    } else if (u.early_deadline && !u.regular_deadline && /^\d{4}-\d{2}-\d{2}$/.test(u.early_deadline) && u.early_deadline > "2027-01-15") {
      u.regular_deadline = u.early_deadline;
      u.early_deadline = "2027-01-15";
    }
  }

  // Ensure chronological order when both early & regular are ISO dates (fixes inverted Finland, Austria, Sweden, Germany rows)
  const isoRe = /^\d{4}-\d{2}-\d{2}$/;
  if (u.early_deadline && u.regular_deadline && isoRe.test(u.early_deadline) && isoRe.test(u.regular_deadline)) {
    if (u.early_deadline > u.regular_deadline) {
      const tmp = u.early_deadline;
      u.early_deadline = u.regular_deadline;
      u.regular_deadline = tmp;
    }
  }

  // 6. Normalize array fields, language scores, and mismatched notes
  u.inst_tags = normalizeList(u.inst_tags);
  u.aid_types = normalizeAidTypes(u.aid_types);
  u.lang = normalizeLang(u.lang);
  if (u.slug === "city-university-of-hong-kong-hong-kong" && /\bPolyU\b/i.test(u.notes || "")) {
    u.notes = null;
  }

  // 7. Fill missing metadata & overview from verified external datasets
  applyEnrichment(u);

  return u;
}

function hasText(v: string | null | undefined): boolean {
  return v != null && v.trim().length > 0;
}

function applyEnrichment(u: University): void {
  const patch = ENRICHMENT[u.slug] ?? ENRICHMENT[canonicalSlug(u.slug)];
  if (!patch) return;

  if (!hasText(u.city) && patch.city) u.city = patch.city;
  if (!u.tuition_num && !hasText(u.tuition_display) && patch.tuition_num && patch.tuition_display) {
    u.tuition_num = patch.tuition_num;
    u.tuition_display = patch.tuition_display;
  }
  if (u.rate_num == null && !hasText(u.acceptance_rate) && patch.rate_num != null && patch.acceptance_rate) {
    u.rate_num = patch.rate_num;
    u.acceptance_rate = patch.acceptance_rate;
  }
  if (!hasText(u.undergrad_enrollment) && patch.undergrad_enrollment) {
    u.undergrad_enrollment = patch.undergrad_enrollment;
  }
  if (!hasText(u.intl_undergrad_pct) && !hasText(u.intl_undergrad_count) && patch.intl_undergrad_pct && patch.intl_undergrad_count) {
    u.intl_undergrad_pct = patch.intl_undergrad_pct;
    u.intl_undergrad_count = patch.intl_undergrad_count;
  }
  if (!hasText(u.sat) && patch.sat) u.sat = patch.sat;
  if (!hasText(u.inst_type) && patch.inst_type) u.inst_type = patch.inst_type;
  if (u.inst_tags.length === 0 && patch.inst_tags?.length) {
    u.inst_tags = normalizeList(patch.inst_tags);
  }
  if (!hasText(u.majors) && patch.majors) u.majors = patch.majors;

  if (patch.notes) {
    if (!hasText(u.notes)) {
      u.notes = patch.notes;
    } else if (
      /^(TÜRKIYE BURSLARI|GLOBAL KOREA SCHOLARSHIP|STIPENDIUM HUNGARICUM)\b/i.test(u.notes!.trim()) &&
      patch.notes.includes("\n\n")
    ) {
      u.notes = patch.notes;
    }
  }
}

/** Merge two normalized University rows (preferring canonical metadata + richest non-null fields). */
export function mergeUniversityPair(primary: University, secondary: University): University {
  const out: University = { ...primary };

  const preferStr = (a: string | null | undefined, b: string | null | undefined) =>
    a != null && String(a).trim() !== "" ? a : b ?? null;

  out.website_domain = preferStr(primary.website_domain, secondary.website_domain);
  out.city = preferStr(primary.city, secondary.city);

  // For tuition, prefer non-null; if both exist, prefer the one with higher precision (e.g. 62700 over 62000)
  if (primary.tuition_num == null && secondary.tuition_num != null) {
    out.tuition_num = secondary.tuition_num;
    out.tuition_display = secondary.tuition_display;
  } else if (
    primary.tuition_num != null &&
    secondary.tuition_num != null &&
    primary.tuition_num % 1000 === 0 &&
    secondary.tuition_num % 1000 !== 0 &&
    secondary.tuition_num > 1000
  ) {
    out.tuition_num = secondary.tuition_num;
    out.tuition_display = secondary.tuition_display;
  } else {
    out.tuition_display = preferStr(primary.tuition_display, secondary.tuition_display);
  }

  if (primary.rate_num == null && secondary.rate_num != null) {
    out.rate_num = secondary.rate_num;
    out.acceptance_rate = secondary.acceptance_rate;
  } else {
    out.acceptance_rate = preferStr(primary.acceptance_rate, secondary.acceptance_rate);
  }

  out.full_grant = Boolean(primary.full_grant || secondary.full_grant);
  out.need_blind = Boolean(primary.need_blind || secondary.need_blind);

  if (primary.aid_num == null && secondary.aid_num != null) {
    out.aid_num = secondary.aid_num;
    out.aid_max = secondary.aid_max;
  } else {
    out.aid_max = preferStr(primary.aid_max, secondary.aid_max);
  }

  out.inst_tags = [...new Set([...primary.inst_tags, ...secondary.inst_tags])];
  out.aid_types = [...new Set([...primary.aid_types, ...secondary.aid_types])];

  out.early_deadline = preferStr(primary.early_deadline, secondary.early_deadline);
  out.regular_deadline = preferStr(primary.regular_deadline, secondary.regular_deadline);
  const isoRe = /^\d{4}-\d{2}-\d{2}$/;
  if (out.early_deadline && out.regular_deadline && isoRe.test(out.early_deadline) && isoRe.test(out.regular_deadline) && out.early_deadline > out.regular_deadline) {
    const tmp = out.early_deadline;
    out.early_deadline = out.regular_deadline;
    out.regular_deadline = tmp;
  }
  out.lang = preferStr(primary.lang, secondary.lang);
  out.undergrad_enrollment = preferStr(primary.undergrad_enrollment, secondary.undergrad_enrollment);
  out.intl_undergrad_pct = preferStr(primary.intl_undergrad_pct, secondary.intl_undergrad_pct);
  out.intl_undergrad_count = preferStr(primary.intl_undergrad_count, secondary.intl_undergrad_count);
  out.total_aid_millions = preferStr(primary.total_aid_millions, secondary.total_aid_millions);
  out.intl_receiving_aid_pct = preferStr(primary.intl_receiving_aid_pct, secondary.intl_receiving_aid_pct);
  out.avg_aid_award = preferStr(primary.avg_aid_award, secondary.avg_aid_award);
  out.inst_type = preferStr(primary.inst_type, secondary.inst_type);
  out.intl_aid_policy = preferStr(primary.intl_aid_policy, secondary.intl_aid_policy);
  out.majors = preferStr(primary.majors, secondary.majors);
  out.notes = preferStr(primary.notes, secondary.notes);
  out.living_note = preferStr(primary.living_note, secondary.living_note);
  out.sat = preferStr(primary.sat, secondary.sat);
  out.essay = preferStr(primary.essay, secondary.essay);
  out.how_apply_aid = preferStr(primary.how_apply_aid, secondary.how_apply_aid);
  out.coa_after_aid_pct = preferStr(primary.coa_after_aid_pct, secondary.coa_after_aid_pct);
  out.countries_represented = preferStr(primary.countries_represented, secondary.countries_represented);
  out.intl_acceptance_rate = preferStr(primary.intl_acceptance_rate, secondary.intl_acceptance_rate);
  out.intl_yield = preferStr(primary.intl_yield, secondary.intl_yield);
  out.merit_scholarship_name = preferStr(primary.merit_scholarship_name, secondary.merit_scholarship_name);

  return out;
}

/**
 * Clean, enrich, and deduplicate a list of University rows.
 * Preserves input ordering of canonical rows.
 */
export function cleanAndDeduplicateUniversities(rows: University[]): University[] {
  const normalized = rows.map(normalizeUniversityRow);
  const groups = new Map<string, { primary: University | null; extras: University[] }>();

  for (const r of normalized) {
    const targetSlug = canonicalSlug(r.slug);
    let g = groups.get(targetSlug);
    if (!g) {
      g = { primary: null, extras: [] };
      groups.set(targetSlug, g);
    }
    if (r.slug === targetSlug && !g.primary) {
      g.primary = r;
    } else {
      g.extras.push(r);
    }
  }

  const out: University[] = [];
  for (const [targetSlug, g] of groups.entries()) {
    let merged = g.primary ?? { ...g.extras[0], slug: targetSlug };
    for (const extra of g.primary ? g.extras : g.extras.slice(1)) {
      merged = mergeUniversityPair(merged, extra);
    }
    out.push(merged);
  }
  return out;
}
