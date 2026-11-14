// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { localizePath, splitLang } from "@/lib/i18n";
import { middleware } from "@/middleware";

describe("localizePath", () => {
  it("keeps Russian paths as they are", () => {
    expect(localizePath("ru", "/unis")).toBe("/unis");
  });

  it("prefixes Uzbek paths", () => {
    expect(localizePath("uz", "/")).toBe("/uz");
    expect(localizePath("uz", "/unis/mit-usa")).toBe("/uz/unis/mit-usa");
    expect(localizePath("uz", "/grants#csc-china")).toBe("/uz/grants#csc-china");
    expect(localizePath("uz", "/dashboard?grant=1")).toBe("/uz/dashboard?grant=1");
  });

  it("leaves external links, anchors, API calls and already-prefixed paths alone", () => {
    expect(localizePath("uz", "https://t.me/studyaza")).toBe("https://t.me/studyaza");
    expect(localizePath("uz", "#money")).toBe("#money");
    expect(localizePath("uz", "/api/plan")).toBe("/api/plan");
    expect(localizePath("uz", "/uz/plan")).toBe("/uz/plan");
  });
});

describe("splitLang", () => {
  it("reads the language from the path", () => {
    expect(splitLang("/uz/unis")).toEqual({ lang: "uz", path: "/unis" });
    expect(splitLang("/uz")).toEqual({ lang: "uz", path: "/" });
    expect(splitLang("/unis")).toEqual({ lang: "ru", path: "/unis" });
    expect(splitLang("/ru")).toEqual({ lang: "ru", path: "/" });
    expect(splitLang("/ru/unis")).toEqual({ lang: "ru", path: "/unis" });
    expect(splitLang("/uzbekistan")).toEqual({ lang: "ru", path: "/uzbekistan" });
  });
});

const req = (path: string) => new NextRequest(new URL(path, "https://goaza.xyz"), { headers: { host: "goaza.xyz" } });

describe("middleware", () => {
  it("serves Russian pages from the unprefixed URL", async () => {
    const res = await middleware(req("/unis"));
    expect(res.headers.get("x-middleware-rewrite")).toBe("https://goaza.xyz/ru/unis");
  });

  it("serves Uzbek pages from /uz", async () => {
    const res = await middleware(req("/uz/unis"));
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("redirects an explicit /ru prefix to the canonical URL", async () => {
    const res = await middleware(req("/ru/unis"));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://goaza.xyz/unis");
  });

  it("does not touch the API", async () => {
    const res = await middleware(req("/api/plan"));
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
  });
});
