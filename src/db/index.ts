import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { env } from "../env.mjs";

import * as usersSchema from "@/db/schema/users";
import * as accountsSchema from "@/db/schema/accounts";
import * as sessionsSchema from "@/db/schema/sessions";
import * as twoFactorAuth from "@/db/schema/twoFactorAuth";
import * as twoFactorToken from "@/db/schema/twoFactorToken";
import * as verificationToken from "@/db/schema/verificationToken";
import * as passwordResetToken from "@/db/schema/passwordResetToken";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: {
    ...usersSchema,
    ...accountsSchema,
    ...sessionsSchema,
    ...twoFactorAuth,
    ...twoFactorToken,
    ...verificationToken,
    ...passwordResetToken,
  },
});
