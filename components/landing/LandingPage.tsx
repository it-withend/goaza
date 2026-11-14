"use client";

import { useEffect, useState } from "react";
import Link from "@/components/i18n/Link";
import type { LandingStats } from "@/lib/landing-stats";
import { countryRu } from "@/lib/types";
import { TelegramGateModal } from "./TelegramGateModal";
import { WorldGlobe } from "./WorldGlobe";
import styles from "./LandingPage.module.css";

function formatStat(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value).replace(/[\u00A0\u202F]/g, " ");
}

function formatUniversityCount(total: number): string {
  return total >= 1000 ? "1000+" : formatStat(total);
}

const COUNTRY_TAGS: Record<string, string> = {
  USA: "Need-blind, фонды и SAT",
  Turkey: "Türkiye Bursları · до 20 фев",
  "South Korea": "Global Korea Scholarship",
  Hungary: "Stipendium Hungaricum · 15 янв",
  Canada: "Гранты и кооп-программы",
  Germany: "Госвузы без платы за учёбу",
  Poland: "Учёба от €1,500–4,000/год",
  "Hong Kong": "Полные стипендии за баллы",
  UK: "UCAS 2027 · единый дедлайн",
  "Czech Republic": "Бесплатно на чешском",
  Australia: "Стипендии до 50–100%",
  Spain: "Бакалавриат в Европе",
  Austria: "Фиксированный семестровый сбор",
  Finland: "Совместный набор Studyinfo",
};

type PreviewTab = "aid" | "req" | "deadlines";

const PREVIEW_TABS: { id: PreviewTab; label: string; title: string; subtitle: string }[] = [
  {
    id: "aid",
    label: "Фонд для иностранцев",
    title: "Показываем реальный бюджет помощи иностранцам, а не общие обещания",
    subtitle:
      "Сортируйте вузы по годовому фонду помощи именно международным студентам, среднему размеру гранта и проценту получателей.",
  },
  {
    id: "req",
    label: "SAT, шансы и профили",
    title: "Процент поступления, вилки SAT/ACT и направления на одном экране",
    subtitle:
      "Данные US College Scorecard, OpenAlex и Wikidata объединены с русскоязычными описаниями и политикой Test-Optional / Need-aware.",
  },
  {
    id: "deadlines",
    label: "Дедлайны 2026/2027",
    title: "Никаких перепутанных дат — только актуальный цикл приёма",
    subtitle:
      "Ранние (Early Action / Decision) и основные (Regular) окна, UCAS, Türkiye Bursları и Stipendium Hungaricum с обратным отсчётом.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Доступ в атлас действительно бесплатный?",
    a: "Да. Все фильтры, карточки вузов, рейтинги финансирования и календарь дедлайнов открываются бесплатно сразу после подписки на Telegram-канал @studyaza.",
  },
  {
    q: "Откуда берутся данные о стоимости, грантах и поступлении?",
    a: "База объединяет официальную статистику US Department of Education (College Scorecard), академические профили OpenAlex, открытые реестры университетов, Wikidata и проверенные графики национальных стипендий.",
  },
  {
    q: "Безопасно ли входить через Telegram?",
    a: "Вход работает через официальный Telegram Login Widget на домене goaza.xyz. Бот проверяет только факт подписки на канал @studyaza — мы не получаем доступ к вашим чатам, контактам или номеру телефона.",
  },
  {
    q: "Подойдёт ли атлас, если я ещё не сдавал SAT или IELTS?",
    a: "Да. В каталоге собраны вузы США с политикой Test-Optional, университеты Европы и Азии без требования SAT, а также государственные программы с полным покрытием (Турция, Венгрия, Южная Корея).",
  },
];

export function LandingPage({
  stats,
  botUsername,
}: {
  stats: LandingStats;
  botUsername: string;
}) {
  const [gateOpen, setGateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PreviewTab>("aid");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("gate") === "1") setGateOpen(true);
  }, []);

  const topCountries = stats.byCountry.slice(0, 12);
  const extraCountriesCount = Math.max(0, stats.countries - topCountries.length);
  const activePreview = PREVIEW_TABS.find((t) => t.id === activeTab) ?? PREVIEW_TABS[0];

  return (
    <main className={styles.page}>
      <div className={styles.atmosphere} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={38} height={38} alt="Studyaza" className={styles.logo} />
          <div className={styles.brandMeta}>
            <strong className={styles.wordmark}>Studyaza</strong>
            <span>Атлас вузов и грантов</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Разделы">
          <a href="#inside">Что внутри</a>
          <a href="#countries">Страны</a>
          <a href="#how">Как войти</a>
          <a href="#faq">Вопросы</a>
        </nav>

        <div className={styles.headerActions}>
          <a
            className={styles.channelHeader}
            href="https://t.me/studyaza"
            target="_blank"
            rel="noopener noreferrer"
          >
            @studyaza
          </a>
          <button
            type="button"
            className={`${styles.cta} ${styles.ctaGhost}`}
            onClick={() => setGateOpen(true)}
          >
            Подключиться
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Живой атлас возможностей · Набор 2026/2027</span>
          <h1 className={styles.title}>
            Поступление за границу — <em>по цифрам,</em> а не по слухам.
          </h1>
          <p className={styles.lede}>
            Стоимость обучения, реальные фонды помощи иностранным студентам, шансы поступления,
            вилки SAT и актуальные дедлайны по {formatStat(stats.countries)} странам в одном окне.
          </p>
          <div className={styles.ctaRow}>
            <button
              type="button"
              className={`${styles.cta} ${styles.ctaPrimary} ${styles.mobileCta}`}
              onClick={() => setGateOpen(true)}
            >
              Открыть атлас
            </button>
            <Link href="/unis" className={styles.browseLink}>
              Список всех вузов →
            </Link>
          </div>
          <ul className={styles.heroBullets}>
            <li>Прямая сортировка по бюджету помощи иностранцам</li>
            <li>Дедлайны цикла 2026/2027 без прошлогодних дат</li>
            <li>Собственное избранное и фильтры по бюджету</li>
          </ul>
        </div>

        <div className={styles.map} aria-label="Интерактивный глобус университетов">
          <div className={styles.orbitRing} aria-hidden="true" />
          <WorldGlobe byCountry={stats.byCountry} />
        </div>
      </section>

      <section className={styles.stats} aria-label="Размер базы">
        <article className={`${styles.stat} ${styles.statA}`}>
          <span className={styles.statIcon} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <small>Университетов в базе</small>
            <strong>{formatUniversityCount(stats.total)}</strong>
            <p>С логотипами, сайтами, городами и описанием направлений</p>
          </div>
        </article>
        <article className={`${styles.stat} ${styles.statB}`}>
          <span className={styles.statIcon} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <small>Стран и юрисдикций</small>
            <strong>{formatStat(stats.countries)}</strong>
            <p>США, Великобритания, Европа, Турция, Азия и Ближний Восток</p>
          </div>
        </article>
        <article className={`${styles.stat} ${styles.statC}`}>
          <span className={styles.statIcon} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5.1L12 14.8 7.5 16.8l.9-5.1L4.8 8.2l5-.7L12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <small>Полных грантов</small>
            <strong>{formatStat(stats.grants)}</strong>
            <p>Need-blind, полные университетские гранты и госпрограммы</p>
          </div>
        </article>
      </section>

      <section className={styles.section} id="inside">
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Внутри дашборда</span>
          <h2>Инструмент подбора, который экономит недели поиска</h2>
          <p>
            Вместо десятков разрозненных таблиц и старых форумов — единый каталог с живыми
            фильтрами, сортировкой по объёму помощи иностранцам и личным шорт-листом.
          </p>
        </div>

        <div className={styles.showcase}>
          <div className={styles.showcaseTabs} role="tablist" aria-label="Примеры возможностей">
            {PREVIEW_TABS.map((tab) => {
              const selected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`${styles.showcaseTab}${selected ? ` ${styles.showcaseTabActive}` : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <strong>{tab.label}</strong>
                </button>
              );
            })}
          </div>

          <div className={styles.showcaseBody}>
            <div className={styles.showcaseCopy}>
              <h3>{activePreview.title}</h3>
              <p>{activePreview.subtitle}</p>
              <button
                type="button"
                className={`${styles.cta} ${styles.ctaPrimary}`}
                onClick={() => setGateOpen(true)}
              >
                Перейти в каталог
              </button>
            </div>

            <div className={styles.mockWindow} aria-hidden="true">
              <div className={styles.mockTopbar}>
                <span className={styles.mockDots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.mockUrl}>goaza.xyz/dashboard</span>
              </div>

              {activeTab === "aid" ? (
                <div className={styles.mockCards}>
                  <div className={styles.mockCard}>
                    <div className={styles.mockCardTop}>
                      <strong>Фонд для иностранцев ↑</strong>
                      <span className={styles.mockGoldBadge}>Сортировка</span>
                    </div>
                    <p className={styles.mockMeta}>Общий бюджет в год · Средний грант · % получателей</p>
                    <div className={styles.mockMetrics}>
                      <div>
                        <span>Бюджет/год</span>
                        <b>$7.7m+</b>
                      </div>
                      <div>
                        <span>Средний чек</span>
                        <b>$31,303</b>
                      </div>
                      <div>
                        <span>С помощью</span>
                        <b>96.5%</b>
                      </div>
                    </div>
                  </div>
                  <div className={styles.mockCard}>
                    <div className={styles.mockCardTop}>
                      <strong>Политика финансирования</strong>
                      <span className={styles.mockGreenBadge}>Need-blind / Need-aware</span>
                    </div>
                    <p className={styles.mockMeta}>
                      Фильтры по максимальной стоимости года, минимальному гранту и типу помощи
                    </p>
                  </div>
                </div>
              ) : activeTab === "req" ? (
                <div className={styles.mockCards}>
                  <div className={styles.mockCard}>
                    <div className={styles.mockCardTop}>
                      <strong>Требования и шансы</strong>
                      <span className={styles.mockGoldBadge}>SAT / ACT</span>
                    </div>
                    <div className={styles.mockMetrics}>
                      <div>
                        <span>Поступление</span>
                        <b>Acceptance %</b>
                      </div>
                      <div>
                        <span>Тесты</span>
                        <b>SAT / Test-Optional</b>
                      </div>
                      <div>
                        <span>Кампус</span>
                        <b>Доля иностр.</b>
                      </div>
                    </div>
                  </div>
                  <div className={styles.mockCard}>
                    <div className={styles.mockCardTop}>
                      <strong>Направления и профиль</strong>
                      <span className={styles.mockGreenBadge}>RU обзор</span>
                    </div>
                    <p className={styles.mockMeta}>
                      Сильные факультеты по данным OpenAlex и краткое описание университета на русском
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.mockCards}>
                  <div className={styles.mockCard}>
                    <div className={styles.mockCardTop}>
                      <strong>Приёмная кампания 2026/2027</strong>
                      <span className={styles.mockGoldBadge}>Дедлайн ≤ 60 дн.</span>
                    </div>
                    <div className={styles.mockMetrics}>
                      <div>
                        <span>Early / EA / ED</span>
                        <b>Окт – Ноя 2026</b>
                      </div>
                      <div>
                        <span>UCAS / Regular</span>
                        <b>Янв – Фев 2027</b>
                      </div>
                      <div>
                        <span>Госстипендии</span>
                        <b>15 янв / 20 фев</b>
                      </div>
                    </div>
                  </div>
                  <div className={styles.mockCard}>
                    <div className={styles.mockCardTop}>
                      <strong>Фильтр «Горит дедлайн»</strong>
                      <span className={styles.mockGreenBadge}>Свой шорт-лист</span>
                    </div>
                    <p className={styles.mockMeta}>
                      Отмечайте вузы в ★ Избранное и отслеживайте ближайшие сроки подачи в одном списке
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="countries">
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>География атласа</span>
          <h2>Ключевые направления поступления</h2>
          <p>
            Нажмите на любую страну, чтобы открыть её в каталоге с фильтрами по грантам, стоимости
            и дедлайнам.
          </p>
        </div>

        <div className={styles.countryGrid}>
          {topCountries.map((row) => (
            <button
              key={row.country}
              type="button"
              className={styles.countryCard}
              onClick={() => setGateOpen(true)}
            >
              <div className={styles.countryTop}>
                <strong>{countryRu(row.country)}</strong>
                <span>{formatStat(row.count)}</span>
              </div>
              <p>{COUNTRY_TAGS[row.country] || "Проверенные профили и дедлайны"}</p>
            </button>
          ))}
          {extraCountriesCount > 0 ? (
            <button
              type="button"
              className={`${styles.countryCard} ${styles.countryCardMore}`}
              onClick={() => setGateOpen(true)}
            >
              <div className={styles.countryTop}>
                <strong>+ ещё {formatStat(extraCountriesCount)} стран</strong>
                <span>→</span>
              </div>
              <p>Полный географический охват доступен внутри дашборда</p>
            </button>
          ) : null}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Зачем нужен Studyaza</span>
          <h2>Четыре вещи, которые экономят месяцы</h2>
        </div>

        <div className={styles.bentoGrid}>
          <article className={styles.bentoCard}>
            <span className={styles.bentoNum}>01</span>
            <h3>Отдельный фокус на иностранцев</h3>
            <p>
              Видно не только общую стоимость, но и политику (Need-blind / Need-aware), годовой
              бюджет помощи и долю иностранных студентов с грантом.
            </p>
          </article>
          <article className={styles.bentoCard}>
            <span className={styles.bentoNum}>02</span>
            <h3>Без устаревших таблиц</h3>
            <p>
              Дедлайны приведены к актуальному циклу 2026/2027, убраны дубли вузов, восстановлены
              логотипы и недостающие города.
            </p>
          </article>
          <article className={styles.bentoCard}>
            <span className={styles.bentoNum}>03</span>
            <h3>Быстрые пресеты и ★ Избранное</h3>
            <p>
              В один клик отбирайте полные гранты, вузы с ближайшим дедлайном или сохраняйте свой
              персональный шорт-лист прямо в браузере.
            </p>
          </article>
          <article className={styles.bentoCard}>
            <span className={styles.bentoNum}>04</span>
            <h3>Чёткие карточки без воды</h3>
            <p>
              В каждом профиле — стоимость, процент зачисления, SAT, язык, основные специальности и
              прямая ссылка на официальный сайт вуза.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section} id="how">
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Доступ за 30 секунд</span>
          <h2>Как открыть закрытый каталог</h2>
        </div>

        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <span className={styles.stepBadge}>Шаг 1</span>
            <h3>Подпишитесь на @studyaza</h3>
            <p>
              В канале публикуем разборы грантовых программ, изменения по экзаменам и свежие
              дедлайны.
            </p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepBadge}>Шаг 2</span>
            <h3>Войдите через Telegram</h3>
            <p>
              Нажмите «Открыть атлас» и подтвердите вход через официальный виджет Telegram на домене
              goaza.xyz.
            </p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepBadge}>Шаг 3</span>
            <h3>Соберите свой список вузов</h3>
            <p>
              Фильтруйте по стране, стоимости, объёму гранта и добавляйте подходящие университеты в
              избранное.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Частые вопросы</span>
          <h2>Всё, что важно перед входом</h2>
        </div>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={item.q} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqTrigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span>{item.q}</span>
                  <i>{isOpen ? "−" : "+"}</i>
                </button>
                {isOpen ? <p className={styles.faqAnswer}>{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div>
          <span className={styles.sectionEyebrow}>Studyaza · Атлас 2026/2027</span>
          <h2>Готовы подобрать университеты под ваш бюджет и шансы?</h2>
          <p>
            Подпишитесь на @studyaza и откройте полный дашборд с {formatUniversityCount(stats.total)}{" "}
            университетами.
          </p>
        </div>
        <div className={styles.ctaBannerActions}>
          <button
            type="button"
            className={`${styles.cta} ${styles.ctaPrimary}`}
            onClick={() => setGateOpen(true)}
          >
            Получить доступ сейчас
          </button>
          <a
            className={`${styles.cta} ${styles.ctaGhost}`}
            href="https://t.me/studyaza"
            target="_blank"
            rel="noopener noreferrer"
          >
            Канал в Telegram ↗
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <strong>Studyaza</strong>
          <span>goaza.xyz · Международный атлас университетов и грантов</span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/unis">Справочник вузов</Link>
          <a href="https://t.me/studyaza" target="_blank" rel="noopener noreferrer">
            Telegram @studyaza
          </a>
          <button type="button" onClick={() => setGateOpen(true)}>
            Войти в каталог
          </button>
        </div>
      </footer>

      <TelegramGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        botUsername={botUsername}
      />
    </main>
  );
}
