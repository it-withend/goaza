"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { EnglishTest, Grades } from "@/lib/matcher";
import type { Grade } from "@/lib/profile";
import { useApplicant } from "@/lib/use-applicant";
import s from "./onboarding.module.css";

type Country = { value: string; label: string; count: number };

const GRADES: { v: Grade; l: string }[] = [
  { v: "9", l: "9 класс" },
  { v: "10", l: "10 класс" },
  { v: "11", l: "11 класс" },
  { v: "12", l: "12 класс / выпускной" },
  { v: "gap", l: "Уже окончил(а) школу" },
];

const BUDGETS = [
  { v: 0, l: "Ничего — нужен полный грант" },
  { v: 5000, l: "До $5 000 в год" },
  { v: 15000, l: "До $15 000 в год" },
  { v: 30000, l: "До $30 000 в год" },
  { v: 90000, l: "Больше $30 000" },
];

const SCHOOL: { v: Grades; l: string }[] = [
  { v: "excellent", l: "Почти все пятёрки" },
  { v: "good", l: "В основном пятёрки и четвёрки" },
  { v: "average", l: "Много четвёрок и троек" },
];

const TOTAL = 6;

export function Onboarding({ countries }: { countries: Country[] }) {
  const router = useRouter();
  const { ready, profile, setProfile, addMany } = useApplicant();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [budget, setBudget] = useState(0);
  const [test, setTest] = useState<EnglishTest>("ielts");
  const [score, setScore] = useState("");
  const [sat, setSat] = useState("");
  const [grades, setGrades] = useState<Grades>("good");
  const [picked, setPicked] = useState<string[]>([]);
  const [major, setMajor] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editing an existing profile: start from the saved answers.
  useEffect(() => {
    if (!ready || !profile) return;
    setName(profile.name ?? "");
    setGrade(profile.grade);
    setBudget(profile.budget);
    setTest(profile.english.test);
    setScore(profile.english.score != null ? String(profile.english.score) : "");
    setSat(profile.sat != null ? String(profile.sat) : "");
    setGrades(profile.grades);
    setPicked(profile.countries);
    setMajor(profile.major);
  }, [ready, profile]);

  const canNext = step !== 1 || grade !== null;

  async function finish() {
    if (!grade) return;
    setBusy(true);
    setError(null);
    const scoreNum = test === "none" || !score ? null : Number(score);
    const satNum = sat ? Number(sat) : null;
    const next = {
      grade,
      budget,
      countries: picked,
      english: { test, score: Number.isFinite(scoreNum) ? scoreNum : null },
      sat: satNum != null && satNum >= 400 && satNum <= 1600 ? satNum : null,
      grades,
      major: major.trim(),
      ...(name.trim() ? { name: name.trim() } : {}),
      updatedAt: new Date().toISOString(),
    };
    setProfile(next);
    try {
      const res = await fetch("/api/podbor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget,
          countries: picked,
          englishTest: test,
          englishScore: next.english.score,
          sat: next.sat,
          grades,
          major: next.major,
        }),
      });
      if (res.ok) {
        const j = (await res.json()) as Record<"dream" | "target" | "safety", { slug: string }[]>;
        addMany([...j.dream, ...j.target, ...j.safety].map((m) => m.slug));
      }
    } catch {
      setError("Профиль сохранён, но подобрать вузы не удалось — добавьте их из каталога.");
    }
    setBusy(false);
    router.push("/plan");
  }

  return (
    <div className={s.wrap}>
      {ready && profile ? (
        <p className={s.saved}>
          Ваш план уже сохранён в этом браузере — можно поправить ответы ниже или{" "}
          <Link href="/plan">открыть мой план</Link>.
        </p>
      ) : null}
      <div className={s.top}>
        <span>
          Шаг {step} из {TOTAL}
        </span>
        <div className={s.bar} aria-hidden>
          <i style={{ width: `${(step / TOTAL) * 100}%` }} />
        </div>
      </div>

      <form
        className={s.card}
        onSubmit={(e) => {
          e.preventDefault();
          if (step < TOTAL) setStep(step + 1);
          else void finish();
        }}
      >
        {step === 1 ? (
          <fieldset>
            <legend>Давайте знакомиться</legend>
            <label className={s.field}>
              <span>Как вас зовут? (необязательно)</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoComplete="given-name" />
            </label>
            <p className={s.q}>В каком вы классе?</p>
            <div className={s.options}>
              {GRADES.map((g) => (
                <label key={g.v} className={s.option}>
                  <input type="radio" name="grade" checked={grade === g.v} onChange={() => setGrade(g.v)} />
                  <span>{g.l}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend>Сколько семья может платить в год за учёбу и жильё?</legend>
            <p className={s.help}>Честный ответ важнее всего: от него зависит, какие вузы вообще имеет смысл рассматривать.</p>
            <div className={s.options}>
              {BUDGETS.map((b) => (
                <label key={b.v} className={s.option}>
                  <input type="radio" name="budget" checked={budget === b.v} onChange={() => setBudget(b.v)} />
                  <span>{b.l}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend>Английский</legend>
            <div className={s.row}>
              <select value={test} onChange={(e) => setTest(e.target.value as EnglishTest)} aria-label="Тест по английскому">
                <option value="ielts">IELTS</option>
                <option value="toefl">TOEFL iBT</option>
                <option value="duolingo">Duolingo</option>
                <option value="none">Ещё не сдавал(а)</option>
              </select>
              {test !== "none" ? (
                <label className={s.field}>
                  <span>Балл</span>
                  <input
                    inputMode="decimal"
                    value={score}
                    onChange={(e) => setScore(e.target.value.replace(",", "."))}
                    placeholder={test === "ielts" ? "6.5" : test === "toefl" ? "95" : "120"}
                  />
                </label>
              ) : null}
            </div>
            <p className={s.q}>Как вы учитесь?</p>
            <div className={s.options}>
              {SCHOOL.map((o) => (
                <label key={o.v} className={s.option}>
                  <input type="radio" name="school" checked={grades === o.v} onChange={() => setGrades(o.v)} />
                  <span>{o.l}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 4 ? (
          <fieldset>
            <legend>SAT</legend>
            <p className={s.help}>Сдавали — впишите балл. Нет — оставьте пустым, это нормально.</p>
            <label className={s.field}>
              <span>Балл SAT</span>
              <input inputMode="numeric" value={sat} onChange={(e) => setSat(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="1380" />
            </label>
          </fieldset>
        ) : null}

        {step === 5 ? (
          <fieldset>
            <legend>Какие страны рассматриваете?</legend>
            <p className={s.help}>Можно ничего не выбирать — будем искать везде.</p>
            <div className={s.chips}>
              {countries.map((c) => (
                <button
                  type="button"
                  key={c.value}
                  aria-pressed={picked.includes(c.value)}
                  onClick={() => setPicked((p) => (p.includes(c.value) ? p.filter((x) => x !== c.value) : [...p, c.value]))}
                >
                  {c.label} <span>{c.count}</span>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 6 ? (
          <fieldset>
            <legend>Кем хотите стать?</legend>
            <label className={s.field}>
              <span>Специальность (необязательно)</span>
              <input value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Computer Science, Economics…" maxLength={80} />
            </label>
            <p className={s.help}>Подберём вузы, где это направление сильное.</p>
          </fieldset>
        ) : null}

        <div className={s.actions}>
          {step > 1 ? (
            <button type="button" className={s.back} onClick={() => setStep(step - 1)}>
              Назад
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className={s.next} disabled={!canNext || busy}>
            {step < TOTAL ? "Дальше" : busy ? "Собираем…" : "Собрать мой план"}
          </button>
        </div>
        {error ? <p className={s.error}>{error}</p> : null}
      </form>
    </div>
  );
}
