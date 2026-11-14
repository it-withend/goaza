"use client";

import { useMemo, useState } from "react";
import Link from "@/components/i18n/Link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { Icon } from "@/components/ui/Icon";
import { localizePath } from "@/lib/i18n";
import {
  getAdmissionsKnowledge,
  MERIT_103_TABLE,
  US_CSS_AID_TABLE,
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

type BudgetBracket = "zero" | "low" | "mid";
type SatProfile = "high" | "mid" | "none";

export function AdmissionsGuideClient({ accountName }: { accountName: string }) {
  const router = useRouter();
  const lang = useLang();
  const tr = useTr();
  const [tab, setTab] = useState<TabId>("all");

  const {
    shortlistFormula,
    budgetTracks,
    govScholarships,
    internalUniScholarships,
    affordableEuUnis,
    fullRideList,
    docChecklist,
    countryPortals,
    essayPlaybook,
    essayMistakes,
    officerInsights,
    yaleEssayCases,
    canadaPlaybook,
    timeline2Years,
  } = useMemo(() => getAdmissionsKnowledge(lang), [lang]);

  const tabs: { id: TabId; label: string }[] = useMemo(
    () => [
      { id: "all", label: tr("Всё сразу", "Hammasi birdan") },
      { id: "strategy", label: tr("Стратегия и бюджет $0", "Strategiya va $0 byudjet") },
      { id: "grants", label: tr("Гранты и 103 Full-Ride", "Grantlar va 103 Full-Ride") },
      { id: "css", label: tr("CSS Waiver и ISFAA (81 вуз)", "CSS Waiver va ISFAA (81 OTM)") },
      { id: "docs", label: tr("Документы и порталы", "Hujjatlar va portallar") },
      { id: "essays", label: tr("Эссе и 26 ошибок", "Esse va 26 xato") },
      { id: "canada", label: tr("Гид по Канаде", "Kanada bo'yicha gid") },
      { id: "timeline", label: tr("Таймлайн 2 года", "2 yillik taymlayn") },
    ],
    [tr],
  );

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
    router.replace(localizePath(lang, "/"));
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
    return fullRideList.filter((row) => {
      if (frTag !== "ALL" && row.tag !== frTag) return false;
      if (!q) return true;
      return `${row.name} ${row.note}`.toLowerCase().includes(q);
    });
  }, [frQ, frTag, fullRideList]);

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
        title: tr(
          "Оптимальная стратегия: Need-Blind / Need-Based США + 103 Merit Full-Ride + Госстипендии",
          "Optimal strategiya: AQSH Need-Blind / Need-Based + 103 Merit Full-Ride + Davlat stipendiyalari",
        ),
        text: tr(
          "С SAT 1400+ и бюджетом около $0 подавайтесь сразу по трём линиям: 1) Need-Blind и ISFAA-вузы США в Reach/Target, 2) 3–4 штата из таблицы 103 Merit Full-Ride (Alabama, Hendrix, W&L Johnson, Simmons и др.), 3) Stipendium Hungaricum / Türkiye Bursları как надёжный Financial Safety.",
          "SAT 1400+ va ~$0 byudjet bilan bir vaqtning o'zida uch yo'nalishda topshiring: 1) Reach/Target ga AQSHning Need-Blind va ISFAA OTMlari, 2) 103 Merit Full-Ride jadvalidan 3–4 shtat (Alabama, Hendrix, W&L Johnson, Simmons va b.), 3) Ishonchli Financial Safety sifatida Stipendium Hungaricum / Türkiye Bursları.",
        ),
        href: "/dashboard?grant=1&sort=intl_aid",
        cta: tr(
          "Открыть вузы с полным грантом и бюджетом помощи ↓",
          "To'liq grant va yordam byudjetiga ega OTMlarni ochish ↓",
        ),
      };
    }
    if (budget === "zero") {
      return {
        title: tr(
          "Оптимальная стратегия: ISFAA/CSS Waiver США (test-optional) + Береа + 100% Госстипендии",
          "Optimal strategiya: AQSH ISFAA/CSS Waiver (test-optional) + Berea + 100% Davlat stipendiyalari",
        ),
        text: tr(
          "Даже без SAT при ограниченном бюджете семьи путь открыт: подавайтесь с бесплатными формами помощи (PFAA, IFAW, WISFAA, ISFAA, Common App Fee Waiver) в test-optional колледжи со 100% покрытием (включая Berea College с $0 обучения) И обязательно страхуйте список через Stipendium Hungaricum, Türkiye Bursları, CSC, GKS или MEXT.",
          "Oila byudjeti cheklanganida ham SAT siz yo'l ochiq: bepul yordam shakllari (PFAA, IFAW, WISFAA, ISFAA, Common App Fee Waiver) bilan 100% qoplaydigan test-optional kollejlarga (jumladan, o'qishi $0 bo'lgan Berea College) topshiring VA ro'yxatni albatta Stipendium Hungaricum, Türkiye Bursları, CSC, GKS yoki MEXT orqali sug'urtalang.",
        ),
        href: "/dashboard?grant=1&sort=rate",
        cta: tr(
          "Подобрать доступные вузы с полным грантом ↓",
          "To'liq grantli qulay OTMlarni tanlash ↓",
        ),
      };
    }
    if (budget === "low") {
      return {
        title: tr(
          "Оптимальная стратегия: Дешёвая Европа (€1,000–4,800/год) + Гранты Италии/Канады",
          "Optimal strategiya: Arzon Yevropa (€1,000–4,800/yil) + Italiya/Kanada grantlari",
        ),
        text: tr(
          "Вузы уровня University of Lisbon, University of Porto, KU Leuven и Ghent сопоставимы по цене с местными университетами, а Padua International Excellence даёт бесплатное обучение + €8,000/год. Параллельно подавайтесь на крупные входные стипендии в Канаде и США с умеренным EFC (Denison, Kenyon).",
          "University of Lisbon, University of Porto, KU Leuven va Ghent darajasidagi OTMlar narxi jihatidan mahalliy universitetlar bilan teng, Padua International Excellence esa bepul o'qish + €8,000/yil beradi. Parallel ravishda Kanada va mo'tadil EFC ga ega AQSH OTMlarida (Denison, Kenyon) yirik kirish stipendiyalariga topshiring.",
        ),
        href: "/dashboard?tuition=8000&sort=tuition",
        cta: tr(
          "Смотреть вузы до $8,000/год в каталоге ↓",
          "Katalogda $8,000/yilgacha OTMlarni ko'rish ↓",
        ),
      };
    }
    return {
      title: tr(
        "Оптимальная стратегия: Канада (Co-op & College → University) + Частичный Merit",
        "Optimal strategiya: Kanada (Co-op & College → University) + Qisman Merit",
      ),
      text: tr(
        "При бюджете $10,000–$25,000/год можно целиться в региональные вузы Канады (Saskatchewan, Manitoba, Regina, MUN, Dalhousie) или 2-летние колледжи с переводом на 3-й курс и легальной подработкой 24 ч/нед + PGWP до 3 лет.",
        "Yiliga $10,000–$25,000 byudjet bilan Kanadaning mintaqaviy OTMlariga (Saskatchewan, Manitoba, Regina, MUN, Dalhousie) yoki 3-kursga o'tish va haftasiga 24 soat qonuniy ishlash + 3 yilgacha PGWP huquqini beruvchi 2 yillik kollejlarga hujjat topshirish mumkin.",
      ),
      href: "/dashboard?country=Canada&sort=tuition",
      cta: tr(
        "Открыть канадские вузы и колледжи ↓",
        "Kanada OTM va kollejlarini ochish ↓",
      ),
    };
  }, [budget, satProfile, tr]);

  const show = (id: TabId) => tab === "all" || tab === id;

  return (
    <DashboardShell accountName={accountName} onLogout={logout}>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div>
              <span className={styles.eyebrow}>
                {tr(
                  "Studyaza Knowledge Hub • База поступающего",
                  "Studyaza Knowledge Hub • Abituriyent bazasi",
                )}
              </span>
              <h1 className={styles.heroTitle}>
                {tr(
                  "Универсальный гид: от выбора вузов на $0 до визы и эссе",
                  "Universal qo'llanma: $0 dan OTM tanlashdan tortib viza va essegacha",
                )}
              </h1>
              <p className={styles.heroLead}>
                {tr(
                  "Сводная база для абитуриентов, в том числе из семей с ограниченным бюджетом: как составить список по формуле 3+3+2, не переплатить за CSS Profile, выбрать государственные и университетские full-ride стипендии, собрать документы, написать сильные эссе и оформить студенческую визу.",
                  "Abituriyentlar, jumladan cheklangan byudjetli oilalar uchun jamlanma baza: 3+3+2 formulasi bo'yicha ro'yxatni qanday tuzish, CSS Profile uchun ortiqcha to'lamaslik, davlat va universitet full-ride stipendiyalarini tanlash, hujjatlarni yig'ish, kuchli esse yozish va talaba vizasini rasmiylashtirish.",
                )}
              </p>
            </div>
            <Link href="/dashboard" className={styles.backCatalogBtn}>
              {tr("← В каталог 1,000+ вузов", "← 1,000+ OTM katalogiga")}
            </Link>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statPill}>
              <strong>103</strong>
              <span>{tr("Merit Full-Ride стипендии США", "AQSH Merit Full-Ride stipendiyalari")}</span>
            </div>
            <div className={styles.statPill}>
              <strong>81</strong>
              <span>{tr("Вуз США с 100% aid & CSS Waiver", "100% aid & CSS Waiver li AQSH OTMlari")}</span>
            </div>
            <div className={styles.statPill}>
              <strong>{tr("8 госпрограмм", "8 davlat dasturi")}</strong>
              <span>{tr("Венгрия, Турция, Корея, Китай, Япония, ЕС…", "Vengriya, Turkiya, Koreya, Xitoy, Yaponiya, YI…")}</span>
            </div>
            <div className={styles.statPill}>
              <strong>{tr("26 правил", "26 qoida")}</strong>
              <span>{tr("Анти-ошибки эссе + инсайды Yale / Dartmouth", "Esse anti-xatolari + Yale / Dartmouth insaydlari")}</span>
            </div>
          </div>
        </section>

        <nav className={styles.tabsBar} aria-label={tr("Разделы гида", "Qo'llanma bo'limlari")}>
          {tabs.map((t) => (
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
                <h2 className={styles.sectionTitle}>
                  {tr(
                    "1. Как составить список вузов и поступить при низком доходе",
                    "1. OTMlar ro'yxatini qanday tuzish va kam daromadda o'qishga kirish",
                  )}
                </h2>
                <p className={styles.sectionSub}>{shortlistFormula.explanation}</p>
              </div>
            </div>

            <div className={styles.calcBox}>
              <div className={styles.calcControls}>
                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>
                    {tr(
                      "Бюджет семьи на учёбу + жизнь в год",
                      "Oilaning o'qish + yashash uchun yillik byudjeti",
                    )}
                  </span>
                  <div className={styles.chipRow}>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${budget === "zero" ? styles.optionChipActive : ""}`}
                      onClick={() => setBudget("zero")}
                    >
                      {tr("$0 – $2,000 (нужен Full-Ride)", "$0 – $2,000 (Full-Ride kerak)")}
                    </button>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${budget === "low" ? styles.optionChipActive : ""}`}
                      onClick={() => setBudget("low")}
                    >
                      {tr("$2,000 – $10,000 / год", "$2,000 – $10,000 / yil")}
                    </button>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${budget === "mid" ? styles.optionChipActive : ""}`}
                      onClick={() => setBudget("mid")}
                    >
                      {tr("$10,000 – $25,000 / год", "$10,000 – $25,000 / yil")}
                    </button>
                  </div>
                </div>

                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>
                    {tr("Экзамен SAT / ACT", "SAT / ACT imtihoni")}
                  </span>
                  <div className={styles.chipRow}>
                    <button
                      type="button"
                      className={`${styles.optionChip} ${satProfile === "high" ? styles.optionChipActive : ""}`}
                      onClick={() => setSatProfile("high")}
                    >
                      {tr("SAT 1400+ (или ACT 30+)", "SAT 1400+ (yoki ACT 30+)")}
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
                      {tr("Без SAT (Test-Optional / Мир)", "SAT siz (Test-Optional / Dunyo)")}
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
              {shortlistFormula.tiers.map((tier) => (
                <article key={tier.tier} className={styles.card}>
                  <span className={styles.cardBadge}>{tier.badge}</span>
                  <h3 className={styles.cardTitle}>{tier.tier}</h3>
                  <p className={styles.cardText}>{tier.criteria}</p>
                  <p className={styles.cardText}>
                    <strong>{tr("Совет:", "Maslahat:")}</strong> {tier.tip}
                  </p>
                </article>
              ))}
            </div>

            <div className={styles.cardsGrid}>
              {budgetTracks.map((trItem) => (
                <article key={trItem.id} className={styles.card}>
                  <span className={styles.cardBadge}>{trItem.badge}</span>
                  <h3 className={styles.cardTitle}>{trItem.title}</h3>
                  <p className={styles.cardMeta}>
                    {tr("Бюджет:", "Byudjet:")} {trItem.budgetPerYear}
                  </p>
                  <p className={styles.cardText}>{trItem.keyMechanism}</p>
                  <ul className={styles.bulletList}>
                    {trItem.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <Link href={trItem.catalogHref} className={styles.inlineLink}>
                    {trItem.catalogLabel} →
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
                <h2 className={styles.sectionTitle}>
                  {tr(
                    "2. Гранты государств, топовые стипендии вузов и 103 Full-Ride США",
                    "2. Davlat grantlari, OTM top stipendiyalari va AQSH 103 Full-Ride",
                  )}
                </h2>
                <p className={styles.sectionSub}>
                  {tr(
                    "Государственные стипендии покрывают обучение, жильё и ежемесячные расходы; таблицы ниже объединяют внутренние гранты Европы/Азии/Канады и 103 конкурентные Merit Full-Ride программы в США.",
                    "Davlat stipendiyalari o'qish, turar joy va oylik xarajatlarni qoplaydi; quyidagi jadvallar Yevropa/Osiyo/Kanadaning ichki grantlarini va AQSHdagi 103 ta raqobatbardosh Merit Full-Ride dasturini birlashtiradi.",
                  )}
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {govScholarships.map((gs) => (
                <article key={gs.name} className={styles.card}>
                  <span className={styles.cardBadge}>{gs.country} • {gs.levels}</span>
                  <h3 className={styles.cardTitle}>{gs.name}</h3>
                  <p className={styles.cardMeta}>{gs.stipend}</p>
                  <p className={styles.cardText}>
                    <strong>{tr("Охват:", "Qamrov:")}</strong> {gs.unisCount}
                  </p>
                  <ul className={styles.bulletList}>
                    {gs.coverage.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  {gs.importantNote && (
                    <p className={`${styles.cardText} ${styles.warnInline}`}>
                      <Icon name="alert-triangle" size={14} />
                      <span>{gs.importantNote}</span>
                    </p>
                  )}
                  <a href={gs.url} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                    {tr("Официальный сайт программы ↗", "Dasturning rasmiy sayti ↗")}
                  </a>
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>
              {tr(
                "Крупнейшие внутренние стипендии университетов (Канада, Европа, Азия)",
                "Universitetlarning eng yirik ichki stipendiyalari (Kanada, Yevropa, Osiyo)",
              )}
            </h3>
            <div className={styles.cardsGrid}>
              {internalUniScholarships.map((u) => (
                <article key={u.programName} className={styles.card}>
                  <span className={styles.cardBadge}>{u.country} • {u.levels}</span>
                  <h3 className={styles.cardTitle}>{u.university}</h3>
                  <p className={styles.cardMeta}>{u.programName}</p>
                  <p className={styles.cardText}>{u.coverage}</p>
                  {u.quota && (
                    <p className={styles.cardText}>
                      <strong>{tr("Квота:", "Kvota:")}</strong> {u.quota}
                    </p>
                  )}
                  <p className={styles.cardText}>
                    <strong>{tr("Сильные направления:", "Kuchli yo'nalishlar:")}</strong> {u.majors.join(", ")}
                  </p>
                  <Link href={`/dashboard/u/${u.slug}`} className={styles.inlineLink}>
                    {tr("Открыть карточку вуза в каталоге →", "Katalogda OTM kartasini ochish →")}
                  </Link>
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>
              {tr(
                "Доступные вузы Европы (обучение + жизнь сопоставимо с контрактом СНГ)",
                "Yevropaning qulay OTMlari (o'qish + yashash MDH kontrakti bilan teng)",
              )}
            </h3>
            <div className={styles.cardsGrid}>
              {affordableEuUnis.map((eu) => (
                <article key={eu.slug} className={styles.card}>
                  <span className={styles.cardBadge}>{eu.country}</span>
                  <h3 className={styles.cardTitle}>{eu.university}</h3>
                  <p className={styles.cardMeta}>
                    {tr("Учёба:", "O'qish:")} {eu.tuitionPerYear} • {tr("Жизнь:", "Yashash:")} {eu.livingPerMonth}
                  </p>
                  <p className={styles.cardText}>
                    {tr("Сильные мейджоры:", "Kuchli yo'nalishlar:")} {eu.strongMajors.join(", ")}
                  </p>
                  <Link href={`/dashboard/u/${eu.slug}`} className={styles.inlineLink}>
                    {tr("Перейти к вузу в атласе →", "Atlasda OTM ga o'tish →")}
                  </Link>
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>
              {tr(
                `База 103 конкурентных Full-Ride Merit стипендий США (${filteredMerit.length} показано)`,
                `AQSHning 103 ta raqobatbardosh Full-Ride Merit stipendiyasi bazasi (${filteredMerit.length} ta ko'rsatilmoqda)`,
              )}
            </h3>
            <div className={styles.filterBar}>
              <input
                type="search"
                className={styles.searchInput}
                placeholder={tr(
                  "Поиск по вузу, названию стипендии или минимальному SAT/ACT...",
                  "OTM, stipendiya nomi yoki minimal SAT/ACT bo'yicha qidirish...",
                )}
                value={meritQ}
                onChange={(e) => setMeritQ(e.target.value)}
              />
              <select
                className={styles.selectInput}
                value={meritState}
                onChange={(e) => setMeritState(e.target.value)}
                aria-label={tr("Фильтр по штату", "Shtat bo'yicha filtr")}
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st === "ALL" ? tr("Все штаты США", "AQSHning barcha shtatlari") : st}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{tr("Штат", "Shtat")}</th>
                    <th>{tr("Университет", "Universitet")}</th>
                    <th>{tr("Стипендия", "Stipendiya")}</th>
                    <th>{tr("Покрытие", "Qoplash")}</th>
                    <th>{tr("Мин. требования", "Min. talablar")}</th>
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
              {tr(
                `Полный список вузов с Full-Ride финансированием (${filteredFullRide.length} показано)`,
                `Full-Ride moliyalashtirishga ega OTMlarning to'liq ro'yxati (${filteredFullRide.length} ta ko'rsatilmoqda)`,
              )}
            </h3>
            <div className={styles.filterBar}>
              <input
                type="search"
                className={styles.searchInput}
                placeholder={tr(
                  "Поиск по названию или условиям (EFC, PFAA, need-blind...)",
                  "Nomi yoki shartlari bo'yicha qidirish (EFC, PFAA, need-blind...)",
                )}
                value={frQ}
                onChange={(e) => setFrQ(e.target.value)}
              />
              <select
                className={styles.selectInput}
                value={frTag}
                onChange={(e) => setFrTag(e.target.value)}
                aria-label={tr("Тип политики Full-Ride", "Full-Ride siyosat turi")}
              >
                <option value="ALL">{tr("Все категории", "Barcha toifalar")}</option>
                <option value="need-blind">Need-Blind</option>
                <option value="free-tuition">{tr("Бесплатное обучение (Berea)", "Bepul o'qish (Berea)")}</option>
                <option value="merit">Merit / Full Ride</option>
                <option value="need-aware">Need-Aware (100% need)</option>
              </select>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{tr("Университет", "Universitet")}</th>
                    <th>{tr("Политика", "Siyosat")}</th>
                    <th>{tr("Примечание для абитуриента", "Abituriyent uchun eslatma")}</th>
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
                <h2 className={styles.sectionTitle}>
                  {tr(
                    "3. Как подать на финпомощь США бесплатно: CSS Fee Waiver и ISFAA (81 вуз)",
                    "3. AQSH moliyaviy yordamiga bepul topshirish: CSS Fee Waiver va ISFAA (81 OTM)",
                  )}
                </h2>
                <p className={styles.sectionSub}>
                  {tr(
                    "Отправка CSS Profile стоит $25 за первый вуз и $16 за каждый следующий. Для семей с низким доходом используйте вузы со своей бесплатной формой (PFAA, IFAW, WISFAA, ISFAA) или запрашивайте CSS Fee Waiver.",
                    "CSS Profile yuborish birinchi OTM uchun $25 va keyingi har biri uchun $16 turadi. Kam daromadli oilalar uchun o'zining bepul shakliga ega OTMlardan (PFAA, IFAW, WISFAA, ISFAA) foydalaning yoki CSS Fee Waiver so'rang.",
                  )}
                </p>
              </div>
            </div>

            <div className={styles.filterBar}>
              <input
                type="search"
                className={styles.searchInput}
                placeholder={tr(
                  "Найти вуз США или форму (ISFAA, PFAA, email...)",
                  "AQSH OTMi yoki shaklini topish (ISFAA, PFAA, email...)",
                )}
                value={cssQ}
                onChange={(e) => setCssQ(e.target.value)}
              />
              <select
                className={styles.selectInput}
                value={cssMode}
                onChange={(e) => setCssMode(e.target.value as typeof cssMode)}
                aria-label={tr("Фильтр способов бесплатной подачи", "Bepul topshirish usullari filtri")}
              >
                <option value="ALL">{tr("Все 81 вуз", "Barcha 81 OTM")}</option>
                <option value="FREE_FORM">
                  {tr(
                    "Есть бесплатная альтернатива (ISFAA / PFAA / IFAW...)",
                    "Bepul muqobili bor (ISFAA / PFAA / IFAW...)",
                  )}
                </option>
                <option value="WAIVER">
                  {tr("Даёт CSS Fee Waiver (или альтернативу)", "CSS Fee Waiver beradi (yoki muqobil)")}
                </option>
                <option value="NEED_BLIND">{tr("Только Need-Blind", "Faqat Need-Blind")}</option>
              </select>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{tr("Университет", "Universitet")}</th>
                    <th>{tr("Штат / Город", "Shtat / Shahar")}</th>
                    <th>{tr("Политика", "Siyosat")}</th>
                    <th>{tr("Макс. помощь", "Maks. yordam")}</th>
                    <th>{tr("Как подать на помощь", "Yordamga qanday topshirish")}</th>
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
                      <td>{r.howApply || tr("См. портал вуза", "OTM portaliga qarang")}</td>
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
                <h2 className={styles.sectionTitle}>
                  {tr(
                    "4. Чек-лист документов, экзамены и порталы подачи по странам",
                    "4. Hujjatlar chek-listi, imtihonlar va davlatlar bo'yicha topshirish portallari",
                  )}
                </h2>
                <p className={styles.sectionSub}>
                  {tr(
                    "Отмечайте готовые документы — чек-лист поможет ничего не упустить до ранних и основных дедлайнов.",
                    "Tayyor hujjatlarni belgilab boring — chek-list erta va asosiy dedlaynlargacha hech narsani o'tkazib yubormaslikka yordam beradi.",
                  )}
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {docChecklist.map((grp) => (
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
                              <em>
                                {tr("Экономия бюджета:", "Byudjetni tejash:")} {item.lowIncomeTip}
                              </em>
                            </>
                          ) : null}
                        </span>
                      </label>
                    );
                  })}
                </article>
              ))}
            </div>

            <h3 className={styles.cardTitle}>
              {tr("Через какие порталы подавать документы", "Hujjatlarni qaysi portallar orqali topshirish kerak")}
            </h3>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{tr("Страна / Регион", "Davlat / Hudud")}</th>
                    <th>{tr("Портал подачи", "Topshirish portali")}</th>
                    <th>{tr("Какие вузы", "Qaysi OTMlar")}</th>
                    <th>{tr("Важные нюансы", "Muhim jihatlar")}</th>
                  </tr>
                </thead>
                <tbody>
                  {countryPortals.map((p) => (
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
                <h2 className={styles.sectionTitle}>
                  {tr(
                    "5. Эссе, инсайды приёмной комиссии и 26 ошибок отказа",
                    "5. Esse, qabul komissiyasi insaydlari va rad etishga olib keluvchi 26 xato",
                  )}
                </h2>
                <p className={styles.sectionSub}>
                  {tr(
                    "Рекомендации бывших замдиректоров приёмных комиссий Dartmouth (Dr. Michele Hernandez) и Yale (Eva Ostrum), структуры 4 главных эссе и разбор проходных заявок в Yale.",
                    "Dartmouth (Dr. Michele Hernandez) va Yale (Eva Ostrum) qabul komissiyalari direktorlarining sobiq o'rinbosarlari tavsiyalari, 4 ta asosiy esse tuzilmasi va Yale ga o'tgan arizalar tahlili.",
                  )}
                </p>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {officerInsights.map((o) => (
                <article key={o.officer} className={styles.card}>
                  <span className={styles.cardBadge}>
                    {tr("Взгляд приёмной комиссии", "Qabul komissiyasi nigohi")}
                  </span>
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
              {essayPlaybook.map((ep) => (
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
              {yaleEssayCases.map((yc) => (
                <article key={yc.title} className={styles.card}>
                  <span className={styles.cardBadge}>
                    {tr("Разбор кейса Yale University", "Yale University keysi tahlili")}
                  </span>
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
              {tr(
                `Чек-лист самопроверки: 26 ошибок в эссе (отмечено: ${Object.values(checkedMistakes).filter(Boolean).length}/26)`,
                `O'z-o'zini tekshirish chek-listi: essedagi 26 xato (belgilandi: ${Object.values(checkedMistakes).filter(Boolean).length}/26)`,
              )}
            </h3>
            <div className={styles.checkGrid}>
              {essayMistakes.map((m, idx) => {
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
                <h2 className={styles.sectionTitle}>
                  {tr(
                    "6. Канада: университеты vs колледжи, Study Permit и «скрытые жемчужины»",
                    "6. Kanada: universitetlar vs kollejlar, Study Permit va «yashirin durdonalar»",
                  )}
                </h2>
                <p className={styles.sectionSub}>
                  {tr(
                    "Практическая карта поступления в Канаду: как выбрать между вузом и колледжем с переводом, рассчитать стоимость в CAD и пройти все 8 шагов визы.",
                    "Kanadaga kirishning amaliy xaritasi: OTM va transfer kolleji o'rtasida qanday tanlash, CAD da xarajatlarni hisoblash va vizaning barcha 8 bosqichidan o'tish.",
                  )}
                </p>
              </div>
              <Link href="/dashboard?country=Canada" className={styles.ctaLink}>
                {tr("Смотреть все вузы Канады →", "Kanadaning barcha OTMlarini ko'rish →")}
              </Link>
            </div>

            <div className={styles.cardsGrid}>
              {canadaPlaybook.institutions.map((ins) => (
                <article key={ins.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>{ins.title}</h3>
                  <p className={styles.cardText}>{ins.desc}</p>
                </article>
              ))}
            </div>

            <div className={styles.cardsGrid}>
              <article className={styles.card}>
                <span className={styles.cardBadge}>{tr("Бюджет и расходы (CAD)", "Byudjet va xarajatlar (CAD)")}</span>
                <h3 className={styles.cardTitle}>{tr("Сколько стоит учёба и жизнь", "O'qish va yashash qancha turadi")}</h3>
                <ul className={styles.bulletList}>
                  {canadaPlaybook.livingCosts.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <span className={styles.cardBadge}>{tr("Работа и ПМЖ", "Ish va doimiy yashash")}</span>
                <h3 className={styles.cardTitle}>{tr("Co-op, 24 ч/нед и PGWP", "Co-op, haftasiga 24 soat va PGWP")}</h3>
                <ul className={styles.bulletList}>
                  {canadaPlaybook.workAndMigration.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <span className={styles.cardBadge}>{tr("Частые ошибки", "Ko'p uchraydigan xatolar")}</span>
                <h3 className={styles.cardTitle}>{tr("Чего избегать", "Nimadan qochish kerak")}</h3>
                <ul className={styles.bulletList}>
                  {canadaPlaybook.commonMistakes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className={styles.noteBanner}>
              <strong>
                {tr("8 шагов к студенческой визе (Study Permit):", "Talaba vizasiga (Study Permit) 8 qadam:")}
              </strong>
              <ul className={styles.bulletList} style={{ marginTop: 8 }}>
                {canadaPlaybook.studyPermitSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <h3 className={styles.cardTitle}>
              {tr(
                "7 недооценённых университетов Канады (Hidden Gems)",
                "Kanadaning yetarlicha baholanmagan 7 universiteti (Hidden Gems)",
              )}
            </h3>
            <div className={styles.cardsGrid}>
              {canadaPlaybook.hiddenGems.map((hg) => (
                <article key={hg.name} className={styles.card}>
                  <h3 className={styles.cardTitle}>{hg.name}</h3>
                  <p className={styles.cardText}>{hg.note}</p>
                  {hg.slug && (
                    <Link href={`/dashboard/u/${hg.slug}`} className={styles.inlineLink}>
                      {tr("Открыть карточку в Studyaza →", "Studyaza da kartani ochish →")}
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
                <h2 className={styles.sectionTitle}>
                  {tr(
                    "7. Пошаговый календарь подготовки за 1,5–2 года",
                    "7. 1,5–2 yillik bosqichma-bosqich tayyorgarlik taqvimi",
                  )}
                </h2>
                <p className={styles.sectionSub}>
                  {tr(
                    "Привязка по месяцам от 9–10 класса СНГ до вылета в августе на осенний семестр.",
                    "MDH 9–10 sinfidan avgustda kuzgi semestrga uchib ketishgacha oylar bo'yicha reja.",
                  )}
                </p>
              </div>
            </div>

            <div className={styles.timelineList}>
              {timeline2Years.map((phase) => (
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
