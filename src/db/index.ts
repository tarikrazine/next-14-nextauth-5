import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { env } from "../env.mjs";

import * as usersSchema from "@/db/schema/users";
import * as sessionsSchema from "@/db/schema/sessions";
import * as accountsSchema from "@/db/schema/accounts";
import * as verificationTokensSchema from "@/db/schema/verificationTokens";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: {
    ...usersSchema,
    ...sessionsSchema,
    ...accountsSchema,
    ...verificationTokensSchema,
  },
});
