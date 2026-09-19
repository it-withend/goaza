"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./Dashboard.module.css";

export function DashboardShell({
  accountName,
  children,
  onLogout,
  onOpenFilters,
}: {
  accountName: string;
  children: ReactNode;
  onLogout: () => void;
  onOpenFilters?: () => void;
}) {
  const displayAccount = accountName.startsWith("@") ? accountName : `@${accountName}`;

  return (
    <div className={styles.shell}>
      <header className={styles.topChrome}>
        <Link href="/dashboard" className={styles.brandBlock}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.brandLogo} src="/logo.png" width={36} height={36} alt="" />
          <span>
            <strong className={styles.brandName}>Studyaza</strong>
            <span className={styles.brandMeta}>Атлас вузов</span>
          </span>
        </Link>

        <div className={styles.accountBar}>
          {onOpenFilters ? (
            <button type="button" className={styles.mobileFiltersBtn} onClick={onOpenFilters}>
              Фильтры
            </button>
          ) : null}
          <a
            className={styles.channelChip}
            href="https://t.me/studyaza"
            target="_blank"
            rel="noopener noreferrer"
          >
            @studyaza
          </a>
          <span className={styles.accountChip}>{displayAccount}</span>
          <button type="button" className={styles.logout} onClick={onLogout}>
            Выйти
          </button>
        </div>
      </header>

      <div className={styles.main}>{children}</div>
    </div>
  );
}
