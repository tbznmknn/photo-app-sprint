import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export interface UserSession {
  id: string;
  first_name: string;
  last_name: string;
  login_name: string;
  iat: number;
  exp: number;
}
export default async function getToken() {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("TOKEN") || null;
  if (TOKEN === null || TOKEN === undefined) return null;

  return TOKEN.value;
}
export async function getSession() {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("TOKEN")?.value || null;

  if (TOKEN) {
    try {
      const tokenObj = jwt.verify(
        TOKEN,
        process.env.AUTH_SECRET!,
        (err, decoded) => {
          if (err) {
            if (err.name === "TokenExpiredError") {
              return null;
            }
            return null;
          }
          return decoded;
        }
      );
      const decoded: UserSession | null =
        TOKEN && typeof TOKEN === "string"
          ? (jwt.decode(TOKEN) as UserSession | null)
          : null;
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  return null;
}
