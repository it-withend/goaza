import Link from "@/components/i18n/Link";
import styles from "./site.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <strong>Studyaza</strong>
          <p>Бесплатный справочник для тех, кто поступает за границу без агентств и консультантов.</p>
        </div>
        <nav aria-label="Разделы">
          <Link href="/start">С чего начать</Link>
          <Link href="/unis">Вузы</Link>
          <Link href="/grants">Гранты</Link>
          <Link href="/guides">Гайды</Link>
          <Link href="/deadlines">Сроки</Link>
        </nav>
        <p className={styles.footerNote}>
          Цифры собраны из официальных источников и обновляются раз в год. Перед подачей проверяйте
          условия на сайте вуза или программы. Новости и разборы — в канале{" "}
          <a href="https://t.me/studyaza" target="_blank" rel="noopener noreferrer">
            @studyaza
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
