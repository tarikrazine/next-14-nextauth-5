"use server";

import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/lib/data";
import { getPasswordResetTokenByToken } from "@/lib/passwordResetToken";
import {
  newPasswordSchema,
  NewPasswordSchemaType,
} from "@/schema/newPasswordSchema";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { passwordResetToken } from "@/db/schema/passwordResetToken";

export async function newPassword(
  values: NewPasswordSchemaType,
  token?: string | null,
) {
  if (!token) {
    return {
      error: "Missing token!",
    };
  }

  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid password",
    };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Email not exists!",
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await db.update(users).set({ password: hashPassword }).where(
    eq(users.id, existingUser.id),
  );
  await db.delete(passwordResetToken).where(
    eq(passwordResetToken.id, existingToken.id),
  );

  return {
    success: "Password changed successfully!",
  };
}
