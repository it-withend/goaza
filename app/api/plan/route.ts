import { NextResponse } from "next/server";
import { exclusionReason, matchUniversities } from "@/lib/matcher";
import { toMatchProfile } from "@/lib/profile";
import { fetchMatchRows } from "@/lib/universities";

const SLUG_RE = /^[a-z0-9-]{1,160}$/;
const MAX = 30;

/**
 * Chances for the universities in "my list". Public: everything it returns is derived from
 * public numbers (acceptance rate, cost, requirements) and the profile the client sends.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { profile?: unknown; slugs?: unknown } | null;
  const profile = toMatchProfile(body?.profile);
  if (!profile || !Array.isArray(body?.slugs)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const slugs = [...new Set(body.slugs.filter((s): s is string => typeof s === "string" && SLUG_RE.test(s)))].slice(0, MAX);

  try {
    const rows = await fetchMatchRows();
    const wanted = rows.filter((r) => slugs.includes(r.slug));
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
    return NextResponse.json({ matches }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (e) {
    console.error("[api/plan]", e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
