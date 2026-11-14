"use client";

import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { useEffect, useMemo, useState } from "react";
import { UniversityLogo } from "@/components/UniversityLogo";
import { getGrants } from "@/content/grants";
import { daysLeftLabel, describeDeadline } from "@/lib/deadline";
import { locale, type Lang } from "@/lib/i18n";
import type { Basket, Match } from "@/lib/matcher";
import { basketCounts, chanceAtLeastOne, nextDeadline, planTasks } from "@/lib/plan";
import { countryName } from "@/lib/types";
import { useApplicant } from "@/lib/use-applicant";
import s from "./plan.module.css";

type Excluded = { slug: string; name: string; excluded: string };
type Row = Match | Excluded;

const DOC_TASKS = /^(english|sat|recommendations|statement|transcripts|css-)/;
const GRANT_BY_COUNTRY: Record<string, string> = {
  Turkey: "turkiye-burslari",
  Hungary: "stipendium-hungaricum",
  Korea: "global-korea-scholarship",
  "South Korea": "global-korea-scholarship",
  Japan: "mext-japan",
  China: "csc-china",
  Italy: "italy-dsu",
  Germany: "germany-public",
};

const isMatch = (r: Row): r is Match => !("excluded" in r);

function plural(n: number, one: string, few: string, many: string, lang: Lang = "ru") {
  if (lang === "uz") return "kun";
  const a = n % 100;
  const b = n % 10;
  return a > 10 && a < 20 ? many : b === 1 ? one : b >= 2 && b <= 4 ? few : many;
}

export function PlanClient() {
  const lang = useLang();
  const tr = useTr();
  const { ready, profile, list, toggle, removeMany, done, toggleTask } = useApplicant();

  const baskets: { key: Basket; title: string; hint: string }[] = [
    { key: "dream", title: tr("Мечта", "Orzu"), hint: tr("шанс ниже 15%", "imkoniyat 15% dan past") },
    { key: "target", title: tr("Реальные", "Haqiqiy"), hint: tr("15–45%", "15–45%") },
    { key: "safety", title: tr("Запасные", "Zaxira"), hint: tr("выше 45%", "45% dan yuqori") },
  ];
  const moneyLabel = {
    grant: tr("Полный грант", "To'liq grant"),
    pay: tr("По бюджету", "Byudjet bo'yicha"),
    partial: tr("С помощью", "Yordam bilan"),
  } as const;
  const gradeLabel: Record<string, string> = {
    "9": tr("9 класс", "9-sinf"),
    "10": tr("10 класс", "10-sinf"),
    "11": tr("11 класс", "11-sinf"),
    "12": tr("12 класс", "12-sinf"),
    gap: tr("после школы", "maktabdan keyin"),
  };
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState<number | null>(null);

  useEffect(() => {
    if (!ready || !profile) return;
    if (!list.length) {
      setRows([]);
      return;
    }
    let alive = true;
    fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, slugs: list, lang }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { matches: Row[]; limit?: number }) => {
        if (!alive) return;
        setError(false);
        setRows(j.matches);
        const cap = typeof j.limit === "number" ? j.limit : list.length;
        setLimit(cap);
        // Universities the server checked but no longer knows (deleted or renamed) leave the list.
        const returned = new Set(j.matches.map((m) => m.slug));
        const gone = list.slice(0, cap).filter((slug) => !returned.has(slug));
        if (gone.length) removeMany(gone);
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [ready, profile, list, removeMany, lang]);

  const matches = useMemo(() => (rows || []).filter(isMatch), [rows]);
  const excluded = useMemo(() => (rows || []).filter((r): r is Excluded => !isMatch(r)), [rows]);
  const now = useMemo(() => new Date(), []);
  const tasks = useMemo(() => (profile ? planTasks(profile, matches, now, lang) : []), [profile, matches, now, lang]);
  const next = useMemo(() => nextDeadline(matches, now), [matches, now]);
  const counts = basketCounts(matches);
  const docTasks = tasks.filter((t) => DOC_TASKS.test(t.id));
  const docsDone = docTasks.filter((t) => done.includes(t.id)).length;
  const grant = useMemo(() => {
    const slug = matches.map((m) => GRANT_BY_COUNTRY[m.country]).find(Boolean) ?? "stipendium-hungaricum";
    return getGrants(lang).find((g) => g.slug === slug) ?? null;
  }, [matches, lang]);

  if (!ready) return <div className={s.loading} aria-busy="true" />;

  if (!profile) {
    return (
      <section className={s.empty}>
        <h1>{tr("Соберём ваш план поступления", "O'qishga kirish rejangizni tuzamiz")}</h1>
        <p>
          {tr(
            "Шесть вопросов о бюджете семьи, баллах и странах — и вы увидите список вузов в трёх корзинах, шансы, сроки и дела на каждую неделю.",
            "Oila byudjeti, ballar va davlatlar haqida oltita savol — uch savatdagi OTMlar ro'yxati, imkoniyatlar, muddatlar va haftalik ishlarni ko'rasiz.",
          )}
        </p>
        <Link href="/plan/start" className={s.cta}>
          {tr("Составить мой план", "Rejamni tuzish")}
        </Link>
      </section>
    );
  }

  const name = profile.name || tr("Ваш план", "Rejangiz");
  const anyDated = matches.some((m) => describeDeadline(m.deadline, now, lang)?.daysLeft != null);
  const headline = next
    ? tr(
        `${name}, до первого дедлайна ${next.daysLeft} ${plural(next.daysLeft, "день", "дня", "дней", lang)}`,
        `${name}, birinchi dedlayngacha ${next.daysLeft} kun`,
      )
    : !matches.length
      ? tr(`${name}, добавьте вузы в план`, `${name}, rejaga OTMlarni qo'shing`)
      : anyDated
        ? tr(`${name}, сроки этого цикла прошли — готовимся к следующему`, `${name}, bu sikl muddatlari o'tdi — keyingisiga tayyorlanamiz`)
        : tr(`${name}, сроки подачи уточняйте на сайтах вузов`, `${name}, ariza muddatlarini OTM saytlarida aniqlashtiring`);
  const nextTask = tasks.find((t) => !done.includes(t.id));
  const progress = tasks.length ? Math.round((tasks.filter((t) => done.includes(t.id)).length / tasks.length) * 100) : 0;

  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div>
          <h1>{headline}</h1>
          <p className={s.meta}>
            {gradeLabel[profile.grade]} ·{" "}
            {tr(
              `бюджет семьи ${profile.budget ? `до $${profile.budget.toLocaleString(locale(lang))}` : "$0"}`,
              `oila byudjeti ${profile.budget ? `$${profile.budget.toLocaleString(locale(lang))} gacha` : "$0"}`,
            )}
            {profile.english.test !== "none" && profile.english.score != null
              ? ` · ${profile.english.test.toUpperCase()} ${profile.english.score}`
              : ""}
            {profile.sat ? ` · SAT ${profile.sat}` : ""}
            {profile.major ? ` · ${profile.major}` : ""}
          </p>
          {nextTask ? (
            <p className={s.next}>
              {tr("Следующий шаг:", "Keyingi qadam:")} <b>{nextTask.title}</b>
              {nextTask.daysLeft != null ? ` — ${daysLeftLabel(nextTask.daysLeft, lang)}` : ""}
            </p>
          ) : null}
          <div className={s.progress} aria-label={tr(`План выполнен на ${progress}%`, `Reja ${progress}% bajarildi`)}>
            <i style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Link href="/plan/start" className={s.editLink}>
          {tr("Изменить профиль", "Profilni tahrirlash")}
        </Link>
      </section>

      <section className={s.tiles} aria-label={tr("Главное", "Asosiy")}>
        <div className={s.tileSafety}>
          <small>{tr("Шанс поступить с грантом хотя бы в один", "Kamida bitta OTMga grant bilan kirish imkoniyati")}</small>
          <strong>{matches.length ? `≈ ${chanceAtLeastOne(matches)}%` : "—"}</strong>
          <span>{tr("по вузам из вашего списка", "ro'yxatingizdagi OTMlar bo'yicha")}</span>
        </div>
        <div className={s.tileTarget}>
          <small>{tr("Вузов в плане", "Rejadagi OTMlar")}</small>
          <strong>{matches.length}</strong>
          <span>
            {counts.dream} {tr("мечта", "orzu")} · {counts.target} {tr("реальные", "haqiqiy")} · {counts.safety} {tr("запасные", "zaxira")}
          </span>
        </div>
        <div className={s.tileInfo}>
          <small>{tr("Документы готовы", "Hujjatlar tayyor")}</small>
          <strong>
            {tr(`${docsDone} из ${docTasks.length}`, `${docTasks.length} tadan ${docsDone} ta`)}
          </strong>
          <span>{tr("отмечайте дела справа", "ishlarni o'ng tomonda belgilang")}</span>
        </div>
        <div className={s.tileDream}>
          <small>{tr("Ваши баллы", "Ballaringiz")}</small>
          <strong>{profile.sat ? `SAT ${profile.sat}` : profile.english.score ?? "—"}</strong>
          <span>
            {profile.sat
              ? tr("+80 баллов заметно поднимут шансы в США", "+80 ball AQShda imkoniyatni sezilarli oshiradi")
              : tr("SAT помогает в вузах США", "SAT AQSh OTMlarida yordam beradi")}
          </span>
        </div>
      </section>

      {error ? <p className={s.error}>{tr("Не удалось посчитать шансы. Обновите страницу.", "Imkoniyatni hisoblab bo'lmadi. Sahifani yangilang.")}</p> : null}

      <div className={s.layout}>
        <section className={s.list} aria-labelledby="mylist">
          <div className={s.listHead}>
            <h2 id="mylist">{tr("Мой список", "Mening ro'yxatim")}</h2>
            <Link href="/unis">{tr("Найти ещё вузы", "Yana OTM topish")}</Link>
          </div>
          {limit != null && list.length > limit ? (
            <p className={s.hint}>
              {tr(
                `Показаны ${limit} из ${list.length} вузов списка — подписчикам видно до 30.`,
                `Ro'yxatdagi ${list.length} OTMdan ${limit} tasi ko'rsatilmoqda — obunachilarga 30 tagacha ochiq.`,
              )}
            </p>
          ) : null}
          {rows && !matches.length && !excluded.length ? (
            <p className={s.hint}>
              {tr("Пока пусто.", "Hozircha bo'sh.")} <Link href="/plan/start">{tr("Подберите вузы по профилю", "Profil bo'yicha OTM tanlang")}</Link>{" "}
              {tr("или добавляйте их из каталога кнопкой «В мой план».", "yoki katalogdan «Rejamga» tugmasi orqali qo'shing.")}
            </p>
          ) : null}
          <div className={s.baskets}>
            {baskets.map((b) => {
              const items = matches.filter((m) => m.basket === b.key);
              return (
                <section key={b.key} className={`${s.basket} ${s[`basket_${b.key}`]}`} aria-label={b.title}>
                  <header>
                    <h3>{b.title}</h3>
                    <span>{b.hint}</span>
                  </header>
                  {items.map((m) => {
                    const d = describeDeadline(m.deadline, now, lang);
                    return (
                      <article key={m.slug} className={s.uni}>
                        <Link href={`/unis/${m.slug}`} className={s.uniLink}>
                          <UniversityLogo name={m.name} slug={m.slug} logo={m.logo} size={40} />
                          <span>
                            <b>{m.name}</b>
                            <small>
                              {countryName(m.country, lang)}
                              {m.city ? `, ${m.city}` : ""}
                            </small>
                          </span>
                        </Link>
                        <div className={s.chance} aria-label={tr(`Шанс около ${m.chance}%`, `Imkoniyat taxminan ${m.chance}%`)}>
                          <i style={{ width: `${Math.max(3, m.chance)}%` }} />
                        </div>
                        <div className={s.badges}>
                          <span className={s.badgeChance}>≈ {m.chance}%</span>
                          <span className={s.badgeMoney}>{moneyLabel[m.money]}</span>
                          {d ? (
                            <span className={s.badgeDate}>
                              {d.daysLeft != null && d.daysLeft >= 0 ? daysLeftLabel(d.daysLeft, lang) : d.label}
                            </span>
                          ) : null}
                        </div>
                        <button type="button" className={s.remove} onClick={() => toggle(m.slug)} aria-label={tr(`Убрать ${m.name} из плана`, `${m.name} ni rejadan olib tashlash`)}>
                          {tr("Убрать", "Olib tashlash")}
                        </button>
                      </article>
                    );
                  })}
                  {!items.length && rows ? <p className={s.emptyBasket}>{tr("Добавьте 2–4 вуза", "2–4 ta OTM qo'shing")}</p> : null}
                </section>
              );
            })}
          </div>
          {excluded.length ? (
            <div className={s.excluded}>
              <h3>{tr("Не подходят по профилю", "Profilga mos kelmaydi")}</h3>
              <ul>
                {excluded.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/unis/${x.slug}`}>{x.name}</Link> — {x.excluded}{" "}
                    <button type="button" onClick={() => toggle(x.slug)}>
                      {tr("убрать", "olib tashlash")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <aside className={s.side}>
          <section className={s.panel} aria-labelledby="tasks">
            <h2 id="tasks">{tr("Дела", "Vazifalar")}</h2>
            <ul className={s.tasks}>
              {tasks.slice(0, 8).map((t) => (
                <li key={t.id}>
                  <label>
                    <input type="checkbox" checked={done.includes(t.id)} onChange={() => toggleTask(t.id)} />
                    <span className={done.includes(t.id) ? s.taskDone : undefined}>
                      {t.title}
                      <small className={t.daysLeft != null && t.daysLeft <= 14 ? s.soon : undefined}>
                        {t.due
                          ? t.daysLeft != null && t.daysLeft < 0
                            ? tr("срок прошёл", "muddati o'tgan")
                            : daysLeftLabel(t.daysLeft ?? 0, lang)
                          : tr("без даты", "sanasiz")}
                        {t.guide ? (
                          <>
                            {" · "}
                            <Link href={`/guides/${t.guide}`}>{tr("гайд", "qo'llanma")}</Link>
                          </>
                        ) : null}
                      </small>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
          {grant ? (
            <section className={s.grant}>
              <small>{tr("Грант для вашего профиля", "Profilingiz uchun grant")}</small>
              <h3>{grant.name}</h3>
              <p>{grant.summary}</p>
              <Link href={`/grants#${grant.slug}`}>{tr("Что покрывает и как подать", "Nimalarni qoplaydi va qanday topshiriladi")}</Link>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
