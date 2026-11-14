// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MatchUni } from "@/lib/matcher";

const rows: MatchUni[] = [];
vi.mock("@/lib/universities", () => ({ fetchMatchRows: async () => rows }));

import { POST } from "@/app/api/plan/route";

const profile = { budget: 0, countries: [], english: { test: "ielts", score: 7 }, sat: null, grades: "good", major: "" };
const req = (body: unknown) =>
  new Request("https://goaza.xyz/api/plan", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });

function uni(slug: string, p: Partial<MatchUni> = {}): MatchUni {
  return {
    slug,
    name: slug,
    country: "USA",
    city: null,
    tuition_num: 60000,
    rate_num: 30,
    full_grant: true,
    aid_num: null,
    need_blind: false,
    lang: null,
    sat: null,
    majors: null,
    ...p,
  };
}

describe("POST /api/plan", () => {
  beforeEach(() => {
    rows.length = 0;
  });

  it("rejects a body without profile or slugs", async () => {
    expect((await POST(req({}))).status).toBe(400);
  });

  it("returns matches only for requested slugs and caps them at 30", async () => {
    for (let i = 0; i < 40; i++) rows.push(uni(`u-${i}`));
    const slugs = Array.from({ length: 31 }, (_, i) => `u-${i}`);
    const json = await (await POST(req({ profile, slugs }))).json();
    expect(json.matches).toHaveLength(30);
  });

  it("drops unknown and malformed slugs", async () => {
    rows.push(uni("known"));
    const json = await (await POST(req({ profile, slugs: ["known", "missing", "../etc"] }))).json();
    expect(json.matches.map((m: { slug: string }) => m.slug)).toEqual(["known"]);
  });

  it("explains why a university does not fit", async () => {
    rows.push(uni("pricey", { full_grant: false, tuition_num: 50000 }));
    const json = await (await POST(req({ profile, slugs: ["pricey"] }))).json();
    expect(json.matches[0]).toEqual({ slug: "pricey", name: "pricey", excluded: "Не проходит по бюджету" });
  });
});
