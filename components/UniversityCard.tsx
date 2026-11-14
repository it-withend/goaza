import Link from "next/link";
import { memo } from "react";
import type { CatalogUni } from "@/lib/catalog";
import { daysLeftLabel, describeDeadline } from "@/lib/deadline";
import { INST_LABEL, countryRu } from "@/lib/types";
import { UniversityLogo } from "@/components/UniversityLogo";
import styles from "./dashboard/Dashboard.module.css";

function formatAidPolicy(raw: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || /^need-blind$/i.test(trimmed)) return null;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function UniversityCardImpl({
  u,
  catalogQuery = "",
  staggerIndex = 0,
  isFavorite = false,
  onToggleFavorite,
}: {
  u: CatalogUni;
  catalogQuery?: string;
  staggerIndex?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (slug: string) => void;
}) {
  const ru = countryRu(u.country);
  const from = catalogQuery ? `?from=${encodeURIComponent(catalogQuery)}` : "";
  const href = `/dashboard/u/${encodeURIComponent(u.slug)}${from}`;
  const aidPolicy = formatAidPolicy(u.intl_aid_policy);
  const deadlineInfo = describeDeadline(u.deadline);
  const deadlineUrgent =
    deadlineInfo?.daysLeft != null && deadlineInfo.daysLeft >= 0 && deadlineInfo.daysLeft <= 45;
  const intlAidSummary = [
    u.total_aid_millions ? `${u.total_aid_millions}/год` : null,
    u.avg_aid_award ? `ср. ${u.avg_aid_award}` : null,
    u.intl_receiving_aid_pct ? `${u.intl_receiving_aid_pct} иностр.` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className={styles.card}
      style={staggerIndex < 12 ? { animationDelay: `${staggerIndex * 20}ms` } : { animation: "none" }}
    >
      {onToggleFavorite ? (
        <button
          type="button"
          className={`${styles.favBtn}${isFavorite ? ` ${styles.favBtnActive}` : ""}`}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Убрать ${u.name} из моего плана` : `Добавить ${u.name} в мой план`}
          onClick={() => onToggleFavorite(u.slug)}
        >
          {isFavorite ? "В плане" : "+ В план"}
        </button>
      ) : null}

      <Link href={href} className={styles.cardLink} prefetch={false}>
        <header className={styles.cardHead}>
          <div className={styles.cardTitleBlock}>
            <UniversityLogo name={u.name} slug={u.slug} logo={u.logo} size={48} priority={staggerIndex < 6} />
            <div className={styles.cardHeadingText}>
              <h3 className={styles.cardName}>{u.name}</h3>
              <p className={styles.cardMeta}>
                <span>{ru}</span>
                {u.city ? (
                  <>
                    <span className={styles.metaDot}>·</span>
                    <span>{u.city}</span>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </header>

        <div className={styles.tags}>
          {u.full_grant ? <span className={`${styles.tag} ${styles.tagGrant}`}>Полный грант</span> : null}
          {u.need_blind ? <span className={`${styles.tag} ${styles.tagMoss}`}>Need-blind</span> : null}
          {aidPolicy ? <span className={`${styles.tag} ${styles.tagWarn}`}>{aidPolicy}</span> : null}
          {u.inst_tags.slice(0, 2).map((t) => (
            <span className={styles.tag} key={t}>
              {INST_LABEL[t] || t}
            </span>
          ))}
        </div>

        <div className={styles.metricsGrid}>
          <div className={styles.metricCell}>
            <span>Стоимость</span>
            <strong>{u.tuition_display || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span>Поступление</span>
            <strong>{u.acceptance_rate || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span>Макс. помощь</span>
            <strong>{u.aid_max || u.avg_aid_award || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span>Дедлайн</span>
            <strong className={deadlineUrgent ? styles.deadlineUrgent : undefined}>
              {deadlineInfo?.label || "—"}
            </strong>
            {deadlineUrgent && deadlineInfo?.daysLeft != null ? (
              <em className={styles.deadlinePill}>{daysLeftLabel(deadlineInfo.daysLeft)}</em>
            ) : null}
          </div>
        </div>

        {intlAidSummary ? (
          <div className={styles.intlFundStrip}>
            <span>Фонд для иностранцев</span>
            <strong>{intlAidSummary}</strong>
          </div>
        ) : null}

        <div className={styles.cardFoot}>
          <span className={styles.langNote}>{u.lang || "Язык уточняется"}</span>
          <span className={styles.cardCta}>Профиль →</span>
        </div>
      </Link>
    </article>
  );
}

export const UniversityCard = memo(UniversityCardImpl);
