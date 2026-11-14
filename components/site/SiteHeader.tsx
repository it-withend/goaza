"use client";

import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PlanCta } from "./PlanCta";
import styles from "./site.module.css";

type NavItem = { href: string; label: string; active: (path: string) => boolean };

const under = (base: string) => (p: string) => p === base || p.startsWith(`${base}/`);

const PLAN: NavItem = { href: "/plan", label: "Мой план", active: under("/plan") };
const TAIL: NavItem[] = [
  { href: "/grants", label: "Гранты", active: under("/grants") },
  { href: "/deadlines", label: "Сроки", active: under("/deadlines") },
];

/** Guests: public catalog and guides. Subscribers: the full catalog and the applicant guide. */
function navFor(subscribed: boolean): NavItem[] {
  return subscribed
    ? [
        PLAN,
        {
          href: "/dashboard",
          label: "Каталог вузов",
          active: (p) => (p === "/dashboard" || p.startsWith("/dashboard/u") || under("/unis")(p)),
        },
        { href: "/dashboard/guide", label: "Гайд абитуриента", active: under("/dashboard/guide") },
        ...TAIL,
      ]
    : [
        PLAN,
        { href: "/unis", label: "Вузы", active: under("/unis") },
        { href: "/guides", label: "Гайды", active: under("/guides") },
        ...TAIL,
      ];
}

export type HeaderAccount = { name: string; onLogout: () => void; onOpenFilters?: () => void };

/**
 * The one header for the whole site — public pages, the plan and the subscriber dashboard.
 * Auth state is fetched client-side so public pages stay static.
 */
export function SiteHeader({ account }: { account?: HeaderAccount }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(Boolean(account));
  const [username, setUsername] = useState<string | null>(account?.name ?? null);

  useEffect(() => {
    if (account) return;
    let alive = true;
    fetch("/api/auth/status", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { subscribed?: boolean; username?: string | null } | null) => {
        if (!alive || !j) return;
        setSubscribed(Boolean(j.subscribed));
        setUsername(j.username ?? null);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [account]);

  useEffect(() => setOpen(false), [pathname]);

  const handle = username ? (username.startsWith("@") ? username : `@${username}`) : null;

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Studyaza — на главную">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={32} height={32} alt="" />
          <span>Studyaza</span>
        </Link>

        <nav className={`${styles.nav}${open ? ` ${styles.navOpen}` : ""}`} aria-label="Основная навигация">
          {navFor(subscribed).map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.active(pathname) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          {account?.onOpenFilters ? (
            <button type="button" className={styles.headerGhost} onClick={account.onOpenFilters}>
              Фильтры
            </button>
          ) : null}
          {subscribed && handle ? (
            <span className={styles.accountChip} title="Вы вошли через Telegram">
              {handle}
            </span>
          ) : (
            <PlanCta className={styles.headerCta} start="Составить план" open="Открыть план" />
          )}
          {account ? (
            <button type="button" className={styles.headerGhost} onClick={account.onLogout}>
              Выйти
            </button>
          ) : null}
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
