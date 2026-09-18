"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TelegramLogin } from "@/components/TelegramLogin";
import styles from "./LandingPage.module.css";

export function TelegramGateModal({
  open,
  onClose,
  botUsername,
}: {
  open: boolean;
  onClose: () => void;
  botUsername: string;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="telegram-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className={styles.close} type="button" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>
        <h2 id="telegram-title">Открой атлас</h2>
        <p>
          1) Подпишись на канал @studyaza. 2) Войди через Telegram. Без
          подписки вход не откроется. Открывай сайт только на{" "}
          <strong>goaza.xyz</strong>.
        </p>
        <a
          className={styles.channelLink}
          href="https://t.me/studyaza"
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть канал @studyaza
        </a>
        <TelegramLogin
          botUsername={botUsername || "goazabot"}
          onSubscribed={() => {
            router.replace("/dashboard");
            router.refresh();
          }}
        />
      </section>
    </div>
  );
}
