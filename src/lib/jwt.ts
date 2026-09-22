import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "govtassist-secret-jwt-key-2026-production-demo"
);

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: "CITIZEN" | "ADMIN";
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
