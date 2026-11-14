import type { Metadata } from "next";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { fetchLandingStats } from "@/lib/landing-stats";
import { countryRu } from "@/lib/types";
import { PodborForm } from "./PodborForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Подбор вузов за границей под ваш бюджет и баллы",
  description:
    "Ответьте на 6 вопросов — бюджет семьи, английский, SAT, оценки, страны и специальность — и получите список вузов: мечта, реальные и запасные.",
  alternates: { canonical: "/podbor" },
};

export default async function PodborPage() {
  const stats = await fetchLandingStats().catch(() => null);
  const countries = (stats?.byCountry || []).map((c) => ({ value: c.country, label: countryRu(c.country), count: c.count }));

  return (
    <SitePage>
      <header className={styles.lead}>
        <h1>Подбор вузов</h1>
        <p>
          Шесть вопросов — и список вузов в трёх корзинах: мечта, реальные и запасные. Сначала отсеиваем
          всё, что семья не потянет по деньгам, потом считаем шансы.
        </p>
      </header>
      <PodborForm countries={countries} botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"} />
    </SitePage>
  );
}
