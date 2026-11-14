// @vitest-environment node
import { describe, expect, it } from "vitest";
import { parseList, parseProfile, serializeProfile, type ApplicantProfile } from "@/lib/profile";

const valid: ApplicantProfile = {
  grade: "11",
  budget: 0,
  countries: ["USA", "Turkey"],
  english: { test: "ielts", score: 7 },
  sat: 1420,
  grades: "good",
  major: "Economics",
  updatedAt: "2026-11-14T10:00:00.000Z",
};

describe("parseProfile", () => {
  it("returns null for broken storage", () => {
    expect(parseProfile("not json")).toBeNull();
    expect(parseProfile(null)).toBeNull();
    expect(parseProfile(JSON.stringify({ budget: "x" }))).toBeNull();
    expect(parseProfile(JSON.stringify([1, 2]))).toBeNull();
  });

  it("round-trips a valid profile", () => {
    expect(parseProfile(serializeProfile(valid))).toEqual(valid);
  });

  it("drops unknown countries shape and clamps junk scores", () => {
    const p = parseProfile(JSON.stringify({ ...valid, countries: ["USA", 5, "<script>"], sat: 99999 }));
    expect(p?.countries).toEqual(["USA"]);
    expect(p?.sat).toBeNull();
  });
});

describe("parseList", () => {
  it("keeps valid unique slugs only", () => {
    expect(parseList('["mit-usa","mit-usa","../x","bilkent-university-turkey"]')).toEqual([
      "mit-usa",
      "bilkent-university-turkey",
    ]);
  });

  it("is empty for missing or broken data", () => {
    expect(parseList(null)).toEqual([]);
    expect(parseList("{oops")).toEqual([]);
    expect(parseList('{"a":1}')).toEqual([]);
  });

  it("caps the list at 30, the same limit the plan API uses", () => {
    const many = JSON.stringify(Array.from({ length: 80 }, (_, i) => `uni-${i}`));
    expect(parseList(many)).toHaveLength(30);
  });
});
