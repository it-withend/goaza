"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    onTelegramAuth?: (user: Record<string, string | number>) => void;
  }
}

type Props = {
  botUsername: string;
  onSubscribed: (username: string | null) => void;
};

export function TelegramLogin({ botUsername, onSubscribed }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!botUsername) return;
    window.onTelegramAuth = async (user) => {
      setBusy(true);
      setError(null);
      try {
        const payload: Record<string, string> = {};
        for (const [k, v] of Object.entries(user)) payload[k] = String(v);
        const res = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.message || json.error || "Не удалось войти");
          return;
        }
        onSubscribed(json.username || null);
      } catch {
        setError("Ошибка сети");
      } finally {
        setBusy(false);
      }
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername.replace(/^@/, ""));
    script.setAttribute("data-size", "medium");
    script.setAttribute("data-radius", "10");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    const node = ref.current;
    if (node) {
      node.innerHTML = "";
      node.appendChild(script);
    }
    return () => {
      delete window.onTelegramAuth;
    };
  }, [botUsername, onSubscribed]);

  if (!botUsername) {
    return (
      <span className="auth-err">
        Бот не настроен (NEXT_PUBLIC_TELEGRAM_BOT_USERNAME)
      </span>
    );
  }

  return (
    <div className="auth-slot">
      <div ref={ref} style={{ minHeight: 28, opacity: busy ? 0.5 : 1 }} />
      {error ? <span className="auth-err">{error}</span> : null}
    </div>
  );
}
