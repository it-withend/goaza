import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { fetchUniversities, type UniQuery } from "@/lib/universities";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value);

  // The catalog is gated: no data leaves this endpoint without a subscribed session.
  if (!session?.subscribed) {
    return NextResponse.json(
      { error: "subscription_required", message: "Нужна подписка на @studyaza" },
      { status: 401, headers: { "Cache-Control": "private, no-store" } },
    );
  }

  const query: UniQuery = {
    q: sp.get("q") || undefined,
    country: sp.get("country") || undefined,
    grantOnly: sp.get("grantOnly") === "1",
    needBlind: sp.get("needBlind") === "1",
    tuitionMax: sp.has("tuitionMax") ? Number(sp.get("tuitionMax")) : undefined,
    aidMin: sp.has("aidMin") ? Number(sp.get("aidMin")) : undefined,
    rateMax: sp.has("rateMax") ? Number(sp.get("rateMax")) : undefined,
    inst: sp.get("inst")?.split(",").filter(Boolean),
    aidTypes: sp.get("aidTypes")?.split(",").filter(Boolean),
    sort: (sp.get("sort") as UniQuery["sort"]) || "name",
    limit: 2000,
  };

  try {
    const data = await fetchUniversities(query);
    return NextResponse.json(
      { data, count: data.length },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Query failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
