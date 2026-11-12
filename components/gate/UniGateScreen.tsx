import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./gate.module.css";

/** Public shell for the SEO pages under /unis. Server component. */
export function UniGateScreen({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={36} height={36} alt="Studyaza" />
          <strong>Studyaza</strong>
        </Link>
        <nav className={styles.nav} aria-label="Навигация">
          <Link href="/unis">Все университеты</Link>
        </nav>
      </header>
      {children}
    </main>
  );
}
