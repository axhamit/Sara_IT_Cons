import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const COOKIE = "admin_token";
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

/** Returns the logged-in admin payload or null. Use in server components & route handlers. */
export async function getAdmin() {
  const token = cookies().get(COOKIE)?.value;
  return token ? verifyToken(token) : null;
}
