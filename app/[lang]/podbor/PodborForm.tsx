"use client";

import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { useState } from "react";
import { GateCta } from "@/components/gate/GateCta";
import { UniversityLogo } from "@/components/UniversityLogo";
import type { Basket, Match } from "@/lib/matcher";
import { countryName } from "@/lib/types";
import f from "./podbor.module.css";

type Result = {
  full: boolean;
  counts: Record<Basket, number>;
  dream: Match[];
  target: Match[];
  safety: Match[];
};

export function PodborForm({
  countries,
  botUsername,
}: {
  countries: { value: string; label: string; count: number }[];
  botUsername: string;
}) {
  const lang = useLang();
  const tr = useTr();

  const budgets = [
    { value: 0, label: tr("Ничего — нужен полный грант", "Hech narsa — to'liq grant kerak") },
    { value: 5000, label: tr("До $5 000 в год", "Yiliga $5 000 gacha") },
    { value: 15000, label: tr("До $15 000 в год", "Yiliga $15 000 gacha") },
    { value: 30000, label: tr("До $30 000 в год", "Yiliga $30 000 gacha") },
    { value: 90000, label: tr("Больше $30 000", "$30 000 dan ortiq") },
  ];

  const baskets: { key: Basket; title: string; hint: string }[] = [
    { key: "dream", title: tr("Мечта", "Orzu"), hint: tr("Шансы ниже 15% — подавайте в 3–4 таких", "Imkoniyat 15% dan past — 3–4 tasiga topshiring") },
    { key: "target", title: tr("Реальные", "Haqiqiy"), hint: tr("Ваш уровень — основа списка, 4–6 вузов", "Sizning darajangiz — ro'yxat asosi, 4–6 ta OTM") },
    { key: "safety", title: tr("Запасные", "Zaxira"), hint: tr("Высокие шансы — 3–4 вуза, чтобы точно поступить", "Yuqori imkoniyat — aniq kirish uchun 3–4 ta OTM") },
  ];

  const moneyLabel = {
    grant: tr("Полный грант", "To'liq grant"),
    pay: tr("По бюджету", "Byudjet bo'yicha"),
    partial: tr("С помощью", "Yordam bilan"),
  } as const;

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
        body: JSON.stringify({ budget, countries: picked, englishTest, englishScore, sat, grades, major, lang }),
      });
      if (!res.ok) throw new Error();
      setResult(await res.json());
      requestAnimationFrame(() => document.getElementById("podbor-result")?.scrollIntoView({ behavior: "smooth" }));
    } catch {
      setError(tr("Не удалось подобрать вузы. Проверьте интернет и попробуйте ещё раз.", "OTMlarni saralab bo'lmadi. Internetni tekshiring va qayta urinib ko'ring."));
    } finally {
      setBusy(false);
    }
  }

  const total = result ? result.counts.dream + result.counts.target + result.counts.safety : 0;

  return (
    <>
      <form className={f.form} onSubmit={submit}>
        <fieldset>
          <legend>{tr("1. Сколько семья может платить в год за учёбу и жильё?", "1. Oilangiz o'qish va yashash uchun yiliga qancha to'lay oladi?")}</legend>
          <div className={f.options}>
            {budgets.map((b) => (
              <label key={b.value} className={f.option}>
                <input type="radio" name="budget" checked={budget === b.value} onChange={() => setBudget(b.value)} />
                <span>{b.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>{tr("2. Английский", "2. Ingliz tili")}</legend>
          <div className={f.row}>
            <select value={englishTest} onChange={(e) => setEnglishTest(e.target.value)} aria-label={tr("Тест по английскому", "Ingliz tili testi")}>
              <option value="ielts">IELTS</option>
              <option value="toefl">TOEFL iBT</option>
              <option value="duolingo">Duolingo</option>
              <option value="none">{tr("Ещё не сдавал(а)", "Hali topshirmaganman")}</option>
            </select>
            {englishTest !== "none" ? (
              <input
                inputMode="decimal"
                placeholder={
                  englishTest === "ielts"
                    ? tr("Например, 6.5", "Masalan, 6.5")
                    : englishTest === "toefl"
                      ? tr("Например, 95", "Masalan, 95")
                      : tr("Например, 120", "Masalan, 120")
                }
                value={englishScore}
                onChange={(e) => setEnglishScore(e.target.value.replace(",", "."))}
                aria-label={tr("Балл", "Ball")}
              />
            ) : (
              <p className={f.help}>{tr("Подберём без учёта требований к языку.", "Til talablarini hisobga olmasdan tanlaymiz.")}</p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>{tr("3. SAT (если сдавали)", "3. SAT (agar topshirgan bo'lsangiz)")}</legend>
          <input
            inputMode="numeric"
            placeholder={tr("Например, 1380 — или оставьте пустым", "Masalan, 1380 — yoki bo'sh qoldiring")}
            value={sat}
            onChange={(e) => setSat(e.target.value.replace(/\D/g, "").slice(0, 4))}
            aria-label={tr("Балл SAT", "SAT balli")}
          />
        </fieldset>

        <fieldset>
          <legend>{tr("4. Оценки в школе", "4. Maktabdagi baholar")}</legend>
          <div className={f.options}>
            {[
              { v: "excellent", l: tr("Почти все пятёрки", "Deyarli barcha baholar a'lo") },
              { v: "good", l: tr("В основном пятёрки и четвёрки", "Asosan 4 va 5 baholar") },
              { v: "average", l: tr("Много четвёрок и троек", "Ko'proq 3 va 4 baholar") },
            ].map((o) => (
              <label key={o.v} className={f.option}>
                <input type="radio" name="grades" checked={grades === o.v} onChange={() => setGrades(o.v)} />
                <span>{o.l}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>{tr("5. Страны (необязательно)", "5. Davlatlar (ixtiyoriy)")}</legend>
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
          <p className={f.help}>{tr("Ничего не выбрано — ищем во всех странах.", "Hech narsa tanlanmagan — barcha davlatlardan qidiramiz.")}</p>
        </fieldset>

        <fieldset>
          <legend>{tr("6. Специальность (необязательно)", "6. Mutaxassislik (ixtiyoriy)")}</legend>
          <input
            placeholder={tr("Например, Computer Science, Economics", "Masalan, Computer Science, Economics")}
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            aria-label={tr("Специальность", "Mutaxassislik")}
          />
        </fieldset>

        <button type="submit" className={f.submit} disabled={busy}>
          {busy ? tr("Подбираем…", "Tanlanmoqda…") : tr("Подобрать вузы", "OTMlarni tanlash")}
        </button>
        {error ? <p className={f.error}>{error}</p> : null}
      </form>

      {result ? (
        <section id="podbor-result" className={f.result} aria-live="polite">
          <h2>
            {total
              ? tr(
                  `Подходит ${total} ${total === 1 ? "вуз" : total < 5 ? "вуза" : "вузов"}`,
                  `${total} ta OTM mos keladi`,
                )
              : tr("Подходящих вузов не нашлось", "Mos OTMlar topilmadi")}
          </h2>
          {!total ? (
            <p className={f.help}>
              {tr(
                "Попробуйте убрать фильтр по странам или указать бюджет выше. Если денег нет совсем, посмотрите ",
                "Davlatlar filtrini olib tashlang yoki kattaroq byudjet belgilang. Agar pul umuman bo'lmasa, ",
              )}
              <Link href="/grants">{tr("государственные стипендии", "davlat stipendiyalarini")}</Link>{" "}
              {tr("— там нет конкурса по деньгам.", "ko'ring — ularda pul bo'yicha cheklov yo'q.")}
            </p>
          ) : null}

          {baskets.map((b) =>
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
                            {countryName(m.country, lang)}
                            {m.city ? `, ${m.city}` : ""} · {moneyLabel[m.money]} · {tr("шанс", "imkoniyat")} ≈{m.chance}%
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
                {tr(
                  `Показали по 2 вуза из каждой корзины. Полный список из ${total} вузов с фильтрами — для подписчиков канала @studyaza. Это бесплатно.`,
                  `Har bir savatdan 2 tadan OTM ko'rsatildi. ${total} ta OTMning filtrli to'liq ro'yxati @studyaza kanali obunachilari uchun. Bu bepul.`,
                )}
              </p>
              <GateCta botUsername={botUsername} label={tr("Открыть полный список", "To'liq ro'yxatni ochish")} />
            </div>
          ) : null}

          <p className={f.disclaimer}>
            {tr(
              "Шанс — грубая оценка по проценту приёма, SAT и оценкам. Для иностранцев, которым нужна помощь, шансы в need-aware вузах ниже официального процента приёма.",
              "Imkoniyat — qabul foizi, SAT va baholarga asoslangan taxminiy hisob. Yordam kerak bo'lgan chet elliklar uchun need-aware OTMlardagi imkoniyat rasmiy qabul foizidan pastroq bo'ladi.",
            )}
          </p>
        </section>
      ) : null}
    </>
  );
}
