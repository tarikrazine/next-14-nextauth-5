"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { verificationToken } from "@/db/schema/verificationToken";
import { getUserByEmail } from "@/lib/data";
import { getVerificationTokenByToken } from "@/lib/verificationToken";

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token not found",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "User not found!",
    };
  }

  await db.update(users).set({
    emailVerified: new Date(),
    email: existingToken.email,
  }).where(eq(users.id, existingUser.id));

  await db.delete(verificationToken).where(
    eq(verificationToken.id, existingToken.id),
  );

  return {
    success: "Email verified!",
  };
}
