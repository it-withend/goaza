import { describe, expect, it } from "vitest";
import { logoLinkUrl, universityInitials } from "@/lib/university-logo";

describe("university logo helpers", () => {
  it("builds a restricted public Logo Link URL", () => {
    expect(logoLinkUrl("harvard.edu", "brandLL_test")).toBe(
      "https://logos.context.dev/?publicClientId=brandLL_test&domain=harvard.edu",
    );
  });
  it("falls back to Google favicon without Logo Link key", () => {
    expect(universityInitials("Australian National University")).toBe("ANU");
    expect(logoLinkUrl(null, "brandLL_test")).toBeNull();
    expect(logoLinkUrl("harvard.edu")).toBe(
      "https://www.google.com/s2/favicons?domain=harvard.edu&sz=128",
    );
  });
});
