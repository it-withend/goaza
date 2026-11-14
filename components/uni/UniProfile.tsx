import Image from "next/image";
import Link from "next/link";
import { GateCta } from "@/components/gate/GateCta";
import { MyChance } from "@/components/uni/MyChance";
import { INCOME_BANDS, SCORECARD_META, scorecardFor } from "@/lib/scorecard";
import { UniversityLogo } from "@/components/UniversityLogo";
import { campusPhotoUrl } from "@/lib/campus-photo";
import { getCountryGuide } from "@/lib/country-guides";
import { daysLeftLabel, describeDeadline, pickNearestDeadline } from "@/lib/deadline";
import { hasLogo } from "@/lib/logos";
import { countryRu, INST_LABEL, type University } from "@/lib/types";
import type { UniDirectoryEntry } from "@/lib/universities";
import { websiteUrl } from "@/lib/university-logo";
import styles from "./university.module.css";

type Val = string | number | null | undefined;

const has = (v: Val) => v != null && String(v).trim() !== "";

function Row({ label, value }: { label: string; value?: Val }) {
  if (!has(value)) return null;
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{String(value)}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value?: Val }) {
  if (!has(value)) return null;
  return (
    <div className={styles.stat}>
      <small>{label}</small>
      <strong>{String(value)}</strong>
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
}: {
  u: University;
  related: UniDirectoryEntry[];
  full: boolean;
  backHref: string;
  backLabel: string;
  relatedBase: "/unis" | "/dashboard/u";
  botUsername: string;
}) {
  const photo = campusPhotoUrl(u.slug);
  const sc = scorecardFor(u.slug);
  const usd = (n: number) => `$${new Intl.NumberFormat("en-US").format(Math.round(n))}`;
  const site = websiteUrl(u.website_domain);
  const tags = [
    ...(u.need_blind ? ["Need-blind"] : []),
    ...(u.inst_tags || []).map((t) => INST_LABEL[t] || t),
  ];
  const early = describeDeadline(u.early_deadline);
  const regular = describeDeadline(u.regular_deadline);
  const nearest = pickNearestDeadline(u.early_deadline, u.regular_deadline)?.info ?? null;
  // Same date in both fields means there is only one round.
  const deadlines =
    early && regular && u.early_deadline?.trim() === u.regular_deadline?.trim()
      ? [{ label: "Основной", d: regular }]
      : [
          { label: "Ранний", d: early },
          { label: "Основной", d: regular },
        ].filter((x) => x.d);
  const majors = splitList(u.majors);
  const aidTypes = (u.aid_types || []).filter(Boolean);
  const countryGuide = getCountryGuide(u.country);
  const fundLine = [
    u.total_aid_millions ? `Фонд ${u.total_aid_millions}/год` : null,
    u.intl_receiving_aid_pct ? `${u.intl_receiving_aid_pct} иностр.` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const finance: [string, Val][] = [
    ["Бюджет помощи иностранцам (в год)", u.total_aid_millions],
    ["Средний грант иностранцу", u.avg_aid_award],
    ["Доля иностранцев с помощью", u.intl_receiving_aid_pct],
    ["Покрытие цены средним грантом", u.coa_after_aid_pct],
    ["Стипендия за успеваемость", u.merit_scholarship_name],
    ["Какие анкеты подавать", u.aid_forms],
    ["Бесплатный CSS Profile", u.css_fee_waiver],
    ["Как подать на помощь", u.how_apply_aid],
  ];
  const students: [string, Val][] = [
    ["Бакалавров", u.undergrad_enrollment],
    ["Иностранцев", u.intl_undergrad_pct],
    ["Иностранцев, чел.", u.intl_undergrad_count],
    ["Стран представлено", u.countries_represented],
    ["Приём иностранцев", u.intl_acceptance_rate],
    ["Средний GPA", u.avg_gpa],
  ];
  const chances: [string, Val][] = [
    ["Общий процент приёма", u.acceptance_rate],
    ["В раннем раунде (ED)", u.ed_acceptance_rate],
    ["В основном раунде (RD)", u.rd_acceptance_rate],
    ["Ранние раунды", u.early_rounds],
  ];
  const factors = u.admission_factors && typeof u.admission_factors === "object" ? u.admission_factors : null;
  const factorGroups = FACTOR_ORDER.map((lvl) => ({
    lvl,
    items: factors ? Object.entries(factors).filter(([, v]) => v === lvl).map(([k]) => k) : [],
  })).filter((g) => g.items.length);
  const hasFinance = aidTypes.length > 0 || finance.some(([, v]) => has(v)) || has(u.intl_aid_policy);
  const hasReq = [u.lang, u.sat, u.essay, u.recommendations, u.app_fee].some(has);
  const hasStudents = students.some(([, v]) => has(v));
  const hasChances = chances.filter(([, v]) => has(v)).length > 1;

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <Image className={styles.heroImg} src={photo} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.heroNav}>
            <Link href={backHref} className={styles.back}>
              ← {backLabel}
            </Link>
          </nav>
          <div className={styles.heroBrand}>
            <div className={styles.logoTile}>
              <UniversityLogo name={u.name} slug={u.slug} logo={hasLogo(u.slug)} size={84} priority />
            </div>
            <div className={styles.heroText}>
              <p className={styles.place}>
                {countryRu(u.country)}
                {u.city ? `, ${u.city}` : ""}
                {u.inst_type ? ` · ${u.inst_type}` : ""}
              </p>
              <h1>{u.name}</h1>
              <div className={styles.tags}>
                {u.full_grant ? <span className={styles.tagGold}>Полный грант для иностранцев</span> : null}
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <section className={styles.metrics} aria-label="Ключевые цифры">
          <div>
            <small>Стоимость</small>
            <strong>{u.tuition_display || "—"}</strong>
          </div>
          <div>
            <small>Поступление</small>
            <strong>{u.acceptance_rate || "—"}</strong>
            {u.rate_num != null ? (
              <span className={styles.meter} aria-hidden>
                <i style={{ width: `${Math.max(2, Math.min(100, u.rate_num))}%` }} />
              </span>
            ) : null}
          </div>
          <div>
            <small>Помощь иностранцам</small>
            <strong>{(full ? u.aid_max || u.avg_aid_award : u.aid_max) || "—"}</strong>
            {full && fundLine ? <span className={styles.metricSub}>{fundLine}</span> : null}
          </div>
          <div>
            <small>Ближайший дедлайн</small>
            <strong>{nearest?.label || "—"}</strong>
          </div>
        </section>

        <nav className={styles.sectionNav} aria-label="Разделы страницы">
          <a href="#money">Деньги</a>
          <a href="#admission">Поступление</a>
          <a href="#requirements">Документы</a>
          <a href="#deadlines">Сроки</a>
        </nav>

        <div className={styles.layout}>
          <div className={styles.main}>
            {hasFinance ? (
              <section className={styles.panel} id="money">
                <h2>Финансы и гранты</h2>
                {has(u.intl_aid_policy) ? (
                  <p className={styles.prose}>
                    <b>Политика для иностранцев:</b> {u.intl_aid_policy}
                  </p>
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
                        <Row key={label} label={label} value={value} />
                      ))}
                    </dl>
                    {u.finaid_url ? (
                      <p className={styles.prose}>
                        <a href={u.finaid_url} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                          Страница финансовой помощи вуза ↗
                        </a>
                      </p>
                    ) : null}
                  </>
                ) : (
                  <div className={styles.locked}>
                    <p>
                      Средний грант, доля иностранцев с помощью, какие анкеты подавать и как получить их
                      бесплатно — открываются подписчикам канала @studyaza.
                    </p>
                    <GateCta botUsername={botUsername} label="Открыть финансовые детали" />
                  </div>
                )}
              </section>
            ) : null}

            {sc && sc.netPrice.some((x) => x != null) ? (
              <section className={styles.panel} id="net-price">
                <h2>Сколько платят семьи после помощи</h2>
                <p className={styles.muted}>
                  Средняя цена года (учёба, жильё, питание) после грантов — по доходу семьи в год.
                  {sc.coa ? ` Полная цена без помощи — ${usd(sc.coa)}.` : ""}
                </p>
                <dl className={styles.dl}>
                  {sc.netPrice.map((v, i) =>
                    v != null ? <Row key={INCOME_BANDS[i]} label={`Доход ${INCOME_BANDS[i]}`} value={usd(v)} /> : null,
                  )}
                  <Row label="Средний SAT студентов" value={sc.sat ?? undefined} />
                  <Row label="Заканчивают учёбу" value={sc.grad != null ? `${Math.round(sc.grad * 100)}%` : undefined} />
                  <Row label="Зарплата через 10 лет" value={sc.earnings != null ? `${usd(sc.earnings)} в год` : undefined} />
                </dl>
                <p className={styles.source}>
                  {SCORECARD_META.source}. Цены посчитаны для граждан США; иностранцам это ориентир щедрости вуза —
                  ваша цена считается по анкете CSS Profile.
                </p>
              </section>
            ) : null}

            {hasChances ? (
              <section className={styles.panel} id="admission">
                <h2>Шансы поступить</h2>
                <dl className={styles.dl}>
                  {chances.map(([label, value]) => (
                    <Row key={label} label={label} value={value} />
                  ))}
                </dl>
                {u.ed_acceptance_rate && u.rd_acceptance_rate ? (
                  <p className={styles.muted}>
                    Ранний раунд даёт больше шансов, но обязывает поехать, если приняли.{" "}
                    <Link href="/guides/raundy-podachi" className={styles.inlineLink}>
                      Как выбрать раунд
                    </Link>
                  </p>
                ) : null}
              </section>
            ) : null}

            {factorGroups.length ? (
              <section className={styles.panel}>
                <h2>Что важно этому вузу при приёме</h2>
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
                <h2>Требования и документы</h2>
                <dl className={styles.dl}>
                  <Row label="Язык" value={u.lang} />
                  <Row label="SAT / ACT" value={u.sat} />
                  <Row label="Эссе" value={u.essay} />
                  <Row label="Рекомендации" value={u.recommendations} />
                  <Row label="Пошлина за заявку" value={u.app_fee} />
                  <Row label="Fee waiver" value={u.fee_waiver} />
                </dl>
                <p className={styles.muted}>
                  Полный список документов —{" "}
                  <Link href="/guides/dokumenty" className={styles.inlineLink}>
                    в чек-листе
                  </Link>
                  .
                </p>
              </section>
            ) : null}

            {hasStudents ? (
              <section className={styles.panel}>
                <h2>Студенты</h2>
                <div className={styles.stats}>
                  {students.map(([label, value]) => (
                    <Stat key={label} label={label} value={value} />
                  ))}
                </div>
              </section>
            ) : null}

            {majors.length ? (
              <section className={styles.panel}>
                <h2>Сильные направления</h2>
                <div className={styles.chips}>
                  {majors.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </section>
            ) : null}

            {has(u.living_note) || has(u.notes) ? (
              <section className={styles.panel}>
                <h2>Полезно знать</h2>
                {has(u.living_note) ? (
                  <p className={styles.prose}>
                    <b>Проживание.</b> {u.living_note}
                  </p>
                ) : null}
                {has(u.notes) ? <p className={styles.prose}>{u.notes}</p> : null}
              </section>
            ) : null}

            {countryGuide ? (
              <section className={styles.panel}>
                <h2>Гранты и поступление в стране: {countryRu(u.country)}</h2>
                <p className={styles.guideSub}>
                  Общие условия поступления, госстипендий и расходов для иностранных абитуриентов в этой стране.
                </p>
                <dl className={styles.dl}>
                  <Row label="Нац. гранты и фонды" value={countryGuide.scholarships} />
                  <Row label="После 11 класса" value={countryGuide.after11Grade} />
                  <Row label="Ориентир на жизнь" value={countryGuide.livingBudget} />
                  <Row label="Работа во время учёбы" value={countryGuide.workRights} />
                </dl>
                <p className={styles.muted}>
                  <Link href="/grants" className={styles.inlineLink}>
                    Все стипендии и гранты
                  </Link>
                </p>
              </section>
            ) : null}

            <p className={styles.source}>
              Данные собраны из Common Data Set и сайтов вузов
              {u.data_year ? ` (последнее обновление ${u.data_year})` : ""}. Цифры меняются каждый год —
              перед подачей сверяйтесь с сайтом вуза.
            </p>
          </div>

          <aside className={styles.side}>
            <MyChance slug={u.slug} name={u.name} />
            <section className={styles.panel} id="deadlines">
              <h2>Сроки</h2>
              {deadlines.length ? (
                <ul className={styles.deadlines}>
                  {deadlines.map(({ label, d }) =>
                    d ? (
                      <li key={label}>
                        <small>{label}</small>
                        <strong>{d.label}</strong>
                        {d.daysLeft != null ? (
                          <em className={d.daysLeft < 0 ? styles.past : d.daysLeft <= 30 ? styles.soon : undefined}>
                            {d.daysLeft < 0 ? "прошёл — следующий цикл через год" : daysLeftLabel(d.daysLeft)}
                          </em>
                        ) : null}
                      </li>
                    ) : null,
                  )}
                </ul>
              ) : (
                <p className={styles.muted}>Дедлайны уточняются на сайте вуза.</p>
              )}
              {u.apply_url ? (
                <a className={styles.siteLink} href={u.apply_url} target="_blank" rel="noopener noreferrer">
                  Подать заявку ↗
                </a>
              ) : null}
              {site ? (
                <a
                  className={u.apply_url ? styles.siteLinkQuiet : styles.siteLink}
                  href={site}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Официальный сайт ↗
                </a>
              ) : null}
            </section>

            {related.length ? (
              <section className={styles.panel}>
                <h2>Ещё в стране: {countryRu(u.country)}</h2>
                <ul className={styles.related}>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`${relatedBase}/${r.slug}`} prefetch={false}>
                        <UniversityLogo name={r.name} slug={r.slug} logo={hasLogo(r.slug)} size={32} />
                        <span>
                          {r.name}
                          {r.full_grant ? <i className={styles.grantDot} title="Полный грант" /> : null}
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
