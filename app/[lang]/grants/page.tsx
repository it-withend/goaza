import type { Metadata } from "next";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { getGrants, kindLabel, levelLabel, type GrantKind } from "@/content/grants";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import g from "./grants.module.css";

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

  return (
    <SitePage wide>
      <header className={styles.lead}>
        <h1>{tr("Гранты и стипендии", "Grantlar va stipendiyalar")}</h1>
        <p>
          {tr(
            `${grants.length} программ, которые покрывают обучение иностранцам. Для полных грантов вузов США смотрите фильтр «Полный грант» в каталоге — их там больше 400.`,
            `Chet elliklarning o'qishini qoplaydigan ${grants.length} ta dastur. AQSh OTMlarining to'liq grantlari uchun katalogdagi «To'liq grant» filtriga qarang — ular 400 dan ortiq.`,
          )}
        </p>
      </header>

      {ORDER.map((kind) => {
        const list = grants.filter((x) => x.kind === kind);
        return (
          <section key={kind} className={g.group}>
            <div className={g.groupHead}>
              <h2>{kindLabel(kind, lang)}</h2>
              <p>{intro[kind]}</p>
            </div>
            <div className={g.grid}>
              {list.map((x) => (
                <article key={x.slug} id={x.slug} className={g.card}>
                  <header>
                    <span className={g.country}>{x.country}</span>
                    <h3>{x.name}</h3>
                    <p>{x.summary}</p>
                  </header>
                  <div className={g.levels}>
                    {x.levels.map((l) => (
                      <span key={l}>{levelLabel(l, lang)}</span>
                    ))}
                  </div>
                  <dl className={g.facts}>
                    <div>
                      <dt>{tr("Покрывает", "Qoplaydi")}</dt>
                      <dd>
                        <ul>
                          {x.covers.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    {x.stipend ? (
                      <div>
                        <dt>{tr("Деньги", "Stipendiya")}</dt>
                        <dd>{x.stipend}</dd>
                      </div>
                    ) : null}
                    {x.scope ? (
                      <div>
                        <dt>{tr("Где", "Qayerda")}</dt>
                        <dd>{x.scope}</dd>
                      </div>
                    ) : null}
                    {x.quota ? (
                      <div>
                        <dt>{tr("Мест", "Kvota")}</dt>
                        <dd>{x.quota}</dd>
                      </div>
                    ) : null}
                    {x.majors?.length ? (
                      <div>
                        <dt>{tr("Сильные направления", "Kuchli yo'nalishlar")}</dt>
                        <dd>{x.majors.join(", ")}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {x.notes?.length ? (
                    <ul className={g.notes}>
                      {x.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  ) : null}
                  {x.warning ? <p className={g.warning}>{x.warning}</p> : null}
                  <footer>
                    <a href={x.url} target="_blank" rel="noopener noreferrer">
                      {tr("Официальный сайт ↗", "Rasmiy sayt ↗")}
                    </a>
                    <span>{tr(`Проверено: ${x.checked}`, `Tekshirildi: ${x.checked}`)}</span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </SitePage>
  );
}
