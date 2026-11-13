import type { Metadata } from "next";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { GRANTS, KIND_RU, LEVEL_RU, type GrantKind } from "@/content/grants";
import g from "./grants.module.css";

export const metadata: Metadata = {
  title: "Гранты и стипендии для учёбы за границей",
  description:
    "Государственные стипендии (Stipendium Hungaricum, Türkiye Bursları, GKS, MEXT, CSC), стипендии университетов и страны с бесплатным обучением — что покрывают и как подать.",
  alternates: { canonical: "/grants" },
};

const ORDER: GrantKind[] = ["government", "university", "low-cost"];
const INTRO: Record<GrantKind, string> = {
  government: "Деньги дают правительства. Конкурс — внутри программы, а не в вузе. Подходят тем, у кого нет денег совсем.",
  university: "Стипендии конкретных вузов. Обычно за сильные достижения, мест мало.",
  "low-cost": "Где учёба бесплатная или стоит как в крупном российском городе.",
};

export default function GrantsPage() {
  return (
    <SitePage wide>
      <header className={styles.lead}>
        <h1>Гранты и стипендии</h1>
        <p>
          {GRANTS.length} программ, которые покрывают обучение иностранцам. Для полных грантов вузов США
          смотрите фильтр «Полный грант» в каталоге — их там больше 400.
        </p>
      </header>

      {ORDER.map((kind) => {
        const list = GRANTS.filter((x) => x.kind === kind);
        return (
          <section key={kind} className={g.group}>
            <div className={g.groupHead}>
              <h2>{KIND_RU[kind]}</h2>
              <p>{INTRO[kind]}</p>
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
                      <span key={l}>{LEVEL_RU[l]}</span>
                    ))}
                  </div>
                  <dl className={g.facts}>
                    <div>
                      <dt>Покрывает</dt>
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
                        <dt>Деньги</dt>
                        <dd>{x.stipend}</dd>
                      </div>
                    ) : null}
                    {x.scope ? (
                      <div>
                        <dt>Где</dt>
                        <dd>{x.scope}</dd>
                      </div>
                    ) : null}
                    {x.quota ? (
                      <div>
                        <dt>Мест</dt>
                        <dd>{x.quota}</dd>
                      </div>
                    ) : null}
                    {x.majors?.length ? (
                      <div>
                        <dt>Сильные направления</dt>
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
                      Официальный сайт ↗
                    </a>
                    <span>Проверено: {x.checked}</span>
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
