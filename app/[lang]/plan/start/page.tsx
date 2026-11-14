import type { Metadata } from "next";
import { Onboarding } from "@/components/plan/Onboarding";
import { SitePage } from "@/components/site/SitePage";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import { fetchLandingStats } from "@/lib/landing-stats";
import { countryName } from "@/lib/types";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("Составить план поступления", "O'qishga kirish rejasini tuzish"),
    description: tr(
      "Шесть вопросов — класс, бюджет семьи, английский, SAT, страны и специальность — и готовый план поступления за границу со списком вузов.",
      "Oltita savol — sinf, oila byudjeti, ingliz tili, SAT, davlatlar va mutaxassislik — va chet elga kirish uchun tayyor reja hamda OTMlar ro'yxati.",
    ),
    alternates: { canonical: localizePath(lang, "/plan/start") },
  };
}

export default async function PlanStartPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const stats = await fetchLandingStats().catch(() => null);
  const countries = (stats?.byCountry || []).map((c) => ({ value: c.country, label: countryName(c.country, lang), count: c.count }));
  return (
    <SitePage>
      <Onboarding countries={countries} />
    </SitePage>
  );
}
