import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

import { accounts } from "./accounts";
import { twoFactorAuth } from "./twoFactorAuth";

export const users = sqliteTable("user", {
  id: text("id").notNull().$defaultFn(() => createId()).primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password"),
  role: text("role", { enum: ["ADMIN", "USER"] }).default("USER"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  isTwoFactorEnabled: integer("is_two_factor_enabled", { mode: "boolean" })
    .default(false)
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  twoFactorAuth: many(twoFactorAuth),
}));
