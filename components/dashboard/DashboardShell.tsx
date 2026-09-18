"use client";

import type { ReactNode } from "react";
import styles from "./Dashboard.module.css";

export function DashboardShell({
  accountName,
  children,
  onLogout,
  view = "list",
  onViewChange,
  onOpenFilters,
}: {
  accountName: string;
  children: ReactNode;
  onLogout: () => void;
  view?: "list" | "map";
  onViewChange?: (view: "list" | "map") => void;
  onOpenFilters?: () => void;
}) {
  const displayAccount = accountName.startsWith("@") ? accountName : `@${accountName}`;

  return (
    <div className={styles.shell}>
      <aside className={styles.rail} aria-label="Навигация">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.railLogo} src="/logo.png" width={40} height={40} alt="" />
        <nav className={styles.railNav}>
          <button type="button" className={`${styles.railItem} ${styles.railItemActive}`} aria-current="page">
            <span aria-hidden>◈</span>
            <span>Explorer</span>
          </button>
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topChrome}>
          <div className={styles.brandBlock}>
            <strong className={styles.brandName}>Studyaza</strong>
            <span className={styles.brandMeta}>Global Academic Atlas</span>
          </div>
          <div className={styles.viewSwitch} role="group" aria-label="Вид результатов">
            <button
              type="button"
              className={view === "list" ? styles.viewActive : undefined}
              aria-pressed={view === "list"}
              onClick={() => onViewChange?.("list")}
            >
              Список
            </button>
            <button
              type="button"
              className={view === "map" ? styles.viewActive : undefined}
              aria-pressed={view === "map"}
              onClick={() => onViewChange?.("map")}
            >
              Карта
            </button>
          </div>
          <div className={styles.accountBar}>
            <span className={styles.accountChip}>{displayAccount}</span>
            <button type="button" className={styles.logout} onClick={onLogout}>
              Выйти
            </button>
            {onOpenFilters ? (
              <button type="button" className={styles.mobileFiltersBtn} onClick={onOpenFilters}>
                Фильтры
              </button>
            ) : null}
          </div>
        </header>
        {children}
      </div>

      <nav className={styles.bottomNav} aria-label="Мобильная навигация">
        <button type="button" className={`${styles.bottomItem} ${styles.railItemActive}`} aria-current="page">
          Explorer
        </button>
        <span className={styles.bottomHint}>Атлас университетов</span>
      </nav>
    </div>
  );
}
