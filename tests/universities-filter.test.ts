// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import type { University } from "@/lib/types";

const mockRows: Partial<University>[] = [
  {
    id: "1",
    slug: "test-expensive-college-usa",
    name: "Test Expensive College",
    country: "USA",
    city: "Boston, MA",
    tuition_display: "$57 / год",
    tuition_num: 57, // legacy US thousands bug in raw DB
    full_grant: false,
    need_blind: false,
    aid_types: ["Need-based"],
    inst_tags: ["private"],
  },
  {
    id: "2",
    slug: "test-free-uni-germany",
    name: "Test Free University",
    country: "Germany",
    city: "Berlin",
    tuition_display: "$0",
    tuition_num: 0,
    full_grant: false,
    need_blind: false,
    aid_types: [],
    inst_tags: ["public"],
  },
];

vi.mock("@/lib/supabase", () => ({
  getSupabaseAnon: () => {
    const chain = {
      select: () => chain,
      eq: () => chain,
      in: () => chain,
      or: () => chain,
      not: () => chain,
      lte: () => chain,
      contains: () => chain,
      ilike: () => chain,
      order: () => chain,
      range: async () => ({ data: mockRows, error: null }),
    };
    return { from: () => chain };
  },
}));

import { fetchUniversities } from "@/lib/universities";

describe("fetchUniversities post-clean filtering", () => {
  it("normalizes legacy US thousands (tuition_num=57 -> 57000) before applying tuitionMax", async () => {
    const cheap = await fetchUniversities({ tuitionMax: 10000 });
    expect(cheap.map((u) => u.slug)).toEqual(["test-free-uni-germany"]);

    const mid = await fetchUniversities({ tuitionMax: 60000 });
    expect(mid.map((u) => u.slug)).toEqual(["test-expensive-college-usa", "test-free-uni-germany"]);
  });
});
