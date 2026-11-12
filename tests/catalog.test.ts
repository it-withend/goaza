// @vitest-environment node
import { describe, expect, it } from "vitest";
import { filterCatalog, toCatalogUni, type CatalogUni } from "@/lib/catalog";
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
