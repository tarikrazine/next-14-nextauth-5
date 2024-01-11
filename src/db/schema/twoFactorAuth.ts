import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

import { users } from "./users";

export const twoFactorAuth = sqliteTable("two_factor_auth", {
  id: text("id").$default(() => createId()).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" })
    .notNull(),
}, (twoFactorAuth) => ({
  compoundKey: primaryKey({
    columns: [twoFactorAuth.userId],
  }),
}));

export const twoFactorAuthRelations = relations(twoFactorAuth, ({ one }) => ({
  user: one(users, {
    fields: [twoFactorAuth.userId],
    references: [users.id],
  }),
}));
