import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

const CANONICAL_HOST = "goaza.xyz";

/** Force one host so Telegram Login Widget origin always matches BotFather /setdomain. */
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

  if (url.pathname === "/") {
    const session = await readSessionToken(req.cookies.get(SESSION_COOKIE)?.value).catch(() => null);
    if (session?.subscribed) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"],
};
