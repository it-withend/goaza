import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { fetchLandingStats } from "@/lib/landing-stats";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (session?.subscribed) redirect("/dashboard");
  const stats = await fetchLandingStats();
  return (
    <LandingPage
      stats={stats}
      botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "goazabot"}
    />
  );
}
