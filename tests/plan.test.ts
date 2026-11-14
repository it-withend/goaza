// @vitest-environment node
import { describe, expect, it } from "vitest";
import type { Match } from "@/lib/matcher";
import { basketCounts, chanceAtLeastOne, nextDeadline, planTasks } from "@/lib/plan";
import type { ApplicantProfile } from "@/lib/profile";

const now = new Date(Date.UTC(2026, 10, 14));

const m = (p: Partial<Match> & { slug: string }): Match => ({
  name: p.slug,
  country: "USA",
  city: null,
  logo: false,
  basket: "target",
  money: "grant",
  chance: 30,
  deadline: null,
  reasons: [],
  ...p,
});

const profile: ApplicantProfile = {
  grade: "11",
  budget: 0,
  countries: [],
  english: { test: "ielts", score: 7 },
  sat: 1420,
  grades: "good",
  major: "",
  updatedAt: "2026-11-14T00:00:00Z",
};

describe("chanceAtLeastOne", () => {
  it("combines independent chances", () => {
    expect(chanceAtLeastOne([{ chance: 50 }, { chance: 50 }])).toBe(75);
  });
  it("is zero for an empty list", () => {
    expect(chanceAtLeastOne([])).toBe(0);
  });
  it("never promises more than 95%", () => {
    expect(chanceAtLeastOne(Array.from({ length: 10 }, () => ({ chance: 60 })))).toBe(95);
  });
});

describe("nextDeadline", () => {
  it("skips passed and missing deadlines", () => {
    const res = nextDeadline(
      [m({ slug: "old", deadline: "2026-11-01" }), m({ slug: "none" }), m({ slug: "yale", name: "Yale", deadline: "2027-01-02" })],
      now,
    );
    expect(res).toMatchObject({ slug: "yale", name: "Yale", daysLeft: 49 });
  });
  it("is null when every deadline has passed", () => {
    expect(nextDeadline([m({ slug: "old", deadline: "2026-11-01" })], now)).toBeNull();
  });
});

describe("planTasks", () => {
  it("asks for an English test when none is taken", () => {
    const tasks = planTasks({ ...profile, english: { test: "none", score: null } }, [], now);
    expect(tasks.map((t) => t.title)).toContain("Сдать IELTS, TOEFL или Duolingo");
  });

  it("schedules recommendations six weeks before the nearest deadline", () => {
    const tasks = planTasks(profile, [m({ slug: "a", deadline: "2027-01-01" })], now);
    const rec = tasks.find((t) => t.id === "recommendations");
    expect(rec?.due).toBe("2026-11-20");
    expect(rec?.daysLeft).toBe(6);
  });

  it("adds a CSS Profile task for US grant universities", () => {
    const tasks = planTasks(profile, [m({ slug: "a", name: "Yale", deadline: "2027-01-02" })], now);
    expect(tasks.find((t) => t.id === "css-a")?.title).toBe("CSS Profile для Yale");
  });

  it("asks for SAT only when the list has US universities", () => {
    const noSat = { ...profile, sat: null };
    expect(planTasks(noSat, [m({ slug: "t", country: "Turkey" })], now).some((t) => t.id === "sat")).toBe(false);
    expect(planTasks(noSat, [m({ slug: "u" })], now).some((t) => t.id === "sat")).toBe(true);
  });

  it("is sorted by due date with undated tasks last", () => {
    const tasks = planTasks(profile, [m({ slug: "a", country: "Turkey", deadline: "2027-01-01" })], now);
    const dated = tasks.filter((t) => t.due).map((t) => t.due!);
    expect([...dated].sort()).toEqual(dated);
    expect(tasks.some((t) => !t.due)).toBe(true);
    tasks.forEach((t, i) => {
      if (!t.due) expect(i).toBeGreaterThanOrEqual(dated.length);
    });
  });
});

describe("basketCounts", () => {
  it("counts by basket", () => {
    expect(basketCounts([m({ slug: "a", basket: "dream" }), m({ slug: "b" })])).toEqual({ dream: 1, target: 1, safety: 0 });
  });
});
