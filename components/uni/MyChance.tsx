"use client";

import Link from "@/components/i18n/Link";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { useEffect, useState } from "react";
import type { Match } from "@/lib/matcher";
import { useApplicant } from "@/lib/use-applicant";
import s from "./my-chance.module.css";

type Result = Match | { slug: string; name: string; excluded: string };

/** Personal chance for one university, from the profile saved in the browser. */
export function MyChance({ slug, name }: { slug: string; name: string }) {
  const lang = useLang();
  const tr = useTr();
  const { ready, profile, has, toggle } = useApplicant();
  const [res, setRes] = useState<Result | null>(null);

  const basketLabel = {
    dream: tr("мечта", "orzu"),
    target: tr("реальный вариант", "haqiqiy variant"),
    safety: tr("запасной вариант", "zaxira variant"),
  } as const;

  useEffect(() => {
    if (!ready || !profile) return;
    let alive = true;
    fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, slugs: [slug], lang }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { matches: Result[] } | null) => alive && setRes(j?.matches?.[0] ?? null))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [ready, profile, slug, lang]);

  if (!ready) return <div className={s.box} aria-busy="true" />;

  const inPlan = has(slug);
  const button = (
    <button type="button" className={inPlan ? s.inPlan : s.add} onClick={() => toggle(slug)}>
      {inPlan ? tr("В моём плане — убрать", "Rejamda — olib tashlash") : tr("Добавить в мой план", "Rejamga qo'shish")}
    </button>
  );

  if (!profile) {
    return (
      <div className={s.box}>
        <small>{tr("Ваш шанс", "Sizning imkoniyatingiz")}</small>
        <p>
          {tr(
            `Ответьте на 6 вопросов — и увидите свой шанс поступить в ${name} с учётом бюджета семьи.`,
            `6 ta savolga javob bering — oilangiz byudjetini hisobga olgan holda ${name} ga kirish imkoniyatingizni ko'rasiz.`,
          )}
        </p>
        <Link href="/plan/start" className={s.link}>
          {tr("Заполнить профиль", "Profilni to'ldirish")}
        </Link>
        {button}
      </div>
    );
  }

  if (res && "excluded" in res) {
    return (
      <div className={s.box}>
        <small>{tr("Ваш шанс", "Sizning imkoniyatingiz")}</small>
        <strong className={s.no}>{tr("Не подходит", "Mos kelmaydi")}</strong>
        <p>{res.excluded}</p>
        {button}
      </div>
    );
  }

  return (
    <div className={s.box}>
      <small>{tr("Ваш шанс", "Sizning imkoniyatingiz")}</small>
      {res ? (
        <>
          <strong className={s[res.basket]}>≈ {res.chance}%</strong>
          <p>
            {tr("Для вас это", "Siz uchun bu")} {basketLabel[res.basket]}.{res.reasons.length ? ` ${res.reasons.join(". ")}.` : ""}
          </p>
        </>
      ) : (
        <strong>…</strong>
      )}
      {button}
      <Link href="/plan" className={s.link}>
        {tr("Открыть мой план", "Rejamni ochish")}
      </Link>
    </div>
  );
}
