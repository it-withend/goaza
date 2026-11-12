import Link from "next/link";
import { memo } from "react";
import type { CatalogUni } from "@/lib/catalog";
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
}: {
  u: CatalogUni;
  catalogQuery?: string;
  staggerIndex?: number;
}) {
  const ru = countryRu(u.country);
  const from = catalogQuery ? `?from=${encodeURIComponent(catalogQuery)}` : "";
  const href = `/dashboard/u/${encodeURIComponent(u.slug)}${from}`;
  const aidPolicy = formatAidPolicy(u.intl_aid_policy);
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
      style={staggerIndex < 12 ? { animationDelay: `${staggerIndex * 24}ms` } : { animation: "none" }}
    >
      <Link href={href} className={styles.cardLink} prefetch={false}>
        <header className={styles.cardHead}>
          <div className={styles.cardTitleBlock}>
            <UniversityLogo name={u.name} slug={u.slug} logo={u.logo} size={52} priority={staggerIndex < 6} />
            <div>
              <h3 className={styles.cardName}>{u.name}</h3>
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
                {u.need_blind ? <span className={styles.tag}>Need-blind</span> : null}
                {aidPolicy ? <span className={styles.tag}>{aidPolicy}</span> : null}
                {u.inst_tags.slice(0, 2).map((t) => (
                  <span className={styles.tag} key={t}>
                    {INST_LABEL[t] || t}
                  </span>
                ))}
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

        <div className={styles.cardFacts}>
          <span>
            <em>Помощь</em> {u.aid_max || u.avg_aid_award || "—"}
          </span>
          <span>
            <em>Дедлайн</em> {u.deadline || "—"}
          </span>
          {intlAidSummary ? (
            <span className={styles.factWide}>
              <em>Фонд для иностранцев</em> {intlAidSummary}
            </span>
          ) : null}
          <span className={styles.factWide}>
            <em>Язык</em> {u.lang || "—"}
          </span>
        </div>
        <span className={styles.cardCta}>Открыть профиль →</span>
      </Link>
    </article>
  );
}

export const UniversityCard = memo(UniversityCardImpl);
