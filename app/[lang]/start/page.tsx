import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { STAGES } from "@/content/guides";
import { BY_GRADE } from "@/content/timeline";
import s from "./start.module.css";

export const metadata: Metadata = {
  title: "С чего начать поступление за границу",
  description:
    "Пошаговый план поступления за рубеж для школьников и родителей: что делать в каждом классе и в каком порядке готовить документы, экзамены, эссе и заявки на гранты.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <SitePage>
      <header className={styles.lead}>
        <h1>С чего начать</h1>
        <p>
          Поступление за границу — это пять шагов. Их можно пройти самостоятельно и бесплатно, если начать
          хотя бы за год до подачи.
        </p>
      </header>

      <ol className={s.path}>
        {STAGES.map((st) => (
          <li key={st.n}>
            <span className={s.dot}>{st.n}</span>
            <div>
              <h2>{st.title}</h2>
              <p>{st.text}</p>
              <Link href={`/guides/${st.guide}`} className={styles.textLink}>
                Читать гайд
              </Link>
            </div>
          </li>
        ))}
      </ol>

      <section className={styles.guideSection}>
        <h2>План по классам</h2>
        <div className={s.grades}>
          {BY_GRADE.map((g) => (
            <article key={g.grade} className={s.grade}>
              <h3>{g.grade}</h3>
              <p className={s.focus}>{g.focus}</p>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guideSection}>
        <h2>Если денег на учёбу нет совсем</h2>
        <p className={styles.prose}>
          Это не приговор. Есть три пути, которые не требуют платить за обучение: полный грант вуза США
          (need-based), государственная стипендия другой страны и бесплатное обучение в Европе. Лучше идти
          по всем трём параллельно.
        </p>
        <p className={styles.inlineLinks}>
          <Link href="/guides/finansovaya-pomoshch">Как получить полный грант</Link>
          <Link href="/grants">Все стипендии</Link>
          <Link href="/guides/besplatnoe-obuchenie">Где учиться бесплатно</Link>
        </p>
      </section>
    </SitePage>
  );
}
