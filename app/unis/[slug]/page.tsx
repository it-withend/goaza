import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { UniGateScreen } from "@/components/gate/UniGateScreen";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { countryRu } from "@/lib/types";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { fetchUniversityBySlug } from "@/lib/universities";
import { websiteUrl } from "@/lib/university-logo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = await fetchUniversityBySlug(slug);
  if (!u) return { title: "Университет не найден", robots: { index: false } };

  const place = [countryRu(u.country), u.city].filter(Boolean).join(", ");
  const title = `${u.name} — поступление, стоимость и гранты`;
  const description = [
    `${u.name} (${place}) в каталоге ${SITE_NAME}.`,
    "Стоимость обучения, гранты и дедлайны для международных студентов — после подписки на @studyaza.",
  ].join(" ");

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
  const u = await fetchUniversityBySlug(slug);
  if (!u) notFound();

  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (session?.subscribed) {
    redirect(`/dashboard/u/${u.slug}`);
  }

  const place = [countryRu(u.country), u.city].filter(Boolean).join(" · ");
  const site = websiteUrl(u.website_domain);

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
    <>
      <JsonLd data={jsonLd} />
      <UniGateScreen
        title={u.name}
        place={place}
        botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
      />
    </>
  );
}
