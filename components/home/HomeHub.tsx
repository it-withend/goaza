import Link from "@/components/i18n/Link";
import { GRANTS } from "@/content/grants";
import { GUIDES } from "@/content/guides";
import type { LandingStats } from "@/lib/landing-stats";
import { locale, trFor, type Lang } from "@/lib/i18n";
import { countryName } from "@/lib/types";
import { PlanCta } from "@/components/site/PlanCta";
import { WorldGlobe } from "@/components/landing/WorldGlobe";
import { CabinetPreview } from "./CabinetPreview";
import h from "./home.module.css";

function fmt(n: number, lang: Lang) {
  return new Intl.NumberFormat(locale(lang)).format(n).replace(/[  ]/g, " ");
}

function getSteps(lang: Lang) {
  const tr = trFor(lang);
  return [
    {
      title: tr("Ответьте на 6 вопросов", "6 ta savolga javob bering"),
      text: tr(
        "Класс, бюджет семьи, английский, SAT, страны и специальность. Две минуты, без регистрации.",
        "Sinf, oila byudjeti, ingliz tili, SAT, davlatlar va mutaxassislik. Ikki daqiqa, ro'yxatdan o'tmasdan.",
      ),
    },
    {
      title: tr("Получите список по корзинам", "Savatlar bo'yicha ro'yxat oling"),
      text: tr(
        "Мечта, реальные и запасные — только вузы, которые семья потянет по деньгам, с шансом для каждого.",
        "Orzu, haqiqiy va zaxira — faqat oilangiz byudjetiga mos universitetlar va har biri uchun imkoniyat.",
      ),
    },
    {
      title: tr("Идите по плану", "Reja bo'yicha harakatlaning"),
      text: tr(
        "Дедлайны с обратным отсчётом, дела на неделю и гайды к каждому шагу: эссе, рекомендации, CSS Profile.",
        "Teskari sanoqli dedlaynlar, haftalik vazifalar va har bir qadam uchun qo'llanmalar: esse, tavsiyanomalar, CSS Profile.",
      ),
    },
  ];
}

export function HomeHub({ stats, lang = "ru" }: { stats: LandingStats; lang?: Lang }) {
  const tr = trFor(lang);
  const gov = GRANTS.filter((g) => g.kind === "government").length;
  const countries = stats.byCountry.slice(0, 12);
  const steps = getSteps(lang);

  return (
    <>
      <section className={h.hero}>
        <div className={h.heroText}>
          <h1>
            {tr(
              "Личный план поступления за границу — даже если денег на учёбу нет",
              "Chet elga o'qishga kirishning shaxsiy rejasi — o'qishga pul bo'lmasa ham",
            )}
          </h1>
          <p>
            {tr(
              "Подберём вузы под бюджет вашей семьи, посчитаем шансы и разложим поступление по неделям: что сдать, что написать и когда подать.",
              "Oilangiz byudjetiga mos universitetlarni tanlaymiz, kirish imkoniyatingizni hisoblaymiz va jarayonni haftalarga bo'lib chiqamiz: nima topshirish, nima yozish va qachon ariza berish.",
            )}
          </p>
          <div className={h.heroActions}>
            <PlanCta className={h.ctaMain} />
            <Link href="/unis" className={h.ctaSecond}>
              {tr("Смотреть вузы", "OTMlarni ko'rish")}
            </Link>
          </div>
          <ul className={h.facts}>
            <li>
              <b>{fmt(stats.total, lang)}</b> {tr("вузов", "ta OTM")}
            </li>
            <li>
              <b>{stats.countries}</b> {tr("стран", "ta davlat")}
            </li>
            <li>
              <b>{fmt(stats.grants, lang)}</b> {tr("с полным грантом", "to'liq grant bilan")}
            </li>
            <li>
              <b>{tr("0 ₽", "0 so'm")}</b> {tr("за всё", "hamma narsa bepul")}
            </li>
          </ul>
        </div>
        <CabinetPreview lang={lang} />
      </section>

      <section className={h.block} aria-labelledby="how">
        <h2 id="how">{tr("Как это работает", "Bu qanday ishlaydi")}</h2>
        <ol className={h.steps}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className={h.stepNum}>{i + 1}</span>
              <b>{s.title}</b>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <PlanCta className={h.ctaMain} />
      </section>

      <section className={h.block} aria-labelledby="inside">
        <h2 id="inside">{tr("Что внутри", "Ichida nimalar bor")}</h2>
        <div className={h.inside}>
          <Link href="/unis" className={h.insideCard}>
            <b>{fmt(stats.total, lang)}</b>
            <span>{tr("вузов с ценами, шансами, требованиями и сроками", "narxlari, imkoniyatlari, talablari va muddatlari bilan OTMlar")}</span>
          </Link>
          <Link href="/grants" className={h.insideCardGreen}>
            <b>{gov}</b>
            <span>
              {tr(
                "государственных программ: Венгрия, Турция, Корея, Япония, Китай",
                "davlat dasturlari: Vengriya, Turkiya, Koreya, Yaponiya, Xitoy",
              )}
            </span>
          </Link>
          <Link href="/guides" className={h.insideCardBlue}>
            <b>{GUIDES.length}</b>
            <span>
              {tr(
                "гайдов: список вузов, документы, экзамены, финпомощь, эссе",
                "qo'llanmalar: OTMlar ro'yxati, hujjatlar, imtihonlar, moliyaviy yordam, esse",
              )}
            </span>
          </Link>
          <Link href="/deadlines" className={h.insideCardPink}>
            <b>{tr("Все сроки подачи", "Barcha hujjat muddatlari")}</b>
            <span>{tr("ранняя и обычная подача по каждому вузу с обратным отсчётом", "har bir OTM uchun erta va asosiy muddatlar teskari sanoq bilan")}</span>
          </Link>
        </div>
      </section>

      <section className={h.block} aria-labelledby="countries-title">
        <div className={h.blockHead}>
          <h2 id="countries-title">{tr("Вузы по странам", "Davlatlar bo'yicha universitetlar")}</h2>
          <Link href="/unis">{tr("Все страны", "Barcha davlatlar")}</Link>
        </div>
        <div className={h.countriesSplit}>
          <div className={h.countries}>
            {countries.map((c) => (
              <Link key={c.country} href={`/unis#c-${c.country.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                {countryName(c.country, lang)}
                <span>{c.count}</span>
              </Link>
            ))}
          </div>
          <div className={h.globeCard}>
            <WorldGlobe byCountry={stats.byCountry} />
          </div>
        </div>
      </section>

      <section className={h.channel}>
        <div>
          <h2>{tr("Разборы, новые гранты и дедлайны — в Telegram", "Tahlillar, yangi grantlar va dedlaynlar — Telegramda")}</h2>
          <p>
            {tr(
              "Подписчики канала открывают полный каталог с фильтрами и весь список вузов в плане.",
              "Kanal obunachilari filtrli to'liq katalogni va rejadagi barcha OTMlar ro'yxatini ochadilar.",
            )}
          </p>
        </div>
        <a href="https://t.me/studyaza" target="_blank" rel="noopener noreferrer">
          {tr("Открыть @studyaza", "@studyaza'ni ochish")}
        </a>
      </section>
    </>
  );
}
