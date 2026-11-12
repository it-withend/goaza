// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieValue = { current: undefined as string | undefined };
const fetchUniversities = vi.fn();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => (cookieValue.current ? { value: cookieValue.current } : undefined),
  }),
}));

vi.mock("@/lib/universities", () => ({
  fetchUniversities: (...args: unknown[]) => fetchUniversities(...args),
}));

import { GET } from "@/app/api/universities/route";
import { createSessionToken } from "@/lib/telegram-auth";

describe("GET /api/universities", () => {
  beforeEach(() => {
    process.env.AUTH_SECRET = "test-secret-for-vitest-only";
    cookieValue.current = undefined;
    fetchUniversities.mockReset();
    fetchUniversities.mockResolvedValue([{ id: 1, name: "Test U" }]);
  });

  it("rejects an anonymous request without filters", async () => {
    const res = await GET(new Request("https://goaza.xyz/api/universities"));
    expect(res.status).toBe(401);
    expect(fetchUniversities).not.toHaveBeenCalled();
  });

  it("rejects an anonymous request with filters", async () => {
    const res = await GET(new Request("https://goaza.xyz/api/universities?country=USA"));
    expect(res.status).toBe(401);
    expect(fetchUniversities).not.toHaveBeenCalled();
  });

  it("returns data for a subscribed session", async () => {
    cookieValue.current = await createSessionToken({ tgId: 42, subscribed: true });
    const res = await GET(new Request("https://goaza.xyz/api/universities"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: [{ id: 1, name: "Test U" }], count: 1 });
  });
});
