"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { Icon, type IconName } from "@/components/ui/Icon";
import { localizePath, splitLang, type Tr } from "@/lib/i18n";
import { CommandSearch } from "./CommandSearch";
import { PlanCta } from "./PlanCta";
import { TELEGRAM_CHANNEL_URL, TelegramIcon } from "./TelegramIcon";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./site.module.css";

type NavItem = { href: string; label: string; icon: IconName; active: (path: string) => boolean };

const under = (base: string) => (p: string) => p === base || p.startsWith(`${base}/`);

/** Guests: public catalog and guides. Subscribers: the full catalog and the applicant guide. */
function navFor(subscribed: boolean, tr: Tr): NavItem[] {
  const plan: NavItem = { href: "/plan", label: tr("Мой план", "Mening rejam"), icon: "compass", active: under("/plan") };
  const tail: NavItem[] = [
    { href: "/grants", label: tr("Гранты", "Grantlar"), icon: "award", active: under("/grants") },
    { href: "/deadlines", label: tr("Сроки", "Muddatlar"), icon: "calendar", active: under("/deadlines") },
  ];
  return subscribed
    ? [
        plan,
        {
          href: "/dashboard",
          label: tr("Каталог вузов", "Universitetlar katalogi"),
          icon: "graduation-cap",
          active: (p) => p === "/dashboard" || p.startsWith("/dashboard/u") || under("/unis")(p),
        },
        { href: "/dashboard/guide", label: tr("Гайд абитуриента", "Abituriyent qo'llanmasi"), icon: "book-open", active: under("/dashboard/guide") },
        ...tail,
      ]
    : [
        plan,
        { href: "/unis", label: tr("Вузы", "Universitetlar"), icon: "graduation-cap", active: under("/unis") },
        { href: "/guides", label: tr("Гайды", "Qo'llanmalar"), icon: "book-open", active: under("/guides") },
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

  const cleanName = username?.trim() || null;
  const handle = cleanName
    ? cleanName.startsWith("@") || /\s/.test(cleanName)
      ? cleanName
      : `@${cleanName}`
    : null;
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
          <span className={styles.logoMark}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" width={26} height={26} alt="" />
          </span>
          <span className={styles.brandName}>Studyaza</span>
        </Link>

        <nav className={`${styles.nav}${open ? ` ${styles.navOpen}` : ""}`} aria-label={tr("Основная навигация", "Asosiy navigatsiya")}>
          {navFor(subscribed, tr).map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.active(path) ? "page" : undefined} className={styles.navItem}>
              <Icon name={item.icon} size={15} className={styles.navIcon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <CommandSearch subscribed={subscribed} />
          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tgBtn}
            aria-label={tr("Telegram-канал", "Telegram kanali")}
            title={tr("Telegram-канал", "Telegram kanali")}
          >
            <TelegramIcon size={18} />
          </a>
          <NextLink
            href={localizePath(other, path)}
            className={styles.langSwitch}
            hrefLang={other}
            lang={other}
            aria-label={other === "uz" ? "O'zbek tiliga o'tish" : "Перейти на русский"}
          >
            <Icon name="globe" size={13} />
            <span>{other === "uz" ? "UZ" : "RU"}</span>
          </NextLink>
          <ThemeToggle />
          {account?.onOpenFilters ? (
            <button type="button" className={`${styles.headerGhost} ${styles.filterTrigger}`} onClick={account.onOpenFilters}>
              <Icon name="sliders" size={14} />
              <span>{tr("Фильтры", "Filtrlar")}</span>
            </button>
          ) : null}
          {subscribed && handle ? (
            <span className={styles.accountChip} title={tr("Вы вошли через Telegram", "Telegram orqali kirdingiz")}>
              <Icon name="user" size={13} />
              <span>{handle}</span>
            </span>
          ) : (
            <PlanCta
              className={styles.headerCta}
              start={tr("Составить план", "Reja tuzish")}
              open={tr("Открыть план", "Rejani ochish")}
            />
          )}
          {subscribed ? (
            <button type="button" className={`${styles.headerGhost} ${styles.logoutBtn}`} onClick={handleLogout}>
              <Icon name="log-out" size={14} />
              <span className={styles.logoutText}>{tr("Выйти", "Chiqish")}</span>
            </button>
          ) : null}
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-label={open ? tr("Закрыть меню", "Menyuni yopish") : tr("Открыть меню", "Menyuni ochish")}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
