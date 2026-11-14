import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { GateCta } from "@/components/gate/GateCta";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/gate/gate.module.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { countryName } from "@/lib/types";
import { fetchUniversityDirectory, type UniDirectoryEntry } from "@/lib/universities";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("Каталог университетов за границей по странам", "Davlatlar bo'yicha xorijiy universitetlar katalogi"),
    description: tr(
      "Список университетов для международных студентов по странам: США, Великобритания, Европа, Турция, Корея и другие. Где есть полный грант — отмечено.",
      "Xalqaro talabalar uchun davlatlar bo'yicha universitetlar ro'yxati: AQSh, Buyuk Britaniya, Yevropa, Turkiya, Koreya va boshqalar. To'liq grant bor joylar belgilangan.",
    ),
    alternates: { canonical: localizePath(lang, "/unis") },
    robots: { index: true, follow: true },
  };
}

function countryAnchor(country: string) {
  return `c-${country.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default async function UnisIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
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
    name: `${tr("Каталог университетов", "Universitetlar katalogi")} · ${SITE_NAME}`,
    url: `${SITE_URL}${localizePath(lang, "/unis")}`,
    numberOfItems: all.length,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SitePage wide>
        <div>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>{tr("Атлас Studyaza", "Studyaza Atlasi")}</p>
            <h1>
              {tr(
                `${all.length} университетов в ${groups.length} странах`,
                `${groups.length} davlatda ${all.length} ta universitet`,
              )}
            </h1>
            <p className={styles.copy}>
              {tr(
                `${grants} из них дают полный грант иностранным студентам. Ниже — все вузы по странам. Цены, шансы и сроки каждого вуза открыты всем. Фильтры по бюджету и полный список грантов — в атласе после бесплатной подписки на @studyaza.`,
                `Ulardan ${grants} tasi chet ellik talabalarga to'liq grant beradi. Quyida — davlatlar bo'yicha barcha OTMlar. Har bir OTM narxi, imkoniyatlari va muddatlari hamma uchun ochiq. Byudjet bo'yicha filtrlar va grantlarning to'liq ro'yxati — @studyaza kanaliga bepul obunadan so'ng atlasda.`,
              )}
            </p>
            <div className={styles.heroCta}>
              <GateCta
                botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
                label={tr("Открыть атлас с фильтрами", "Filtrli atlasni ochish")}
              />
            </div>
            <nav className={styles.countryNav} aria-label={tr("Страны", "Davlatlar")}>
              {groups.map(([country, list]) => (
                <a key={country} href={`#${countryAnchor(country)}`}>
                  {countryName(country, lang)} <span>{list.length}</span>
                </a>
              ))}
            </nav>
          </section>

          {groups.map(([country, list]) => (
            <section key={country} id={countryAnchor(country)} className={styles.countryBlock}>
              <h2>
                {countryName(country, lang)} <span>{list.length}</span>
              </h2>
              <ul className={styles.uniList}>
                {list.map((u) => (
                  <li key={u.slug}>
                    <Link href={`/unis/${u.slug}`}>{u.name}</Link>
                    {u.full_grant ? <span className={styles.dot} title={tr("Полный грант", "To'liq grant")} /> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </SitePage>
    </>
  );
}
