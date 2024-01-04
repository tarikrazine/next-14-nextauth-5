"use server";

import bcrypt from "bcrypt";

import { RegisterSchemaType, registerSchema } from "@/schema/registerSchema";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { getUserByEmail } from "@/lib/data";

export async function register(values: RegisterSchemaType) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "User already exists!",
    };
  }

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return {
    success: "Email sent!",
  };
}
