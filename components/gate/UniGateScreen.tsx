"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TelegramGateModal } from "@/components/landing/TelegramGateModal";
import styles from "./gate.module.css";

export function UniGateScreen({
  title,
  place,
  botUsername,
}: {
  title: string;
  place?: string;
  botUsername: string;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={36} height={36} alt="Studyaza" />
          <strong>Studyaza</strong>
        </Link>
      </header>

      <section className={styles.card}>
        <p className={styles.eyebrow}>Каталог только для подписчиков @studyaza</p>
        <h1>{title}</h1>
        {place ? <p className={styles.place}>{place}</p> : null}
        <p className={styles.copy}>
          Полный профиль вуза — стоимость, гранты, дедлайны и сравнение с другими университетами —
          открывается после подписки на канал и входа через Telegram.
        </p>
        <button type="button" className={styles.cta} onClick={() => setOpen(true)}>
          Подписаться и открыть
        </button>
        <Link href="/" className={styles.back}>
          На главную
        </Link>
      </section>

      <TelegramGateModal open={open} onClose={() => setOpen(false)} botUsername={botUsername} />
    </main>
  );
}
