import Link from "@/components/i18n/Link";
import type { Block, GuideSection } from "@/content/guide-types";
import type { Lang } from "@/lib/i18n";
import styles from "./site.module.css";

function BlockView({ b, lang = "ru" }: { b: Block; lang?: Lang }) {
  if ("p" in b) return <p className={styles.prose}>{b.p}</p>;
  if ("list" in b) {
    const items = b.list.map((t) => <li key={t}>{t}</li>);
    return b.ordered ? <ol className={styles.list}>{items}</ol> : <ul className={styles.list}>{items}</ul>;
  }
  if ("steps" in b) {
    return (
      <ol className={styles.steps}>
        {b.steps.map((s) => (
          <li key={s.title}>
            <strong>{s.title}</strong>
            <span>{s.text}</span>
          </li>
        ))}
      </ol>
    );
  }
  if ("table" in b) {
    return (
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {b.table.head.map((h, i) => (
                <th key={i} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if ("note" in b) {
    const tone = b.tone ?? "info";
    const label =
      lang === "uz"
        ? tone === "warn"
          ? "Muhim"
          : tone === "tip"
            ? "Maslahat"
            : "Ma'lumot uchun"
        : tone === "warn"
          ? "Важно"
          : tone === "tip"
            ? "Совет"
            : "К сведению";
    return (
      <aside className={`${styles.note} ${styles[`note_${tone}`]}`}>
        <b>{label}.</b> {b.note}
      </aside>
    );
  }
  if ("links" in b) {
    return (
      <p className={styles.inlineLinks}>
        {b.links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </p>
    );
  }
  return null;
}

export function GuideBody({ sections, lang = "ru" }: { sections: GuideSection[]; lang?: Lang }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} id={s.id} className={styles.guideSection}>
          <h2>{s.title}</h2>
          {s.blocks.map((b, i) => (
            <BlockView key={i} b={b} lang={lang} />
          ))}
        </section>
      ))}
    </>
  );
}
