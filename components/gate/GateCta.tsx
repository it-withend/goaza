"use client";

import { useCallback, useState } from "react";
import { TelegramGateModal } from "@/components/landing/TelegramGateModal";
import styles from "./gate.module.css";

/** CTA that opens the Telegram gate on demand (never automatically). */
export function GateCta({
  botUsername,
  label = "Подписаться и открыть",
  variant = "primary",
}: {
  botUsername: string;
  label?: string;
  variant?: "primary" | "inline";
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        className={variant === "primary" ? styles.cta : styles.ctaInline}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      <TelegramGateModal open={open} onClose={close} botUsername={botUsername} />
    </>
  );
}
