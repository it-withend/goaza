"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { localizePath, splitLang, type Tr } from "@/lib/i18n";
import { PlanCta } from "./PlanCta";
import styles from "./site.module.css";

type NavItem = { href: string; label: string; active: (path: string) => boolean };

const under = (base: string) => (p: string) => p === base || p.startsWith(`${base}/`);

/** Guests: public catalog and guides. Subscribers: the full catalog and the applicant guide. */
function navFor(subscribed: boolean, tr: Tr): NavItem[] {
  const plan: NavItem = { href: "/plan", label: tr("Мой план", "Mening rejam"), active: under("/plan") };
  const tail: NavItem[] = [
    { href: "/grants", label: tr("Гранты", "Grantlar"), active: under("/grants") },
    { href: "/deadlines", label: tr("Сроки", "Muddatlar"), active: under("/deadlines") },
  ];
  return subscribed
    ? [
        plan,
        {
          href: "/dashboard",
          label: tr("Каталог вузов", "Universitetlar katalogi"),
          active: (p) => p === "/dashboard" || p.startsWith("/dashboard/u") || under("/unis")(p),
        },
        { href: "/dashboard/guide", label: tr("Гайд абитуриента", "Abituriyent qo'llanmasi"), active: under("/dashboard/guide") },
        ...tail,
      ]
    : [
        plan,
        { href: "/unis", label: tr("Вузы", "Universitetlar"), active: under("/unis") },
        { href: "/guides", label: tr("Гайды", "Qo'llanmalar"), active: under("/guides") },
        ...tail,
      ];
}

export type HeaderAccount = { name: string; onLogout: () => void; onOpenFilters?: () => void };

/**
 * The one header for the whole site — public pages, the plan and the subscriber dashboard.
 * Auth state is fetched client-side so public pages stay static.
 */
export function SiteHeader({ account }: { account?: HeaderAccount }) {
  const lang = useLang();
  const tr = useTr();
  const { path } = splitLang(usePathname() || "/");
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

  useEffect(() => setOpen(false), [path]);

  const handle = username ? (username.startsWith("@") ? username : `@${username}`) : null;
  const other = lang === "uz" ? "ru" : "uz";

  async function handleLogout() {
    if (account?.onLogout) {
      account.onLogout();
      return;
    }
    await fetch("/api/auth/telegram", { method: "DELETE" });
    setSubscribed(false);
    setUsername(null);
    window.location.reload();
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label={tr("Studyaza — на главную", "Studyaza — bosh sahifa")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={32} height={32} alt="" />
          <span>Studyaza</span>
        </Link>

        <nav className={`${styles.nav}${open ? ` ${styles.navOpen}` : ""}`} aria-label={tr("Основная навигация", "Asosiy navigatsiya")}>
          {navFor(subscribed, tr).map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.active(path) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <NextLink
            href={localizePath(other, path)}
            className={styles.langSwitch}
            hrefLang={other}
            lang={other}
            aria-label={other === "uz" ? "O'zbek tiliga o'tish" : "Перейти на русский"}
          >
            {other === "uz" ? "UZ" : "RU"}
          </NextLink>
          {account?.onOpenFilters ? (
            <button type="button" className={styles.headerGhost} onClick={account.onOpenFilters}>
              {tr("Фильтры", "Filtrlar")}
            </button>
          ) : null}
          {subscribed && handle ? (
            <span className={styles.accountChip} title={tr("Вы вошли через Telegram", "Telegram orqali kirdingiz")}>
              {handle}
            </span>
          ) : (
            <PlanCta
              className={styles.headerCta}
              start={tr("Составить план", "Reja tuzish")}
              open={tr("Открыть план", "Rejani ochish")}
            />
          )}
          {subscribed ? (
            <button type="button" className={styles.headerGhost} onClick={handleLogout}>
              {tr("Выйти", "Chiqish")}
            </button>
          ) : null}
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-label={open ? tr("Закрыть меню", "Menyuni yopish") : tr("Открыть меню", "Menyuni ochish")}
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
