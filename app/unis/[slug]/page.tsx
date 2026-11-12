import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { UniGateScreen } from "@/components/gate/UniGateScreen";
import { UniTeaserCard } from "@/components/gate/UniTeaserCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { teaserSummary, toTeaser } from "@/lib/uni-teaser";
import { fetchRelatedUniversities, fetchUniversityBySlug } from "@/lib/universities";
import { websiteUrl } from "@/lib/university-logo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

/** Dedupe the lookup between generateMetadata and the page render. */
const loadUniversity = cache((slug: string) => fetchUniversityBySlug(slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = await loadUniversity(slug);
  if (!u) return { title: "Университет не найден", robots: { index: false } };

  const t = toTeaser(u);
  const title = `${u.name} — поступление, стоимость и гранты`;
  const description = `${teaserSummary(t)} Дедлайны и требования — в атласе ${SITE_NAME}.`.slice(0, 300);

  return {
    title,
    description,
    alternates: { canonical: `/unis/${u.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/unis/${u.slug}`,
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: u.name }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function PublicUniversityPage({ params }: Props) {
  const { slug } = await params;
  const u = await loadUniversity(slug);
  if (!u) notFound();

  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (session?.subscribed) {
    redirect(`/dashboard/u/${u.slug}`);
  }

  const teaser = toTeaser(u);
  const related = await fetchRelatedUniversities(u.country, u.slug).catch(() => []);
  const site = websiteUrl(u.website_domain);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: u.name,
      url: `${SITE_URL}/unis/${u.slug}`,
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
        { "@type": "ListItem", position: 2, name: "Университеты", item: `${SITE_URL}/unis` },
        { "@type": "ListItem", position: 3, name: u.name, item: `${SITE_URL}/unis/${u.slug}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <UniGateScreen>
        <UniTeaserCard
          teaser={teaser}
          summary={teaserSummary(teaser)}
          related={related}
          botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
        />
      </UniGateScreen>
    </>
  );
}
