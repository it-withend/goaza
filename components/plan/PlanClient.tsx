"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { UniversityLogo } from "@/components/UniversityLogo";
import { GRANTS } from "@/content/grants";
import { daysLeftLabel, describeDeadline } from "@/lib/deadline";
import type { Basket, Match } from "@/lib/matcher";
import { basketCounts, chanceAtLeastOne, nextDeadline, planTasks } from "@/lib/plan";
import { countryRu } from "@/lib/types";
import { useApplicant } from "@/lib/use-applicant";
import s from "./plan.module.css";

type Excluded = { slug: string; name: string; excluded: string };
type Row = Match | Excluded;

const BASKETS: { key: Basket; title: string; hint: string }[] = [
  { key: "dream", title: "Мечта", hint: "шанс ниже 15%" },
  { key: "target", title: "Реальные", hint: "15–45%" },
  { key: "safety", title: "Запасные", hint: "выше 45%" },
];

const MONEY_RU = { grant: "Полный грант", pay: "По бюджету", partial: "С помощью" } as const;
const GRADE_RU: Record<string, string> = { "9": "9 класс", "10": "10 класс", "11": "11 класс", "12": "12 класс", gap: "после школы" };
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

function plural(n: number, one: string, few: string, many: string) {
  const a = n % 100;
  const b = n % 10;
  return a > 10 && a < 20 ? many : b === 1 ? one : b >= 2 && b <= 4 ? few : many;
}

export function PlanClient() {
  const { ready, profile, list, toggle, done, toggleTask } = useApplicant();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState(false);

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
      body: JSON.stringify({ profile, slugs: list }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { matches: Row[] }) => alive && setRows(j.matches))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [ready, profile, list]);

  const matches = useMemo(() => (rows || []).filter(isMatch), [rows]);
  const excluded = useMemo(() => (rows || []).filter((r): r is Excluded => !isMatch(r)), [rows]);
  const now = useMemo(() => new Date(), []);
  const tasks = useMemo(() => (profile ? planTasks(profile, matches, now) : []), [profile, matches, now]);
  const next = useMemo(() => nextDeadline(matches, now), [matches, now]);
  const counts = basketCounts(matches);
  const docTasks = tasks.filter((t) => DOC_TASKS.test(t.id));
  const docsDone = docTasks.filter((t) => done.includes(t.id)).length;
  const grant = useMemo(() => {
    const slug = matches.map((m) => GRANT_BY_COUNTRY[m.country]).find(Boolean) ?? "stipendium-hungaricum";
    return GRANTS.find((g) => g.slug === slug) ?? null;
  }, [matches]);

  if (!ready) return <div className={s.loading} aria-busy="true" />;

  if (!profile) {
    return (
      <section className={s.empty}>
        <h1>Соберём ваш план поступления</h1>
        <p>
          Шесть вопросов о бюджете семьи, баллах и странах — и вы увидите список вузов в трёх корзинах,
          шансы, сроки и дела на каждую неделю.
        </p>
        <Link href="/plan/start" className={s.cta}>
          Составить мой план
        </Link>
      </section>
    );
  }

  const name = profile.name || "Ваш план";
  const headline = next
    ? `${name}, до первого дедлайна ${next.daysLeft} ${plural(next.daysLeft, "день", "дня", "дней")}`
    : matches.length
      ? `${name}, сроки этого цикла прошли — готовимся к следующему`
      : `${name}, добавьте вузы в план`;
  const nextTask = tasks.find((t) => !done.includes(t.id));
  const progress = tasks.length ? Math.round((tasks.filter((t) => done.includes(t.id)).length / tasks.length) * 100) : 0;

  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div>
          <h1>{headline}</h1>
          <p className={s.meta}>
            {GRADE_RU[profile.grade]} · бюджет семьи {profile.budget ? `до $${profile.budget.toLocaleString("ru-RU")}` : "$0"}
            {profile.english.test !== "none" && profile.english.score != null
              ? ` · ${profile.english.test.toUpperCase()} ${profile.english.score}`
              : ""}
            {profile.sat ? ` · SAT ${profile.sat}` : ""}
            {profile.major ? ` · ${profile.major}` : ""}
          </p>
          {nextTask ? (
            <p className={s.next}>
              Следующий шаг: <b>{nextTask.title}</b>
              {nextTask.daysLeft != null ? ` — ${daysLeftLabel(nextTask.daysLeft)}` : ""}
            </p>
          ) : null}
          <div className={s.progress} aria-label={`План выполнен на ${progress}%`}>
            <i style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Link href="/plan/start" className={s.editLink}>
          Изменить профиль
        </Link>
      </section>

      <section className={s.tiles} aria-label="Главное">
        <div className={s.tileSafety}>
          <small>Шанс поступить с грантом хотя бы в один</small>
          <strong>{matches.length ? `≈ ${chanceAtLeastOne(matches)}%` : "—"}</strong>
          <span>по вузам из вашего списка</span>
        </div>
        <div className={s.tileTarget}>
          <small>Вузов в плане</small>
          <strong>{matches.length}</strong>
          <span>
            {counts.dream} мечта · {counts.target} реальные · {counts.safety} запасные
          </span>
        </div>
        <div className={s.tileInfo}>
          <small>Документы готовы</small>
          <strong>
            {docsDone} из {docTasks.length}
          </strong>
          <span>отмечайте дела справа</span>
        </div>
        <div className={s.tileDream}>
          <small>Ваши баллы</small>
          <strong>{profile.sat ? `SAT ${profile.sat}` : profile.english.score ?? "—"}</strong>
          <span>{profile.sat ? "+80 баллов заметно поднимут шансы в США" : "SAT помогает в вузах США"}</span>
        </div>
      </section>

      {error ? <p className={s.error}>Не удалось посчитать шансы. Обновите страницу.</p> : null}

      <div className={s.layout}>
        <section className={s.list} aria-labelledby="mylist">
          <div className={s.listHead}>
            <h2 id="mylist">Мой список</h2>
            <Link href="/dashboard">Найти ещё вузы</Link>
          </div>
          {rows && !matches.length && !excluded.length ? (
            <p className={s.hint}>
              Пока пусто. <Link href="/plan/start">Подберите вузы по профилю</Link> или добавляйте их из каталога кнопкой
              «В мой план».
            </p>
          ) : null}
          <div className={s.baskets}>
            {BASKETS.map((b) => {
              const items = matches.filter((m) => m.basket === b.key);
              return (
                <section key={b.key} className={`${s.basket} ${s[`basket_${b.key}`]}`} aria-label={b.title}>
                  <header>
                    <h3>{b.title}</h3>
                    <span>{b.hint}</span>
                  </header>
                  {items.map((m) => {
                    const d = describeDeadline(m.deadline, now);
                    return (
                      <article key={m.slug} className={s.uni}>
                        <Link href={`/unis/${m.slug}`} className={s.uniLink}>
                          <UniversityLogo name={m.name} slug={m.slug} logo={m.logo} size={40} />
                          <span>
                            <b>{m.name}</b>
                            <small>
                              {countryRu(m.country)}
                              {m.city ? `, ${m.city}` : ""}
                            </small>
                          </span>
                        </Link>
                        <div className={s.chance} aria-label={`Шанс около ${m.chance}%`}>
                          <i style={{ width: `${Math.max(3, m.chance)}%` }} />
                        </div>
                        <div className={s.badges}>
                          <span className={s.badgeChance}>≈ {m.chance}%</span>
                          <span className={s.badgeMoney}>{MONEY_RU[m.money]}</span>
                          {d ? (
                            <span className={s.badgeDate}>
                              {d.daysLeft != null && d.daysLeft >= 0 ? daysLeftLabel(d.daysLeft) : d.label}
                            </span>
                          ) : null}
                        </div>
                        <button type="button" className={s.remove} onClick={() => toggle(m.slug)} aria-label={`Убрать ${m.name} из плана`}>
                          Убрать
                        </button>
                      </article>
                    );
                  })}
                  {!items.length && rows ? <p className={s.emptyBasket}>Добавьте 2–4 вуза</p> : null}
                </section>
              );
            })}
          </div>
          {excluded.length ? (
            <div className={s.excluded}>
              <h3>Не подходят по профилю</h3>
              <ul>
                {excluded.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/unis/${x.slug}`}>{x.name}</Link> — {x.excluded}{" "}
                    <button type="button" onClick={() => toggle(x.slug)}>
                      убрать
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <aside className={s.side}>
          <section className={s.panel} aria-labelledby="tasks">
            <h2 id="tasks">Дела</h2>
            <ul className={s.tasks}>
              {tasks.slice(0, 8).map((t) => (
                <li key={t.id}>
                  <label>
                    <input type="checkbox" checked={done.includes(t.id)} onChange={() => toggleTask(t.id)} />
                    <span className={done.includes(t.id) ? s.taskDone : undefined}>
                      {t.title}
                      <small className={t.daysLeft != null && t.daysLeft <= 14 ? s.soon : undefined}>
                        {t.due ? (t.daysLeft != null && t.daysLeft < 0 ? "срок прошёл" : daysLeftLabel(t.daysLeft ?? 0)) : "без даты"}
                        {t.guide ? (
                          <>
                            {" · "}
                            <Link href={`/guides/${t.guide}`}>гайд</Link>
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
              <small>Грант для вашего профиля</small>
              <h3>{grant.name}</h3>
              <p>{grant.summary}</p>
              <Link href={`/grants#${grant.slug}`}>Что покрывает и как подать</Link>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
