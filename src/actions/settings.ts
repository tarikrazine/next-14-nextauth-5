"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";
import { SettingsSchemaType } from "@/schema/settings.schema";

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
  }

  await db.update(users).set({ ...values }).where(eq(users.id, userDB.id));

  return {
    success: "Settings updated",
  };
}
