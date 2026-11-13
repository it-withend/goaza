// @vitest-environment node
import { describe, expect, it } from "vitest";
import { ieltsEquivalent, matchUniversities, requiredIelts, satRange, shortlist, type MatchUni, type Profile } from "@/lib/matcher";

const base: Profile = {
  budget: 0,
  countries: [],
  english: { test: "ielts", score: 7 },
  sat: null,
  grades: "good",
  major: "",
};

const u = (p: Partial<MatchUni> & { slug: string }): MatchUni => ({
  name: p.slug,
  country: "USA",
  city: null,
  tuition_num: 60000,
  rate_num: 50,
  full_grant: false,
  aid_num: null,
  need_blind: false,
  lang: null,
  sat: null,
  majors: null,
  ...p,
});

describe("parsers", () => {
  it("reads IELTS requirements from messy text", () => {
    expect(requiredIelts("IELTS Academic 6.5 with no band below 6.0")).toBe(6.5);
    expect(requiredIelts("7.0")).toBe(7);
    expect(requiredIelts("87/120 IBT ILETS - 6.5 (min 5.5)")).toBe(6.5);
    expect(requiredIelts("required")).toBeNull();
  });
  it("converts TOEFL and Duolingo", () => {
    expect(ieltsEquivalent("toefl", 100)).toBe(7);
    expect(ieltsEquivalent("duolingo", 125)).toBe(7);
    expect(ieltsEquivalent("none", null)).toBeNull();
  });
  it("reads SAT ranges", () => {
    expect(satRange("1450-1550")).toEqual({ low: 1450, high: 1550 });
    expect(satRange("Reading&Writing 700-760, Math 750-800")).toEqual({ low: 1450, high: 1560 });
    expect(satRange("1000")).toEqual({ low: 1000, high: 1100 });
  });
});

describe("matchUniversities", () => {
  const all = [
    u({ slug: "harvard", full_grant: true, need_blind: true, rate_num: 4, sat: "1490-1580" }),
    u({ slug: "aware-grant", full_grant: true, rate_num: 20 }),
    u({ slug: "cheap", tuition_num: 3000, rate_num: 70, country: "Hungary" }),
    u({ slug: "pricey", tuition_num: 50000, rate_num: 60 }),
    u({ slug: "strict-english", full_grant: true, rate_num: 60, lang: "IELTS 7.5" }),
  ];

  it("drops universities the family cannot afford", () => {
    const slugs = matchUniversities(all, base).map((m) => m.slug);
    expect(slugs).not.toContain("pricey");
    expect(slugs).not.toContain("cheap"); // budget 0
  });

  it("includes affordable paid options when the budget allows", () => {
    const slugs = matchUniversities(all, { ...base, budget: 5000 }).map((m) => m.slug);
    expect(slugs).toContain("cheap");
  });

  it("filters by English requirement", () => {
    expect(matchUniversities(all, base).map((m) => m.slug)).not.toContain("strict-english");
  });

  it("puts need-aware full grants lower for students who need aid", () => {
    const m = matchUniversities(all, base).find((x) => x.slug === "aware-grant")!;
    expect(m.chance).toBe(10);
    expect(m.basket).toBe("dream");
  });

  it("respects country filter and builds baskets", () => {
    const res = shortlist(matchUniversities(all, { ...base, budget: 5000, countries: ["Hungary"] }));
    expect(res.counts).toEqual({ dream: 0, target: 0, safety: 1 });
    expect(res.safety[0].slug).toBe("cheap");
  });
});
