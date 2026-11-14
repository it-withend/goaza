import Link from "next/link";
import { GRANTS } from "@/content/grants";
import { GUIDES } from "@/content/guides";
import type { LandingStats } from "@/lib/landing-stats";
import { countryRu } from "@/lib/types";
import { CabinetPreview } from "./CabinetPreview";
import h from "./home.module.css";

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n).replace(/[  ]/g, " ");
}

const STEPS = [
  { title: "Ответьте на 6 вопросов", text: "Класс, бюджет семьи, английский, SAT, страны и специальность. Две минуты, без регистрации." },
  { title: "Получите список по корзинам", text: "Мечта, реальные и запасные — только вузы, которые семья потянет по деньгам, с шансом для каждого." },
  { title: "Идите по плану", text: "Дедлайны с обратным отсчётом, дела на неделю и гайды к каждому шагу: эссе, рекомендации, CSS Profile." },
];

export function HomeHub({ stats }: { stats: LandingStats }) {
  const gov = GRANTS.filter((g) => g.kind === "government").length;
  const countries = stats.byCountry.slice(0, 12);

  return (
    <>
      <section className={h.hero}>
        <div className={h.heroText}>
          <h1>Личный план поступления за границу — даже если денег на учёбу нет</h1>
          <p>
            Подберём вузы под бюджет вашей семьи, посчитаем шансы и разложим поступление по неделям: что
            сдать, что написать и когда подать.
          </p>
          <div className={h.heroActions}>
            <Link href="/plan/start" className={h.ctaMain}>
              Составить мой план
            </Link>
            <Link href="/unis" className={h.ctaSecond}>
              Смотреть вузы
            </Link>
          </div>
          <ul className={h.facts}>
            <li>
              <b>{fmt(stats.total)}</b> вузов
            </li>
            <li>
              <b>{stats.countries}</b> стран
            </li>
            <li>
              <b>{fmt(stats.grants)}</b> с полным грантом
            </li>
            <li>
              <b>0 ₽</b> за всё
            </li>
          </ul>
        </div>
        <CabinetPreview />
      </section>

      <section className={h.block} aria-labelledby="how">
        <h2 id="how">Как это работает</h2>
        <ol className={h.steps}>
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className={h.stepNum}>{i + 1}</span>
              <b>{s.title}</b>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <Link href="/plan/start" className={h.ctaMain}>
          Составить мой план
        </Link>
      </section>

      <section className={h.block} aria-labelledby="inside">
        <h2 id="inside">Что внутри</h2>
        <div className={h.inside}>
          <Link href="/unis" className={h.insideCard}>
            <b>{fmt(stats.total)}</b>
            <span>вузов с ценами, шансами, требованиями и сроками</span>
          </Link>
          <Link href="/grants" className={h.insideCardGreen}>
            <b>{gov}</b>
            <span>государственных программ: Венгрия, Турция, Корея, Япония, Китай</span>
          </Link>
          <Link href="/guides" className={h.insideCardBlue}>
            <b>{GUIDES.length}</b>
            <span>гайдов: список вузов, документы, экзамены, финпомощь, эссе</span>
          </Link>
          <Link href="/deadlines" className={h.insideCardPink}>
            <b>ED · EA · RD</b>
            <span>все сроки подачи в одном месте</span>
          </Link>
        </div>
      </section>

      <section className={h.block} aria-labelledby="countries-title">
        <div className={h.blockHead}>
          <h2 id="countries-title">Вузы по странам</h2>
          <Link href="/unis">Все страны</Link>
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

      <section className={h.channel}>
        <div>
          <h2>Разборы, новые гранты и дедлайны — в Telegram</h2>
          <p>Подписчики канала открывают полный каталог с фильтрами и весь список вузов в плане.</p>
        </div>
        <a href="https://t.me/studyaza" target="_blank" rel="noopener noreferrer">
          Открыть @studyaza
        </a>
      </section>
    </>
  );
}
