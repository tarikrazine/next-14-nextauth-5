import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().min(1),
  },
  client: {
    //NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  //   runtimeEnv: {
  //     DATABASE_URL: process.env.DATABASE_URL,
  //     DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
  //     //NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  //   },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    //NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
