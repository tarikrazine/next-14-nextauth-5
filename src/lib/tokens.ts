import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db";
import { verificationToken } from "@/db/schema/verificationToken";

import { getVerificationTokenByEmail } from "./verificationToken";
import { getPasswordResetTokenByEmail } from "./passwordResetToken";
import { passwordResetToken } from "@/db/schema/passwordResetToken";

export async function generatePasswordResetToken(email: string) {
  const token = `token-${createId()}`;
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.delete(passwordResetToken).where(
      eq(passwordResetToken.id, existingToken.id),
    );
  }

  const [vToken] = await db.insert(passwordResetToken).values({
    email,
    expires,
    token,
  }).returning();

  return vToken;
}

export async function generateVerificationToken(email: string) {
  const token = `token-${createId()}`;
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(verificationToken)
      .where(
        eq(verificationToken.id, existingToken.id),
      );
  }

  const [vToken] = await db.insert(verificationToken).values({
    email,
    expires,
    token,
  }).returning();

  return vToken;
}
