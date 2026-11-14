import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { GuideBody } from "@/components/site/GuideBody";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { GUIDES, STAGES, guideBySlug } from "@/content/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.summary,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { title: g.title, description: g.summary, type: "article", url: `${SITE_URL}/guides/${g.slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();

  const stage = STAGES.find((s) => s.n === g.stage);
  const nextStage = STAGES.find((s) => s.n === g.stage + 1);
  const related = (g.related || []).map(guideBySlug).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <SitePage>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.summary,
          inLanguage: "ru-RU",
          url: `${SITE_URL}/guides/${g.slug}`,
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      <nav className={styles.crumbs} aria-label="Хлебные крошки">
        <Link href="/guides">Гайды</Link>
        {stage ? (
          <>
            <span aria-hidden>/</span>
            <span>
              Шаг {stage.n}. {stage.title}
            </span>
          </>
        ) : null}
      </nav>

      <header className={styles.lead}>
        <h1>{g.title}</h1>
        <p>{g.summary}</p>
        <div className={styles.guideMeta}>
          <span>{g.minutes} минут чтения</span>
          <span>Обновлено в 2026 году</span>
        </div>
      </header>

      {g.sections.length > 2 ? (
        <nav className={styles.toc} aria-label="Содержание">
          <b>В этом гайде</b>
          <ol>
            {g.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <GuideBody sections={g.sections} />

      <aside className={styles.nextBox}>
        <h2>{nextStage ? `Дальше: ${nextStage.title.toLowerCase()}` : "Что дальше"}</h2>
        <p>
          {nextStage
            ? nextStage.text
            : "Соберите список вузов в атласе: фильтры по стране, гранту, стоимости и шансам."}
        </p>
        <div className={styles.nextLinks}>
          {nextStage ? <Link href={`/guides/${nextStage.guide}`}>Читать гайд</Link> : null}
          {related.map((r) => (
            <Link key={r.slug} href={`/guides/${r.slug}`}>
              {r.title}
            </Link>
          ))}
          <Link href="/podbor">Подобрать вузы</Link>
        </div>
      </aside>
    </SitePage>
  );
}
