"use client";

import Link from "@/components/i18n/Link";
import { useTr } from "@/components/i18n/LangProvider";
import { TELEGRAM_CHANNEL_URL, TelegramIcon } from "./TelegramIcon";
import styles from "./site.module.css";

export function SiteFooter() {
  const tr = useTr();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <strong>Studyaza</strong>
          <p>
            {tr(
              "Бесплатный справочник для тех, кто поступает за границу без агентств и консультантов.",
              "Agentlik va maslahatchilarsiz chet elga o'qishga kiruvchilar uchun bepul qo'llanma.",
            )}
          </p>
        </div>
        <nav aria-label={tr("Разделы", "Bo'limlar")}>
          <Link href="/start">{tr("С чего начать", "Nimadan boshlash")}</Link>
          <Link href="/unis">{tr("Вузы", "Universitetlar")}</Link>
          <Link href="/grants">{tr("Гранты", "Grantlar")}</Link>
          <Link href="/guides">{tr("Гайды", "Qo'llanmalar")}</Link>
          <Link href="/deadlines">{tr("Сроки", "Muddatlar")}</Link>
        </nav>
        <p className={styles.footerNote}>
          {tr(
            "Цифры собраны из официальных источников и обновляются раз в год. Перед подачей проверяйте условия на сайте вуза или программы. Новости и разборы — в",
            "Raqamlar rasmiy manbalardan olingan va yiliga bir marta yangilanadi. Ariza topshirishdan oldin shartlarni universitet yoki dastur saytida tekshiring. Yangiliklar va tahlillar —",
          )}{" "}
          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerTgLink}
            aria-label={tr("Открыть Telegram-канал", "Telegram kanalini ochish")}
          >
            <TelegramIcon size={16} />
            <span>Telegram</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
