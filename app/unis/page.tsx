import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAnon } from "@/lib/supabase";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { UnisDirectory, type PublicUni } from "./UnisDirectory";
import styles from "./unis.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Каталог университетов за границей",
  description:
    "Полный список университетов Studyaza: страны, города и гранты. Найди вуз для поступления за рубеж и открой детальный атлас через Telegram.",
  alternates: { canonical: "/unis" },
  openGraph: {
    title: `Каталог университетов · ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/unis`,
  },
};

async function fetchPublicUnis(): Promise<PublicUni[]> {
  const sb = getSupabaseAnon();
  const rows: PublicUni[] = [];
  const page = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await sb
      .from("universities")
      .select("slug,name,country,city,full_grant")
      .order("country")
      .order("name")
      .range(from, from + page - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows.push(...(data as PublicUni[]));
    if (data.length < page) break;
    from += page;
  }
  return rows;
}

export default async function UnisIndexPage() {
  const unis = await fetchPublicUnis();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Каталог университетов · ${SITE_NAME}`,
    url: `${SITE_URL}/unis`,
    description: SITE_DESCRIPTION,
    numberOfItems: unis.length,
  };

  return (
    <main className={styles.page}>
      <JsonLd data={jsonLd} />
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={36} height={36} alt="" />
          <strong>{SITE_NAME}</strong>
        </Link>
        <Link href="/" className={styles.cta}>
          Открыть атлас
        </Link>
      </header>

      <section className={styles.hero}>
        <h1>Каталог университетов за границей</h1>
        <p>
          {unis.length}+ вузов в базе: стоимость, гранты и условия поступления. Выбери университет ниже
          или открой полный фильтруемый атлас через Telegram.
        </p>
      </section>

      <UnisDirectory unis={unis} />
    </main>
  );
}
