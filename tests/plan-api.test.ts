// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MatchUni } from "@/lib/matcher";

const rows: MatchUni[] = [];
vi.mock("@/lib/universities", () => ({ fetchMatchRows: async () => rows }));

const cookieValue = { current: undefined as string | undefined };
vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => (cookieValue.current ? { value: cookieValue.current } : undefined) }),
}));

import { POST } from "@/app/api/plan/route";
import { POST as podborPost } from "@/app/api/podbor/route";
import { createSessionToken } from "@/lib/telegram-auth";

async function subscribe() {
  process.env.AUTH_SECRET = "test-secret-for-vitest-only";
  cookieValue.current = await createSessionToken({ tgId: 7, subscribed: true });
}

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
    cookieValue.current = undefined;
  });

  it("rejects a body without profile or slugs", async () => {
    expect((await POST(req({}))).status).toBe(400);
  });

  it("returns matches only for requested slugs and caps them at 30 for subscribers", async () => {
    await subscribe();
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

  it("caps guests at 12 universities per request", async () => {
    for (let i = 0; i < 20; i++) rows.push(uni(`g-${i}`));
    const slugs = Array.from({ length: 20 }, (_, i) => `g-${i}`);
    const json = await (await POST(req({ profile, slugs }))).json();
    expect(json.matches).toHaveLength(12);
  });

  it("never uses the gated aid amount for guests", async () => {
    rows.push(uni("aided", { full_grant: false, tuition_num: 30000, aid_num: 28000 }));
    const guest = await (await POST(req({ profile: { ...profile, budget: 5000 }, slugs: ["aided"] }))).json();
    expect(guest.matches[0]).toEqual({ slug: "aided", name: "aided", excluded: "Не проходит по бюджету" });
    await subscribe();
    const sub = await (await POST(req({ profile: { ...profile, budget: 5000 }, slugs: ["aided"] }))).json();
    expect(sub.matches[0].money).toBe("partial");
  });
});

describe("POST /api/podbor", () => {
  beforeEach(() => {
    rows.length = 0;
    cookieValue.current = undefined;
  });

  it("never exposes gated aid_num matches to guests", async () => {
    rows.push(uni("aided", { full_grant: false, tuition_num: 30000, aid_num: 28000 }));
    const podborReq = (body: unknown) =>
      new Request("https://goaza.xyz/api/podbor", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "content-type": "application/json" },
      });

    const guest = await (
      await podborPost(podborReq({ budget: 5000, countries: [], englishTest: "ielts", englishScore: 7, grades: "good" }))
    ).json();
    expect(guest.full).toBe(false);
    expect(guest.counts.dream + guest.counts.target + guest.counts.safety).toBe(0);

    await subscribe();
    const sub = await (
      await podborPost(podborReq({ budget: 5000, countries: [], englishTest: "ielts", englishScore: 7, grades: "good" }))
    ).json();
    expect(sub.full).toBe(true);
    expect(sub.counts.dream + sub.counts.target + sub.counts.safety).toBe(1);
  });
});
