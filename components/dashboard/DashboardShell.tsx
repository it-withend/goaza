"use client";

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import styles from "./Dashboard.module.css";

/** Subscriber pages share the public site header: one navigation for plan, catalog and guide. */
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
  return (
    <div className={styles.shell}>
      <SiteHeader account={{ name: accountName, onLogout, onOpenFilters }} />
      <div className={styles.main}>{children}</div>
    </div>
  );
}
