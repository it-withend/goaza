// @vitest-environment node
import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/components/seo/JsonLd";
import type { University } from "@/lib/types";
import { teaserSummary, toTeaser, tuitionBand } from "@/lib/uni-teaser";
import { fetchUniversityBySlug, SLUG_RE } from "@/lib/universities";

const base = {
  id: "1",
  slug: "harvard-university-usa",
  name: "Harvard University",
  country: "USA",
  city: "Cambridge",
  website_domain: "harvard.edu",
  tuition_display: "$75,891 / год",
  tuition_num: 75891,
  acceptance_rate: "5%",
  rate_num: 5,
  full_grant: true,
  aid_max: "$90,000",
  aid_num: 90000,
  aid_types: [],
  early_deadline: "Nov 1",
  regular_deadline: "Jan 1",
  lang: "7.0",
  undergrad_enrollment: "6,766",
  intl_undergrad_pct: "11.5%",
  inst_tags: ["ivy", "private"],
  inst_type: null,
  need_blind: true,
  majors: "Government, Economics, Computer Science",
  how_apply_aid: "CSS Profile",
  sat: "1500-1580",
} as unknown as University;

describe("toTeaser", () => {
  it("exposes only public fields and never the exact tuition, deadlines or aid", () => {
    const t = toTeaser(base);
    const json = JSON.stringify(t);
    expect(t.tuitionBand).toBe("от $50 тыс. / год");
    expect(t.instType).toBe("Лига плюща / Частный");
    expect(t.majors).toEqual(["Government", "Economics", "Computer Science"]);
    for (const secret of ["75,891", "75891", "Jan 1", "Nov 1", "90,000", "CSS Profile", "1500-1580"]) {
      expect(json).not.toContain(secret);
    }
    expect(t.locked).toContain("Дедлайны подачи");
    expect(t.locked).toContain("Как подать на грант");
  });

  it("buckets tuition", () => {
    expect(tuitionBand(null)).toBeNull();
    expect(tuitionBand(0)).toBe("Бесплатно");
    expect(tuitionBand(4999)).toBe("до $5 000 / год");
    expect(tuitionBand(13400)).toBe("$5–15 тыс. / год");
    expect(tuitionBand(29999)).toBe("$15–30 тыс. / год");
  });

  it("writes a factual summary", () => {
    expect(teaserSummary(toTeaser(base))).toContain("Есть полный грант");
  });
});

describe("slug validation", () => {
  it("rejects non-slug input without touching the database", async () => {
    expect(SLUG_RE.test("zhejiang-university-china")).toBe(true);
    expect(SLUG_RE.test("' or 1=1--")).toBe(false);
    await expect(fetchUniversityBySlug("' or 1=1--")).resolves.toBeNull();
    await expect(fetchUniversityBySlug("a".repeat(500))).resolves.toBeNull();
  });
});

describe("serializeJsonLd", () => {
  it("cannot break out of the script tag", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});
