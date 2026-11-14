import type { Metadata } from "next";
import { PlanClient } from "@/components/plan/PlanClient";
import { SitePage } from "@/components/site/SitePage";

export const metadata: Metadata = {
  title: "Мой план поступления",
  description: "Личный план поступления: список вузов по корзинам, шансы, сроки и дела на каждую неделю.",
  alternates: { canonical: "/plan" },
  robots: { index: false, follow: true },
};

export default function PlanPage() {
  return (
    <SitePage wide>
      <PlanClient />
    </SitePage>
  );
}
