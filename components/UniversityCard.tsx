"use client";

import type { University } from "@/lib/types";
import { INST_LABEL, countryRu } from "@/lib/types";
import { UniversityLogo } from "@/components/UniversityLogo";
import styles from "./dashboard/Dashboard.module.css";

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  if (children == null || children === "") return null;
  return (
    <div className={styles.fact}>
      <span className={styles.factL}>{label}</span>
      <span className={styles.factV}>{children}</span>
    </div>
  );
}

export function UniversityCard({
  u,
  selected = false,
  onSelect,
  staggerIndex = 0,
}: {
  u: University;
  selected?: boolean;
  onSelect?: () => void;
  staggerIndex?: number;
}) {
  const ru = countryRu(u.country);
  const intlEnroll = [u.intl_undergrad_pct, u.intl_undergrad_count ? `${u.intl_undergrad_count} чел.` : ""]
    .filter(Boolean)
    .join(" / ");
  const nearestDeadline = u.early_deadline || u.regular_deadline;

  return (
    <article
      className={`${styles.card}${selected ? ` ${styles.cardSelected}` : ""}`}
      style={{ animationDelay: `${Math.min(staggerIndex, 12) * 24}ms` }}
      data-country={u.country}
      data-grant={u.full_grant ? "1" : "0"}
      data-tuition={u.tuition_num ?? ""}
      data-aid={u.aid_num ?? ""}
      data-rate={u.rate_num ?? ""}
      data-inst={(u.inst_tags || []).join(" ")}
      data-aidtype={(u.aid_types || []).join(",")}
    >
      <header className={styles.cardHead}>
        <div className={styles.cardTitleBlock}>
          <UniversityLogo name={u.name} domain={u.website_domain ?? null} size={48} />
          <div>
            {onSelect ? (
              <button
                type="button"
                className={styles.cardSelect}
                onClick={onSelect}
                aria-pressed={selected}
              >
                <span className={styles.cardName}>{u.name}</span>
              </button>
            ) : (
              <h3 className={styles.cardName}>{u.name}</h3>
            )}
            <p className={styles.cardMeta}>
              <span className={styles.tag}>{ru}</span>
              {u.city ? (
                <>
                  <span>·</span>
                  <span>{u.city}</span>
                </>
              ) : null}
            </p>
            <div className={styles.tags}>
              {u.full_grant ? <span className={`${styles.tag} ${styles.tagGrant}`}>Полный грант</span> : null}
              {u.intl_aid_policy ? <span className={styles.tag}>{u.intl_aid_policy}</span> : null}
              {(u.inst_tags || []).slice(0, 3).map((t) => (
                <span className={styles.tag} key={t}>
                  {INST_LABEL[t] || t}
                </span>
              ))}
              {(u.aid_types || []).slice(0, 2).map((t) => (
                <span className={styles.tag} key={t}>
                  {t}
                </span>
              ))}
              {nearestDeadline ? (
                <span className={`${styles.tag} ${styles.tagDeadline}`}>{nearestDeadline}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.quick}>
          <div className={styles.quickItem}>
            <span>Стоимость</span>
            <strong>{u.tuition_display || "—"}</strong>
          </div>
          <div className={styles.quickItem}>
            <span>Поступление</span>
            <strong>{u.acceptance_rate || "—"}</strong>
          </div>
        </div>
      </header>
      <div className={styles.facts}>
        <Fact label="Город">{u.city}</Fact>
        <Fact label="Стоимость обучения">{u.tuition_display}</Fact>
        <Fact label="Процент поступления">{u.acceptance_rate}</Fact>
        <Fact label="Полный грант">
          <span className={u.full_grant ? styles.pillYes : styles.pillNo}>
            {u.full_grant ? "Да, полный грант доступен" : "Нет данных о полном гранте"}
          </span>
        </Fact>
        <Fact label="Типы помощи (types of aid)">{(u.aid_types || []).join(", ")}</Fact>
        <Fact label="Макс. фин. помощь">{u.aid_max}</Fact>
        <Fact label="Total aid (международным)">{u.total_aid_millions}</Fact>
        <Fact label="Undergrad enrollment">{u.undergrad_enrollment}</Fact>
        <Fact label="International enrollment">{intlEnroll}</Fact>
        <Fact label="Ранний дедлайн">{u.early_deadline}</Fact>
        <Fact label="Основной дедлайн">{u.regular_deadline}</Fact>
        <Fact label="Языковые требования">{u.lang}</Fact>
      </div>
      <details className={styles.more}>
        <summary>Подробнее: помощь, enrollment, экзамены</summary>
        <div className={styles.facts}>
          <Fact label="Средняя помощь (avg aid)">{u.avg_aid_award}</Fact>
          <Fact label="% иностранцев с помощью">{u.intl_receiving_aid_pct}</Fact>
          <Fact label="Стран представлено">{u.countries_represented}</Fact>
          <Fact label="COA после помощи">{u.coa_after_aid_pct}</Fact>
          <Fact label="Merit scholarship">{u.merit_scholarship_name}</Fact>
          <Fact label="Intl acceptance rate">{u.intl_acceptance_rate}</Fact>
          <Fact label="Intl yield">{u.intl_yield}</Fact>
          <Fact label="Политика для иностранцев">{u.intl_aid_policy}</Fact>
          <Fact label="Как подать на помощь">{u.how_apply_aid}</Fact>
          <Fact label="Проживание / жизнь">{u.living_note}</Fact>
          <Fact label="Тип вуза">{u.inst_type}</Fact>
          <Fact label="SAT / ACT">{u.sat}</Fact>
          <Fact label="Эссе">{u.essay}</Fact>
          <Fact label="Направления">{u.majors}</Fact>
          <Fact label="Заметки">{u.notes}</Fact>
        </div>
      </details>
    </article>
  );
}
