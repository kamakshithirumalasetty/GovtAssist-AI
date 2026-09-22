import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "govtassist-secret-jwt-key-2026-production-demo"
);

const COOKIE_NAME = "govtassist_session";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: "CITIZEN" | "ADMIN";
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function encryptSession(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function decryptSession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch (err) {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await decryptSession(token);
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await encryptSession(payload);
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
