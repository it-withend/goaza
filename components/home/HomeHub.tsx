import Link from "@/components/i18n/Link";
import { getGrants, GRANTS } from "@/content/grants";
import { getGuides, GUIDES } from "@/content/guides";
import type { LandingStats } from "@/lib/landing-stats";
import { locale, trFor, type Lang } from "@/lib/i18n";
import { countryName } from "@/lib/types";
import { PlanCta } from "@/components/site/PlanCta";
import { TELEGRAM_CHANNEL_URL, TelegramIcon } from "@/components/site/TelegramIcon";
import { WorldGlobe } from "@/components/landing/WorldGlobe";
import { CountryFlag, Icon } from "@/components/ui/Icon";
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
      tag: tr("2 минуты", "2 daqiqa"),
    },
    {
      title: tr("Получите список по корзинам", "Savatlar bo'yicha ro'yxat oling"),
      text: tr(
        "Мечта, реальные и запасные — только вузы, которые семья потянет по деньгам, с шансом для каждого.",
        "Orzu, haqiqiy va zaxira — faqat oilangiz byudjetiga mos universitetlar va har biri uchun imkoniyat.",
      ),
      tag: tr("3 корзины", "3 savat"),
    },
    {
      title: tr("Идите по плану", "Reja bo'yicha harakatlaning"),
      text: tr(
        "Дедлайны с обратным отсчётом, дела на неделю и гайды к каждому шагу: эссе, рекомендации, CSS Profile.",
        "Teskari sanoqli dedlaynlar, haftalik vazifalar va har bir qadam uchun qo'llanmalar: esse, tavsiyanomalar, CSS Profile.",
      ),
      tag: tr("По шагам", "Bosqichma-bosqich"),
    },
  ];
}

function getNextCycleMilestone(lang: Lang) {
  const tr = trFor(lang);
  const now = new Date();
  const baseYear = now.getUTCFullYear();
  const rolling: Array<{ date: Date; title: string; badge: string; dateText: string }> = [];
  for (const yr of [baseYear, baseYear + 1]) {
    const cycleLabel = `${String(yr).slice(-2)}/${String(yr + 1).slice(-2)}`;
    const earlyCycle = `${String(yr + 1).slice(-2)}/${String(yr + 2).slice(-2)}`;
    rolling.push(
      {
        date: new Date(Date.UTC(yr, 0, 15, 23, 59, 0)),
        title: tr("Stipendium Hungaricum и Regular USA", "Stipendium Hungaricum va Regular AQSh"),
        badge: tr(`Набор ${cycleLabel}`, `${cycleLabel} qabul`),
        dateText: tr(`до 15 янв ${yr}`, `${yr}-yil 15 yanvargacha`),
      },
      {
        date: new Date(Date.UTC(yr, 1, 20, 23, 59, 0)),
        title: tr("Türkiye Bursları", "Türkiye Bursları"),
        badge: tr(`Госгрант Турции ${cycleLabel}`, `Turkiya granti ${cycleLabel}`),
        dateText: tr(`до 20 фев ${yr}`, `${yr}-yil 20 fevralgacha`),
      },
      {
        date: new Date(Date.UTC(yr, 10, 1, 23, 59, 0)),
        title: tr("Early Action / Early Decision", "Early Action / Early Decision"),
        badge: tr(`Ранняя волна ${earlyCycle}`, `Erta to'lqin ${earlyCycle}`),
        dateText: tr(`до 1 ноя ${yr}`, `${yr}-yil 1 noyabrgacha`),
      },
    );
  }
  const next = rolling.find((c) => c.date.getTime() > now.getTime()) ?? rolling[rolling.length - 1];
  const diffMs = Math.max(0, next.date.getTime() - now.getTime());
  const days = Math.max(1, Math.ceil(diffMs / 86_400_000));
  const pct = Math.max(12, Math.min(92, Math.round(100 - (Math.min(days, 180) / 180) * 100)));
  return { ...next, days, pct };
}

const ACCENT_CYCLE = ["accentGold", "accentEmerald", "accentBlue", "accentRose"] as const;

export function HomeHub({ stats, lang = "ru" }: { stats: LandingStats; lang?: Lang }) {
  const tr = trFor(lang);
  const gov = GRANTS.filter((g) => g.kind === "government").length;
  const countries = stats.byCountry.slice(0, 12);
  const steps = getSteps(lang);
  const grants = getGrants(lang).slice(0, 4);
  const guides = getGuides(lang).slice(0, 5);
  const milestone = getNextCycleMilestone(lang);
  const ringRadius = 46;
  const ringCirc = 2 * Math.PI * ringRadius;
  const ringDash = `${((milestone.pct / 100) * ringCirc).toFixed(1)} ${ringCirc.toFixed(1)}`;

  return (
    <>
      <section className={h.hero}>
        <div className={h.heroText}>
          <span className={h.eyebrow}>
            {tr("НАБОР 2027/2028 · STUDYAZA АТЛАС", "2027/2028 QABUL · STUDYAZA ATLASI")}
          </span>
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
            <Link href="/grants" className={h.ctaSecond}>
              {tr("Гранты 2027/28", "Grantlar 2027/28")}
            </Link>
          </div>
        </div>

        <Link href="/deadlines" className={h.ringCard} aria-label={tr("Ближайший срок подачи и все дедлайны", "Eng yaqin muddat va barcha dedlaynlar")}>
          <div className={h.ringWrap}>
            <svg viewBox="0 0 110 110" className={h.ringSvg} aria-hidden="true">
              <circle cx="55" cy="55" r={ringRadius} className={h.ringTrack} />
              <circle
                cx="55"
                cy="55"
                r={ringRadius}
                className={h.ringArc}
                strokeDasharray={ringDash}
              />
            </svg>
            <div className={h.ringCenter}>
              <b>{milestone.days}</b>
              <span>{tr("дн.", "kun")}</span>
            </div>
          </div>
          <div className={h.ringMeta}>
            <span className={h.ringEyebrow}>
              <i />
              {tr("БЛИЖАЙШИЙ КРУПНЫЙ СРОК", "ENG YAQIN ASOSIY MUDDAT")}
            </span>
            <strong>{milestone.title}</strong>
            <span className={h.ringBadge}>{milestone.badge}</span>
            <p className={h.ringSub}>{milestone.dateText}</p>
            <span className={h.ringLink}>
              <span>{tr("Все дедлайны", "Barcha dedlaynlar")}</span>
              <Icon name="arrow-right" size={14} />
            </span>
          </div>
        </Link>
      </section>

      <Link href="/plan/start" className={h.nextStrip}>
        <div className={h.nextStripLeft}>
          <small>{tr("СЛЕДУЮЩИЙ ШАГ ДЛЯ СТАРТА", "BOSHLASH UCHUN KEYINGI QADAM")}</small>
          <b>{tr("Анкета подбора вузов · 6 коротких вопросов без регистрации", "OTM tanlash anketasi · ro'yxatdan o'tmasdan 6 ta qisqa savol")}</b>
        </div>
        <span className={h.nextStripBadge}>
          <Icon name="sparkles" size={13} />
          <span>{tr("за 2 минуты", "2 daqiqada")}</span>
        </span>
      </Link>

      <section className={h.kpiGrid} aria-label={tr("Ключевые цифры базы", "Bazaning asosiy raqamlari")}>
        <Link href="/unis" className={h.kpiCard}>
          <div className={h.kpiTop}>
            <strong>{fmt(stats.total, lang)}</strong>
            <span className={`${h.kpiIcon} ${h.kpiIconGold}`}>
              <Icon name="graduation-cap" size={16} />
            </span>
          </div>
          <span>{tr("Вузов в базе", "Bazadagi OTMlar")}</span>
          <i className={h.accentGold} />
        </Link>
        <Link href="/unis" className={h.kpiCard}>
          <div className={h.kpiTop}>
            <strong>{fmt(stats.grants, lang)}</strong>
            <span className={`${h.kpiIcon} ${h.kpiIconEmerald}`}>
              <Icon name="award" size={16} />
            </span>
          </div>
          <span>{tr("С полным грантом", "To'liq grant bilan")}</span>
          <i className={h.accentEmerald} />
        </Link>
        <Link href="/grants" className={h.kpiCard}>
          <div className={h.kpiTop}>
            <strong>{gov}</strong>
            <span className={`${h.kpiIcon} ${h.kpiIconBlue}`}>
              <Icon name="landmark" size={16} />
            </span>
          </div>
          <span>{tr("Госпрограмм мира", "Davlat grantlari")}</span>
          <i className={h.accentBlue} />
        </Link>
        <Link href="/guides" className={h.kpiCard}>
          <div className={h.kpiTop}>
            <strong>{GUIDES.length}</strong>
            <span className={`${h.kpiIcon} ${h.kpiIconRose}`}>
              <Icon name="book-open" size={16} />
            </span>
          </div>
          <span>{tr("Пошаговых гайдов", "Bosqichma-bosqich qo'llanma")}</span>
          <i className={h.accentRose} />
        </Link>
      </section>

      <section className={h.bentoThree} aria-label={tr("Как это работает и что внутри", "Qanday ishlaydi va ichida nimalar bor")}>
        <div className={h.bentoPanel}>
          <div className={h.panelHead}>
            <h2>
              <Icon name="compass" size={16} />
              <span>{tr("Как это работает", "Bu qanday ishlaydi")}</span>
            </h2>
            <Link href="/plan/start">
              <span>{tr("Начать", "Boshlash")}</span>
              <Icon name="arrow-right" size={13} />
            </Link>
          </div>
          <ol className={h.timeline}>
            {steps.map((s) => (
              <li key={s.title}>
                <span className={h.tlDot} aria-hidden="true" />
                <div className={h.tlBody}>
                  <div className={h.tlTop}>
                    <b>{s.title}</b>
                    <span className={h.tlTag}>{s.tag}</span>
                  </div>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={h.bentoPanel}>
          <div className={h.panelHead}>
            <h2>
              <Icon name="award" size={16} />
              <span>{tr("Государственные гранты", "Davlat grantlari")}</span>
            </h2>
            <Link href="/grants">
              <span>{tr("Все", "Barchasi")}</span>
              <Icon name="arrow-right" size={13} />
            </Link>
          </div>
          <ul className={h.grantBars}>
            {grants.map((g, idx) => (
              <li key={g.slug}>
                <Link href={`/grants#${g.slug}`} className={h.grantBarLink}>
                  <div className={h.grantBarTop}>
                    <b>{g.name}</b>
                    <span>100%</span>
                  </div>
                  <div className={h.grantBarTrack}>
                    <i className={h[ACCENT_CYCLE[idx % ACCENT_CYCLE.length]]} style={{ width: `${96 - idx * 6}%` }} />
                  </div>
                  <small>{g.country}</small>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={h.bentoPanel}>
          <div className={h.panelHead}>
            <h2>
              <Icon name="book-open" size={16} />
              <span>{tr("Новые гайды", "Yangi qo'llanmalar")}</span>
            </h2>
            <Link href="/guides">
              <span>{tr("Все", "Barchasi")}</span>
              <Icon name="arrow-right" size={13} />
            </Link>
          </div>
          <ul className={h.guideList}>
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className={h.guideRow}>
                  <span className={h.guideType}>
                    <Icon name="file-text" size={15} />
                  </span>
                  <span className={h.guideTitle}>
                    <b>{g.title}</b>
                    <small>{tr(`${g.minutes} мин чтения`, `${g.minutes} daq o'qish`)}</small>
                  </span>
                  <span className={h.guidePill}>{tr("Изучить", "O'qish")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={h.block} aria-labelledby="cabinet-preview-title">
        <div className={h.blockHead}>
          <div>
            <h2 id="cabinet-preview-title">{tr("Как выглядит ваш кабинет", "Shaxsiy kabinetingiz ko'rinishi")}</h2>
            <p className={h.blockSub}>
              {tr(
                "Три корзины вузов под ваш бюджет, реальный расчёт шанса и список документов по неделям.",
                "Byudjetingizga mos 3 ta OTM savati, haqiqiy imkoniyat hisobi va haftalik hujjatlar ro'yxati.",
              )}
            </p>
          </div>
          <Link href="/plan">
            <span>{tr("Открыть мой план", "Mening rejamni ochish")}</span>
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
        <CabinetPreview lang={lang} />
      </section>

      <section className={h.block} aria-labelledby="countries-title">
        <div className={h.blockHead}>
          <div>
            <h2 id="countries-title">{tr("Вузы по странам", "Davlatlar bo'yicha universitetlar")}</h2>
            <p className={h.blockSub}>
              {tr(
                `${stats.countries} стран на интерактивной карте — от США и Европы до Азии.`,
                `Interaktiv xaritada ${stats.countries} ta davlat — AQSh va Yevropadan Osiyogacha.`,
              )}
            </p>
          </div>
          <Link href="/unis">
            <span>{tr("Все страны", "Barcha davlatlar")}</span>
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
        <div className={h.countriesSplit}>
          <div className={h.countriesGrid}>
            {countries.map((c, idx) => (
              <Link
                key={c.country}
                href={`/unis#c-${c.country.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className={h.countryTile}
              >
                <div className={h.countryTileTop}>
                  <span className={h.countryNameWrap}>
                    <CountryFlag country={c.country} size={18} />
                    <strong>{countryName(c.country, lang)}</strong>
                  </span>
                  <Icon name="arrow-right" size={14} />
                </div>
                <small>{tr(`${c.count} вузов`, `${c.count} ta OTM`)}</small>
                <i className={h[ACCENT_CYCLE[idx % ACCENT_CYCLE.length]]} />
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
        <a
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tr("Открыть Telegram-канал", "Telegram kanalini ochish")}
        >
          <TelegramIcon size={20} />
          <span>Telegram</span>
        </a>
      </section>
    </>
  );
}
