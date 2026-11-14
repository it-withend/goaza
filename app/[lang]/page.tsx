import type { Metadata } from "next";
import { HomeHub } from "@/components/home/HomeHub";
import { SitePage } from "@/components/site/SitePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import { fetchLandingStats } from "@/lib/landing-stats";
import { getSupabaseAnon } from "@/lib/supabase";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { countryName } from "@/lib/types";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr(
      `${SITE_NAME} — как поступить за границу бесплатно: вузы, гранты, гайды`,
      `${SITE_NAME} — chet elga bepul o'qishga kirish: universitetlar, grantlar, qo'llanmalar`,
    ),
    description: tr(
      SITE_DESCRIPTION,
      "Oilangiz byudjetiga mos chet el universitetlari, grantlar va kirish imkoniyatlari, hujjat dedlaynlari va bosqichma-bosqich shaxsiy reja.",
    ),
    alternates: { canonical: localizePath(lang, "/") },
  };
}

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

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  const [stats, uniNames] = await Promise.all([fetchLandingStats(), fetchTopUniversityNames()]);
  const topCountries = stats.byCountry.slice(0, 12).map((c) => countryName(c.country, lang));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: lang === "uz" ? "uz-UZ" : "ru-RU",
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
      name: tr("Страны с университетами в Studyaza", "Studyaza bazasidagi universitetli davlatlar"),
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
            name: tr("Университеты в каталоге Studyaza", "Studyaza katalogidagi universitetlar"),
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
      <SitePage wide>
        <HomeHub stats={stats} lang={lang} />
      </SitePage>
    </>
  );
}
