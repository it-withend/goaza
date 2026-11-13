import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import styles from "./site.module.css";

/** Shell for public pages: header, centered content column, footer. */
export function SitePage({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={wide ? styles.mainWide : styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
