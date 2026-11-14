import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdmissionsGuideClient } from "@/components/guide/AdmissionsGuideClient";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Гайд абитуриента и база знаний",
  robots: { index: false, follow: false },
};

export default async function AdmissionsGuidePage() {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (!session?.subscribed) redirect("/");

  return (
    <AdmissionsGuideClient accountName={session.username || session.firstName || "Telegram user"} />
  );
}
