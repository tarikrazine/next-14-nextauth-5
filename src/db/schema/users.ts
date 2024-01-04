import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

import { accounts } from "./accounts";

export const users = sqliteTable("user", {
  id: text("id").notNull().$defaultFn(() => createId()).primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));
