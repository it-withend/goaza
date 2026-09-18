import { describe, expect, it } from "vitest";
import { summarizeLandingRows } from "@/lib/landing-stats";

describe("summarizeLandingRows", () => {
  it("counts rows, distinct countries, and full grants", () => {
    expect(
      summarizeLandingRows([
        { country: "USA", full_grant: true },
        { country: "USA", full_grant: false },
        { country: "Korea", full_grant: true },
      ]),
    ).toEqual({ total: 3, countries: 2, grants: 2 });
  });
});
