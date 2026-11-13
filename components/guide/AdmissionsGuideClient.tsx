"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  AFFORDABLE_EU_UNIS,
  BUDGET_TRACKS,
  CANADA_PLAYBOOK,
  COUNTRY_PORTALS,
  DOC_CHECKLIST,
  ESSAY_26_MISTAKES,
  ESSAY_PLAYBOOK,
  FULL_RIDE_TSVIRKKOO,
  GOV_SCHOLARSHIPS,
  INTERNAL_UNI_SCHOLARSHIPS,
  MERIT_103_TABLE,
  OFFICER_INSIGHTS,
  SHORTLIST_FORMULA,
  TIMELINE_2_YEARS,
  US_CSS_AID_TABLE,
  YALE_ESSAY_CASES,
} from "@/lib/admissions-knowledge";
import styles from "./AdmissionsGuide.module.css";

type TabId =
  | "all"
  | "strategy"
  | "grants"
  | "css"
  | "docs"
  | "essays"
  | "canada"
  | "timeline";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "Всё сразу" },
  { id: "strategy", label: "Стратегия и бюджет $0" },
  { id: "grants", label: "Гранты и 103 Full-Ride" },
  { id: "css", label: "CSS Waiver и ISFAA (81 вуз)" },
  { id: "docs", label: "Документы и порталы" },
  { id: "essays", label: "Эссе и 26 ошибок" },
  { id: "canada", label: "Гид по Канаде" },
  { id: "timeline", label: "Таймлайн 2 года" },
];

type BudgetBracket = "zero" | "low" | "mid";
type SatProfile = "high" | "mid" | "none";

export function AdmissionsGuideClient({ accountName }: { accountName: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("all");

  // Strategy calculator state
  const [budget, setBudget] = useState<BudgetBracket>("zero");
  const [satProfile, setSatProfile] = useState<SatProfile>("none");

  // Search/filter states for Merit 103
  const [meritQ, setMeritQ] = useState("");
  const [meritState, setMeritState] = useState("ALL");

  // Search/filter for Full-Ride 73+ list
  const [frQ, setFrQ] = useState("");
  const [frTag, setFrTag] = useState<string>("ALL");

  // Search/filter for CSS Waiver 81 table
  const [cssQ, setCssQ] = useState("");
  const [cssMode, setCssMode] = useState<"ALL" | "FREE_FORM" | "WAIVER" | "NEED_BLIND">("ALL");

  // Interactive self-check for 26 Essay Mistakes & Documents
  const [checkedMistakes, setCheckedMistakes] = useState<Record<number, boolean>>({});
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  async function logout() {
    await fetch("/api/auth/telegram", { method: "DELETE" });
    router.replace("/");
    router.refresh();
  }

  const statesList = useMemo(
    () => ["ALL", ...Array.from(new Set(MERIT_103_TABLE.map((x) => x.state))).sort()],
    [],
  );

  const filteredMerit = useMemo(() => {
    const q = meritQ.trim().toLowerCase();
    return MERIT_103_TABLE.filter((row) => {
      if (meritState !== "ALL" && row.state !== meritState) return false;
      if (!q) return true;
      return `${row.state} ${row.school} ${row.scholarship} ${row.value} ${row.requirements}`
        .toLowerCase()
        .includes(q);
    });
  }, [meritQ, meritState]);

  const filteredFullRide = useMemo(() => {
    const q = frQ.trim().toLowerCase();
    return FULL_RIDE_TSVIRKKOO.filter((row) => {
      if (frTag !== "ALL" && row.tag !== frTag) return false;
      if (!q) return true;
      return `${row.name} ${row.note}`.toLowerCase().includes(q);
    });
  }, [frQ, frTag]);

  const filteredCss = useMemo(() => {
    const q = cssQ.trim().toLowerCase();
    return US_CSS_AID_TABLE.filter((row) => {
      if (cssMode === "NEED_BLIND" && !/need-?blind/i.test(row.policy)) return false;
      if (
        cssMode === "FREE_FORM" &&
        !/isfaa|isafa|pfaa|ifaw|wisfaa|pifaa|rfif|hccff|faif|sisf|fisf|alternative|questionnaire|certification/i.test(
          `${row.howApply} ${row.cssWaiver}`,
        )
      ) {
        return false;
      }
      if (
        cssMode === "WAIVER" &&
        !/waiver|email|access pass|if admitted|isfaa|pfaa|ifaw|wisfaa/i.test(
          `${row.howApply} ${row.cssWaiver}`,
        )
      ) {
        return false;
      }
      if (!q) return true;
      return `${row.school} ${row.location} ${row.howApply} ${row.cssWaiver} ${row.policy}`
        .toLowerCase()
        .includes(q);
    });
  }, [cssQ, cssMode]);

  const recommendation = useMemo(() => {
    if (budget === "zero" && satProfile === "high") {
      return {
        title: "Оптимальная стратегия: Need-Blind / Need-Based США + 103 Merit Full-Ride + Госстипендии",
        text: "С SAT 1400+ и бюджетом около $0 подавайтесь сразу по трём линиям: 1) Need-Blind и ISFAA-вузы США в Reach/Target, 2) 3–4 штата из таблицы 103 Merit Full-Ride (Alabama, Hendrix, W&L Johnson, Simmons и др.), 3) Stipendium Hungaricum / Türkiye Bursları как надёжный Financial Safety.",
        href: "/dashboard?grant=1&sort=intl_aid",
        cta: "Открыть вузы с полным грантом и бюджетом помощи ↓",
      };
    }
    if (budget === "zero") {
      return {
        title: "Оптимальная стратегия: ISFAA/CSS Waiver США (test-optional) + Береа + 100% Госстипендии",
        text: "Даже без SAT при ограниченном бюджете семьи путь открыт: подавайтесь с бесплатными формами помощи (PFAA, IFAW, WISFAA, ISFAA, Common App Fee Waiver) в test-optional колледжи со 100% покрытием (включая Berea College с $0 обучения) И обязательно страхуйте список через Stipendium Hungaricum, Türkiye Bursları, CSC, GKS или MEXT.",
        href: "/dashboard?grant=1&sort=rate",
        cta: "Подобрать доступные вузы с полным грантом ↓",
      };
    }
    if (budget === "low") {
      return {
        title: "Оптимальная стратегия: Дешёвая Европа (€1,000–4,800/год) + Гранты Италии/Канады",
        text: "Вузы уровня University of Lisbon, University of Porto, KU Leuven и Ghent сопоставимы по цене с местными университетами, а Padua International Excellence даёт бесплатное обучение + €8,000/год. Параллельно подавайтесь на крупные входные стипендии в Канаде и США с умеренным EFC (Denison, Kenyon).",
        href: "/dashboard?tuition=8000&sort=tuition",
        cta: "Смотреть вузы до $8,000/год в каталоге ↓",
      };
    }
    return {
      title: "Оптимальная стратегия: Канада (Co-op & College → University) + Частичный Merit",
      text: "При бюджете $10,000–$25,000/год можно целиться в региональные вузы Канады (Saskatchewan, Manitoba, Regina, MUN, Dalhousie) или 2-летние колледжи с переводом на 3-й курс и легальной подработкой 24 ч/нед + PGWP до 3 лет.",
      href: "/dashboard?country=Canada&sort=tuition",
      cta: "Открыть канадские вузы и колледжи ↓",
    };
  }, [budget, satProfile]);

  const show = (id: TabId) => tab === "all" || tab === id;

  return (
    <DashboardShell accountName={accountName} onLogout={logout} activeSection="guide">
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div>
              <span className={styles.eyebrow}>Studyaza Knowledge Hub • База поступающего</span>
              <h1 className={styles.heroTitle}>Универсальный гид: от выбора вузов на $0 до визы и эссе</h1>
              <p className={styles.heroLead}>
                Сводная база для абитуриентов, в том числе из семей с ограниченным бюджетом: как составить список по формуле 3+3+2, не переплатить за CSS Profile, выбрать государственные и университетские full-ride стипендии, собрать документы, написать сильные эссе и оформить студенческую визу.
              </p>
            </div>
            <Link href="/dashboard" className={styles.backCatalogBtn}>
              ← В каталог 1,000+ вузов
            </Link>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statPill}>
              <strong>103</strong>
              <span>Merit Full-Ride стипендии США</span>
            </div>
            <div className={styles.statPill}>
              <strong>81</strong>
              <span>Вуз США с 100% aid & CSS Waiver</span>
            </div>
            <div className={styles.statPill}>
              <strong>8 госпрограмм</strong>
              <span>Венгрия, Турция, Корея, Китай, Япония, ЕС…</span>
            </div>
            <div className={styles.statPill}>
              <strong>26 правил</strong>
              <span>Анти-ошибки эссе + инсайды Yale / Dartmouth</span>
            </div>
          </div>
        </section>

        <nav className={styles.tabsBar} aria-label="Разделы гида">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`${styles.tabBtn} ${tab === t.id ? styles.tabBtnActive : ""}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* 1. STRATEGY & SHORTLIST BUILDER */}
        {show("strategy") && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>1. Как составить список вузов и поступить при низком доходе</h2>
                <p className={styles.sectionSub}>{SHORTLIST_FORMULA.explanation}</p>
              </div>
            </div>

            <div className={styles.calcBox}>
              <div className={styles.calcControls}>
                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>Бюджет семьи на учёбу + жизнь в год</span>
                  <div className={styles.chipRow}>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${budget === "zero" ? styles.optionChipActive : ""}`}
                      onClick={() => setBudget("zero")}
                    >
                      $0 – $2,000 (нужен Full-Ride)
                    </button>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${budget === "low" ? styles.optionChipActive : ""}`}
                      onClick={() => setBudget("low")}
                    >
                      $2,000 – $10,000 / год
                    </button>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${budget === "mid" ? styles.optionChipActive : ""}`}
                      onClick={() => setBudget("mid")}
                    >
                      $10,000 – $25,000 / год
                    </button>
                  </div>
                </div>

                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>Экзамен SAT / ACT</span>
                  <div className={styles.chipRow}>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${satProfile === "high" ? styles.optionChipActive : ""}`}
                      onClick={() => setSatProfile("high")}
                    >
                      SAT 1400+ (или ACT 30+)
                    </button>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${satProfile === "mid" ? styles.optionChipActive : ""}`}
                      onClick={() => setSatProfile("mid")}
                    >
                      SAT 1200–1390
                    </button>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${satProfile === "none" ? styles.optionChipActive : ""}`}
                      onClick={() => setSatProfile("none")}
                    >
                      Без SAT (Test-Optional / Мир)
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.calcResult}>
                <h3>{recommendation.title}</h3>
                <p>{recommendation.text}</p>
                <Link href={recommendation.href} className={styles.ctaLink}>
                  {recommendation.cta}
                </Link>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {SHORTLIST_FORMULA.tiers.map((tier) => (
                <article key={tier.tier} className={styles.card}>
                  <span className={styles.cardBadge}>{tier.badge}</span>
                  <h3 className={styles.cardTitle}>{tier.tier}</h3>
                  <p className={styles.cardText}>{tier.criteria}</p>
                  <p className={styles.cardText}>
                    <strong>Совет:</strong> {tier.tip}
                  </p>
                </article>
              ))}
            </div>

            <div className={styles.cardsGrid}>
              {BUDGET_TRACKS.map((tr) => (
                <article key={tr.id} className={styles.card}>
                  <span className={styles.cardBadge}>{tr.badge}</span>
                  <h3 className={styles.cardTitle}>{tr.title}</h3>
                  <p className={styles.cardMeta}>Бюджет: {tr.budgetPerYear}</p>
                  <p className={styles.cardText}>{tr.keyMechanism}</p>
                  <ul className={styles.bulletList}>
                    {tr.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <Link href={tr.catalogHref} className={styles.inlineLink}>
                    {tr.catalogLabel} →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 2. GLOBAL SCHOLARSHIPS + 103 MERIT + 73 FULL-RIDE */}
        {show("grants") && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>2. Гранты государств, топовые стипендии вузов и 103 Full-Ride США</h2>
                <p className={styles.sectionSub}>
                  Государственные стипендии покрывают обучение, жильё и ежемесячные расходы; таблицы ниже объединяют внутренние гранты Европы/Азии/Канады и 103 конкурентные Merit Full-Ride программы в США.
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {GOV_SCHOLARSHIPS.map((gs) => (
                <article key={gs.name} className={styles.card}>
                  <span className={styles.cardBadge}>{gs.country} • {gs.levels}</span>
                  <h3 className={styles.cardTitle}>{gs.name}</h3>
                  <p className={styles.cardMeta}>{gs.stipend}</p>
                  <p className={styles.cardText}>
                    <strong>Охват:</strong> {gs.unisCount}
                  </p>
                  <ul className={styles.bulletList}>
                    {gs.coverage.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  {gs.importantNote && <p className={styles.cardText}>⚠ {gs.importantNote}</p>}
                  <a href={gs.url} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                    Официальный сайт программы ↗
                  </a>
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>Крупнейшие внутренние стипендии университетов (Канада, Европа, Азия)</h3>
            <div className={styles.cardsGrid}>
              {INTERNAL_UNI_SCHOLARSHIPS.map((u) => (
                <article key={u.programName} className={styles.card}>
                  <span className={styles.cardBadge}>{u.country} • {u.levels}</span>
                  <h3 className={styles.cardTitle}>{u.university}</h3>
                  <p className={styles.cardMeta}>{u.programName}</p>
                  <p className={styles.cardText}>{u.coverage}</p>
                  {u.quota && <p className={styles.cardText}><strong>Квота:</strong> {u.quota}</p>}
                  <p className={styles.cardText}><strong>Сильные направления:</strong> {u.majors.join(", ")}</p>
                  <Link href={`/dashboard/u/${u.slug}`} className={styles.inlineLink}>
                    Открыть карточку вуза в каталоге →
                  </Link>
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>Доступные вузы Европы (обучение + жизнь сопоставимо с контрактом СНГ)</h3>
            <div className={styles.cardsGrid}>
              {AFFORDABLE_EU_UNIS.map((eu) => (
                <article key={eu.slug} className={styles.card}>
                  <span className={styles.cardBadge}>{eu.country}</span>
                  <h3 className={styles.cardTitle}>{eu.university}</h3>
                  <p className={styles.cardMeta}>Учёба: {eu.tuitionPerYear} • Жизнь: {eu.livingPerMonth}</p>
                  <p className={styles.cardText}>Сильные мейджоры: {eu.strongMajors.join(", ")}</p>
                  <Link href={`/dashboard/u/${eu.slug}`} className={styles.inlineLink}>
                    Перейти к вузу в атласе →
                  </Link>
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>
              База 103 конкурентных Full-Ride Merit стипендий США ({filteredMerit.length} показано)
            </h3>
            <div className={styles.filterBar}>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Поиск по вузу, названию стипендии или минимальному SAT/ACT..."
                value={meritQ}
                onChange={(e) => setMeritQ(e.target.value)}
              />
              <select
                className={styles.selectInput}
                value={meritState}
                onChange={(e) => setMeritState(e.target.value)}
                aria-label="Фильтр по штату"
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st === "ALL" ? "Все штаты США" : st}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Штат</th>
                    <th>Университет</th>
                    <th>Стипендия</th>
                    <th>Покрытие</th>
                    <th>Мин. требования</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMerit.map((row, idx) => (
                    <tr key={`${row.school}-${row.scholarship}-${idx}`}>
                      <td>{row.state}</td>
                      <td>
                        {row.slug ? (
                          <Link href={`/dashboard/u/${row.slug}`} className={styles.inlineLink}>
                            {row.school}
                          </Link>
                        ) : (
                          row.school
                        )}
                      </td>
                      <td>{row.scholarship}</td>
                      <td>
                        <span className={styles.pillGold}>{row.value}</span>
                      </td>
                      <td>{row.requirements}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={styles.cardTitle}>
              Полный список вузов с Full-Ride финансированием ({filteredFullRide.length} показано)
            </h3>
            <div className={styles.filterBar}>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Поиск по названию или условиям (EFC, PFAA, need-blind...)"
                value={frQ}
                onChange={(e) => setFrQ(e.target.value)}
              />
              <select
                className={styles.selectInput}
                value={frTag}
                onChange={(e) => setFrTag(e.target.value)}
                aria-label="Тип политики Full-Ride"
              >
                <option value="ALL">Все категории</option>
                <option value="need-blind">Need-Blind</option>
                <option value="free-tuition">Бесплатное обучение (Berea)</option>
                <option value="merit">Merit / Full Ride</option>
                <option value="need-aware">Need-Aware (100% need)</option>
              </select>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Университет</th>
                    <th>Политика</th>
                    <th>Примечание для абитуриента</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFullRide.map((item) => (
                    <tr key={item.name}>
                      <td>
                        {item.slug ? (
                          <Link href={`/dashboard/u/${item.slug}`} className={styles.inlineLink}>
                            {item.name}
                          </Link>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td>
                        <span
                          className={
                            item.tag === "need-blind" || item.tag === "free-tuition"
                              ? styles.pillGreen
                              : item.tag === "merit"
                                ? styles.pillGold
                                : styles.pillGray
                          }
                        >
                          {item.tag}
                        </span>
                      </td>
                      <td>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 3. CSS FEE WAIVER & FREE FORMS (81 US UNIVERSITIES) */}
        {show("css") && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>3. Как подать на финпомощь США бесплатно: CSS Fee Waiver и ISFAA (81 вуз)</h2>
                <p className={styles.sectionSub}>
                  Отправка CSS Profile стоит $25 за первый вуз и $16 за каждый следующий. Для семей с низким доходом используйте вузы со своей бесплатной формой (PFAA, IFAW, WISFAA, ISFAA) или запрашивайте CSS Fee Waiver.
                </p>
              </div>
            </div>

            <div className={styles.filterBar}>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Найти вуз США или форму (ISFAA, PFAA, email...)"
                value={cssQ}
                onChange={(e) => setCssQ(e.target.value)}
              />
              <select
                className={styles.selectInput}
                value={cssMode}
                onChange={(e) => setCssMode(e.target.value as typeof cssMode)}
                aria-label="Фильтр способов бесплатной подачи"
              >
                <option value="ALL">Все 81 вуз</option>
                <option value="FREE_FORM">Есть бесплатная альтернатива (ISFAA / PFAA / IFAW...)</option>
                <option value="WAIVER">Даёт CSS Fee Waiver (или альтернативу)</option>
                <option value="NEED_BLIND">Только Need-Blind</option>
              </select>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Университет</th>
                    <th>Штат / Город</th>
                    <th>Политика</th>
                    <th>Макс. помощь</th>
                    <th>Как подать на помощь</th>
                    <th>CSS Fee Waiver</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCss.map((r) => (
                    <tr key={r.school}>
                      <td>
                        {r.slug ? (
                          <Link href={`/dashboard/u/${r.slug}`} className={styles.inlineLink}>
                            {r.school}
                          </Link>
                        ) : (
                          r.school
                        )}
                      </td>
                      <td>{r.location}</td>
                      <td>
                        <span className={/need-?blind/i.test(r.policy) ? styles.pillGreen : styles.pillGray}>
                          {r.policy}
                        </span>
                      </td>
                      <td>{r.maxAid || "100%"}</td>
                      <td>{r.howApply || "См. портал вуза"}</td>
                      <td>
                        <span
                          className={
                            /waiver|email|pass|isfaa|admitted|portal/i.test(r.cssWaiver)
                              ? styles.pillGreen
                              : styles.pillGray
                          }
                        >
                          {r.cssWaiver}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 4. DOCUMENTS & COUNTRY PORTALS */}
        {show("docs") && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>4. Чек-лист документов, экзамены и порталы подачи по странам</h2>
                <p className={styles.sectionSub}>
                  Отмечайте готовые документы — чек-лист поможет ничего не упустить до ранних и основных дедлайнов.
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {DOC_CHECKLIST.map((grp) => (
                <article key={grp.id} className={styles.card}>
                  <span className={styles.cardBadge}>{grp.badge}</span>
                  <h3 className={styles.cardTitle}>{grp.title}</h3>
                  {grp.items.map((item) => {
                    const key = `${grp.id}:${item.name}`;
                    const checked = Boolean(checkedDocs[key]);
                    return (
                      <label
                        key={key}
                        className={`${styles.checkItem} ${checked ? styles.checkDone : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setCheckedDocs((prev) => ({ ...prev, [key]: !prev[key] }))
                          }
                        />
                        <span>
                          <strong>{item.name}</strong>
                          <br />
                          {item.detail}
                          {item.lowIncomeTip ? (
                            <>
                              <br />
                              <em>Экономия бюджета: {item.lowIncomeTip}</em>
                            </>
                          ) : null}
                        </span>
                      </label>
                    );
                  })}
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>Через какие порталы подавать документы</h3>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Страна / Регион</th>
                    <th>Портал подачи</th>
                    <th>Какие вузы</th>
                    <th>Важные нюансы</th>
                  </tr>
                </thead>
                <tbody>
                  {COUNTRY_PORTALS.map((p) => (
                    <tr key={p.portal}>
                      <td><strong>{p.country}</strong></td>
                      <td>{p.portal}</td>
                      <td>{p.scope}</td>
                      <td>{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5. ESSAYS & ADMISSIONS PLAYBOOK */}
        {show("essays") && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>5. Эссе, инсайды приёмной комиссии и 26 ошибок отказа</h2>
                <p className={styles.sectionSub}>
                  Рекомендации бывших замдиректоров приёмных комиссий Dartmouth (Dr. Michele Hernandez) и Yale (Eva Ostrum), структуры 4 главных эссе и разбор проходных заявок в Yale.
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {OFFICER_INSIGHTS.map((o) => (
                <article key={o.officer} className={styles.card}>
                  <span className={styles.cardBadge}>Взгляд приёмной комиссии</span>
                  <h3 className={styles.cardTitle}>{o.officer}</h3>
                  <p className={styles.cardMeta}>{o.role}</p>
                  <ul className={styles.bulletList}>
                    {o.takeaways.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className={styles.cardsGrid}>
              {ESSAY_PLAYBOOK.map((ep) => (
                <article key={ep.id} className={styles.card}>
                  <span className={styles.cardBadge}>{ep.wordCount}</span>
                  <h3 className={styles.cardTitle}>{ep.title}</h3>
                  <p className={styles.cardText}>{ep.goal}</p>
                  {ep.structures.map((st) => (
                    <p key={st.label} className={styles.cardText}>
                      <strong>{st.label}:</strong> {st.desc}
                    </p>
                  ))}
                  <ul className={styles.bulletList}>
                    {ep.checklist.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className={styles.cardsGrid}>
              {YALE_ESSAY_CASES.map((yc) => (
                <article key={yc.title} className={styles.card}>
                  <span className={styles.cardBadge}>Разбор кейса Yale University</span>
                  <h3 className={styles.cardTitle}>{yc.title}</h3>
                  <p className={styles.cardMeta}>{yc.category}</p>
                  <p className={styles.cardText}>{yc.summary}</p>
                  <ul className={styles.bulletList}>
                    {yc.whyItWorked.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>
              Чек-лист самопроверки: 26 ошибок в эссе (отмечено: {Object.values(checkedMistakes).filter(Boolean).length}/26)
            </h3>
            <div className={styles.checkGrid}>
              {ESSAY_26_MISTAKES.map((m, idx) => {
                const ok = Boolean(checkedMistakes[idx]);
                return (
                  <label key={m} className={`${styles.checkItem} ${ok ? styles.checkDone : ""}`}>
                    <input
                      type="checkbox"
                      checked={ok}
                      onChange={() =>
                        setCheckedMistakes((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                    />
                    <span>{m}</span>
                  </label>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. CANADA COMPLETE GUIDE */}
        {show("canada") && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>6. Канада: университеты vs колледжи, Study Permit и «скрытые жемчужины»</h2>
                <p className={styles.sectionSub}>
                  Практическая карта поступления в Канаду: как выбрать между вузом и колледжем с переводом, рассчитать стоимость в CAD и пройти все 8 шагов визы.
                </p>
              </div>
              <Link href="/dashboard?country=Canada" className={styles.ctaLink}>
                Смотреть все вузы Канады →
              </Link>
            </div>

            <div className={styles.cardsGrid}>
              {CANADA_PLAYBOOK.institutions.map((ins) => (
                <article key={ins.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>{ins.title}</h3>
                  <p className={styles.cardText}>{ins.desc}</p>
                </article>
              ))}
            </div>

            <div className={styles.cardsGrid}>
              <article className={styles.card}>
                <span className={styles.cardBadge}>Бюджет и расходы (CAD)</span>
                <h3 className={styles.cardTitle}>Сколько стоит учёба и жизнь</h3>
                <ul className={styles.bulletList}>
                  {CANADA_PLAYBOOK.livingCosts.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <span className={styles.cardBadge}>Работа и ПМЖ</span>
                <h3 className={styles.cardTitle}>Co-op, 24 ч/нед и PGWP</h3>
                <ul className={styles.bulletList}>
                  {CANADA_PLAYBOOK.workAndMigration.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <span className={styles.cardBadge}>Частые ошибки</span>
                <h3 className={styles.cardTitle}>Чего избегать</h3>
                <ul className={styles.bulletList}>
                  {CANADA_PLAYBOOK.commonMistakes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className={styles.noteBanner}>
              <strong>8 шагов к студенческой визе (Study Permit):</strong>
              <ul className={styles.bulletList} style={{ marginTop: 8 }}>
                {CANADA_PLAYBOOK.studyPermitSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <h3 className={styles.cardTitle}>7 недооценённых университетов Канады (Hidden Gems)</h3>
            <div className={styles.cardsGrid}>
              {CANADA_PLAYBOOK.hiddenGems.map((hg) => (
                <article key={hg.name} className={styles.card}>
                  <h3 className={styles.cardTitle}>{hg.name}</h3>
                  <p className={styles.cardText}>{hg.note}</p>
                  {hg.slug && (
                    <Link href={`/dashboard/u/${hg.slug}`} className={styles.inlineLink}>
                      Открыть карточку в Studyaza →
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 7. 2-YEAR TIMELINE */}
        {show("timeline") && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>7. Пошаговый календарь подготовки за 1,5–2 года</h2>
                <p className={styles.sectionSub}>
                  Привязка по месяцам от 9–10 класса СНГ до вылета в августе на осенний семестр.
                </p>
              </div>
            </div>

            <div className={styles.timelineList}>
              {TIMELINE_2_YEARS.map((phase) => (
                <article key={phase.when} className={styles.timelineCard}>
                  <span className={styles.timelineWhen}>{phase.when}</span>
                  <h3 className={styles.cardTitle}>{phase.title}</h3>
                  <ul className={styles.bulletList}>
                    {phase.tasks.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardShell>
  );
}
