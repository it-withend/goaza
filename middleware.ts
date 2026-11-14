import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "goaza.xyz";

/**
 * 1. Force one host so Telegram Login Widget origin always matches BotFather /setdomain.
 * 2. Languages: Russian lives at the unprefixed URLs (internally /ru/...), Uzbek at /uz/....
 */
export async function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.split(":")[0]?.toLowerCase();
  const url = req.nextUrl.clone();

  if (host && host !== CANONICAL_HOST) {
    const isAlias =
      host === "www.goaza.xyz" ||
      host === "goaza.vercel.app" ||
      /^goaza(-[a-z0-9]+)?-azamat2009s-projects\.vercel\.app$/.test(host) ||
      /^goaza-git-[a-z0-9-]+-azamat2009s-projects\.vercel\.app$/.test(host);

    if (isAlias) {
      url.protocol = "https:";
      url.host = CANONICAL_HOST;
      return NextResponse.redirect(url, 308);
    }
  }

  const path = url.pathname;
  if (path === "/api" || path.startsWith("/api/") || path.startsWith("/_next/")) return NextResponse.next();
  if (path === "/uz" || path.startsWith("/uz/")) return NextResponse.next();

  // /ru/... is an internal path; the public Russian URL has no prefix.
  if (path === "/ru" || path.startsWith("/ru/")) {
    url.pathname = path.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = path === "/" ? "/ru" : `/ru${path}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|opengraph-image|google[^/]+\\.html|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml)$).*)",
  ],
};
