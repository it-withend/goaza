import type { Metadata } from "next";
import { Onboarding } from "@/components/plan/Onboarding";
import { SitePage } from "@/components/site/SitePage";
import { fetchLandingStats } from "@/lib/landing-stats";
import { countryRu } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Составить план поступления",
  description:
    "Шесть вопросов — класс, бюджет семьи, английский, SAT, страны и специальность — и готовый план поступления за границу со списком вузов.",
  alternates: { canonical: "/plan/start" },
};

export default async function PlanStartPage() {
  const stats = await fetchLandingStats().catch(() => null);
  const countries = (stats?.byCountry || []).map((c) => ({ value: c.country, label: countryRu(c.country), count: c.count }));
  return (
    <SitePage>
      <Onboarding countries={countries} />
    </SitePage>
  );
}
