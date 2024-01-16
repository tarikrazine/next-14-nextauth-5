import { eq } from "drizzle-orm";

import { db } from "@/db";
import { accounts } from "@/db/schema/accounts";

export async function getAccountByUserId(userId: string) {
  try {
    const [account] = await db.select().from(accounts).where(
      eq(accounts.userId, userId),
    );

    return account;
  } catch {
    return null;
  }
}
