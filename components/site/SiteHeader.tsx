"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./site.module.css";

const NAV = [
  { href: "/plan", label: "Мой план" },
  { href: "/unis", label: "Вузы" },
  { href: "/grants", label: "Гранты" },
  { href: "/guides", label: "Гайды" },
  { href: "/deadlines", label: "Сроки" },
];

/** Public site header. Auth state is fetched client-side so pages stay static. */
export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/status", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => alive && setSignedIn(Boolean(j?.subscribed)))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Studyaza — на главную">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={32} height={32} alt="" />
          <span>Studyaza</span>
        </Link>

        <nav className={`${styles.nav}${open ? ` ${styles.navOpen}` : ""}`} aria-label="Основная навигация">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.headerActions}>
          <Link href={signedIn ? "/dashboard" : "/plan/start"} className={styles.headerCta}>
            {signedIn ? "Каталог" : "Составить план"}
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
