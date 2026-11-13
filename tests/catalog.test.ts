// @vitest-environment node
import { describe, expect, it } from "vitest";
import { filterCatalog, parseAidMillions, parseCurrencyAmount, toCatalogUni, type CatalogUni } from "@/lib/catalog";
import { daysLeftLabel, describeDeadline } from "@/lib/deadline";
import type { University } from "@/lib/types";

function uni(p: Partial<University> & { slug: string; name: string }): CatalogUni {
  return toCatalogUni(
    {
      country: "USA",
      city: null,
      full_grant: false,
      need_blind: false,
      inst_tags: [],
      aid_types: [],
      tuition_num: null,
      rate_num: null,
      aid_num: null,
      tuition_display: null,
      acceptance_rate: null,
      aid_max: null,
      lang: null,
      early_deadline: null,
      regular_deadline: null,
      ...p,
    } as unknown as University,
    false,
  );
}

const all = [
  uni({ slug: "a", name: "Alpha University", tuition_num: 10000, rate_num: 50, full_grant: true, inst_tags: ["private"] }),
  uni({ slug: "b", name: "Beta College", tuition_num: 60000, rate_num: 5, aid_num: 40000, need_blind: true }),
  uni({ slug: "c", name: "Gamma Tech", country: "Turkey", city: "Ankara", tuition_num: null, rate_num: 30 }),
];

describe("filterCatalog", () => {
  it("filters by country, grant, need-blind and tags", () => {
    expect(filterCatalog(all, { country: "Turkey" }).map((u) => u.slug)).toEqual(["c"]);
    expect(filterCatalog(all, { grantOnly: true }).map((u) => u.slug)).toEqual(["a"]);
    expect(filterCatalog(all, { needBlind: true }).map((u) => u.slug)).toEqual(["b"]);
    expect(filterCatalog(all, { inst: ["private"] }).map((u) => u.slug)).toEqual(["a"]);
  });

  it("applies numeric ranges like the old SQL (nulls excluded)", () => {
    expect(filterCatalog(all, { tuitionMax: 20000 }).map((u) => u.slug)).toEqual(["a"]);
    expect(filterCatalog(all, { rateMax: 40 }).map((u) => u.slug)).toEqual(["b", "c"]);
    // full grant always satisfies aidMin
    expect(filterCatalog(all, { aidMin: 30000 }).map((u) => u.slug)).toEqual(["a", "b"]);
  });

  it("searches every term in name/city/country", () => {
    expect(filterCatalog(all, { q: "ankara" }).map((u) => u.slug)).toEqual(["c"]);
    expect(filterCatalog(all, { q: "beta  college" }).map((u) => u.slug)).toEqual(["b"]);
    expect(filterCatalog(all, { q: "beta turkey" })).toEqual([]);
  });

  it("sorts with nulls last", () => {
    expect(filterCatalog(all, { sort: "tuition" }).map((u) => u.slug)).toEqual(["a", "b", "c"]);
    expect(filterCatalog(all, { sort: "rate" }).map((u) => u.slug)).toEqual(["b", "c", "a"]);
    expect(filterCatalog(all, { sort: "grant" })[0].slug).toBe("a");
  });

  it("does not mutate the input", () => {
    const copy = [...all];
    filterCatalog(all, { sort: "rate" });
    expect(all).toEqual(copy);
  });

  it("parses and sorts by international student financial aid budget and average grant", () => {
    expect(parseAidMillions("$7.7m")).toBe(7.7);
    expect(parseAidMillions("$500k")).toBe(0.5);
    expect(parseCurrencyAmount("$31,303")).toBe(31303);

    const intlList = [
      uni({
        slug: "small-pool",
        name: "Small Pool U",
        total_aid_millions: "$1.2m",
        avg_aid_award: "$45,000",
        intl_receiving_aid_pct: "50%",
      }),
      uni({
        slug: "big-pool",
        name: "Big Pool U",
        total_aid_millions: "$18.5m",
        avg_aid_award: "$28,000",
        intl_receiving_aid_pct: "80%",
      }),
      uni({ slug: "no-data", name: "No Data U" }),
    ];

    expect(filterCatalog(intlList, { sort: "intl_aid" }).map((u) => u.slug)).toEqual([
      "big-pool",
      "small-pool",
      "no-data",
    ]);
    expect(filterCatalog(intlList, { sort: "intl_avg" }).map((u) => u.slug)).toEqual([
      "small-pool",
      "big-pool",
      "no-data",
    ]);
  });

  it("filters by hasIntlAid, urgentDeadline and favSlugs presets", () => {
    const now = new Date(Date.UTC(2026, 10, 13));
    const list = [
      uni({
        slug: "soon-intl",
        name: "Soon Intl",
        total_aid_millions: "$5.0m",
        early_deadline: "2026-12-01",
      }),
      uni({
        slug: "later-no-intl",
        name: "Later No Intl",
        regular_deadline: "2027-04-01",
      }),
    ];

    expect(filterCatalog(list, { hasIntlAid: true }, now).map((u) => u.slug)).toEqual(["soon-intl"]);
    expect(filterCatalog(list, { urgentDeadline: true }, now).map((u) => u.slug)).toEqual(["soon-intl"]);
    expect(filterCatalog(list, { favSlugs: ["later-no-intl"] }, now).map((u) => u.slug)).toEqual([
      "later-no-intl",
    ]);
  });
});

describe("describeDeadline", () => {
  const now = new Date(Date.UTC(2026, 10, 12));
  it("formats ISO dates and counts days", () => {
    expect(describeDeadline("2026-11-15", now)).toEqual({ label: "15 ноября 2026", daysLeft: 3 });
    expect(describeDeadline("2026-11-01", now)?.daysLeft).toBe(-11);
  });
  it("keeps free text", () => {
    expect(describeDeadline("Rolling", now)).toEqual({ label: "Rolling", daysLeft: null });
    expect(describeDeadline("", now)).toBeNull();
  });
  it("pluralizes in Russian", () => {
    expect(daysLeftLabel(1)).toBe("через 1 день");
    expect(daysLeftLabel(3)).toBe("через 3 дня");
    expect(daysLeftLabel(11)).toBe("через 11 дней");
    expect(daysLeftLabel(-2)).toBe("прошёл");
  });
});
