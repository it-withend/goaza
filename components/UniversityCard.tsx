import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { memo } from "react";
import type { CatalogUni } from "@/lib/catalog";
import { daysLeftLabel, describeDeadline } from "@/lib/deadline";
import { countryName, instLabel } from "@/lib/types";
import { UniversityLogo } from "@/components/UniversityLogo";
import { CountryFlag, Icon } from "@/components/ui/Icon";
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

  // Keep badges to at most 2 scannable signals so cards stay crisp.
  const badges: { label: string; cls: string }[] = [];
  if (u.full_grant) badges.push({ label: tr("Полный грант", "To'liq grant"), cls: styles.tagGrant });
  if (u.need_blind && badges.length < 2) badges.push({ label: "Need-blind", cls: styles.tagMoss });
  else if (aidPolicy && badges.length < 2) badges.push({ label: aidPolicy, cls: styles.tagWarn });
  if (badges.length < 2 && u.inst_tags.length) {
    badges.push({ label: instLabel(u.inst_tags[0], lang), cls: "" });
  }

  return (
    <article
      className={styles.card}
      style={staggerIndex < 12 ? { animationDelay: `${staggerIndex * 20}ms` } : { animation: "none" }}
    >
      <div className={styles.cardHead}>
        <Link href={href} className={styles.cardTitleBlock} prefetch={false}>
          <UniversityLogo name={u.name} slug={u.slug} logo={u.logo} size={46} priority={staggerIndex < 6} />
          <div className={styles.cardHeadingText}>
            <h3 className={styles.cardName}>{u.name}</h3>
            <p className={styles.cardMeta}>
              <CountryFlag country={u.country} size={14} />
              <span>{cName}</span>
              {u.city ? (
                <>
                  <span className={styles.metaDot}>·</span>
                  <span>{u.city}</span>
                </>
              ) : null}
            </p>
          </div>
        </Link>

        {onToggleFavorite ? (
          <button
            type="button"
            className={`${styles.favBtn}${isFavorite ? ` ${styles.favBtnActive}` : ""}`}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? tr(`Убрать ${u.name} из моего плана`, `${u.name} ni rejamdan olib tashlash`)
                : tr(`Добавить ${u.name} в мой план`, `${u.name} ni rejamga qo'shish`)
            }
            onClick={() => onToggleFavorite(u.slug)}
          >
            <Icon name={isFavorite ? "bookmark-check" : "bookmark"} size={14} />
            <span>{isFavorite ? tr("В плане", "Rejada") : tr("В план", "Rejaga")}</span>
          </button>
        ) : null}
      </div>

      <Link href={href} className={styles.cardLink} prefetch={false}>
        {badges.length ? (
          <div className={styles.tags}>
            {badges.map((b) => (
              <span className={`${styles.tag}${b.cls ? ` ${b.cls}` : ""}`} key={b.label}>
                {b.label}
              </span>
            ))}
          </div>
        ) : null}

        <div className={styles.metricsGrid}>
          <div className={styles.metricCell}>
            <span className={styles.metricLabel}>
              <Icon name="wallet" size={12} />
              <span>{tr("Стоимость", "Narx")}</span>
            </span>
            <strong>{u.tuition_display || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span className={styles.metricLabel}>
              <Icon name="trending-up" size={12} />
              <span>{tr("Поступление", "Qabul")}</span>
            </span>
            <strong>{u.acceptance_rate || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span className={styles.metricLabel}>
              <Icon name="sparkles" size={12} />
              <span>{tr("Макс. помощь", "Maks. yordam")}</span>
            </span>
            <strong>{u.aid_max || u.avg_aid_award || "—"}</strong>
          </div>
          <div className={styles.metricCell}>
            <span className={styles.metricLabel}>
              <Icon name={deadlineUrgent ? "alert-triangle" : "calendar"} size={12} />
              <span>{tr("Дедлайн", "Dedlayn")}</span>
            </span>
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
            <span className={styles.intlFundLabel}>
              <Icon name="award" size={13} />
              <span>{tr("Фонд для иностранцев", "Xorijliklar fondi")}</span>
            </span>
            <strong>{intlAidSummary}</strong>
          </div>
        ) : null}

        <div className={styles.cardFoot}>
          <span className={styles.langNote}>
            <Icon name="languages" size={13} />
            <span>{u.lang || tr("Язык уточняется", "Til aniqlanmoqda")}</span>
          </span>
          <span className={styles.cardCta}>
            <span>{tr("Профиль", "Profil")}</span>
            <Icon name="arrow-right" size={13} />
          </span>
        </div>
      </Link>
    </article>
  );
}

export const UniversityCard = memo(UniversityCardImpl);
