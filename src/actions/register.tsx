"use server";

import { RegisterSchemaType, registerSchema } from "@/schema/registerSchema";

export async function register(values: RegisterSchemaType) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  return {
    success: "Register successful",
  };
}
