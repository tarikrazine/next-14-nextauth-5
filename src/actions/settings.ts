"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";
import { SettingsSchemaType } from "@/schema/settings.schema";
import { revalidatePath } from "next/cache";

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

  await db.update(users).set({ ...values }).where(eq(users.id, userDB.id));

  revalidatePath("/dashboard/settings");

  return {
    success: "Settings updated",
  };
}
