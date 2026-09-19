import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchLandingStats } from "@/lib/landing-stats";
import { getSupabaseAnon } from "@/lib/supabase";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { countryRu } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} — каталог университетов и грантов за границей`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

async function fetchTopUniversityNames(limit = 40): Promise<string[]> {
  try {
    const sb = getSupabaseAnon();
    const { data } = await sb
      .from("universities")
      .select("name")
      .order("full_grant", { ascending: false })
      .order("name")
      .limit(limit);
    return ((data || []) as { name: string }[]).map((r) => r.name).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [stats, uniNames] = await Promise.all([fetchLandingStats(), fetchTopUniversityNames()]);
  const topCountries = stats.byCountry.slice(0, 12).map((c) => countryRu(c.country));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "ru-RU",
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
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
    ...(uniNames.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Университеты в каталоге Studyaza",
            numberOfItems: stats.total,
            itemListElement: uniNames.map((name, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name,
              item: {
                "@type": "CollegeOrUniversity",
                name,
              },
            })),
          },
        ]
      : []),
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
