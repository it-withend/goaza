"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { getGrants } from "@/content/grants";
import { getGuides } from "@/content/guides";
import { localizePath } from "@/lib/i18n";
import styles from "./site.module.css";

type QuickItem = {
  id: string;
  group: string;
  title: string;
  sub: string;
  href: string;
};

export function CommandSearch({ subscribed }: { subscribed: boolean }) {
  const lang = useLang();
  const tr = useTr();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQ("");
      if (wasOpen.current) {
        wasOpen.current = false;
        triggerRef.current?.focus();
      }
    }
  }, [open]);

  const items = useMemo<QuickItem[]>(() => {
    const navGroup = tr("Разделы", "Bo'limlar");
    const grantGroup = tr("Гранты", "Grantlar");
    const guideGroup = tr("Гайды", "Qo'llanmalar");

    const core: QuickItem[] = [
      { id: "n-plan", group: navGroup, title: tr("Мой план поступления", "Mening kirish rejam"), sub: tr("Корзины, шансы, задачи", "Savatlar, imkoniyatlar, vazifalar"), href: "/plan" },
      { id: "n-start", group: navGroup, title: tr("Подобрать вузы за 2 минуты", "2 daqiqada OTM tanlash"), sub: tr("6 вопросов под ваш бюджет", "Byudjetingizga mos 6 ta savol"), href: "/plan/start" },
      { id: "n-cat", group: navGroup, title: subscribed ? tr("Каталог вузов (фильтры)", "OTMlar katalogi (filtrlar)") : tr("Каталог вузов по странам", "Davlatlar bo'yicha OTM katalogi"), sub: tr("1 058+ университетов по миру", "Dunyo bo'ylab 1 058+ universitet"), href: subscribed ? "/dashboard" : "/unis" },
      { id: "n-deadlines", group: navGroup, title: tr("Календарь дедлайнов 2027/28", "2027/28 dedlaynlar taqvimi"), sub: tr("Ранняя и основная подача", "Erta va asosiy topshirish"), href: "/deadlines" },
      { id: "n-grants", group: navGroup, title: tr("Все государственные гранты", "Barcha davlat grantlari"), sub: tr("Полное покрытие обучения и жилья", "O'qish va yashashni to'liq qoplash"), href: "/grants" },
    ];

    const grants = getGrants(lang).map((g) => ({
      id: `gr-${g.slug}`,
      group: grantGroup,
      title: g.name,
      sub: g.country,
      href: `/grants#${g.slug}`,
    }));

    const guides = getGuides(lang).map((g) => ({
      id: `gd-${g.slug}`,
      group: guideGroup,
      title: g.title,
      sub: tr(`${g.minutes} мин чтения`, `${g.minutes} daq o'qish`),
      href: `/guides/${g.slug}`,
    }));

    return [...core, ...grants, ...guides];
  }, [lang, subscribed, tr]);

  const trimmed = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!trimmed) return items.slice(0, 9);
    return items
      .filter((it) => it.title.toLowerCase().includes(trimmed) || it.sub.toLowerCase().includes(trimmed) || it.group.toLowerCase().includes(trimmed))
      .slice(0, 14);
  }, [items, trimmed]);

  useEffect(() => {
    setActiveIdx(0);
  }, [trimmed]);

  function onDialogKeyDown(e: React.KeyboardEvent) {
    const total = filtered.length + (trimmed && subscribed ? 1 : 0);
    if (!total) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + total) % total);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const activeLink = linkRefs.current[activeIdx];
    if (activeLink) {
      setOpen(false);
      activeLink.click();
      return;
    }
    setOpen(false);
    if (trimmed && subscribed) {
      window.location.assign(localizePath(lang, `/dashboard?q=${encodeURIComponent(q.trim())}`));
      return;
    }
    if (filtered[0]) {
      window.location.assign(localizePath(lang, filtered[0].href));
      return;
    }
    if (trimmed) {
      window.location.assign(localizePath(lang, "/unis"));
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.cmdBtn}
        onClick={() => setOpen(true)}
        aria-label={tr("Быстрый поиск", "Tezkor qidiruv")}
        title={tr("Поиск по сайту (Ctrl+K)", "Sayt bo'ylab qidiruv (Ctrl+K)")}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <kbd>⌘K</kbd>
      </button>

      {open ? (
        <div className={styles.cmdBackdrop} role="presentation" onMouseDown={() => setOpen(false)}>
          <div
            className={styles.cmdDialog}
            role="dialog"
            aria-modal="true"
            aria-label={tr("Быстрый поиск", "Tezkor qidiruv")}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onDialogKeyDown}
          >
            <form onSubmit={onSubmit} className={styles.cmdForm}>
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={tr("Найти раздел, грант, гайд или вуз…", "Bo'lim, grant, qo'llanma yoki OTM topish…")}
                aria-activedescendant={
                  activeIdx < filtered.length + (trimmed && subscribed ? 1 : 0) ? `cmd-opt-${activeIdx}` : undefined
                }
              />
              <button type="button" className={styles.cmdEsc} onClick={() => setOpen(false)}>
                ESC
              </button>
            </form>
            <ul className={styles.cmdList}>
              {trimmed && subscribed ? (
                <li>
                  <Link
                    id="cmd-opt-0"
                    ref={(el) => {
                      linkRefs.current[0] = el;
                    }}
                    href={`/dashboard?q=${encodeURIComponent(q.trim())}`}
                    className={`${styles.cmdItem}${activeIdx === 0 ? ` ${styles.cmdItemActive}` : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>
                      <strong>{tr(`Искать «${q.trim()}» в каталоге`, `Katalogda «${q.trim()}» qidirish`)}</strong>
                      <small>{tr("Фильтровать все вузы", "Barcha OTMlarni filtrlash")}</small>
                    </span>
                    <em>→</em>
                  </Link>
                </li>
              ) : null}
              {filtered.map((it, idx) => {
                const slot = idx + (trimmed && subscribed ? 1 : 0);
                return (
                  <li key={it.id}>
                    <Link
                      id={`cmd-opt-${slot}`}
                      ref={(el) => {
                        linkRefs.current[slot] = el;
                      }}
                      href={it.href}
                      className={`${styles.cmdItem}${activeIdx === slot ? ` ${styles.cmdItemActive}` : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      <span>
                        <b>{it.group}</b>
                        <strong>{it.title}</strong>
                        <small>{it.sub}</small>
                      </span>
                      <em>→</em>
                    </Link>
                  </li>
                );
              })}
              {!filtered.length && !subscribed ? (
                <li className={styles.cmdEmpty}>
                  {tr("Ничего не найдено. Откройте ", "Hech narsa topilmadi. Ochish: ")}
                  <Link href="/unis" onClick={() => setOpen(false)}>
                    {tr("каталог вузов", "OTMlar katalogi")}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
