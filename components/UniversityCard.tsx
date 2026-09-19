"use client";

import Link from "next/link";
import type { University } from "@/lib/types";
import { INST_LABEL, countryRu } from "@/lib/types";
import { UniversityLogo } from "@/components/UniversityLogo";
import styles from "./dashboard/Dashboard.module.css";

export function UniversityCard({
  u,
  staggerIndex = 0,
}: {
  u: University;
  staggerIndex?: number;
}) {
  const ru = countryRu(u.country);
  const nearestDeadline = u.early_deadline || u.regular_deadline;
  const href = `/dashboard/u/${encodeURIComponent(u.slug)}`;

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${Math.min(staggerIndex, 12) * 24}ms` }}
    >
      <Link href={href} className={styles.cardLink}>
        <header className={styles.cardHead}>
          <div className={styles.cardTitleBlock}>
            <UniversityLogo name={u.name} domain={u.website_domain ?? null} size={48} />
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
                {(u.inst_tags || []).slice(0, 2).map((t) => (
                  <span className={styles.tag} key={t}>
                    {INST_LABEL[t] || t}
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
        <span className={styles.cardCta}>Открыть профиль →</span>
      </Link>
    </article>
  );
}
