import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/telegram-auth";

export async function GET() {
  const jar = await cookies();
  const session = await readSessionToken(jar.get(SESSION_COOKIE)?.value);
  return NextResponse.json({
    subscribed: Boolean(session?.subscribed),
    username: session?.username || session?.firstName || null,
  });
}
