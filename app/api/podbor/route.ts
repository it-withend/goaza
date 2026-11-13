import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { matchUniversities, shortlist, type EnglishTest, type Grades, type Profile } from "@/lib/matcher";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { fetchMatchRows } from "@/lib/universities";

const TESTS: EnglishTest[] = ["ielts", "toefl", "duolingo", "none"];
const GRADES: Grades[] = ["excellent", "good", "average"];

function num(v: unknown, min: number, max: number): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v) : NaN;
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
}

function parseProfile(body: unknown): Profile | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const test = TESTS.includes(b.englishTest as EnglishTest) ? (b.englishTest as EnglishTest) : "none";
  const grades = GRADES.includes(b.grades as Grades) ? (b.grades as Grades) : "good";
  const countries = Array.isArray(b.countries)
    ? b.countries.filter((c): c is string => typeof c === "string" && /^[A-Za-z .()-]{2,60}$/.test(c)).slice(0, 30)
    : [];
  return {
    budget: num(b.budget, 0, 200000) ?? 0,
    countries,
    english: { test, score: test === "none" ? null : num(b.englishScore, 0, 160) },
    sat: num(b.sat, 400, 1600),
    grades,
    major: typeof b.major === "string" ? b.major.slice(0, 80) : "",
  };
}

/**
 * Builds a shortlist. Anyone gets the counts and a short preview; the full list needs a
 * subscribed session (option A: knowledge public, tools for subscribers).
 */
export async function POST(req: Request) {
  const profile = parseProfile(await req.json().catch(() => null));
  if (!profile) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  const full = Boolean(session?.subscribed);

  try {
    const rows = await fetchMatchRows();
    const res = shortlist(matchUniversities(rows, profile), full ? 10 : 2);
    return NextResponse.json({ full, ...res }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (e) {
    console.error("[api/podbor]", e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
