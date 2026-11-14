"use client";

import Link from "@/components/i18n/Link";
import { useEffect, useState } from "react";
import type { Match } from "@/lib/matcher";
import { useApplicant } from "@/lib/use-applicant";
import s from "./my-chance.module.css";

type Result = Match | { slug: string; name: string; excluded: string };

const BASKET_RU = { dream: "мечта", target: "реальный вариант", safety: "запасной вариант" } as const;

/** Personal chance for one university, from the profile saved in the browser. */
export function MyChance({ slug, name }: { slug: string; name: string }) {
  const { ready, profile, has, toggle } = useApplicant();
  const [res, setRes] = useState<Result | null>(null);

  useEffect(() => {
    if (!ready || !profile) return;
    let alive = true;
    fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, slugs: [slug] }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { matches: Result[] } | null) => alive && setRes(j?.matches?.[0] ?? null))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [ready, profile, slug]);

  if (!ready) return <div className={s.box} aria-busy="true" />;

  const inPlan = has(slug);
  const button = (
    <button type="button" className={inPlan ? s.inPlan : s.add} onClick={() => toggle(slug)}>
      {inPlan ? "В моём плане — убрать" : "Добавить в мой план"}
    </button>
  );

  if (!profile) {
    return (
      <div className={s.box}>
        <small>Ваш шанс</small>
        <p>Ответьте на 6 вопросов — и увидите свой шанс поступить в {name} с учётом бюджета семьи.</p>
        <Link href="/plan/start" className={s.link}>
          Заполнить профиль
        </Link>
        {button}
      </div>
    );
  }

  if (res && "excluded" in res) {
    return (
      <div className={s.box}>
        <small>Ваш шанс</small>
        <strong className={s.no}>Не подходит</strong>
        <p>{res.excluded}</p>
        {button}
      </div>
    );
  }

  return (
    <div className={s.box}>
      <small>Ваш шанс</small>
      {res ? (
        <>
          <strong className={s[res.basket]}>≈ {res.chance}%</strong>
          <p>
            Для вас это {BASKET_RU[res.basket]}.{res.reasons.length ? ` ${res.reasons.join(". ")}.` : ""}
          </p>
        </>
      ) : (
        <strong>…</strong>
      )}
      {button}
      <Link href="/plan" className={s.link}>
        Открыть мой план
      </Link>
    </div>
  );
}
