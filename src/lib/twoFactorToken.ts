import { eq } from "drizzle-orm";

import { db } from "@/db";
import { twoFactorToken } from "@/db/schema/twoFactorToken";

export async function getTwoFactorTokenByToken(token: string) {
  try {
    const [twoFactorTokenResult] = await db.select().from(twoFactorToken).where(
      eq(twoFactorToken.token, token),
    );

    return twoFactorTokenResult;
  } catch {
    return null;
  }
}

export async function getTwoFactorTokenByEmail(email: string) {
  try {
    const [twoFactorTokenResult] = await db.select().from(twoFactorToken).where(
      eq(twoFactorToken.email, email),
    );

    return twoFactorTokenResult;
  } catch {
    return null;
  }
}
