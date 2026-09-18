import { describe, expect, it } from "vitest";
import { logoLinkUrl, universityInitials } from "@/lib/university-logo";

describe("university logo helpers", () => {
  it("builds a restricted public Logo Link URL", () => {
    expect(logoLinkUrl("harvard.edu", "brandLL_test")).toBe(
      "https://logos.context.dev/?publicClientId=brandLL_test&domain=harvard.edu",
    );
  });
  it("falls back to stable initials", () => {
    expect(universityInitials("Australian National University")).toBe("ANU");
    expect(logoLinkUrl(null, "brandLL_test")).toBeNull();
  });
});
