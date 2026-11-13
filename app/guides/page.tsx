import type { Metadata } from "next";
import Link from "next/link";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { GUIDES, STAGES } from "@/content/guides";

export const metadata: Metadata = {
  title: "Гайды по поступлению за границу",
  description:
    "Пошаговые гайды: как составить список вузов, какие документы и экзамены нужны, как получить полный грант, написать эссе и подать заявки.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const byStage = STAGES.map((s) => ({ ...s, guides: GUIDES.filter((g) => g.stage === s.n) }));
  const reference = GUIDES.filter((g) => g.stage === 0);

  return (
    <SitePage>
      <header className={styles.lead}>
        <h1>Гайды по поступлению</h1>
        <p>Расставлены в том порядке, в котором вы будете с этим сталкиваться. Каждый гайд — на 5–10 минут.</p>
        <p className={styles.inlineLinks} style={{ marginTop: 14 }}>
          <Link href="/dashboard/guide">Интерактивный гайд для подписчиков: калькулятор стратегии и чек-лист эссе</Link>
        </p>
      </header>

      {byStage.map((stage) => (
        <section key={stage.n}>
          <h2 className={styles.groupTitle}>
            Шаг {stage.n}. {stage.title}
          </h2>
          <ul className={styles.rows}>
            {stage.guides.map((g, i) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className={styles.rowLink}>
                  <span className={styles.rowNum}>
                    {stage.n}.{i + 1}
                  </span>
                  <span>
                    <h3>{g.title}</h3>
                    <p>{g.summary}</p>
                  </span>
                  <span className={styles.rowMeta}>{g.minutes} мин</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {reference.length ? (
        <section>
          <h2 className={styles.groupTitle}>По странам</h2>
          <ul className={styles.rows}>
            {reference.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className={styles.rowLink}>
                  <span className={styles.rowNum} aria-hidden>
                    ·
                  </span>
                  <span>
                    <h3>{g.title}</h3>
                    <p>{g.summary}</p>
                  </span>
                  <span className={styles.rowMeta}>{g.minutes} мин</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </SitePage>
  );
}
