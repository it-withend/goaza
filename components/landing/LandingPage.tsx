"use client";

import { useState } from "react";
import type { LandingStats } from "@/lib/landing-stats";
import { TelegramGateModal } from "./TelegramGateModal";
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

  return (
    <main className={styles.page}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={40} height={40} alt="" className={styles.logo} />
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
            Стоимость, гранты, шансы поступления и дедлайны — в одной понятной базе.
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

        <div className={styles.map} aria-label="Карта университетов">
          <div className={styles.mapGrid} aria-hidden="true" />
          <svg className={styles.mapSvg} viewBox="0 0 700 520" aria-hidden="true">
            <path className={styles.route} d="M65 390 Q250 70 620 250" />
            <path className={`${styles.route} ${styles.routeAlt}`} d="M110 155 Q330 360 605 105" />
            <circle className={styles.marker} cx="65" cy="390" r="6" />
            <circle className={`${styles.marker} ${styles.markerPulse}`} cx="620" cy="250" r="6" />
            <circle className={styles.marker} cx="110" cy="155" r="5" />
            <circle className={`${styles.marker} ${styles.markerAccent}`} cx="605" cy="105" r="6" />
          </svg>
          <span className={`${styles.mapLabel} ${styles.floatingUniversity} ${styles.labelA}`}>
            Harvard University · полный грант
          </span>
          <span className={`${styles.mapLabel} ${styles.floatingUniversity} ${styles.labelB}`}>
            KAIST · full coverage
          </span>
          <span className={`${styles.mapLabel} ${styles.floatingUniversity} ${styles.labelC}`}>
            ANU · 20 программ
          </span>
        </div>
      </section>

      <section className={styles.stats} aria-label="Размер базы">
        <div className={styles.stat}>
          <small>Университетов</small>
          <strong>{formatUniversityCount(stats.total)}</strong>
        </div>
        <div className={styles.stat}>
          <small>Стран</small>
          <strong>{formatStat(stats.countries)}</strong>
        </div>
        <div className={styles.stat}>
          <small>Полных грантов</small>
          <strong>{formatStat(stats.grants)}</strong>
        </div>
      </section>

      <TelegramGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        botUsername={botUsername}
      />
    </main>
  );
}
