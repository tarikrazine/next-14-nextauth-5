"use server";

import { AuthError } from "next-auth";
import { eq } from "drizzle-orm";

import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import { db } from "@/db";
import {
  generateTwoFactorAuthToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/lib/data";
import { sendTwoFactorAuthTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/lib/twoFactorToken";
import { twoFactorAuth } from "@/db/schema/twoFactorAuth";
import { twoFactorToken } from "@/db/schema/twoFactorToken";
import { getTwoFactorAuthConfirmationById } from "@/lib/twoFactorAuthConfirmation";

export async function login(values: LoginSchemaType) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Email does not exist!",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail({
      name: existingUser.name || "",
      email: existingUser.email,
      token: verificationToken.token,
    });

    return { success: "Email not verified, please check your email" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorAuthToken = await getTwoFactorTokenByEmail(
        existingUser.email,
      );

      if (!twoFactorAuthToken) {
        return { error: "Invalid Two factor token!" };
      }

      if (twoFactorAuthToken.token !== code) {
        return { error: "Invalid Two factor token!" };
      }

      const hasExpired = twoFactorAuthToken.expires < new Date();

      if (hasExpired) {
        return { error: "Two factor token has expired!" };
      }

      await db.delete(twoFactorToken).where(
        eq(twoFactorToken.id, twoFactorAuthToken.id),
      );

      const existingConfirmation = await getTwoFactorAuthConfirmationById(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.delete(twoFactorAuth).where(
          eq(twoFactorAuth.id, existingConfirmation.id),
        );
      }

      await db.insert(twoFactorAuth).values({ userId: existingUser.id });
    } else {
      const twoFactorAuthToken = await generateTwoFactorAuthToken(
        existingUser.email,
      );

      await sendTwoFactorAuthTokenEmail({
        name: existingUser.name || "",
        email: existingUser.email,
        token: twoFactorAuthToken.token,
      });

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}
