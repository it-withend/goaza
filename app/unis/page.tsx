import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GateCta } from "@/components/gate/GateCta";
import { UniGateScreen } from "@/components/gate/UniGateScreen";
import styles from "@/components/gate/gate.module.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { countryRu } from "@/lib/types";
import { fetchUniversityDirectory, type UniDirectoryEntry } from "@/lib/universities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог университетов за границей по странам",
  description:
    "Список университетов для международных студентов по странам: США, Великобритания, Европа, Турция, Корея и другие. Где есть полный грант — отмечено.",
  alternates: { canonical: "/unis" },
  robots: { index: true, follow: true },
};

function countryAnchor(country: string) {
  return `c-${country.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default async function UnisIndexPage() {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (session?.subscribed) redirect("/dashboard");

  const all = await fetchUniversityDirectory().catch(() => [] as UniDirectoryEntry[]);
  const byCountry = new Map<string, UniDirectoryEntry[]>();
  for (const u of all) {
    const list = byCountry.get(u.country) || [];
    list.push(u);
    byCountry.set(u.country, list);
  }
  const groups = [...byCountry.entries()].sort((a, b) => b[1].length - a[1].length);
  const grants = all.filter((u) => u.full_grant).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Каталог университетов · ${SITE_NAME}`,
    url: `${SITE_URL}/unis`,
    numberOfItems: all.length,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <UniGateScreen>
        <div className={styles.wrapWide}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Атлас Studyaza</p>
            <h1>{all.length} университетов в {groups.length} странах</h1>
            <p className={styles.copy}>
              {grants} из них дают полный грант иностранным студентам. Ниже — все вузы по странам.
              Стоимость, гранты, дедлайны и фильтры открываются в атласе после подписки на @studyaza.
            </p>
            <div className={styles.heroCta}>
              <GateCta
                botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
                label="Открыть атлас с фильтрами"
              />
            </div>
            <nav className={styles.countryNav} aria-label="Страны">
              {groups.map(([country, list]) => (
                <a key={country} href={`#${countryAnchor(country)}`}>
                  {countryRu(country)} <span>{list.length}</span>
                </a>
              ))}
            </nav>
          </section>

          {groups.map(([country, list]) => (
            <section key={country} id={countryAnchor(country)} className={styles.countryBlock}>
              <h2>
                {countryRu(country)} <span>{list.length}</span>
              </h2>
              <ul className={styles.uniList}>
                {list.map((u) => (
                  <li key={u.slug}>
                    <Link href={`/unis/${u.slug}`}>{u.name}</Link>
                    {u.full_grant ? <span className={styles.dot} title="Полный грант" /> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </UniGateScreen>
    </>
  );
}
