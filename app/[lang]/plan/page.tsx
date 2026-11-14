import type { Metadata } from "next";
import { PlanClient } from "@/components/plan/PlanClient";
import { SitePage } from "@/components/site/SitePage";
import { langOf, localizePath, trFor } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("Мой план поступления", "Mening kirish rejam"),
    description: tr(
      "Личный план поступления: список вузов по корзинам, шансы, сроки и дела на каждую неделю.",
      "Shaxsiy kirish rejasi: savatlar bo'yicha OTMlar ro'yxati, imkoniyatlar, muddatlar va haftalik ishlar.",
    ),
    alternates: { canonical: localizePath(lang, "/plan") },
    robots: { index: false, follow: true },
  };
}

export default function PlanPage() {
  return (
    <SitePage wide>
      <PlanClient />
    </SitePage>
  );
}
