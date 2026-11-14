"use client";

import { useCallback, useState } from "react";
import { useTr } from "@/components/i18n/LangProvider";
import { TelegramGateModal } from "@/components/landing/TelegramGateModal";
import styles from "./gate.module.css";

/** CTA that opens the Telegram gate on demand (never automatically). */
export function GateCta({
  botUsername,
  label,
  variant = "primary",
}: {
  botUsername: string;
  label?: string;
  variant?: "primary" | "inline";
}) {
  const tr = useTr();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const text = label ?? tr("Подписаться и открыть", "Obuna bo'lish va ochish");

  return (
    <>
      <button
        type="button"
        className={variant === "primary" ? styles.cta : styles.ctaInline}
        onClick={() => setOpen(true)}
      >
        {text}
      </button>
      <TelegramGateModal open={open} onClose={close} botUsername={botUsername} />
    </>
  );
}
