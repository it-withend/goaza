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

describe("matchScorecard with shared domains", () => {
  it("does not give one campus's numbers to sibling campuses on the same domain", () => {
    const rows = [
      row({ id: 190512, name: "CUNY Bernard M Baruch College", url: "www.baruch.cuny.edu", sat: 1300 }),
      row({ id: 190549, name: "CUNY Brooklyn College", url: "www.brooklyn.cuny.edu", sat: 1150 }),
    ];
    const unis = [
      { slug: "cuny-brooklyn-college-usa", name: "CUNY Brooklyn College", website_domain: "brooklyn.cuny.edu" },
      { slug: "cuny-lehman-college-usa", name: "CUNY Lehman College", website_domain: "lehman.cuny.edu" },
    ];
    const out = matchScorecard(rows, unis);
    expect(out["cuny-brooklyn-college-usa"].id).toBe(190549);
    expect(out["cuny-lehman-college-usa"]).toBeUndefined();
  });

  it("uses the registrable domain only when a single Scorecard row has it", () => {
    const rows = [
      row({ id: 1, name: "Embry-Riddle Aeronautical University-Daytona Beach", url: "daytonabeach.erau.edu" }),
      row({ id: 2, name: "Embry-Riddle Aeronautical University-Prescott", url: "prescott.erau.edu" }),
      row({ id: 3, name: "Lonely College", url: "admissions.lonely.edu" }),
    ];
    const unis = [
      { slug: "embry-riddle-aeronautical-u-prescott-usa", name: "Embry-Riddle Aeronautical U-Prescott", website_domain: "erau.edu" },
      { slug: "lonely-college-usa", name: "Lonely", website_domain: "lonely.edu" },
    ];
    const out = matchScorecard(rows, unis);
    expect(out["embry-riddle-aeronautical-u-prescott-usa"]).toBeUndefined();
    expect(out["lonely-college-usa"].id).toBe(3);
  });

  it("falls back to the name when two Scorecard rows share one host", () => {
    const rows = [
      row({ id: 10, name: "St John's College", url: "www.sjc.edu" }),
      row({ id: 11, name: "St John's College-Santa Fe", url: "www.sjc.edu" }),
    ];
    const unis = [{ slug: "sjc-santa-fe", name: "St John's College-Santa Fe", website_domain: "sjc.edu" }];
    expect(matchScorecard(rows, unis)["sjc-santa-fe"].id).toBe(11);
  });

  it("does not hand a sub-campus the parent university's numbers", () => {
    const rows = [row({ id: 20, name: "Emory University", url: "www.emory.edu" })];
    const unis = [{ slug: "emory-oxford", name: "Emory University Oxford College", website_domain: "oxford.emory.edu" }];
    expect(matchScorecard(rows, unis)["emory-oxford"]).toBeUndefined();
  });
});
