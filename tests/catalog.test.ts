// @vitest-environment node
import { describe, expect, it } from "vitest";
import { filterCatalog, parseAidMillions, parseCurrencyAmount, toCatalogUni, type CatalogUni } from "@/lib/catalog";
import { daysLeftLabel, describeDeadline, describeDeadlineWindow } from "@/lib/deadline";
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
  it("formats ISO dates and counts days with target academic year", () => {
    expect(describeDeadline("2026-11-15", now)).toEqual({
      label: "15 ноября 2026",
      daysLeft: 3,
      academicYear: "2027/28",
    });
    expect(describeDeadline("2026-11-01", now)?.daysLeft).toBe(-11);
  });
  it("localizes free text and Rolling", () => {
    expect(describeDeadline("Rolling", now)).toEqual({
      label: "Круглогодичный приём (Rolling)",
      daysLeft: null,
      academicYear: "2027/28",
    });
    expect(describeDeadline("Rolling", now, "uz")).toEqual({
      label: "Yil davomida qabul (Rolling)",
      daysLeft: null,
      academicYear: "2027/28",
    });
    expect(describeDeadline("", now)).toBeNull();
  });
  it("explains deadline window and academic year in Russian and Uzbek", () => {
    expect(describeDeadlineWindow("2026-11-15", "2027-01-15", now, "ru")).toBe(
      "Подача на 2027/28 уч. год: с 15 ноября 2026 (ранний) до 15 января 2027 (основной).",
    );
    expect(describeDeadlineWindow("2026-11-15", "2027-01-15", now, "uz")).toBe(
      "2027/28 o'quv yili uchun hujjat topshirish: 2026-yil 15-noyabrdan (erta) 2027-yil 15-yanvargacha (asosiy).",
    );
  });
  it("pluralizes in Russian", () => {
    expect(daysLeftLabel(1)).toBe("через 1 день");
    expect(daysLeftLabel(3)).toBe("через 3 дня");
    expect(daysLeftLabel(11)).toBe("через 11 дней");
    expect(daysLeftLabel(-2)).toBe("прошёл");
  });
});

describe("catalog presets", () => {
  const now = new Date(Date.UTC(2026, 10, 14));
  const list = [
    uni({ slug: "grant", name: "Grant U", full_grant: true, tuition_num: 60000, sat: "1450-1550", regular_deadline: "2027-01-01" }),
    uni({ slug: "free", name: "Free U", tuition_num: 0, sat: null, country: "Germany" }),
    uni({ slug: "blind", name: "Blind U", need_blind: true, tuition_num: 70000, sat: "Optional" }),
    uni({ slug: "cheap", name: "Cheap U", tuition_num: 8000, sat: "Not required", regular_deadline: "2026-11-20" }),
  ];
  const slugs = (presets: string[]) =>
    filterCatalog(list, { presets: presets as never }, now).map((u) => u.slug).sort();

  it("full_grant keeps universities with a full grant", () => {
    expect(slugs(["full_grant"])).toEqual(["grant"]);
  });
  it("free_tuition keeps zero tuition", () => {
    expect(slugs(["free_tuition"])).toEqual(["free"]);
  });
  it("no_sat keeps empty, optional or not-required SAT", () => {
    expect(slugs(["no_sat"])).toEqual(["blind", "cheap", "free"]);
  });
  it("need_blind keeps need-blind", () => {
    expect(slugs(["need_blind"])).toEqual(["blind"]);
  });
  it("can_apply keeps deadlines at least 14 days away", () => {
    expect(slugs(["can_apply"])).toEqual(["grant"]);
  });
  it("under_10k keeps known tuition up to $10,000", () => {
    expect(slugs(["under_10k"])).toEqual(["cheap", "free"]);
  });
  it("combines presets with AND", () => {
    expect(slugs(["no_sat", "under_10k"])).toEqual(["cheap", "free"]);
  });
});
