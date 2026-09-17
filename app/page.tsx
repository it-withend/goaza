import { cookies } from "next/headers";
import { CatalogClient } from "@/components/CatalogClient";
import { fetchBrowseUniversities, computeMeta } from "@/lib/universities";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let initial = [] as Awaited<ReturnType<typeof fetchBrowseUniversities>>;
  let loadError: string | null = null;
  try {
    initial = await fetchBrowseUniversities();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "DB error";
  }
  const meta = computeMeta(initial);
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value).catch(() => null);

  return (
    <>
      {loadError ? (
        <div className="gate-banner show" style={{ margin: 20 }}>
          База временно недоступна: {loadError}. Проверьте env Supabase.
        </div>
      ) : null}
      <CatalogClient
        initial={initial}
        meta={meta}
        botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || ""}
        initiallySubscribed={Boolean(session?.subscribed)}
        initialUsername={session?.username || session?.firstName || null}
      />
    </>
  );
}
