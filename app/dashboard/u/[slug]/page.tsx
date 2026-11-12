import Image from "next/image";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { fetchRelatedUniversities, fetchUniversityBySlug } from "@/lib/universities";
import { daysLeftLabel, describeDeadline } from "@/lib/deadline";
import { countryRu, INST_LABEL } from "@/lib/types";
import { campusPhotoUrl } from "@/lib/campus-photo";
import { websiteUrl } from "@/lib/university-logo";
import { UniversityLogo } from "@/components/UniversityLogo";
import { hasLogo } from "@/lib/logos";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import styles from "./university.module.css";

export const dynamic = "force-dynamic";

type Val = string | number | null | undefined;

const has = (v: Val) => v != null && String(v).trim() !== "";

function Row({ label, value }: { label: string; value?: Val }) {
  if (!has(value)) return null;
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{String(value)}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value?: Val }) {
  if (!has(value)) return null;
  return (
    <div className={styles.stat}>
      <small>{label}</small>
      <strong>{String(value)}</strong>
    </div>
  );
}

function splitList(raw: string | null | undefined, max = 12): string[] {
  return (raw ?? "")
    .split(/[,;\n]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
    .slice(0, max);
}

function safeBackHref(from: string | undefined): string {
  if (!from) return "/dashboard";
  try {
    const decoded = decodeURIComponent(from);
    if (/[\\\s]/.test(decoded)) return "/dashboard";
    if (decoded === "/dashboard" || decoded.startsWith("/dashboard?")) return decoded;
    if (decoded.startsWith("?")) return `/dashboard${decoded}`;
    if (/^[a-z0-9=&_%.-]+$/i.test(decoded)) return `/dashboard?${decoded}`;
  } catch {
    /* ignore */
  }
  return "/dashboard";
}

export default async function UniversityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (!session?.subscribed) redirect("/");

  const { slug } = await params;
  const sp = await searchParams;
  const backHref = safeBackHref(sp.from);
  const u = await fetchUniversityBySlug(slug);
  if (!u) notFound();
  if (u.slug !== slug) {
    redirect(`/dashboard/u/${u.slug}${sp.from ? `?from=${encodeURIComponent(sp.from)}` : ""}`);
  }

  const photo = campusPhotoUrl(u.slug);
  const site = websiteUrl(u.website_domain);
  const related = await fetchRelatedUniversities(u.country, u.slug, 6).catch(() => []);
  const tags = [
    ...(u.need_blind ? ["Need-blind"] : []),
    ...(u.inst_tags || []).map((t) => INST_LABEL[t] || t),
  ];
  const early = describeDeadline(u.early_deadline);
  const regular = describeDeadline(u.regular_deadline);
  const deadlines = [
    { label: "Ранний", d: early },
    { label: "Основной", d: regular },
  ].filter((x) => x.d);
  const majors = splitList(u.majors);
  const aidTypes = (u.aid_types || []).filter(Boolean);
  const finance: [string, Val][] = [
    ["Средний грант", u.avg_aid_award],
    ["Иностранцев с помощью", u.intl_receiving_aid_pct],
    ["Стоимость после помощи", u.coa_after_aid_pct],
    ["Общий бюджет помощи", u.total_aid_millions],
    ["Стипендия за успеваемость", u.merit_scholarship_name],
    ["Политика для иностранцев", u.intl_aid_policy],
    ["Как подать на помощь", u.how_apply_aid],
  ];
  const students: [string, Val][] = [
    ["Бакалавров", u.undergrad_enrollment],
    ["Иностранцев", u.intl_undergrad_pct],
    ["Иностранцев, чел.", u.intl_undergrad_count],
    ["Стран представлено", u.countries_represented],
    ["Приём иностранцев", u.intl_acceptance_rate],
    ["Yield иностранцев", u.intl_yield],
  ];
  const hasFinance = aidTypes.length > 0 || finance.some(([, v]) => has(v));
  const hasReq = [u.lang, u.sat, u.essay].some(has);
  const hasStudents = students.some(([, v]) => has(v));

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <Image className={styles.heroImg} src={photo} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.heroNav}>
            <Link href={backHref} className={styles.back}>
              ← К списку
            </Link>
          </nav>
          <div className={styles.heroBrand}>
            <div className={styles.logoTile}>
              <UniversityLogo name={u.name} slug={u.slug} logo={hasLogo(u.slug)} size={84} priority />
            </div>
            <div className={styles.heroText}>
              <p className={styles.place}>
                {countryRu(u.country)}
                {u.city ? ` · ${u.city}` : ""}
                {u.inst_type ? ` · ${u.inst_type}` : ""}
              </p>
              <h1>{u.name}</h1>
              <div className={styles.tags}>
                {u.full_grant ? <span className={styles.tagGold}>Полный грант для иностранцев</span> : null}
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <section className={styles.metrics} aria-label="Ключевые цифры">
          <div>
            <small>Стоимость</small>
            <strong>{u.tuition_display || "—"}</strong>
          </div>
          <div>
            <small>Поступление</small>
            <strong>{u.acceptance_rate || "—"}</strong>
            {u.rate_num != null ? (
              <span className={styles.meter} aria-hidden>
                <i style={{ width: `${Math.max(2, Math.min(100, u.rate_num))}%` }} />
              </span>
            ) : null}
          </div>
          <div>
            <small>Макс. помощь</small>
            <strong>{u.aid_max || "—"}</strong>
          </div>
          <div>
            <small>Ближайший дедлайн</small>
            <strong>
              {(early && (early.daysLeft == null || early.daysLeft >= 0) ? early : regular || early)?.label || "—"}
            </strong>
          </div>
        </section>

        <div className={styles.layout}>
          <div className={styles.main}>
            {hasFinance ? (
              <section className={styles.panel}>
                <h2>Финансы и гранты</h2>
                {aidTypes.length ? (
                  <div className={styles.chips}>
                    {aidTypes.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                ) : null}
                <dl className={styles.dl}>
                  {finance.map(([label, value]) => (
                    <Row key={label} label={label} value={value} />
                  ))}
                </dl>
              </section>
            ) : null}

            {hasReq ? (
              <section className={styles.panel}>
                <h2>Требования</h2>
                <dl className={styles.dl}>
                  <Row label="Язык" value={u.lang} />
                  <Row label="SAT / ACT" value={u.sat} />
                  <Row label="Эссе" value={u.essay} />
                </dl>
              </section>
            ) : null}

            {hasStudents ? (
              <section className={styles.panel}>
                <h2>Студенты</h2>
                <div className={styles.stats}>
                  {students.map(([label, value]) => (
                    <Stat key={label} label={label} value={value} />
                  ))}
                </div>
              </section>
            ) : null}

            {majors.length ? (
              <section className={styles.panel}>
                <h2>Направления</h2>
                <div className={styles.chips}>
                  {majors.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </section>
            ) : null}

            {has(u.living_note) || has(u.notes) ? (
              <section className={styles.panel}>
                <h2>Полезно знать</h2>
                {has(u.living_note) ? (
                  <p className={styles.prose}>
                    <b>Проживание.</b> {u.living_note}
                  </p>
                ) : null}
                {has(u.notes) ? <p className={styles.prose}>{u.notes}</p> : null}
              </section>
            ) : null}
          </div>

          <aside className={styles.side}>
            <section className={styles.panel}>
              <h2>Сроки</h2>
              {deadlines.length ? (
                <ul className={styles.deadlines}>
                  {deadlines.map(({ label, d }) =>
                    d ? (
                      <li key={label}>
                        <small>{label}</small>
                        <strong>{d.label}</strong>
                        {d.daysLeft != null ? (
                          <em className={d.daysLeft < 0 ? styles.past : d.daysLeft <= 30 ? styles.soon : undefined}>
                            {daysLeftLabel(d.daysLeft)}
                          </em>
                        ) : null}
                      </li>
                    ) : null,
                  )}
                </ul>
              ) : (
                <p className={styles.muted}>Дедлайны уточняются на сайте вуза.</p>
              )}
              {site ? (
                <a className={styles.siteLink} href={site} target="_blank" rel="noopener noreferrer">
                  Официальный сайт ↗
                </a>
              ) : null}
            </section>

            {related.length ? (
              <section className={styles.panel}>
                <h2>Ещё в стране: {countryRu(u.country)}</h2>
                <ul className={styles.related}>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/dashboard/u/${r.slug}`} prefetch={false}>
                        <UniversityLogo name={r.name} slug={r.slug} logo={hasLogo(r.slug)} size={32} />
                        <span>
                          {r.name}
                          {r.full_grant ? <i className={styles.grantDot} title="Полный грант" /> : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
