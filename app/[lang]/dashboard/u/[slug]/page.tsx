import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { UniProfile } from "@/components/uni/UniProfile";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { fetchRelatedUniversities, fetchUniversityBySlug } from "@/lib/universities";

export const dynamic = "force-dynamic";

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

/** Subscriber view of a university, opened from the catalog (keeps the filter back-link). */
export default async function UniversityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; lang: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  const { slug, lang: rawLang } = await params;
  const lang = langOf(rawLang);
  if (!session?.subscribed) redirect(localizePath(lang, `/unis/${encodeURIComponent(slug)}`));

  const sp = await searchParams;
  const u = await fetchUniversityBySlug(slug);
  if (!u) notFound();
  if (u.slug !== slug) {
    redirect(localizePath(lang, `/dashboard/u/${u.slug}${sp.from ? `?from=${encodeURIComponent(sp.from)}` : ""}`));
  }
  const related = await fetchRelatedUniversities(u.country, u.slug, 6).catch(() => []);

  return (
    <>
      <SiteHeader />
      <UniProfile
        u={u}
        related={related}
        full
        backHref={safeBackHref(sp.from)}
        backLabel={trFor(lang)("К списку", "Ro'yxatga")}
        lang={lang}
        relatedBase="/dashboard/u"
        botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
      />
      <SiteFooter />
    </>
  );
}
