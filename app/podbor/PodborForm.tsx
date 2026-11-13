"use client";

import Link from "next/link";
import { useState } from "react";
import { GateCta } from "@/components/gate/GateCta";
import { UniversityLogo } from "@/components/UniversityLogo";
import type { Basket, Match } from "@/lib/matcher";
import { countryRu } from "@/lib/types";
import f from "./podbor.module.css";

type Result = {
  full: boolean;
  counts: Record<Basket, number>;
  dream: Match[];
  target: Match[];
  safety: Match[];
};

const BUDGETS = [
  { value: 0, label: "Ничего — нужен полный грант" },
  { value: 5000, label: "До $5 000 в год" },
  { value: 15000, label: "До $15 000 в год" },
  { value: 30000, label: "До $30 000 в год" },
  { value: 90000, label: "Больше $30 000" },
];

const BASKETS: { key: Basket; title: string; hint: string }[] = [
  { key: "dream", title: "Мечта", hint: "Шансы ниже 15% — подавайте в 3–4 таких" },
  { key: "target", title: "Реальные", hint: "Ваш уровень — основа списка, 4–6 вузов" },
  { key: "safety", title: "Запасные", hint: "Высокие шансы — 3–4 вуза, чтобы точно поступить" },
];

const MONEY_RU = { grant: "Полный грант", pay: "По бюджету", partial: "С помощью" } as const;

export function PodborForm({
  countries,
  botUsername,
}: {
  countries: { value: string; label: string; count: number }[];
  botUsername: string;
}) {
  const [budget, setBudget] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [englishTest, setEnglishTest] = useState("ielts");
  const [englishScore, setEnglishScore] = useState("");
  const [sat, setSat] = useState("");
  const [grades, setGrades] = useState("good");
  const [major, setMajor] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  function toggle(c: string) {
    setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/podbor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget, countries: picked, englishTest, englishScore, sat, grades, major }),
      });
      if (!res.ok) throw new Error();
      setResult(await res.json());
      requestAnimationFrame(() => document.getElementById("podbor-result")?.scrollIntoView({ behavior: "smooth" }));
    } catch {
      setError("Не удалось подобрать вузы. Проверьте интернет и попробуйте ещё раз.");
    } finally {
      setBusy(false);
    }
  }

  const total = result ? result.counts.dream + result.counts.target + result.counts.safety : 0;

  return (
    <>
      <form className={f.form} onSubmit={submit}>
        <fieldset>
          <legend>1. Сколько семья может платить в год за учёбу и жильё?</legend>
          <div className={f.options}>
            {BUDGETS.map((b) => (
              <label key={b.value} className={f.option}>
                <input type="radio" name="budget" checked={budget === b.value} onChange={() => setBudget(b.value)} />
                <span>{b.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>2. Английский</legend>
          <div className={f.row}>
            <select value={englishTest} onChange={(e) => setEnglishTest(e.target.value)} aria-label="Тест по английскому">
              <option value="ielts">IELTS</option>
              <option value="toefl">TOEFL iBT</option>
              <option value="duolingo">Duolingo</option>
              <option value="none">Ещё не сдавал(а)</option>
            </select>
            {englishTest !== "none" ? (
              <input
                inputMode="decimal"
                placeholder={englishTest === "ielts" ? "Например, 6.5" : englishTest === "toefl" ? "Например, 95" : "Например, 120"}
                value={englishScore}
                onChange={(e) => setEnglishScore(e.target.value.replace(",", "."))}
                aria-label="Балл"
              />
            ) : (
              <p className={f.help}>Подберём без учёта требований к языку.</p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>3. SAT (если сдавали)</legend>
          <input
            inputMode="numeric"
            placeholder="Например, 1380 — или оставьте пустым"
            value={sat}
            onChange={(e) => setSat(e.target.value.replace(/\D/g, "").slice(0, 4))}
            aria-label="Балл SAT"
          />
        </fieldset>

        <fieldset>
          <legend>4. Оценки в школе</legend>
          <div className={f.options}>
            {[
              { v: "excellent", l: "Почти все пятёрки" },
              { v: "good", l: "В основном пятёрки и четвёрки" },
              { v: "average", l: "Много четвёрок и троек" },
            ].map((o) => (
              <label key={o.v} className={f.option}>
                <input type="radio" name="grades" checked={grades === o.v} onChange={() => setGrades(o.v)} />
                <span>{o.l}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>5. Страны (необязательно)</legend>
          <div className={f.chips}>
            {countries.map((c) => (
              <button
                type="button"
                key={c.value}
                aria-pressed={picked.includes(c.value)}
                onClick={() => toggle(c.value)}
              >
                {c.label} <span>{c.count}</span>
              </button>
            ))}
          </div>
          <p className={f.help}>Ничего не выбрано — ищем во всех странах.</p>
        </fieldset>

        <fieldset>
          <legend>6. Специальность (необязательно)</legend>
          <input
            placeholder="Например, Computer Science, Economics"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            aria-label="Специальность"
          />
        </fieldset>

        <button type="submit" className={f.submit} disabled={busy}>
          {busy ? "Подбираем…" : "Подобрать вузы"}
        </button>
        {error ? <p className={f.error}>{error}</p> : null}
      </form>

      {result ? (
        <section id="podbor-result" className={f.result} aria-live="polite">
          <h2>
            {total ? `Подходит ${total} ${total === 1 ? "вуз" : total < 5 ? "вуза" : "вузов"}` : "Подходящих вузов не нашлось"}
          </h2>
          {!total ? (
            <p className={f.help}>
              Попробуйте убрать фильтр по странам или указать бюджет выше. Если денег нет совсем, посмотрите{" "}
              <Link href="/grants">государственные стипендии</Link> — там нет конкурса по деньгам.
            </p>
          ) : null}

          {BASKETS.map((b) =>
            result.counts[b.key] ? (
              <div key={b.key} className={f.basket}>
                <div className={f.basketHead}>
                  <h3>
                    {b.title} <span>{result.counts[b.key]}</span>
                  </h3>
                  <p>{b.hint}</p>
                </div>
                <ul>
                  {result[b.key].map((m) => (
                    <li key={m.slug}>
                      <Link href={result.full ? `/dashboard/u/${m.slug}` : `/unis/${m.slug}`}>
                        <UniversityLogo name={m.name} slug={m.slug} logo={m.logo} size={40} />
                        <span className={f.uniText}>
                          <b>{m.name}</b>
                          <small>
                            {countryRu(m.country)}
                            {m.city ? `, ${m.city}` : ""} · {MONEY_RU[m.money]} · шанс ≈{m.chance}%
                          </small>
                          {m.reasons.length ? <em>{m.reasons.join(". ")}</em> : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null,
          )}

          {!result.full && total > 0 ? (
            <div className={f.unlock}>
              <p>
                Показали по 2 вуза из каждой корзины. Полный список из {total} вузов с фильтрами — для
                подписчиков канала @studyaza. Это бесплатно.
              </p>
              <GateCta botUsername={botUsername} label="Открыть полный список" />
            </div>
          ) : null}

          <p className={f.disclaimer}>
            Шанс — грубая оценка по проценту приёма, SAT и оценкам. Для иностранцев, которым нужна помощь,
            шансы в need-aware вузах ниже официального процента приёма.
          </p>
        </section>
      ) : null}
    </>
  );
}
