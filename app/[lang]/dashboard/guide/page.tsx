import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdmissionsGuideClient } from "@/components/guide/AdmissionsGuideClient";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("Гайд абитуриента и база знаний", "Abituriyent qo'llanmasi va bilimlar bazasi"),
    robots: { index: false, follow: false },
  };
}

export default async function AdmissionsGuidePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (!session?.subscribed) redirect(localizePath(lang, "/"));

  return (
    <AdmissionsGuideClient accountName={session.username || session.firstName || "Telegram user"} />
  );
}
