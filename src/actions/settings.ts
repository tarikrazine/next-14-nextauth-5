"use server";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";
import { SettingsSchemaType } from "@/schema/settings.schema";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function settings(values: SettingsSchemaType) {
  const user = await auth();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const userDB = await getUserByEmail(user.user.email as string);

  if (!userDB) {
    return { error: "User not found" };
  }

  if (user?.user?.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user?.user?.email) {
    const userByEmail = await getUserByEmail(values.email);

    if (userByEmail && userByEmail.id !== user?.user?.id) {
      return {
        error: "Email already in use",
      };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail({
      name: user?.user?.name as string,
      email: verificationToken?.email as string,
      token: verificationToken.token,
    });

    return {
      success: "Verification email sent",
    };
  }

  if (values.password && values.newPassword && userDB.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      userDB.password,
    );

    if (!passwordMatch) {
      return {
        error: "Incorrect password",
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db
    .update(users)
    .set({ ...values })
    .where(eq(users.id, userDB.id));

  return {
    success: "Settings updated",
  };
}
