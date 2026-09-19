"use client";

import { useState } from "react";
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
