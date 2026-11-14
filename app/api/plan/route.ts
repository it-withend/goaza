import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exclusionReason, matchUniversities } from "@/lib/matcher";
import { toMatchProfile } from "@/lib/profile";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { fetchMatchRows } from "@/lib/universities";

const SLUG_RE = /^[a-z0-9-]{1,160}$/;
const MAX = 30;
/** Guests get fewer per request so the endpoint cannot be used to bulk-export the catalog. */
const GUEST_MAX = 12;

/**
 * Chances for the universities in "my list". Guests get results computed only from public
 * numbers (acceptance rate, cost, requirements): the gated aid amount is never used for them,
 * otherwise bisecting the budget would reveal it.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { profile?: unknown; slugs?: unknown } | null;
  const profile = toMatchProfile(body?.profile);
  if (!profile || !Array.isArray(body?.slugs)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  const full = Boolean(session?.subscribed);
  const slugs = [...new Set(body.slugs.filter((s): s is string => typeof s === "string" && SLUG_RE.test(s)))].slice(
    0,
    full ? MAX : GUEST_MAX,
  );

  try {
    const rows = await fetchMatchRows();
    const wanted = rows
      .filter((r) => slugs.includes(r.slug))
      .map((r) => (full ? r : { ...r, aid_num: null }));
    const matched = new Map(matchUniversities(wanted, { ...profile, countries: [] }).map((m) => [m.slug, m]));
    const matches = slugs
      .map((slug) => {
        const row = wanted.find((r) => r.slug === slug);
        if (!row) return null;
        return (
          matched.get(slug) ?? { slug, name: row.name, excluded: exclusionReason(row, profile) ?? "Не подходит профилю" }
        );
      })
      .filter(Boolean);
    return NextResponse.json({ matches, limit: full ? MAX : GUEST_MAX }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (e) {
    console.error("[api/plan]", e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
