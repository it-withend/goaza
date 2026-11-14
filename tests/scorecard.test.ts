// @vitest-environment node
import { describe, expect, it } from "vitest";
import { matchScorecard, normalizeHost, type ScorecardRow } from "@/lib/scorecard-match";

const row = (p: Partial<ScorecardRow>): ScorecardRow => ({
  id: 1,
  name: "X",
  url: null,
  netPrice: [null, null, null, null, null],
  sat: null,
  grad: null,
  earnings: null,
  coa: null,
  ...p,
});

describe("normalizeHost", () => {
  it("strips scheme, www and path", () => {
    expect(normalizeHost("https://www.uab.edu/")).toBe("uab.edu");
    expect(normalizeHost("www.aamu.edu\\/")).toBe("aamu.edu");
    expect(normalizeHost("college.harvard.edu/admissions")).toBe("harvard.edu");
    expect(normalizeHost(null)).toBeNull();
  });
});

describe("matchScorecard", () => {
  it("matches by website domain first, then by exact name", () => {
    const rows = [
      row({ id: 1, name: "Harvard University", url: "www.harvard.edu", sat: 1550 }),
      row({ id: 2, name: "Bates College", url: null, sat: 1400 }),
      row({ id: 3, name: "Some Other College", url: "other.edu" }),
    ];
    const unis = [
      { slug: "harvard-university-usa", name: "Harvard", website_domain: "harvard.edu" },
      { slug: "bates-college-usa", name: "Bates College", website_domain: null },
      { slug: "unknown-usa", name: "Nowhere University", website_domain: "nowhere.edu" },
    ];
    const out = matchScorecard(rows, unis);
    expect(Object.keys(out).sort()).toEqual(["bates-college-usa", "harvard-university-usa"]);
    expect(out["harvard-university-usa"].sat).toBe(1550);
  });
});
