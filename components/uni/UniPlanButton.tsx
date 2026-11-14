"use client";

import { useTr } from "@/components/i18n/LangProvider";
import { Icon } from "@/components/ui/Icon";
import { useApplicant } from "@/lib/use-applicant";
import styles from "./university.module.css";

/** Toggles whether the current university is saved in the applicant's plan list. */
export function UniPlanButton({ slug, name }: { slug: string; name: string }) {
  const tr = useTr();
  const { list, toggle } = useApplicant();
  const saved = list.includes(slug);

  return (
    <button
      type="button"
      className={`${styles.heroPlanBtn}${saved ? ` ${styles.heroPlanBtnActive}` : ""}`}
      aria-pressed={saved}
      aria-label={
        saved
          ? tr(`Убрать ${name} из моего плана`, `${name} ni rejamdan olib tashlash`)
          : tr(`Добавить ${name} в мой план`, `${name} ni rejamga qo'shish`)
      }
      onClick={() => toggle(slug)}
    >
      <Icon name={saved ? "bookmark-check" : "bookmark"} size={15} />
      <span>{saved ? tr("В моём плане", "Rejamda") : tr("В мой план", "Rejamga qo'shish")}</span>
    </button>
  );
}
