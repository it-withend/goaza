import { createHash, createHmac, timingSafeEqual } from "crypto";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "goaza_tg";
export const SESSION_TTL = 60 * 60 * 24 * 7;

function authSecret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("Missing AUTH_SECRET");
  return new TextEncoder().encode(s);
}

export type TgSession = {
  tgId: number;
  username?: string;
  firstName?: string;
  subscribed: boolean;
};

/** Verify Telegram Login Widget payload hash. */
export function verifyTelegramLogin(data: Record<string, string>): boolean {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return false;
  const hash = data.hash;
  if (!hash) return false;
  const rest = { ...data };
  delete rest.hash;
  const checkString = Object.keys(rest)
    .sort()
    .map((k) => `${k}=${rest[k]}`)
    .join("\n");
  const secretKey = createHash("sha256").update(token).digest();
  const hmac = createHmac("sha256", secretKey).update(checkString).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(hmac, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

export async function checkChannelMember(userId: number): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channel = process.env.TELEGRAM_CHANNEL || "@studyaza";
  if (!token) return false;
  const url = `https://api.telegram.org/bot${token}/getChatMember?chat_id=${encodeURIComponent(channel)}&user_id=${userId}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return false;
  const json = (await res.json()) as {
    ok: boolean;
    result?: { status: string };
  };
  if (!json.ok || !json.result) return false;
  return ["creator", "administrator", "member"].includes(json.result.status);
}

export async function createSessionToken(payload: TgSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL}s`)
    .sign(authSecret());
}

export async function readSessionToken(token: string | undefined): Promise<TgSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, authSecret());
    if (!payload.subscribed) return null;
    return {
      tgId: Number(payload.tgId),
      username: typeof payload.username === "string" ? payload.username : undefined,
      firstName: typeof payload.firstName === "string" ? payload.firstName : undefined,
      subscribed: true,
    };
  } catch {
    return null;
  }
}
