"use client";

import { useEffect, useState } from "react";
import { useTr } from "@/components/i18n/LangProvider";
import styles from "./site.module.css";

const KEY = "sz_theme";

export function ThemeToggle() {
  const tr = useTr();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const cur = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(cur);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* ignore storage blocks */
    }
  }

  return (
    <button
      type="button"
      className={styles.iconBtn}
      onClick={toggle}
      aria-pressed={theme === "light"}
      aria-label={
        theme === "dark"
          ? tr("Включить светлую тему", "Yorug' mavzuni yoqish")
          : tr("Включить тёмную тему", "Qorong'u mavzuni yoqish")
      }
      title={
        theme === "dark"
          ? tr("Светлая тема", "Yorug' mavzu")
          : tr("Тёмная тема", "Qorong'u mavzu")
      }
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}
