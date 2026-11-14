import type { EnglishTest, Grades, Profile } from "@/lib/matcher";

/** Applicant profile kept in the browser (localStorage) until accounts sync server-side. */
export type Grade = "9" | "10" | "11" | "12" | "gap";

export type ApplicantProfile = Profile & {
  grade: Grade;
  name?: string;
  updatedAt: string;
};

export const PROFILE_KEY = "goaza_profile_v1";
/** Same key the catalog already used for favorites — existing favorites become "my list". */
export const LIST_KEY = "goaza_favs_v1";
export const TASKS_KEY = "goaza_tasks_v1";

const SLUG_RE = /^[a-z0-9-]{1,160}$/;
const COUNTRY_RE = /^[A-Za-z .()-]{2,60}$/;
const GRADES: Grade[] = ["9", "10", "11", "12", "gap"];
const TESTS: EnglishTest[] = ["ielts", "toefl", "duolingo", "none"];
const SCHOOL: Grades[] = ["excellent", "good", "average"];
const MAX_LIST = 60;

function safeJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function numIn(v: unknown, min: number, max: number): number | null {
  return typeof v === "number" && Number.isFinite(v) && v >= min && v <= max ? v : null;
}

export function parseProfile(raw: string | null): ApplicantProfile | null {
  const o = safeJson(raw);
  if (!o || typeof o !== "object" || Array.isArray(o)) return null;
  const p = o as Record<string, unknown>;
  const budget = numIn(p.budget, 0, 200000);
  const grade = GRADES.includes(p.grade as Grade) ? (p.grade as Grade) : null;
  if (budget === null || grade === null) return null;
  const eng = (p.english && typeof p.english === "object" ? p.english : {}) as Record<string, unknown>;
  const test = TESTS.includes(eng.test as EnglishTest) ? (eng.test as EnglishTest) : "none";
  return {
    grade,
    budget,
    countries: Array.isArray(p.countries)
      ? p.countries.filter((c): c is string => typeof c === "string" && COUNTRY_RE.test(c)).slice(0, 30)
      : [],
    english: { test, score: test === "none" ? null : numIn(eng.score, 0, 160) },
    sat: numIn(p.sat, 400, 1600),
    grades: SCHOOL.includes(p.grades as Grades) ? (p.grades as Grades) : "good",
    major: typeof p.major === "string" ? p.major.slice(0, 80) : "",
    ...(typeof p.name === "string" && p.name.trim() ? { name: p.name.trim().slice(0, 40) } : {}),
    updatedAt: typeof p.updatedAt === "string" ? p.updatedAt : new Date(0).toISOString(),
  };
}

export function serializeProfile(p: ApplicantProfile): string {
  return JSON.stringify(p);
}

export function parseList(raw: string | null): string[] {
  const o = safeJson(raw);
  if (!Array.isArray(o)) return [];
  const out: string[] = [];
  for (const s of o) {
    if (typeof s === "string" && SLUG_RE.test(s) && !out.includes(s)) out.push(s);
    if (out.length >= MAX_LIST) break;
  }
  return out;
}

export function parseDoneTasks(raw: string | null): string[] {
  const o = safeJson(raw);
  return Array.isArray(o) ? o.filter((x): x is string => typeof x === "string").slice(0, 200) : [];
}
