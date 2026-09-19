import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchLandingStats } from "@/lib/landing-stats";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { countryRu } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} — каталог университетов и грантов за границей`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const stats = await fetchLandingStats();
  const topCountries = stats.byCountry.slice(0, 12).map((c) => countryRu(c.country));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "ru-RU",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: ["https://t.me/studyaza"],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Страны с университетами в Studyaza",
      itemListElement: topCountries.map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <LandingPage
        stats={stats}
        botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
      />
    </>
  );
}
