import { NextResponse } from "next/server";
import {
  checkChannelMember,
  createSessionToken,
  SESSION_COOKIE,
  SESSION_TTL,
  verifyTelegramLogin,
} from "@/lib/telegram-auth";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, string>;
    if (!body.id || !body.hash || !body.auth_date) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const authDate = Number(body.auth_date);
    if (!Number.isFinite(authDate) || Date.now() / 1000 - authDate > 86400) {
      return NextResponse.json({ error: "Login expired" }, { status: 401 });
    }
    if (!verifyTelegramLogin(body)) {
      return NextResponse.json({ error: "Bad signature" }, { status: 401 });
    }
    const tgId = Number(body.id);
    const subscribed = await checkChannelMember(tgId);
    if (!subscribed) {
      return NextResponse.json(
        {
          error: "not_subscribed",
          message: "Подпишитесь на @studyaza, затем войдите снова",
        },
        { status: 403 },
      );
    }
    const token = await createSessionToken({
      tgId,
      username: body.username,
      firstName: body.first_name,
      subscribed: true,
    });
    const res = NextResponse.json({
      ok: true,
      subscribed: true,
      username: body.username || body.first_name || null,
    });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL,
    });
    return res;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Auth failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
