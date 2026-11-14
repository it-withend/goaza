import type { Metadata } from "next";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import { fetchLandingStats } from "@/lib/landing-stats";
import { countryName } from "@/lib/types";
import { PodborForm } from "./PodborForm";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("Подбор вузов за границей под ваш бюджет и баллы", "Byudjet va ballaringizga mos xorijiy OTMlarni tanlash"),
    description: tr(
      "Ответьте на 6 вопросов — бюджет семьи, английский, SAT, оценки, страны и специальность — и получите список вузов: мечта, реальные и запасные.",
      "6 ta savolga javob bering — oila byudjeti, ingliz tili, SAT, baholar, davlatlar va mutaxassislik — va orzu, haqiqiy hamda zaxira universitetlar ro'yxatini oling.",
    ),
    alternates: { canonical: localizePath(lang, "/podbor") },
  };
}

export default async function PodborPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  const stats = await fetchLandingStats().catch(() => null);
  const countries = (stats?.byCountry || []).map((c) => ({ value: c.country, label: countryName(c.country, lang), count: c.count }));

  return (
    <SitePage>
      <header className={styles.lead}>
        <h1>{tr("Подбор вузов", "OTM tanlash")}</h1>
        <p>
          {tr(
            "Шесть вопросов — и список вузов в трёх корзинах: мечта, реальные и запасные. Сначала отсеиваем всё, что семья не потянет по деньгам, потом считаем шансы.",
            "Oltita savol — va uch savatda universitetlar ro'yxati: orzu, haqiqiy va zaxira. Avval oila ko'tara olmaydiganlarini ajratamiz, so'ngra imkoniyatlarni hisoblaymiz.",
          )}
        </p>
      </header>
      <PodborForm countries={countries} botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"} />
    </SitePage>
  );
}
