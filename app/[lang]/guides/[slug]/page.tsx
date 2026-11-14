import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { GuideBody } from "@/components/site/GuideBody";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { GUIDES, getStages, guideBySlug } from "@/content/guides";
import { LANGS, langOf, localizePath, trFor } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => GUIDES.map((g) => ({ lang, slug: g.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = langOf(rawLang);
  const g = guideBySlug(slug, lang);
  if (!g) return {};
  const path = localizePath(lang, `/guides/${g.slug}`);
  return {
    title: g.title,
    description: g.summary,
    alternates: { canonical: path, languages: { ru: `/guides/${g.slug}`, uz: `/uz/guides/${g.slug}` } },
    openGraph: { title: g.title, description: g.summary, type: "article", url: `${SITE_URL}${path}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = langOf(rawLang);
  const tr = trFor(lang);
  const g = guideBySlug(slug, lang);
  if (!g) notFound();

  const stages = getStages(lang);
  const stage = stages.find((s) => s.n === g.stage);
  const nextStage = stages.find((s) => s.n === g.stage + 1);
  const related = (g.related || [])
    .map((s) => guideBySlug(s, lang))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <SitePage>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.summary,
          inLanguage: lang === "uz" ? "uz-UZ" : "ru-RU",
          url: `${SITE_URL}${localizePath(lang, `/guides/${g.slug}`)}`,
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      <nav className={styles.crumbs} aria-label={tr("Хлебные крошки", "Yo'l ko'rsatkichi")}>
        <Link href="/guides">{tr("Гайды", "Qo'llanmalar")}</Link>
        {stage ? (
          <>
            <span aria-hidden>/</span>
            <span>
              {tr(`Шаг ${stage.n}.`, `${stage.n}-qadam.`)} {stage.title}
            </span>
          </>
        ) : null}
      </nav>

      <header className={styles.lead}>
        <h1>{g.title}</h1>
        <p>{g.summary}</p>
        <div className={styles.guideMeta}>
          <span>{g.minutes} {tr("минут чтения", "daqiqa o'qish")}</span>
          <span>{tr("Обновлено в 2026 году", "2026-yilda yangilangan")}</span>
        </div>
      </header>

      {g.sections.length > 2 ? (
        <nav className={styles.toc} aria-label={tr("Содержание", "Mundarija")}>
          <b>{tr("В этом гайде", "Ushbu qo'llanmada")}</b>
          <ol>
            {g.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <GuideBody sections={g.sections} lang={lang} />

      <aside className={styles.nextBox}>
        <h2>{nextStage ? tr(`Дальше: ${nextStage.title.toLowerCase()}`, `Keyingi: ${nextStage.title.toLowerCase()}`) : tr("Что дальше", "Keyingi qadam")}</h2>
        <p>
          {nextStage
            ? nextStage.text
            : tr(
                "Соберите список вузов в атласе: фильтры по стране, гранту, стоимости и шансам.",
                "Atlasda universitetlar ro'yxatini tuzing: davlat, grant, narx va imkoniyatlar bo'yicha filtrlar.",
              )}
        </p>
        <div className={styles.nextLinks}>
          {nextStage ? <Link href={`/guides/${nextStage.guide}`}>{tr("Читать гайд", "Qo'llanmani o'qish")}</Link> : null}
          {related.map((r) => (
            <Link key={r.slug} href={`/guides/${r.slug}`}>
              {r.title}
            </Link>
          ))}
          <Link href="/podbor">{tr("Подобрать вузы", "OTM tanlash")}</Link>
        </div>
      </aside>
    </SitePage>
  );
}
