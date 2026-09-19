import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UniGateScreen } from "@/components/gate/UniGateScreen";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSupabaseAnon } from "@/lib/supabase";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог университетов",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/unis" },
  robots: { index: true, follow: true },
};

export default async function UnisIndexPage() {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (session?.subscribed) redirect("/dashboard");

  let count = 1000;
  try {
    const sb = getSupabaseAnon();
    const { count: c } = await sb.from("universities").select("id", { count: "exact", head: true });
    if (typeof c === "number") count = c;
  } catch {
    /* keep fallback */
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Каталог университетов · ${SITE_NAME}`,
    url: `${SITE_URL}/unis`,
    description: SITE_DESCRIPTION,
    numberOfItems: count,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <UniGateScreen
        title={`${count}+ университетов в атласе Studyaza`}
        place="Доступ после подписки на @studyaza"
        botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
      />
    </>
  );
}
