import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema/users";

export async function getUserByEmail(email: string) {
  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return existingUser;
  } catch (error) {
    console.log("[GET_USER_BY_EMAIL_ERROR]", error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return user;
  } catch (error) {
    console.log("[GET_USER_BY_ID_ERROR]", error);
    return null;
  }
}
