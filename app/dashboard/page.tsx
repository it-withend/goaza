import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { fetchBrowseUniversities, computeMeta } from "@/lib/universities";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);
  if (!session?.subscribed) redirect("/");
  const initial = await fetchBrowseUniversities();
  const sp = await searchParams;
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string" && value) qs.set(key, value);
  }
  return (
    <DashboardClient
      initial={initial}
      meta={computeMeta(initial)}
      accountName={session.username || session.firstName || "Telegram user"}
      initialQuery={qs.toString()}
    />
  );
}
