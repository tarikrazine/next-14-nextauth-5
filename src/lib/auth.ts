import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "@/db";
import { loginSchema } from "@/schema/loginSchema";
import { getUserByEmail } from "./data";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  providers: [Credentials({
    async authorize(credentials) {
      const validatedFields = loginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password,
        );

        if (passwordsMatch) return user;
      }

      return null;
    },
  })],
});
