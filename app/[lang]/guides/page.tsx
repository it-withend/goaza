import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { getGuides, getStages } from "@/content/guides";
import { langOf, localizePath, trFor } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("Гайды по поступлению за границу", "Chet elga o'qishga kirish bo'yicha qo'llanmalar"),
    description: tr(
      "Пошаговые гайды: как составить список вузов, какие документы и экзамены нужны, как получить полный грант, написать эссе и подать заявки.",
      "Bosqichma-bosqich qo'llanmalar: OTMlar ro'yxatini tuzish, kerakli hujjatlar va imtihonlar, to'liq grant olish, esse yozish va ariza topshirish.",
    ),
    alternates: { canonical: localizePath(lang, "/guides") },
  };
}

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  const guides = getGuides(lang);
  const stages = getStages(lang);
  const byStage = stages.map((s) => ({ ...s, guides: guides.filter((g) => g.stage === s.n) }));
  const reference = guides.filter((g) => g.stage === 0);

  return (
    <SitePage>
      <header className={styles.lead}>
        <h1>{tr("Гайды по поступлению", "Qabul qo'llanmalari")}</h1>
        <p>
          {tr(
            "Расставлены в том порядке, в котором вы будете с этим сталкиваться. Каждый гайд — на 5–10 минут.",
            "Jarayon davomida duch keladigan tartibda joylashtirilgan. Har bir qo'llanma — 5–10 daqiqa.",
          )}
        </p>
        <p className={styles.inlineLinks} style={{ marginTop: 14 }}>
          <Link href="/dashboard/guide">
            {tr(
              "Интерактивный гайд для подписчиков: калькулятор стратегии и чек-лист эссе",
              "Obunachilar uchun interaktiv qo'llanma: strategiya kalkulyatori va esse chek-listi",
            )}
          </Link>
        </p>
      </header>

      {byStage.map((stage) => (
        <section key={stage.n}>
          <h2 className={styles.groupTitle}>
            {tr(`Шаг ${stage.n}.`, `${stage.n}-qadam.`)} {stage.title}
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
                  <span className={styles.rowMeta}>{g.minutes} {tr("мин", "daq")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {reference.length ? (
        <section>
          <h2 className={styles.groupTitle}>{tr("По странам", "Davlatlar bo'yicha")}</h2>
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
                  <span className={styles.rowMeta}>{g.minutes} {tr("мин", "daq")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </SitePage>
  );
}
