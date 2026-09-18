# Shared UI Components

## `components/TelegramLogin.tsx` — TelegramLogin
Loads the Telegram Login Widget and reports a verified subscription.

```tsx
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
```

## `components/UniversityCard.tsx` — UniversityCard
Dense university record card with financial aid and admissions facts.

```tsx
import type { University } from "@/lib/types";
import { INST_LABEL, countryRu } from "@/lib/types";

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  if (children == null || children === "") return null;
  return (
    <div className="fact">
      <span className="fact-l">{label}</span>
      <span className="fact-v">{children}</span>
    </div>
  );
}

export function UniversityCard({ u }: { u: University }) {
  const ru = countryRu(u.country);
  const intlEnroll = [u.intl_undergrad_pct, u.intl_undergrad_count ? `${u.intl_undergrad_count} чел.` : ""]
    .filter(Boolean)
    .join(" / ");

  return (
    <article className="uni-card">
      <header className="uni-head">
        <div>
          <h3 className="uni-name">{u.name}</h3>
          <p className="uni-meta">
            <span className="tag">{ru}</span>
            {u.city ? <><span className="dot">·</span><span>{u.city}</span></> : null}
          </p>
          <div className="tags">
            {u.full_grant ? <span className="tag tag-grant">Полный грант</span> : null}
            {u.intl_aid_policy ? <span className="tag">{u.intl_aid_policy}</span> : null}
            {(u.inst_tags || []).slice(0, 3).map((t) => (
              <span className="tag" key={t}>{INST_LABEL[t] || t}</span>
            ))}
          </div>
        </div>
        <div className="uni-quick">
          <div className="q"><span>Стоимость</span><strong>{u.tuition_display || "—"}</strong></div>
          <div className="q"><span>Поступление</span><strong>{u.acceptance_rate || "—"}</strong></div>
        </div>
      </header>
      <div className="facts">
        <Fact label="Город">{u.city}</Fact>
        <Fact label="Стоимость обучения">{u.tuition_display}</Fact>
        <Fact label="Процент поступления">{u.acceptance_rate}</Fact>
        <Fact label="Полный грант">
          <span className={u.full_grant ? "pill pill-yes" : "pill pill-no"}>
            {u.full_grant ? "Да, полный грант доступен" : "Нет данных о полном гранте"}
          </span>
        </Fact>
        <Fact label="Макс. фин. помощь">{u.aid_max}</Fact>
        <Fact label="Ранний дедлайн">{u.early_deadline}</Fact>
        <Fact label="Основной дедлайн">{u.regular_deadline}</Fact>
        <Fact label="Языковые требования">{u.lang}</Fact>
      </div>
      <details className="more">
        <summary>Подробнее: помощь, enrollment, экзамены</summary>
        <div className="facts">
          <Fact label="Средняя помощь">{u.avg_aid_award}</Fact>
          <Fact label="SAT / ACT">{u.sat}</Fact>
          <Fact label="Эссе">{u.essay}</Fact>
          <Fact label="Направления">{u.majors}</Fact>
        </div>
      </details>
    </article>
  );
}
```

## `components/ToTop.tsx` — ToTop
Floating scroll-to-top control.

```tsx
"use client";

import { useEffect, useState } from "react";

export function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      className={`to-top${show ? " show" : ""}`}
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
```
