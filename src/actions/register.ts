"use server";

import bcrypt from "bcryptjs";

import { registerSchema, RegisterSchemaType } from "@/schema/register.schema";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { getUserByEmail } from "@/lib/data";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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

  await sendVerificationEmail({
    name: newUser.name || "",
    email: newUser.email,
    token: verificationToken.token,
  });

  return {
    success: "Confirmation email sent!",
  };
}
