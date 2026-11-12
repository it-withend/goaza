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
    const raw: unknown = await req.json().catch(() => null);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const body: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (typeof v === "string" || typeof v === "number") body[k] = String(v);
    }
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
      secure: process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL,
    });
    return res;
  } catch (e) {
    console.error("[api/auth/telegram]", e);
    return NextResponse.json({ error: "auth_failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
