"use server";

import bcrypt from "bcryptjs";

import { registerSchema, RegisterSchemaType } from "@/schema/registerSchema";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { getUserByEmail } from "@/lib/data";
import { generateVerificationToken } from "@/lib/tokens";

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

  const [newUser] = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  }).returning();

  const verificationToken = await generateVerificationToken(newUser.email);

  return {
    success: "Confirmation email sent!",
  };
}
