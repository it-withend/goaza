import type { Metadata } from "next";
import { GrantsCatalogClient } from "@/components/grants/GrantsCatalogClient";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { getGrants, kindLabel, levelLabel, type GrantKind, type Level } from "@/content/grants";
import { langOf, localizePath, trFor } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("Гранты и стипендии для учёбы за границей", "Chet elda o'qish uchun grant va stipendiyalar"),
    description: tr(
      "Государственные стипендии (Stipendium Hungaricum, Türkiye Bursları, GKS, MEXT, CSC), стипендии университетов и страны с бесплатным обучением — что покрывают и как подать.",
      "Davlat stipendiyalari (Stipendium Hungaricum, Türkiye Bursları, GKS, MEXT, CSC), universitet grantlari va bepul ta'lim beruvchi davlatlar — nimalarni qoplaydi va qanday topshiriladi.",
    ),
    alternates: { canonical: localizePath(lang, "/grants") },
  };
}

const ORDER: GrantKind[] = ["government", "university", "low-cost"];

function pluralProgram(n: number): string {
  const mod100 = n % 100;
  const mod10 = n % 10;
  if (mod100 > 10 && mod100 < 20) return "программ";
  if (mod10 === 1) return "программа";
  if (mod10 >= 2 && mod10 <= 4) return "программы";
  return "программ";
}

export default async function GrantsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  const grants = getGrants(lang);
  const intro: Record<GrantKind, string> = {
    government: tr(
      "Деньги дают правительства. Конкурс — внутри программы, а не в вузе. Подходят тем, у кого нет денег совсем.",
      "Pulni hukumatlar ajratadi. Tanlov OTM ichida emas, dastur doirasida o'tadi. Puli umuman yo'qlar uchun mos.",
    ),
    university: tr(
      "Стипендии конкретных вузов. Обычно за сильные достижения, мест мало.",
      "Aniq universitetlarning stipendiyalari. Odatda kuchli yutuqlar uchun beriladi, o'rinlar kam.",
    ),
    "low-cost": tr(
      "Где учёба бесплатная или стоит как в крупном российском городе.",
      "Ta'lim bepul yoki mahalliy kontrakt narxiga yaqin bo'lgan davlatlar.",
    ),
  };

  const kinds = ORDER.map((kind) => ({
    kind,
    label: kindLabel(kind, lang),
    intro: intro[kind],
  }));

  const levelNames: Record<Level, string> = {
    bachelor: levelLabel("bachelor", lang),
    master: levelLabel("master", lang),
    phd: levelLabel("phd", lang),
  };

  return (
    <SitePage wide>
      <header className={styles.lead}>
        <h1>{tr("Гранты и стипендии", "Grantlar va stipendiyalar")}</h1>
        <p>
          {tr(
            `${grants.length} ${pluralProgram(grants.length)}, которые покрывают обучение иностранцам. Для полных грантов вузов США смотрите фильтр «Полный грант» в каталоге — их там больше 400.`,
            `Chet elliklarning o'qishini qoplaydigan ${grants.length} ta dastur. AQSh OTMlarining to'liq grantlari uchun katalogdagi «To'liq grant» filtriga qarang — ular 400 dan ortiq.`,
          )}
        </p>
      </header>

      <GrantsCatalogClient grants={grants} kinds={kinds} levelNames={levelNames} lang={lang} />
    </SitePage>
  );
}
