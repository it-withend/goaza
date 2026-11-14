import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { PROGRAM_WINDOWS, US_ROUNDS, type Window } from "@/content/timeline";

export const metadata: Metadata = {
  title: "Сроки подачи в зарубежные вузы и на стипендии",
  description:
    "Когда подавать в вузы США (ED, EA, RD), Великобритании, Канады, Европы и на государственные стипендии Венгрии, Турции, Кореи, Японии и Китая.",
  alternates: { canonical: "/deadlines" },
};

function WindowTable({ rows }: { rows: Window[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Что</th>
            <th scope="col">Когда</th>
            <th scope="col">Подробнее</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.what}>
              <th scope="row">{r.href ? <Link href={r.href}>{r.what}</Link> : r.what}</th>
              <td style={{ whiteSpace: "nowrap", fontWeight: 700 }}>{r.when}</td>
              <td>{r.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DeadlinesPage() {
  return (
    <SitePage>
      <header className={styles.lead}>
        <h1>Сроки подачи</h1>
        <p>
          Типичные окна для поступления в следующем учебном году. Точные даты меняются — у каждого вуза
          в атласе есть его собственные дедлайны.
        </p>
      </header>

      <section className={styles.guideSection}>
        <h2>Вузы США</h2>
        <WindowTable rows={US_ROUNDS} />
      </section>

      <section className={styles.guideSection}>
        <h2>Другие страны и стипендии</h2>
        <p className={styles.prose}>Отсортировано по тому, когда открывается подача.</p>
        <WindowTable rows={PROGRAM_WINDOWS} />
      </section>

      <aside className={styles.nextBox}>
        <h2>Не знаете, с чего начать?</h2>
        <p>Посмотрите план по классам: что делать в 9, 10, 11 классе и в выпускной год.</p>
        <div className={styles.nextLinks}>
          <Link href="/start">План по классам</Link>
          <Link href="/guides/raundy-podachi">Как выбрать раунд</Link>
        </div>
      </aside>
    </SitePage>
  );
}
