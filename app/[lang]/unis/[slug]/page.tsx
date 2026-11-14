import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { UniProfile } from "@/components/uni/UniProfile";
import { JsonLd } from "@/components/seo/JsonLd";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { countryName } from "@/lib/types";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { teaserSummary, toTeaser } from "@/lib/uni-teaser";
import { fetchRelatedUniversities, fetchUniversityBySlug } from "@/lib/universities";
import { websiteUrl } from "@/lib/university-logo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; lang: string }> };

/** Dedupe the lookup between generateMetadata and the page render. */
const loadUniversity = cache((slug: string) => fetchUniversityBySlug(slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang: rawLang } = await params;
  const lang = langOf(rawLang);
  const tr = trFor(lang);
  const u = await loadUniversity(slug);
  if (!u) return { title: tr("Университет не найден", "Universitet topilmadi"), robots: { index: false } };

  const t = toTeaser(u);
  const title = tr(`${u.name} — поступление, стоимость и гранты`, `${u.name} — qabul, narx va grantlar`);
  const place = [countryName(u.country, "uz"), u.city].filter(Boolean).join(", ");
  const description = tr(
    `${teaserSummary(t)} Дедлайны и требования — в атласе ${SITE_NAME}.`,
    `${u.name} — universitet (${place}).${u.acceptance_rate ? ` Qabul foizi — ${u.acceptance_rate}.` : ""} ${
      u.full_grant ? "Chet ellik talabalar uchun to'liq grant bor." : "Chet elliklar uchun to'liq grant yo'q — qisman yordamni atlasdan qarang."
    } Muddatlar va talablar — ${SITE_NAME} atlasida.`,
  ).slice(0, 300);
  const path = `/unis/${u.slug}`;

  return {
    title,
    description,
    alternates: { canonical: localizePath(lang, path), languages: { ru: path, uz: `/uz${path}` } },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${localizePath(lang, path)}`,
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: u.name }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function PublicUniversityPage({ params }: Props) {
  const { slug, lang: rawLang } = await params;
  const lang = langOf(rawLang);
  const tr = trFor(lang);
  const u = await loadUniversity(slug);
  if (!u) notFound();

  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  const full = Boolean(session?.subscribed);
  if (u.slug !== slug) {
    redirect(localizePath(lang, `/unis/${u.slug}`));
  }

  const teaser = toTeaser(u);
  const related = await fetchRelatedUniversities(u.country, u.slug, 6).catch(() => []);
  const site = websiteUrl(u.website_domain);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: u.name,
      url: `${SITE_URL}${localizePath(lang, `/unis/${u.slug}`)}`,
      description: teaserSummary(teaser),
      ...(site ? { sameAs: [site] } : {}),
      address: {
        "@type": "PostalAddress",
        addressCountry: u.country,
        ...(u.city ? { addressLocality: u.city } : {}),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: tr("Университеты", "Universitetlar"), item: `${SITE_URL}${localizePath(lang, "/unis")}` },
        { "@type": "ListItem", position: 3, name: u.name, item: `${SITE_URL}${localizePath(lang, `/unis/${u.slug}`)}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <UniProfile
        u={u}
        related={related}
        full={full}
        backHref="/unis"
        backLabel={tr("Все вузы", "Barcha universitetlar")}
        lang={lang}
        relatedBase="/unis"
        botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
      />
      <SiteFooter />
    </>
  );
}
