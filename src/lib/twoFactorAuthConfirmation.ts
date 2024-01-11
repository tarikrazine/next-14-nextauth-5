import { eq } from "drizzle-orm";

import { db } from "@/db";
import { twoFactorAuth } from "@/db/schema/twoFactorAuth";

export async function getTwoFactorAuthConfirmationById(userId: string) {
  try {
    const [twoFactorAuthConfirmation] = await db.select().from(twoFactorAuth)
      .where(eq(twoFactorAuth.userId, userId));

    return twoFactorAuthConfirmation;
  } catch {
    return null;
  }
}
