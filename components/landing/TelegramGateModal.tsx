"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { localizePath } from "@/lib/i18n";
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
  const lang = useLang();
  const tr = useTr();
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
        <button className={styles.close} type="button" aria-label={tr("Закрыть", "Yopish")} onClick={onClose}>
          ×
        </button>
        <h2 id="telegram-title">{tr("Открой атлас", "Atlasni oching")}</h2>
        <ol className={styles.steps}>
          <li>
            {tr("Подпишись на Telegram-канал", "Telegram-kanalga obuna bo'ling")} <strong>@studyaza</strong>
          </li>
          <li>
            {tr("Войди через кнопку Telegram ниже (домен ", "Quyidagi Telegram tugmasi orqali kiring (domen ")}<strong>goaza.xyz</strong>)
          </li>
        </ol>
        <a
          className={styles.channelLink}
          href="https://t.me/studyaza"
          target="_blank"
          rel="noopener noreferrer"
        >
          {tr("Открыть канал @studyaza", "@studyaza kanalini ochish")}
        </a>
        <TelegramLogin
          botUsername={botUsername || "goazabot"}
          onSubscribed={() => {
            router.replace(localizePath(lang, "/dashboard"));
            router.refresh();
          }}
        />
      </section>
    </div>
  );
}
