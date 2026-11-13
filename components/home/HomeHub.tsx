import Link from "next/link";
import { GRANTS } from "@/content/grants";
import { STAGES } from "@/content/guides";
import { US_ROUNDS } from "@/content/timeline";
import type { LandingStats } from "@/lib/landing-stats";
import { countryRu } from "@/lib/types";
import h from "./home.module.css";

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n).replace(/[  ]/g, " ");
}

export function HomeHub({ stats }: { stats: LandingStats }) {
  const govGrants = GRANTS.filter((g) => g.kind === "government").length;
  const countries = stats.byCountry.slice(0, 14);

  return (
    <>
      <section className={h.hero}>
        <h1>Поступить за границу можно без агентства и без денег на учёбу</h1>
        <p>
          Пошагово и бесплатно: какие вузы вам подходят, какие нужны документы, где взять грант и как
          подать заявки вовремя.
        </p>
        <div className={h.heroActions}>
          <Link href="/start" className={h.ctaMain}>
            Начать с первого шага
          </Link>
          <Link href="/podbor" className={h.ctaSecond}>
            Подобрать вузы под себя
          </Link>
        </div>
      </section>

      <section className={h.route} aria-labelledby="route-title">
        <h2 id="route-title" className={h.srOnly}>
          Пять шагов поступления
        </h2>
        <ol>
          {STAGES.map((s) => (
            <li key={s.n}>
              <Link href={`/guides/${s.guide}`}>
                <span className={h.station}>{s.n}</span>
                <strong>{s.title}</strong>
                <span className={h.stationText}>{s.text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={h.block} aria-labelledby="money-title">
        <h2 id="money-title">Если денег на учёбу нет</h2>
        <div className={h.ways}>
          <Link href="/unis" className={h.way}>
            <b>{fmt(stats.grants)}</b>
            <span>вузов дают иностранцам полный грант</span>
            <em>В основном США: обучение, жильё и питание за счёт вуза</em>
          </Link>
          <Link href="/grants" className={h.way}>
            <b>{govGrants}</b>
            <span>государственных программ</span>
            <em>Венгрия, Турция, Корея, Япония, Китай — с ежемесячной стипендией</em>
          </Link>
          <Link href="/guides/besplatnoe-obuchenie" className={h.way}>
            <b>0 €</b>
            <span>за обучение в Германии и Чехии</span>
            <em>Платите только за жизнь и семестровый взнос</em>
          </Link>
        </div>
      </section>

      <section className={h.block} aria-labelledby="countries-title">
        <div className={h.blockHead}>
          <h2 id="countries-title">Вузы по странам</h2>
          <Link href="/unis">
            Все {fmt(stats.total)} вузов в {stats.countries} странах
          </Link>
        </div>
        <div className={h.countries}>
          {countries.map((c) => (
            <Link key={c.country} href={`/unis#c-${c.country.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              {countryRu(c.country)}
              <span>{c.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={h.block} aria-labelledby="dates-title">
        <div className={h.blockHead}>
          <h2 id="dates-title">Главные сроки</h2>
          <Link href="/deadlines">Все сроки</Link>
        </div>
        <ul className={h.dates}>
          {US_ROUNDS.slice(0, 3).map((r) => (
            <li key={r.what}>
              <b>{r.when}</b>
              <span>{r.what}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={h.channel}>
        <div>
          <h2>Разборы, новые гранты и дедлайны — в Telegram</h2>
          <p>Подписчики канала получают атлас с фильтрами и подбор списка вузов.</p>
        </div>
        <a href="https://t.me/studyaza" target="_blank" rel="noopener noreferrer">
          Открыть @studyaza
        </a>
      </section>
    </>
  );
}
