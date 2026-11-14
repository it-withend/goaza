import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { memo } from "react";
import type { CatalogUni } from "@/lib/catalog";
import { daysLeftLabel, describeDeadline } from "@/lib/deadline";
import { countryName, instLabel } from "@/lib/types";
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
  const lang = useLang();
  const tr = useTr();
  const cName = countryName(u.country, lang);
  const from = catalogQuery ? `?from=${encodeURIComponent(catalogQuery)}` : "";
  const href = `/dashboard/u/${encodeURIComponent(u.slug)}${from}`;
  const aidPolicy = formatAidPolicy(u.intl_aid_policy);
  const deadlineInfo = describeDeadline(u.deadline, new Date(), lang);
  const deadlineUrgent =
    deadlineInfo?.daysLeft != null && deadlineInfo.daysLeft >= 0 && deadlineInfo.daysLeft <= 45;
  const intlAidSummary = [
    u.total_aid_millions ? `${u.total_aid_millions}${tr("/год", "/yil")}` : null,
    u.avg_aid_award ? `${tr("ср.", "o'rt.")} ${u.avg_aid_award}` : null,
    u.intl_receiving_aid_pct ? `${u.intl_receiving_aid_pct} ${tr("иностр.", "xorijlik")}` : null,
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
          aria-label={isFavorite ? tr(`Убрать ${u.name} из моего плана`, `${u.name} ni rejamdan olib tashlash`) : tr(`Добавить ${u.name} в мой план`, `${u.name} ni rejamga qo'shish`)}
          onClick={() => onToggleFavorite(u.slug)}
        >
          {isFavorite ? tr("В плане", "Rejada") : tr("+ В план", "+ Rejaga")}
        </button>
      ) : null}

      <Link href={href} className={styles.cardLink} prefetch={false}>
        <header className={styles.cardHead}>
          <div className={styles.cardTitleBlock}>
            <UniversityLogo name={u.name} slug={u.slug} logo={u.logo} size={48} priority={staggerIndex < 6} />
            <div className={styles.cardHeadingText}>
              <h3 className={styles.cardName}>{u.name}</h3>
              <p className={styles.cardMeta}>
                <span>{cName}</span>
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
          {u.full_grant ? <span className={`${styles.tag} ${styles.tagGrant}`}>{tr("Полный грант", "To'liq grant")}</span> : null}
          {u.need_blind ? <span className={`${styles.tag} ${styles.tagMoss}`}>Need-blind</span> : null}
          {aidPolicy ? <span className={`${styles.tag} ${styles.tagWarn}`}>{aidPolicy}</span> : null}
          {u.inst_tags.slice(0, 2).map((t) => (
            <span className={styles.tag} key={t}>
              {instLabel(t, lang)}
            </span>
          ))}
        </div>

        <div className={styles.metricsGrid}>
          <div className={styles.metricCell}>
            <span>{tr("Стоимость", "Narx")}</span>
            <strong>{u.tuition_display || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span>{tr("Поступление", "Qabul")}</span>
            <strong>{u.acceptance_rate || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span>{tr("Макс. помощь", "Maks. yordam")}</span>
            <strong>{u.aid_max || u.avg_aid_award || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span>{tr("Дедлайн", "Dedlayn")}</span>
            <strong className={deadlineUrgent ? styles.deadlineUrgent : undefined}>
              {deadlineInfo?.label || "—"}
            </strong>
            {deadlineUrgent && deadlineInfo?.daysLeft != null ? (
              <em className={styles.deadlinePill}>{daysLeftLabel(deadlineInfo.daysLeft, lang)}</em>
            ) : null}
          </div>
        </div>

        {intlAidSummary ? (
          <div className={styles.intlFundStrip}>
            <span>{tr("Фонд для иностранцев", "Xorijliklar fondi")}</span>
            <strong>{intlAidSummary}</strong>
          </div>
        ) : null}

        <div className={styles.cardFoot}>
          <span className={styles.langNote}>{u.lang || tr("Язык уточняется", "Til aniqlanmoqda")}</span>
          <span className={styles.cardCta}>{tr("Профиль →", "Profil →")}</span>
        </div>
      </Link>
    </article>
  );
}

export const UniversityCard = memo(UniversityCardImpl);
