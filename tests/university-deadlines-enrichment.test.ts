import { describe, it, expect } from "vitest";
import { cleanAndDeduplicateUniversities, normalizeUniversityRow } from "@/lib/university-clean";
import { pickNearestDeadline } from "@/lib/deadline";
import type { University } from "@/lib/types";

function makeUni(overrides: Partial<University> = {}): University {
  return {
    id: "1",
    slug: "test-university-usa",
    name: "Test University",
    country: "USA",
    city: null,
    tuition_num: null,
    tuition_display: null,
    rate_num: null,
    acceptance_rate: null,
    full_grant: false,
    need_blind: false,
    aid_num: null,
    aid_max: null,
    inst_tags: [],
    aid_types: [],
    early_deadline: null,
    regular_deadline: null,
    lang: "English",
    undergrad_enrollment: null,
    intl_undergrad_pct: null,
    intl_undergrad_count: null,
    total_aid_millions: null,
    intl_receiving_aid_pct: null,
    avg_aid_award: null,
    inst_type: null,
    intl_aid_policy: null,
    majors: null,
    notes: null,
    living_note: null,
    sat: null,
    ielts: null,
    toefl: null,
    gpa: null,
    essay: null,
    how_apply_aid: null,
    coa_after_aid_pct: null,
    countries_represented: null,
    intl_acceptance_rate: null,
    intl_yield: null,
    merit_scholarship_name: null,
    website_domain: null,
    ...overrides,
  } as unknown as University;
}

describe("pickNearestDeadline", () => {
  it("picks the earliest upcoming ISO deadline instead of stale or later early date", () => {
    const now = new Date("2026-11-12T12:00:00Z");
    expect(pickNearestDeadline("2026-11-01", "2027-01-02", now)?.raw).toBe("2027-01-02");
    expect(pickNearestDeadline("2027-11-01", "2027-01-15", now)?.raw).toBe("2027-01-15");
    expect(pickNearestDeadline("2026-11-15", "2027-01-05", now)?.raw).toBe("2026-11-15");
  });

  it("handles rolling and single-date fallbacks", () => {
    const now = new Date("2026-11-12T12:00:00Z");
    expect(pickNearestDeadline(null, "Rolling", now)?.raw).toBe("Rolling");
    expect(pickNearestDeadline("2027-02-01", null, now)?.raw).toBe("2027-02-01");
  });
});

describe("deadline normalization & national cycles", () => {
  it("keeps US Fall Early in 2026 before Jan 2027 Regular", () => {
    const u = normalizeUniversityRow(
      makeUni({
        slug: "amherst-college-usa",
        country: "USA",
        early_deadline: "2025-11-01",
        regular_deadline: "2026-01-01",
      })
    );
    expect(u.early_deadline).toBe("2026-11-01");
    expect(u.regular_deadline).toBe("2027-01-01");
  });

  it("swaps inverted Finland/Austria early & regular ISO deadlines chronologically", () => {
    const fin = normalizeUniversityRow(
      makeUni({
        slug: "arcada-university-of-applied-sciences-finland",
        country: "Finland",
        early_deadline: "2027-05-14",
        regular_deadline: "2027-01-18",
      })
    );
    expect(fin.early_deadline).toBe("2027-01-18");
    expect(fin.regular_deadline).toBe("2027-05-14");

    const aut = normalizeUniversityRow(
      makeUni({
        slug: "vienna-university-of-technology-austria",
        country: "Austria",
        early_deadline: "2027-09-05",
        regular_deadline: "2027-02-05",
      })
    );
    expect(aut.early_deadline).toBe("2027-02-05");
    expect(aut.regular_deadline).toBe("2027-09-05");
  });

  it("applies UCAS 2027 default for non-Oxbridge UK and keeps Oxbridge early deadline", () => {
    const edinburgh = normalizeUniversityRow(
      makeUni({ slug: "university-of-edinburgh-uk", country: "UK" })
    );
    expect(edinburgh.regular_deadline).toBe("2027-01-13");

    const oxford = normalizeUniversityRow(
      makeUni({
        slug: "university-of-oxford-uk",
        country: "UK",
        early_deadline: "2026-10-15",
      })
    );
    expect(oxford.early_deadline).toBe("2026-10-15");
    expect(oxford.regular_deadline).toBeNull();
  });

  it("applies Türkiye Bursları and Stipendium Hungaricum defaults and cleans messy strings", () => {
    const tr = normalizeUniversityRow(
      makeUni({
        slug: "bogazici-university-turkey",
        country: "Turkey",
        notes: "TÜRKIYE BURSLARI | Полный грант",
      })
    );
    expect(tr.early_deadline).toBe("2027-02-20");

    const hu = normalizeUniversityRow(
      makeUni({
        slug: "university-of-szeged-hungary",
        country: "Hungary",
        notes: "STIPENDIUM HUNGARICUM | Грант",
      })
    );
    expect(hu.early_deadline).toBe("2027-01-15");

    const nl = normalizeUniversityRow(
      makeUni({
        slug: "radboud-university-nijmegen-netherlands",
        country: "Netherlands",
        early_deadline: "January 15 (non-EU) / May 1 (EU)",
      })
    );
    expect(nl.early_deadline).toBe("2027-01-15");
    expect(nl.regular_deadline).toBe("2027-04-01");
  });
});

describe("university enrichment merge behavior", () => {
  it("fills missing fields from verified enrichment while preserving curated DB fields", () => {
    const [u] = cleanAndDeduplicateUniversities([
      makeUni({
        slug: "linfield-college-usa",
        country: "USA",
        city: null,
        tuition_display: "$45,000 / год",
        tuition_num: 45000,
        majors: null,
      }),
    ]);
    // City & majors come from enrichment
    expect(u.city).toBe("McMinnville, OR");
    expect(u.majors).toContain("Health & Medicine");
    // Curated DB tuition is NOT overwritten by Scorecard sticker price
    expect(u.tuition_num).toBe(45000);
    expect(u.tuition_display).toBe("$45,000 / год");
  });

  it("prepends Russian Wikipedia overview before boilerplate scholarship notes", () => {
    const [u] = cleanAndDeduplicateUniversities([
      makeUni({
        slug: "seoul-national-university-south-korea",
        country: "South Korea",
        notes: "GLOBAL KOREA SCHOLARSHIP | Полный грант",
      }),
    ]);
    expect(u.notes).toContain("Сеульский университет");
    expect(u.notes).toContain("GLOBAL KOREA SCHOLARSHIP");
  });
});
