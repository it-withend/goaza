"use client";

import { useEffect, useState } from "react";
import type { LandingStats } from "@/lib/landing-stats";
import { TelegramGateModal } from "./TelegramGateModal";
import { WorldGlobe } from "./WorldGlobe";
import styles from "./LandingPage.module.css";

function formatStat(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value).replace(/[\u00A0\u202F]/g, " ");
}

function formatUniversityCount(total: number): string {
  return total >= 1000 ? "1000+" : formatStat(total);
}

export function LandingPage({
  stats,
  botUsername,
}: {
  stats: LandingStats;
  botUsername: string;
}) {
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("gate") === "1") setGateOpen(true);
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={40} height={40} alt="Studyaza" className={styles.logo} />
          <strong className={styles.wordmark}>Studyaza</strong>
        </div>
        <div className={styles.headerActions}>
          <a
            className={styles.channelHeader}
            href="https://t.me/studyaza"
            target="_blank"
            rel="noopener noreferrer"
          >
            @studyaza
          </a>
          <button
            type="button"
            className={`${styles.cta} ${styles.ctaGhost}`}
            onClick={() => setGateOpen(true)}
          >
            Подключиться
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Живой атлас возможностей · 2026</span>
          <h1 className={styles.title}>
            Найди вуз, который подходит <em>именно тебе.</em>
          </h1>
          <p className={styles.lede}>
            Стоимость, гранты, шансы поступления и дедлайны — в одной понятной базе по{" "}
            {formatStat(stats.countries)} странам.
          </p>
          <div className={styles.ctaRow}>
            <button
              type="button"
              className={`${styles.cta} ${styles.ctaPrimary} ${styles.mobileCta}`}
              onClick={() => setGateOpen(true)}
            >
              Открыть атлас
            </button>
          </div>
        </div>

        <div className={styles.map} aria-label="Интерактивный глобус университетов">
          <WorldGlobe byCountry={stats.byCountry} />
        </div>
      </section>

      <section className={styles.stats} aria-label="Размер базы">
        <article className={`${styles.stat} ${styles.statA}`}>
          <span className={styles.statIcon} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <small>Университетов</small>
            <strong>{formatUniversityCount(stats.total)}</strong>
          </div>
        </article>
        <article className={`${styles.stat} ${styles.statB}`}>
          <span className={styles.statIcon} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <small>Стран</small>
            <strong>{formatStat(stats.countries)}</strong>
          </div>
        </article>
        <article className={`${styles.stat} ${styles.statC}`}>
          <span className={styles.statIcon} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5.1L12 14.8 7.5 16.8l.9-5.1L4.8 8.2l5-.7L12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <small>Полных грантов</small>
            <strong>{formatStat(stats.grants)}</strong>
          </div>
        </article>
      </section>

      <TelegramGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        botUsername={botUsername}
      />
    </main>
  );
}
