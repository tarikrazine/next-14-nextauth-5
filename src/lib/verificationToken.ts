import { eq } from "drizzle-orm";

import { db } from "@/db";
import { verificationToken } from "@/db/schema/verificationToken";

export async function getVerificationTokenByEmail(email: string) {
  try {
    const [vToken] = await db.select().from(verificationToken).where(
      eq(verificationToken.email, email),
    );

    return vToken;
  } catch (error) {
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const [vToken] = await db.select().from(verificationToken).where(
      eq(verificationToken.token, token),
    );

    return vToken;
  } catch (error) {
    return null;
  }
}
