import Link from "next/link";
import type { UniTeaser } from "@/lib/uni-teaser";
import type { UniDirectoryEntry } from "@/lib/universities";
import { UniversityLogo } from "@/components/UniversityLogo";
import { GateCta } from "./GateCta";
import styles from "./gate.module.css";

function Fact({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className={styles.fact}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function UniTeaserCard({
  teaser: t,
  summary,
  related,
  botUsername,
  logo = false,
}: {
  logo?: boolean;
  teaser: UniTeaser;
  summary: string;
  related: UniDirectoryEntry[];
  botUsername: string;
}) {
  const place = [t.countryRu, t.city].filter(Boolean).join(" · ");
  const locked = t.locked.length
    ? t.locked
    : ["Стоимость и финансовая помощь", "Дедлайны подачи", "Требования к поступлению"];

  return (
    <div className={styles.wrap}>
      <nav className={styles.crumbs} aria-label="Хлебные крошки">
        <Link href="/">Studyaza</Link>
        <span aria-hidden>›</span>
        <Link href="/unis">Университеты</Link>
        <span aria-hidden>›</span>
        <span>{t.countryRu}</span>
      </nav>

      <article className={styles.card}>
        <div className={styles.titleRow}>
          <UniversityLogo name={t.name} slug={t.slug} logo={logo} size={64} priority />
          <div>
            <p className={styles.eyebrow}>Профиль университета</p>
            <h1>{t.name}</h1>
          </div>
        </div>
        {place ? <p className={styles.place}>{place}</p> : null}

        <div className={styles.badges}>
          {t.fullGrant ? <span className={styles.badgeGold}>Полный грант для иностранцев</span> : null}
          {t.needBlind ? <span className={styles.badge}>Need-blind</span> : null}
          {t.instType ? <span className={styles.badge}>{t.instType}</span> : null}
        </div>

        <p className={styles.copy}>{summary}</p>

        <dl className={styles.facts}>
          <Fact label="Acceptance rate" value={t.acceptance} />
          <Fact label="Стоимость" value={t.tuitionBand} />
          <Fact label="Студентов (бакалавриат)" value={t.enrollment} />
          <Fact label="Иностранных студентов" value={t.intlPct} />
        </dl>

        {t.majors.length ? (
          <div className={styles.majors}>
            <h2>Сильные направления</h2>
            <ul>
              {t.majors.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <section className={styles.locked} aria-labelledby="locked-title">
          <h2 id="locked-title">Открывается после подписки</h2>
          <ul>
            {locked.map((label) => (
              <li key={label}>
                <span className={styles.lockIcon} aria-hidden>
                  🔒
                </span>
                <span>{label}</span>
                <span className={styles.blur} aria-hidden>
                  ████████
                </span>
              </li>
            ))}
          </ul>
          <GateCta botUsername={botUsername} label="Открыть полный профиль бесплатно" />
          <p className={styles.note}>Подпишись на @studyaza и войди через Telegram — это бесплатно.</p>
        </section>
      </article>

      {related.length ? (
        <section className={styles.related} aria-labelledby="related-title">
          <h2 id="related-title">Другие университеты: {t.countryRu}</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/unis/${r.slug}`}>{r.name}</Link>
                {r.full_grant ? <span className={styles.dot} title="Полный грант" /> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
