import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";
import { fetchUniversities, type UniQuery } from "@/lib/universities";

function hasFilterParams(sp: URLSearchParams) {
  const keys = [
    "q",
    "country",
    "grantOnly",
    "needBlind",
    "tuitionMax",
    "aidMin",
    "rateMax",
    "inst",
    "aidTypes",
    "sort",
  ];
  return keys.some((k) => {
    const v = sp.get(k);
    if (v == null || v === "") return false;
    if (k === "tuitionMax" && v === "120000") return false;
    if (k === "aidMin" && v === "0") return false;
    if (k === "rateMax" && v === "100") return false;
    if (k === "sort" && v === "name") return false;
    return true;
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value);

  if (hasFilterParams(sp) && !session?.subscribed) {
    return NextResponse.json(
      { error: "subscription_required", message: "Нужна подписка на @studyaza" },
      { status: 401 },
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
    return NextResponse.json({ data, count: data.length });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Query failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
