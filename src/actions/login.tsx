"use server";

import { LoginSchemaType, loginSchema } from "@/schema/loginSchema";

export async function login(values: LoginSchemaType) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  return {
    success: "Login successful",
  };
}
