import jwt from "jsonwebtoken";
import { UserPayload } from "../type/User";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

function signJwt(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

function verifyJwt(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

function decodeJwt(token: string): UserPayload | null {
  try {
    return jwt.decode(token) as UserPayload | null;
  } catch (err) {
    console.error("JWT decode failed:", err);
    return null;
  }
}

export { signJwt, verifyJwt, decodeJwt };
