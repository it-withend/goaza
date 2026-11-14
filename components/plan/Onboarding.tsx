"use client";

import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { localizePath } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { EnglishTest, Grades } from "@/lib/matcher";
import type { Grade } from "@/lib/profile";
import { useApplicant } from "@/lib/use-applicant";
import s from "./onboarding.module.css";

type Country = { value: string; label: string; count: number };

const TOTAL = 6;

export function Onboarding({ countries }: { countries: Country[] }) {
  const lang = useLang();
  const tr = useTr();
  const router = useRouter();
  const { ready, profile, setProfile, addMany } = useApplicant();

  const gradeOpts: { v: Grade; l: string }[] = [
    { v: "9", l: tr("9 класс", "9-sinf") },
    { v: "10", l: tr("10 класс", "10-sinf") },
    { v: "11", l: tr("11 класс", "11-sinf") },
    { v: "12", l: tr("12 класс / выпускной", "12-sinf / bitiruvchi") },
    { v: "gap", l: tr("Уже окончил(а) школу", "Maktabni allaqachon tugatganman") },
  ];

  const budgetOpts = [
    { v: 0, l: tr("Ничего — нужен полный грант", "Hech narsa — to'liq grant kerak") },
    { v: 5000, l: tr("До $5 000 в год", "Yiliga $5 000 gacha") },
    { v: 15000, l: tr("До $15 000 в год", "Yiliga $15 000 gacha") },
    { v: 30000, l: tr("До $30 000 в год", "Yiliga $30 000 gacha") },
    { v: 90000, l: tr("Больше $30 000", "$30 000 dan ortiq") },
  ];

  const schoolOpts: { v: Grades; l: string }[] = [
    { v: "excellent", l: tr("Почти все пятёрки", "Deyarli barcha baholar a'lo") },
    { v: "good", l: tr("В основном пятёрки и четвёрки", "Asosan 4 va 5 baholar") },
    { v: "average", l: tr("Много четвёрок и троек", "Ko'proq 3 va 4 baholar") },
  ];
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
          lang,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const j = (await res.json()) as Record<"dream" | "target" | "safety", { slug: string }[]>;
      addMany([...j.dream, ...j.target, ...j.safety].map((m) => m.slug));
      setBusy(false);
      router.push(localizePath(lang, "/plan"));
    } catch {
      setError(
        tr(
          "Профиль сохранён, но подобрать вузы сейчас не удалось — попробуйте ещё раз или откройте план и добавьте вузы из каталога.",
          "Profil saqlandi, lekin hozir universitetlarni saralab bo'lmadi — qayta urinib ko'ring yoki rejani ochib katalogdan qo'shing.",
        ),
      );
      setBusy(false);
    }
  }

  return (
    <div className={s.wrap}>
      {ready && profile ? (
        <p className={s.saved}>
          {tr(
            "Ваш план уже сохранён в этом браузере — можно поправить ответы ниже или ",
            "Rejangiz allaqachon ushbu brauzerda saqlangan — quyidagi javoblarni tahrirlashingiz yoki ",
          )}
          <Link href="/plan">{tr("открыть мой план", "rejamni ochishingiz mumkin")}</Link>.
        </p>
      ) : null}
      <div className={s.top}>
        <span>
          {tr(`Шаг ${step} из ${TOTAL}`, `${TOTAL} tadan ${step}-qadam`)}
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
            <legend>{tr("Давайте знакомиться", "Tanishib olaylik")}</legend>
            <label className={s.field}>
              <span>{tr("Как вас зовут? (необязательно)", "Ismingiz nima? (ixtiyoriy)")}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoComplete="given-name" />
            </label>
            <p className={s.q}>{tr("В каком вы классе?", "Nechanchi sinfda o'qiysiz?")}</p>
            <div className={s.options}>
              {gradeOpts.map((g) => (
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
            <legend>{tr("Сколько семья может платить в год за учёбу и жильё?", "Oilangiz o'qish va yashash uchun yiliga qancha to'lay oladi?")}</legend>
            <p className={s.help}>
              {tr(
                "Честный ответ важнее всего: от него зависит, какие вузы вообще имеет смысл рассматривать.",
                "Halol javob eng muhimi: qaysi universitetlarni ko'rib chiqish ma'qulligi shunga bog'liq.",
              )}
            </p>
            <div className={s.options}>
              {budgetOpts.map((b) => (
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
            <legend>{tr("Английский", "Ingliz tili")}</legend>
            <div className={s.row}>
              <select value={test} onChange={(e) => setTest(e.target.value as EnglishTest)} aria-label={tr("Тест по английскому", "Ingliz tili testi")}>
                <option value="ielts">IELTS</option>
                <option value="toefl">TOEFL iBT</option>
                <option value="duolingo">Duolingo</option>
                <option value="none">{tr("Ещё не сдавал(а)", "Hali topshirmaganman")}</option>
              </select>
              {test !== "none" ? (
                <label className={s.field}>
                  <span>{tr("Балл", "Ball")}</span>
                  <input
                    inputMode="decimal"
                    value={score}
                    onChange={(e) => setScore(e.target.value.replace(",", "."))}
                    placeholder={test === "ielts" ? "6.5" : test === "toefl" ? "95" : "120"}
                  />
                </label>
              ) : null}
            </div>
            <p className={s.q}>{tr("Как вы учитесь?", "Maktabda qanday o'qiysiz?")}</p>
            <div className={s.options}>
              {schoolOpts.map((o) => (
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
            <p className={s.help}>
              {tr(
                "Сдавали — впишите балл. Нет — оставьте пустым, это нормально.",
                "Topshirgan bo'lsangiz — ballni kiriting. Yo'q bo'lsa — bo'sh qoldiring, bu oddiy hol.",
              )}
            </p>
            <label className={s.field}>
              <span>{tr("Балл SAT", "SAT balli")}</span>
              <input inputMode="numeric" value={sat} onChange={(e) => setSat(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="1380" />
            </label>
          </fieldset>
        ) : null}

        {step === 5 ? (
          <fieldset>
            <legend>{tr("Какие страны рассматриваете?", "Qaysi davlatlarni ko'rib chiqyapsiz?")}</legend>
            <p className={s.help}>
              {tr("Можно ничего не выбирать — будем искать везде.", "Hech narsa tanlamasangiz ham bo'ladi — hamma joydan qidiramiz.")}
            </p>
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
            <legend>{tr("Кем хотите стать?", "Kim bo'lishni xohlaysiz?")}</legend>
            <label className={s.field}>
              <span>{tr("Специальность (необязательно)", "Mutaxassislik (ixtiyoriy)")}</span>
              <input value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Computer Science, Economics…" maxLength={80} />
            </label>
            <p className={s.help}>{tr("Подберём вузы, где это направление сильное.", "Ushbu yo'nalish kuchli bo'lgan OTMlarni tanlab beramiz.")}</p>
          </fieldset>
        ) : null}

        <div className={s.actions}>
          {step > 1 ? (
            <button type="button" className={s.back} onClick={() => setStep(step - 1)}>
              {tr("Назад", "Orqaga")}
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className={s.next} disabled={!canNext || busy}>
            {step < TOTAL ? tr("Дальше", "Keyingi") : busy ? tr("Собираем…", "Tayyorlanmoqda…") : tr("Собрать мой план", "Rejamni tuzish")}
          </button>
        </div>
        {error ? (
          <p className={s.error} role="alert">
            {error} <Link href="/plan">{tr("Открыть план", "Rejani ochish")}</Link>
          </p>
        ) : null}
      </form>
    </div>
  );
}
