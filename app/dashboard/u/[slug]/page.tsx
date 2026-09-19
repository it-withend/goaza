import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { fetchUniversityBySlug } from "@/lib/universities";
import { countryRu, INST_LABEL } from "@/lib/types";
import { campusPhotoUrl } from "@/lib/campus-photo";
import { websiteUrl } from "@/lib/university-logo";
import { UniversityLogo } from "@/components/UniversityLogo";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import styles from "./university.module.css";

export const dynamic = "force-dynamic";

function Row({ label, value }: { label: string; value?: string | number | null | boolean }) {
  if (value == null || value === "") return null;
  const text = typeof value === "boolean" ? (value ? "Да" : "Нет") : String(value);
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{text}</dd>
    </div>
  );
}

function safeBackHref(from: string | undefined): string {
  if (!from) return "/dashboard";
  try {
    const decoded = decodeURIComponent(from);
    if (decoded.startsWith("/dashboard")) return decoded;
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

  const photo = campusPhotoUrl(u.slug);
  const site = websiteUrl(u.website_domain);
  const tags = [
    ...(u.full_grant ? ["Полный грант"] : []),
    ...(u.need_blind ? ["Need-blind"] : []),
    ...(u.inst_tags || []).map((t) => INST_LABEL[t] || t),
  ];

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.heroImg} src={photo} alt="" />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <Link href={backHref} className={styles.back}>
            ← К списку
          </Link>
          <div className={styles.heroBrand}>
            <UniversityLogo name={u.name} domain={u.website_domain ?? null} size={64} />
            <div>
              <p className={styles.place}>
                {countryRu(u.country)}
                {u.city ? ` · ${u.city}` : ""}
              </p>
              <h1>{u.name}</h1>
              {tags.length ? (
                <div className={styles.tags}>
                  {tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              ) : null}
              {site ? (
                <a className={styles.siteLink} href={site} target="_blank" rel="noopener noreferrer">
                  Официальный сайт ↗
                </a>
              ) : null}
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
          </div>
          <div>
            <small>Помощь</small>
            <strong>{u.aid_max || "—"}</strong>
          </div>
          <div>
            <small>Дедлайн</small>
            <strong>{u.early_deadline || u.regular_deadline || "—"}</strong>
          </div>
        </section>

        <section className={styles.panel}>
          <h2>Поступление и финансы</h2>
          <dl className={styles.dl}>
            <Row label="Полный грант" value={u.full_grant ? "Доступен" : "Нет данных"} />
            <Row label="Типы помощи" value={(u.aid_types || []).join(", ")} />
            <Row label="Средняя помощь" value={u.avg_aid_award} />
            <Row label="Total aid" value={u.total_aid_millions} />
            <Row label="% иностранцев с помощью" value={u.intl_receiving_aid_pct} />
            <Row label="COA после помощи" value={u.coa_after_aid_pct} />
            <Row label="Merit scholarship" value={u.merit_scholarship_name} />
            <Row label="Политика для иностранцев" value={u.intl_aid_policy} />
            <Row label="Как подать на помощь" value={u.how_apply_aid} />
            <Row label="Need-blind" value={u.need_blind} />
            <Row label="Сайт" value={site} />
          </dl>
        </section>

        <section className={styles.panel}>
          <h2>Сроки и требования</h2>
          <dl className={styles.dl}>
            <Row label="Ранний дедлайн" value={u.early_deadline} />
            <Row label="Основной дедлайн" value={u.regular_deadline} />
            <Row label="Язык" value={u.lang} />
            <Row label="SAT / ACT" value={u.sat} />
            <Row label="Эссе" value={u.essay} />
          </dl>
        </section>

        <section className={styles.panel}>
          <h2>Кампус и профиль</h2>
          <dl className={styles.dl}>
            <Row label="Тип вуза" value={u.inst_type} />
            <Row label="Undergrad enrollment" value={u.undergrad_enrollment} />
            <Row
              label="International"
              value={[u.intl_undergrad_pct, u.intl_undergrad_count ? `${u.intl_undergrad_count} чел.` : ""]
                .filter(Boolean)
                .join(" / ")}
            />
            <Row label="Стран представлено" value={u.countries_represented} />
            <Row label="Intl acceptance" value={u.intl_acceptance_rate} />
            <Row label="Intl yield" value={u.intl_yield} />
            <Row label="Проживание" value={u.living_note} />
            <Row label="Направления" value={u.majors} />
            <Row label="Заметки" value={u.notes} />
          </dl>
        </section>
      </div>
    </main>
  );
}
