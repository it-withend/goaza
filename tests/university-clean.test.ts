// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  canonicalSlug,
  cleanAndDeduplicateUniversities,
  normalizeDeadlineTo2027,
  normalizeUniversityRow,
} from "@/lib/university-clean";
import { getCountryGuide } from "@/lib/country-guides";
import type { University } from "@/lib/types";

function makeRow(p: Partial<University> & { slug: string; name: string }): University {
  return {
    id: p.slug,
    country: "USA",
    website_domain: null,
    city: null,
    tuition_display: null,
    tuition_num: null,
    acceptance_rate: null,
    rate_num: null,
    full_grant: false,
    aid_max: null,
    aid_num: null,
    aid_types: [],
    early_deadline: null,
    regular_deadline: null,
    lang: null,
    undergrad_enrollment: null,
    intl_undergrad_pct: null,
    intl_undergrad_count: null,
    total_aid_millions: null,
    intl_receiving_aid_pct: null,
    avg_aid_award: null,
    inst_tags: [],
    inst_type: null,
    intl_aid_policy: null,
    need_blind: false,
    majors: null,
    notes: null,
    living_note: null,
    sat: null,
    essay: null,
    how_apply_aid: null,
    coa_after_aid_pct: null,
    countries_represented: null,
    intl_acceptance_rate: null,
    intl_yield: null,
    merit_scholarship_name: null,
    ...p,
  };
}

describe("university-clean", () => {
  it("merges MIT 4 duplicate rows into massachusetts-institute-of-technology-usa", () => {
    const rows = [
      makeRow({
        slug: "massachusetts-institute-of-technology-usa",
        name: "Massachusetts Institute of Technology",
        website_domain: "mit.edu",
        full_grant: true,
        need_blind: true,
      }),
      makeRow({
        slug: "massachusetts-inst-of-technology-usa",
        name: "Massachusetts Inst. of Technology",
        tuition_display: "$59,750 / год",
        tuition_num: 59750,
      }),
      makeRow({
        slug: "massachusetts-institute-usa",
        name: "Massachusetts Institute",
        city: "of Technology Cambridge, MA",
        aid_max: "$58,000",
        aid_num: 58000,
      }),
      makeRow({
        slug: "mit-usa",
        name: "MIT",
        city: "Cambridge, MA",
        acceptance_rate: "4.0%",
        rate_num: 4,
      }),
    ];

    const cleaned = cleanAndDeduplicateUniversities(rows);
    expect(cleaned).toHaveLength(1);
    expect(cleaned[0].slug).toBe("massachusetts-institute-of-technology-usa");
    expect(cleaned[0].tuition_num).toBe(59750);
    expect(cleaned[0].aid_num).toBe(58000);
    expect(cleaned[0].rate_num).toBe(4);
    expect(cleaned[0].full_grant).toBe(true);
    expect(cleaned[0].need_blind).toBe(true);
  });

  it("merges US RIT rows while keeping RIT Dubai separate", () => {
    const rows = [
      makeRow({ slug: "rochester-institute-of-technology-usa", name: "Rochester Institute of Technology" }),
      makeRow({ slug: "rochester-institute-of-usa", name: "Rochester Institute of" }),
      makeRow({ slug: "rochester-institute-usa", name: "Rochester Institute" }),
      makeRow({
        slug: "rochester-institute-of-technology-dubai-uae",
        name: "Rochester Institute of Technology Dubai",
        country: "UAE",
      }),
    ];
    const cleaned = cleanAndDeduplicateUniversities(rows);
    expect(cleaned.map((u) => u.slug)).toEqual([
      "rochester-institute-of-technology-usa",
      "rochester-institute-of-technology-dubai-uae",
    ]);
  });

  it("strips PARTIAL / and merges *-partial-usa into canonical slug", () => {
    expect(canonicalSlug("boston-university-partial-usa")).toBe("boston-university-usa");
    const rows = [
      makeRow({ slug: "boston-university-partial-usa", name: "Boston University PARTIAL /", aid_num: 35000 }),
      makeRow({ slug: "boston-university-usa", name: "Boston University", tuition_num: 65123 }),
    ];
    const cleaned = cleanAndDeduplicateUniversities(rows);
    expect(cleaned).toHaveLength(1);
    expect(cleaned[0].name).toBe("Boston University");
    expect(cleaned[0].aid_num).toBe(35000);
    expect(cleaned[0].tuition_num).toBe(65123);
  });

  it("fixes truncated US tuition ($62 / год -> $62,000 / год) and unifies Korea -> South Korea", () => {
    const us = normalizeUniversityRow(
      makeRow({ slug: "adelphi-university-usa", name: "Adelphi University", tuition_display: "$62 / год", tuition_num: 62 }),
    );
    expect(us.tuition_display).toBe("$62,000 / год");
    expect(us.tuition_num).toBe(62000);

    const kr = normalizeUniversityRow(
      makeRow({ slug: "ajou-university-korea", name: "Ajou University", country: "Korea" }),
    );
    expect(kr.country).toBe("South Korea");
    expect(kr.website_domain).toBe("ajou.ac.kr");
  });

  it("normalizes deadlines to 2026/2027 cycle and strips shifted IELTS scores", () => {
    expect(normalizeDeadlineTo2027("2026-01-15")).toBe("2027-01-15");
    expect(normalizeDeadlineTo2027("2022-03-15")).toBe("2027-03-15");
    expect(normalizeDeadlineTo2027("15-Jan")).toBe("2027-01-15");
    expect(normalizeDeadlineTo2027("15-Nov")).toBe("2026-11-15");
    expect(normalizeDeadlineTo2027("30Apr")).toBe("2027-04-30");
    expect(normalizeDeadlineTo2027("6.5")).toBeNull();
    expect(normalizeDeadlineTo2027("6")).toBeNull();
    expect(normalizeDeadlineTo2027("rolling")).toBe("Rolling");
  });

  it("deduplicates messy aid_types, prefixes bare IELTS scores, and replaces PolyU mismatch in CityU HK", () => {
    const cityu = normalizeUniversityRow(
      makeRow({
        slug: "city-university-of-hong-kong-hong-kong",
        name: "City University of Hong Kong",
        country: "Hong Kong",
        lang: "6.0",
        aid_types: ["Need-based", "Merit", "merit-based", "Both", "both"],
        notes: "All PolyU academic programmes follow a credit-based structure.",
      }),
    );
    expect(cityu.lang).toBe("IELTS 6.0");
    expect(cityu.aid_types).toEqual(["Need-based", "Merit-based"]);
    expect(cityu.notes).toMatch(/Городской университет Гонконга/);
    expect(cityu.notes).not.toMatch(/PolyU/);

    expect(getCountryGuide("Turkey")?.scholarships).toMatch(/Türkiye Bursları/);
    expect(getCountryGuide("Germany")?.after11Grade).toMatch(/Studienkolleg/);
  });
});
