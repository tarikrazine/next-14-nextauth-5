import { db } from "@/db";
import { passwordResetToken } from "@/db/schema/passwordResetToken";
import { eq } from "drizzle-orm";

export async function getPasswordResetTokenByToken(token: string) {
  try {
    const [passwordToken] = await db.select().from(passwordResetToken).where(
      eq(passwordResetToken.token, token),
    );

    return passwordToken;
  } catch {
    return null;
  }
}

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    const [passwordToken] = await db.select().from(passwordResetToken).where(
      eq(passwordResetToken.email, email),
    );

    return passwordToken;
  } catch {
    return null;
  }
}
