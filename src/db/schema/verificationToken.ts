import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const verificationToken = sqliteTable("verification_token", {
  id: text("id").$default(() => createId()).notNull(),
  email: text("email").notNull(),
  token: text("token").notNull(),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
}, (verificationToken) => ({
  compoundKey: primaryKey({
    columns: [verificationToken.email, verificationToken.token],
  }),
}));
