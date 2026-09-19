import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { UniversityLogo } from "@/components/UniversityLogo";
import { campusPhotoUrl } from "@/lib/campus-photo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { countryRu, INST_LABEL } from "@/lib/types";
import { fetchUniversityBySlug } from "@/lib/universities";
import { websiteUrl } from "@/lib/university-logo";
import styles from "../unis.module.css";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = await fetchUniversityBySlug(slug);
  if (!u) return { title: "Университет не найден" };

  const place = [countryRu(u.country), u.city].filter(Boolean).join(", ");
  const title = `${u.name} — поступление, стоимость и гранты`;
  const description = [
    `${u.name} (${place}).`,
    u.tuition_display ? `Стоимость: ${u.tuition_display}.` : null,
    u.full_grant ? "Есть полный грант." : null,
    u.acceptance_rate ? `Acceptance rate: ${u.acceptance_rate}.` : null,
    `Профиль в каталоге ${SITE_NAME}.`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title,
    description,
    alternates: { canonical: `/unis/${u.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/unis/${u.slug}`,
      type: "article",
      images: [{ url: campusPhotoUrl(u.slug, 1200), width: 1200, height: 630, alt: u.name }],
    },
  };
}

export default async function PublicUniversityPage({ params }: Props) {
  const { slug } = await params;
  const u = await fetchUniversityBySlug(slug);
  if (!u) notFound();

  const place = [countryRu(u.country), u.city].filter(Boolean).join(" · ");
  const site = websiteUrl(u.website_domain);
  const photo = campusPhotoUrl(u.slug, 1200);
  const tags = [
    ...(u.full_grant ? ["Полный грант"] : []),
    ...(u.need_blind ? ["Need-blind"] : []),
    ...(u.inst_tags || []).map((t) => INST_LABEL[t] || t),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: u.name,
    url: `${SITE_URL}/unis/${u.slug}`,
    ...(site ? { sameAs: [site] } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: u.country,
      addressLocality: u.city || undefined,
    },
  };

  return (
    <main className={styles.page}>
      <JsonLd data={jsonLd} />
      <header className={styles.header}>
        <Link href="/unis" className={styles.brand}>
          ← Все университеты
        </Link>
        <Link href="/" className={styles.cta}>
          Открыть атлас
        </Link>
      </header>

      <article className={styles.article}>
        <div className={styles.cover}>
          <Image
            src={photo}
            alt={`Кампус: ${u.name}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 900px"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.articleHead}>
          <UniversityLogo name={u.name} domain={u.website_domain} size={56} />
          <div>
            <p className={styles.place}>{place}</p>
            <h1>{u.name}</h1>
            {tags.length ? (
              <div className={styles.tags}>
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <section className={styles.facts} aria-label="Ключевые факты">
          <div>
            <small>Стоимость</small>
            <strong>{u.tuition_display || "—"}</strong>
          </div>
          <div>
            <small>Поступление</small>
            <strong>{u.acceptance_rate || "—"}</strong>
          </div>
          <div>
            <small>Помощь</small>
            <strong>{u.aid_max || "—"}</strong>
          </div>
          <div>
            <small>Дедлайн</small>
            <strong>{u.early_deadline || u.regular_deadline || "—"}</strong>
          </div>
        </section>

        <section className={styles.seoCopy}>
          <h2>Как поступить в {u.name}</h2>
          <p>
            В каталоге {SITE_NAME} собраны данные по стоимости обучения, финансовой помощи для
            международных студентов, дедлайнам и требованиям. Открой полный атлас через Telegram,
            чтобы сравнивать вузы по фильтрам и сохранять подходящие варианты.
          </p>
          {site ? (
            <p>
              Официальный сайт:{" "}
              <a href={site} target="_blank" rel="noopener noreferrer">
                {u.website_domain}
              </a>
            </p>
          ) : null}
        </section>

        <div className={styles.gateBox}>
          <h2>Полный профиль и сравнение</h2>
          <p>Фильтры по грантам, tuition, acceptance rate и 1000+ вузов — в атласе Studyaza.</p>
          <Link href="/" className={styles.ctaWide}>
            Войти через Telegram
          </Link>
        </div>
      </article>
    </main>
  );
}
