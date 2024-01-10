"use server";

import { getUserByEmail } from "@/lib/data";
import {
  resetPasswordSchema,
  ResetPasswordType,
} from "@/schema/resetPasswordSchema";

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

  return {
    success: "Password reset email sent",
  };
}
