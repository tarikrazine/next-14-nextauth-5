"use server";

import { getUserByEmail } from "@/lib/data";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import {
  resetPasswordSchema,
  ResetPasswordType,
} from "@/schema/resetPassword.schema";

export async function resetPassword(values: ResetPasswordType) {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "Email not found!",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email,
  );

  await sendPasswordResetEmail({
    token: passwordResetToken.token,
    email: existingUser.email,
    name: existingUser.name || "",
  });

  return {
    success: "Password reset email sent",
  };
}
