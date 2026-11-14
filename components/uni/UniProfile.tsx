import Image from "next/image";
import Link from "@/components/i18n/Link";
import { GateCta } from "@/components/gate/GateCta";
import { MyChance } from "@/components/uni/MyChance";
import { UniPlanButton } from "@/components/uni/UniPlanButton";
import { CountryFlag, Icon } from "@/components/ui/Icon";
import { INCOME_BANDS, INCOME_BANDS_UZ, SCORECARD_META, scorecardFor } from "@/lib/scorecard";
import { UniversityLogo } from "@/components/UniversityLogo";
import { campusPhotoUrl } from "@/lib/campus-photo";
import { getCountryGuide } from "@/lib/country-guides";
import { daysLeftLabel, describeDeadline, describeDeadlineWindow, pickNearestDeadline } from "@/lib/deadline";
import { hasLogo } from "@/lib/logos";
import { trFor, type Lang } from "@/lib/i18n";
import { countryName, instLabel, type University } from "@/lib/types";
import type { UniDirectoryEntry } from "@/lib/universities";
import { websiteUrl } from "@/lib/university-logo";
import {
  aidPolicyRu,
  aidSummary,
  aidTypeRu,
  essayRu,
  instTypeRu,
  langRu,
  livingRu,
  majorsRu,
  money,
  noteRu,
  satRu,
} from "@/lib/humanize";
import styles from "./university.module.css";

type Val = string | number | null | undefined;

const has = (v: Val) => v != null && String(v).trim() !== "";

const CYR = /[а-яё]/i;

/** On the Uzbek site Russian free text from the database is hidden rather than shown untranslated. */
const fits = (v: Val, lang: Lang) => has(v) && !(lang === "uz" && CYR.test(String(v)));

function Row({ label, value, lang = "ru" }: { label: string; value?: Val; lang?: Lang }) {
  if (!fits(value, lang)) return null;
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{money(String(value), lang)}</dd>
    </div>
  );
}

function Stat({ label, value, lang = "ru" }: { label: string; value?: Val; lang?: Lang }) {
  if (!fits(value, lang)) return null;
  return (
    <div className={styles.stat}>
      <small>{label}</small>
      <strong>{money(String(value), lang)}</strong>
    </div>
  );
}

function splitList(raw: string | null | undefined, max = 12): string[] {
  return (raw ?? "")
    .split(/[,;\n]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
    .slice(0, max);
}

const FACTOR_ORDER = ["Очень важно", "Важно", "Учитывается"];
const FACTOR_UZ: Record<string, string> = { "Очень важно": "Juda muhim", Важно: "Muhim", Учитывается: "Hisobga olinadi" };

/**
 * University profile. `full` = subscriber view (detailed financial aid); everything else is
 * public by design — applicants should be able to plan without paying anyone.
 */
export function UniProfile({
  u,
  related,
  full,
  backHref,
  backLabel,
  relatedBase,
  botUsername,
  lang = "ru",
}: {
  lang?: Lang;
  u: University;
  related: UniDirectoryEntry[];
  full: boolean;
  backHref: string;
  backLabel: string;
  relatedBase: "/unis" | "/dashboard/u";
  botUsername: string;
}) {
  const tr = trFor(lang);
  const photo = campusPhotoUrl(u.slug);
  const sc = scorecardFor(u.slug);
  const usd = (n: number) => `$${new Intl.NumberFormat("ru-RU").format(Math.round(n)).replace(/\s/g, " ")}`;
  const site = websiteUrl(u.website_domain);
  const tags = [
    ...(u.need_blind ? [tr("Доход семьи не влияет на приём", "Oila daromadi qabulga ta'sir qilmaydi")] : []),
    ...(u.inst_tags || []).map((t) => instLabel(t, lang)),
  ];
  const early = describeDeadline(u.early_deadline, undefined, lang);
  const regular = describeDeadline(u.regular_deadline, undefined, lang);
  const nearest = pickNearestDeadline(u.early_deadline, u.regular_deadline, undefined, lang)?.info ?? null;
  const deadlineWindow = describeDeadlineWindow(u.early_deadline, u.regular_deadline, undefined, lang);
  const mainRound = tr("Основной раунд (конец приёма)", "Asosiy bosqich (oxirgi muddat)");
  // Same date in both fields means there is only one round.
  const deadlines =
    early && regular && u.early_deadline?.trim() === u.regular_deadline?.trim()
      ? [{ label: mainRound, d: regular }]
      : [
          { label: tr("Ранний раунд (ранняя подача)", "Erta bosqich (erta topshirish)"), d: early },
          { label: mainRound, d: regular },
        ].filter((x) => x.d);
  const majors = majorsRu(splitList(u.majors), lang);
  const aid = aidSummary(full ? u.aid_max || u.avg_aid_award : u.aid_max, lang);
  const policy = aidPolicyRu(u.intl_aid_policy, lang);
  const note = noteRu(u.notes, lang);
  const living = livingRu(u.living_note, lang);
  const instType = instTypeRu(u.inst_type, lang);
  const req = { lang: langRu(u.lang, lang), sat: satRu(u.sat, lang), essay: essayRu(u.essay, lang) };
  const aidTypes = [...new Set((u.aid_types || []).filter(Boolean).map((x) => aidTypeRu(x, lang)))];
  const countryGuide = getCountryGuide(u.country, lang);
  const country = countryName(u.country, lang);
  const bands = lang === "uz" ? INCOME_BANDS_UZ : INCOME_BANDS;
  const fundLine = [
    u.total_aid_millions ? tr(`Фонд ${u.total_aid_millions}/год`, `Fond ${u.total_aid_millions}/yil`) : null,
    u.intl_receiving_aid_pct ? tr(`${u.intl_receiving_aid_pct} иностр.`, `chet elliklarning ${u.intl_receiving_aid_pct}`) : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const finance: [string, Val][] = [
    [tr("Бюджет помощи иностранцам (в год)", "Chet elliklarga yordam byudjeti (yiliga)"), u.total_aid_millions],
    [tr("Средний грант иностранцу", "Chet ellikka o'rtacha grant"), u.avg_aid_award],
    [tr("Доля иностранцев с помощью", "Yordam olgan chet elliklar ulushi"), u.intl_receiving_aid_pct],
    [tr("Покрытие цены средним грантом", "O'rtacha grant narxning qancha qismini qoplaydi"), u.coa_after_aid_pct],
    [tr("Стипендия за успеваемость", "O'zlashtirish uchun stipendiya"), u.merit_scholarship_name],
    [tr("Какие анкеты подавать", "Qaysi anketalarni topshirish kerak"), u.aid_forms],
    [tr("Бесплатный CSS Profile", "Bepul CSS Profile"), u.css_fee_waiver],
    [tr("Как подать на помощь", "Yordamga qanday ariza berish"), u.how_apply_aid],
  ];
  const students: [string, Val][] = [
    [tr("Бакалавров", "Bakalavrlar"), u.undergrad_enrollment],
    [tr("Иностранцев", "Chet elliklar"), u.intl_undergrad_pct],
    [tr("Иностранцев, чел.", "Chet elliklar, kishi"), u.intl_undergrad_count],
    [tr("Стран представлено", "Davlatlar soni"), u.countries_represented],
    [tr("Приём иностранцев", "Chet elliklarni qabul qilish"), u.intl_acceptance_rate],
    [tr("Средний GPA", "O'rtacha GPA"), u.avg_gpa],
  ];
  const chances: [string, Val][] = [
    [tr("Общий процент приёма", "Umumiy qabul foizi"), u.acceptance_rate],
    [tr("В раннем раунде (ED)", "Erta bosqichda (ED)"), u.ed_acceptance_rate],
    [tr("В основном раунде (RD)", "Asosiy bosqichda (RD)"), u.rd_acceptance_rate],
    [tr("Ранние раунды", "Erta bosqichlar"), u.early_rounds],
  ];
  const factors = u.admission_factors && typeof u.admission_factors === "object" ? u.admission_factors : null;
  const factorGroups = FACTOR_ORDER.map((lvl) => ({
    lvl: lang === "uz" ? FACTOR_UZ[lvl] : lvl,
    items: factors
      ? Object.entries(factors)
          .filter(([k, v]) => v === lvl && fits(k, lang))
          .map(([k]) => k)
      : [],
  })).filter((g) => g.items.length);
  const hasFinance =
    aidTypes.length > 0 || finance.some(([, v]) => fits(v, lang)) || Boolean(policy) || Boolean(aid?.names.length);
  const hasReq = [req.lang, req.sat, req.essay, u.recommendations, u.app_fee].some(has);
  const hasStudents = students.some(([, v]) => fits(v, lang));
  const hasChances = chances.filter(([, v]) => fits(v, lang)).length > 1;

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <Image className={styles.heroImg} src={photo} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.heroNav}>
            <Link href={backHref} className={styles.back}>
              <Icon name="arrow-left" size={15} />
              <span>{backLabel}</span>
            </Link>
            <UniPlanButton slug={u.slug} name={u.name} />
          </nav>
          <div className={styles.heroBrand}>
            <div className={styles.logoTile}>
              <UniversityLogo name={u.name} slug={u.slug} logo={hasLogo(u.slug)} size={84} priority />
            </div>
            <div className={styles.heroText}>
              <p className={styles.place}>
                <CountryFlag country={u.country} size={15} />
                <span>
                  {country}
                  {u.city ? `, ${u.city}` : ""}
                  {instType ? ` · ${instType}` : ""}
                </span>
              </p>
              <h1>{u.name}</h1>
              <div className={styles.tags}>
                {u.full_grant ? <span className={styles.tagGold}>{tr("Полный грант для иностранцев", "Chet elliklar uchun to'liq grant")}</span> : null}
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <section className={styles.metrics} aria-label={tr("Ключевые цифры", "Asosiy raqamlar")}>
          <div>
            <small>
              <Icon name="wallet" size={13} />
              <span>{tr("Стоимость учёбы", "O'qish narxi")}</span>
            </small>
            <strong>{money(u.tuition_display, lang) || tr("Нет данных", "Ma'lumot yo'q")}</strong>
            {!u.tuition_display ? (
              <span className={styles.metricSub}>{tr("смотрите на сайте вуза", "universitet saytidan qarang")}</span>
            ) : null}
          </div>
          <div>
            <small>
              <Icon name="trending-up" size={13} />
              <span>{tr("Поступление", "Qabul")}</span>
            </small>
            <strong>{u.acceptance_rate || "—"}</strong>
            {u.rate_num != null ? (
              <span className={styles.meter} aria-hidden>
                <i style={{ width: `${Math.max(2, Math.min(100, u.rate_num))}%` }} />
              </span>
            ) : null}
          </div>
          <div>
            <small>
              <Icon name="award" size={13} />
              <span>{tr("Помощь иностранцам", "Chet elliklarga yordam")}</span>
            </small>
            <strong>{aid?.short || tr("Нет данных", "Ma'lumot yo'q")}</strong>
            {full && fundLine ? <span className={styles.metricSub}>{fundLine}</span> : null}
          </div>
          <div>
            <small>
              <Icon name="calendar" size={13} />
              <span>{tr("Ближайший дедлайн", "Eng yaqin muddat")}</span>
            </small>
            <strong>{nearest?.label || "—"}</strong>
            {nearest?.academicYear ? (
              <span className={styles.metricSub}>
                {tr(`на ${nearest.academicYear} уч. год`, `${nearest.academicYear} o'quv yili uchun`)}
                {nearest.daysLeft != null && nearest.daysLeft >= 0 ? ` · ${daysLeftLabel(nearest.daysLeft, lang)}` : ""}
              </span>
            ) : null}
          </div>
        </section>

        <nav className={styles.sectionNav} aria-label={tr("Разделы страницы", "Sahifa bo'limlari")}>
          <a href="#money">
            <Icon name="wallet" size={14} />
            <span>{tr("Деньги", "Pul")}</span>
          </a>
          <a href="#admission">
            <Icon name="target" size={14} />
            <span>{tr("Поступление", "Qabul")}</span>
          </a>
          <a href="#requirements">
            <Icon name="file-text" size={14} />
            <span>{tr("Документы", "Hujjatlar")}</span>
          </a>
          <a href="#deadlines">
            <Icon name="calendar" size={14} />
            <span>{tr("Сроки", "Muddatlar")}</span>
          </a>
        </nav>

        <div className={styles.layout}>
          <div className={styles.main}>
            {hasFinance ? (
              <section className={styles.panel} id="money">
                <h2>
                  <Icon name="wallet" size={18} className={styles.headingIcon} />
                  <span>{tr("Финансы и гранты", "Moliya va grantlar")}</span>
                </h2>
                {policy ? (
                  <p className={styles.prose}>
                    <b>{tr("Как вуз смотрит на доход семьи:", "Universitet oila daromadiga qanday qaraydi:")}</b> {policy}
                  </p>
                ) : null}
                {aid?.names.length ? (
                  <>
                    <h3 className={styles.subhead}>{tr("Стипендии вуза", "Universitet stipendiyalari")}</h3>
                    <ul className={styles.nameList}>
                      {aid.names.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
                {aidTypes.length ? (
                  <div className={styles.chips}>
                    {aidTypes.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                ) : null}
                {full ? (
                  <>
                    <dl className={styles.dl}>
                      {finance.map(([label, value]) => (
                        <Row key={label} label={label} value={value} lang={lang} />
                      ))}
                    </dl>
                    {u.finaid_url ? (
                      <p className={styles.prose}>
                        <a href={u.finaid_url} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                          <span>{tr("Страница финансовой помощи вуза", "Universitetning moliyaviy yordam sahifasi")}</span>
                          <Icon name="external-link" size={13} />
                        </a>
                      </p>
                    ) : null}
                  </>
                ) : (
                  <div className={styles.locked}>
                    <p>
                      {tr(
                        "Средний грант, доля иностранцев с помощью, какие анкеты подавать и как получить их бесплатно — открываются подписчикам канала @studyaza.",
                        "O'rtacha grant, yordam olgan chet elliklar ulushi, qaysi anketalarni topshirish va ularni qanday bepul olish — @studyaza kanali obunachilari uchun ochiq.",
                      )}
                    </p>
                    <GateCta botUsername={botUsername} label={tr("Открыть финансовые детали", "Moliyaviy tafsilotlarni ochish")} />
                  </div>
                )}
              </section>
            ) : null}

            {sc && sc.netPrice.some((x) => x != null) ? (
              <section className={styles.panel} id="net-price">
                <h2>
                  <Icon name="sparkles" size={18} className={styles.headingIcon} />
                  <span>{tr("Сколько платят семьи после помощи", "Yordamdan keyin oilalar qancha to'laydi")}</span>
                </h2>
                <p className={styles.muted}>
                  {tr(
                    "Средняя цена года (учёба, жильё, питание) после грантов — по доходу семьи в год.",
                    "Grantlardan keyingi bir yillik o'rtacha narx (o'qish, yotoqxona, ovqat) — oilaning yillik daromadiga ko'ra.",
                  )}
                  {sc.coa ? tr(` Полная цена без помощи — ${usd(sc.coa)}.`, ` Yordamsiz to'liq narx — ${usd(sc.coa)}.`) : ""}
                </p>
                <dl className={styles.dl}>
                  {sc.netPrice.map((v, i) =>
                    v != null ? (
                      <Row key={bands[i]} label={tr(`Доход ${bands[i]}`, `Daromad ${bands[i]}`)} value={usd(v)} lang={lang} />
                    ) : null,
                  )}
                  <Row label={tr("Средний SAT студентов", "Talabalarning o'rtacha SAT bali")} value={sc.sat ?? undefined} lang={lang} />
                  <Row
                    label={tr("Заканчивают учёбу", "O'qishni tugatadi")}
                    value={sc.grad != null ? `${Math.round(sc.grad * 100)}%` : undefined}
                    lang={lang}
                  />
                  <Row
                    label={tr("Зарплата через 10 лет", "10 yildan keyingi maosh")}
                    value={sc.earnings != null ? `${usd(sc.earnings)} ${tr("в год", "yiliga")}` : undefined}
                    lang={lang}
                  />
                </dl>
                <p className={styles.source}>
                  {SCORECARD_META.source}.{" "}
                  {tr(
                    "Цены посчитаны для граждан США; иностранцам это ориентир щедрости вуза — ваша цена считается по анкете CSS Profile.",
                    "Narxlar AQSH fuqarolari uchun hisoblangan; chet elliklar uchun bu universitet saxiyligining mo'ljali — sizning narxingiz CSS Profile anketasi bo'yicha hisoblanadi.",
                  )}
                </p>
              </section>
            ) : null}

            {hasChances ? (
              <section className={styles.panel} id="admission">
                <h2>
                  <Icon name="target" size={18} className={styles.headingIcon} />
                  <span>{tr("Шансы поступить", "Qabul imkoniyati")}</span>
                </h2>
                <dl className={styles.dl}>
                  {chances.map(([label, value]) => (
                    <Row key={label} label={label} value={value} lang={lang} />
                  ))}
                </dl>
                {u.ed_acceptance_rate && u.rd_acceptance_rate ? (
                  <p className={styles.muted}>
                    {tr(
                      "Ранний раунд даёт больше шансов, но обязывает поехать, если приняли.",
                      "Erta bosqich ko'proq imkoniyat beradi, lekin qabul qilinsangiz, borishga majbur qiladi.",
                    )}{" "}
                    <Link href="/guides/raundy-podachi" className={styles.inlineLink}>
                      {tr("Как выбрать раунд", "Bosqichni qanday tanlash")}
                    </Link>
                  </p>
                ) : null}
              </section>
            ) : null}

            {factorGroups.length ? (
              <section className={styles.panel}>
                <h2>
                  <Icon name="sliders" size={18} className={styles.headingIcon} />
                  <span>{tr("Что важно этому вузу при приёме", "Bu universitet qabulda nimaga e'tibor beradi")}</span>
                </h2>
                <div className={styles.factors}>
                  {factorGroups.map((g) => (
                    <div key={g.lvl}>
                      <small>{g.lvl}</small>
                      <div className={styles.chips}>
                        {g.items.map((i) => (
                          <span key={i}>{i}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {hasReq ? (
              <section className={styles.panel} id="requirements">
                <h2>
                  <Icon name="file-text" size={18} className={styles.headingIcon} />
                  <span>{tr("Требования и документы", "Talablar va hujjatlar")}</span>
                </h2>
                <dl className={styles.dl}>
                  <Row label={tr("Английский", "Ingliz tili")} value={req.lang} lang={lang} />
                  <Row label="SAT / ACT" value={req.sat} lang={lang} />
                  <Row label={tr("Эссе", "Esse")} value={req.essay} lang={lang} />
                  <Row label={tr("Рекомендации", "Tavsiyanomalar")} value={u.recommendations} lang={lang} />
                  <Row label={tr("Пошлина за заявку", "Ariza to'lovi")} value={u.app_fee} lang={lang} />
                  <Row label={tr("Освобождение от сбора", "To'lovdan ozod qilish")} value={u.fee_waiver} lang={lang} />
                </dl>
                <p className={styles.muted}>
                  {tr("Полный список документов —", "Hujjatlarning to'liq ro'yxati —")}{" "}
                  <Link href="/guides/dokumenty" className={styles.inlineLink}>
                    {tr("в чек-листе", "chek-listda")}
                  </Link>
                  .
                </p>
              </section>
            ) : null}

            {hasStudents ? (
              <section className={styles.panel}>
                <h2>
                  <Icon name="graduation-cap" size={18} className={styles.headingIcon} />
                  <span>{tr("Студенты", "Talabalar")}</span>
                </h2>
                <div className={styles.stats}>
                  {students.map(([label, value]) => (
                    <Stat key={label} label={label} value={value} lang={lang} />
                  ))}
                </div>
              </section>
            ) : null}

            {majors.length ? (
              <section className={styles.panel}>
                <h2>
                  <Icon name="compass" size={18} className={styles.headingIcon} />
                  <span>{tr("Сильные направления", "Kuchli yo'nalishlar")}</span>
                </h2>
                <div className={styles.chips}>
                  {majors.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </section>
            ) : null}

            {living || note ? (
              <section className={styles.panel}>
                <h2>
                  <Icon name="info" size={18} className={styles.headingIcon} />
                  <span>{tr("Полезно знать", "Bilish foydali")}</span>
                </h2>
                {living ? (
                  <p className={styles.prose}>
                    <b>{tr("Проживание.", "Yashash.")}</b> {living}
                  </p>
                ) : null}
                {note ? <p className={styles.prose}>{note.split("|").map((x) => x.trim()).join(" · ")}</p> : null}
              </section>
            ) : null}

            {countryGuide ? (
              <section className={styles.panel}>
                <h2>
                  <CountryFlag country={u.country} size={18} />
                  <span>{tr(`Гранты и поступление в стране: ${country}`, `${country}: grantlar va qabul`)}</span>
                </h2>
                <p className={styles.guideSub}>
                  {tr(
                    "Общие условия поступления, госстипендий и расходов для иностранных абитуриентов в этой стране.",
                    "Ushbu davlatda chet ellik abituriyentlar uchun qabul, davlat stipendiyalari va xarajatlarning umumiy shartlari.",
                  )}
                </p>
                <dl className={styles.dl}>
                  <Row label={tr("Нац. гранты и фонды", "Milliy grantlar va fondlar")} value={countryGuide.scholarships} lang={lang} />
                  <Row label={tr("После 11 класса", "11-sinfdan keyin")} value={countryGuide.after11Grade} lang={lang} />
                  <Row label={tr("Ориентир на жизнь", "Yashash xarajatlari")} value={countryGuide.livingBudget} lang={lang} />
                  <Row label={tr("Работа во время учёбы", "O'qish davomida ishlash")} value={countryGuide.workRights} lang={lang} />
                </dl>
                <p className={styles.muted}>
                  <Link href="/grants" className={styles.inlineLink}>
                    {tr("Все стипендии и гранты", "Barcha stipendiya va grantlar")}
                  </Link>
                </p>
              </section>
            ) : null}

            <p className={styles.source}>
              {tr("Данные собраны из Common Data Set и сайтов вузов", "Ma'lumotlar Common Data Set va universitet saytlaridan olingan")}
              {u.data_year ? tr(` (последнее обновление ${u.data_year})`, ` (oxirgi yangilanish ${u.data_year})`) : ""}.{" "}
              {tr(
                "Цифры меняются каждый год — перед подачей сверяйтесь с сайтом вуза.",
                "Raqamlar har yili o'zgaradi — ariza topshirishdan oldin universitet saytini tekshiring.",
              )}
            </p>
          </div>

          <aside className={styles.side}>
            <MyChance slug={u.slug} name={u.name} />
            <section className={styles.panel} id="deadlines">
              <h2>
                <Icon name="calendar" size={18} className={styles.headingIcon} />
                <span>{tr("Сроки", "Muddatlar")}</span>
              </h2>
              {deadlineWindow ? <p className={styles.deadlineWindow}>{deadlineWindow}</p> : null}
              {deadlines.length ? (
                <ul className={styles.deadlines}>
                  {deadlines.map(({ label, d }) =>
                    d ? (
                      <li key={label}>
                        <small>{label}</small>
                        <strong>{d.label}</strong>
                        {d.daysLeft != null ? (
                          <em className={d.daysLeft < 0 ? styles.past : d.daysLeft <= 30 ? styles.soon : undefined}>
                            {d.daysLeft < 0
                              ? tr(
                                  `набор ${d.academicYear ?? ""} закрыт — следующий через год`,
                                  `${d.academicYear ?? ""} qabuli yopilgan — keyingi yil kuting`,
                                )
                              : daysLeftLabel(d.daysLeft, lang)}
                          </em>
                        ) : null}
                      </li>
                    ) : null,
                  )}
                </ul>
              ) : (
                <p className={styles.muted}>{tr("Дедлайны уточняются на сайте вуза.", "Muddatlarni universitet saytidan aniqlang.")}</p>
              )}
              {u.apply_url ? (
                <a className={styles.siteLink} href={u.apply_url} target="_blank" rel="noopener noreferrer">
                  <span>{tr("Подать заявку", "Ariza topshirish")}</span>
                  <Icon name="external-link" size={15} />
                </a>
              ) : null}
              {site ? (
                <a
                  className={u.apply_url ? styles.siteLinkQuiet : styles.siteLink}
                  href={site}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{tr("Официальный сайт", "Rasmiy sayt")}</span>
                  <Icon name="external-link" size={15} />
                </a>
              ) : null}
            </section>

            {related.length ? (
              <section className={styles.panel}>
                <h2>
                  <CountryFlag country={u.country} size={18} />
                  <span>{tr(`Ещё в стране: ${country}`, `${country}dagi boshqa universitetlar`)}</span>
                </h2>
                <ul className={styles.related}>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`${relatedBase}/${r.slug}`} prefetch={false}>
                        <UniversityLogo name={r.name} slug={r.slug} logo={hasLogo(r.slug)} size={32} />
                        <span className={styles.relatedName}>
                          <span>{r.name}</span>
                          {r.full_grant ? (
                            <span className={styles.grantBadge} title={tr("Полный грант", "To'liq grant")}>
                              <Icon name="award" size={13} />
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
