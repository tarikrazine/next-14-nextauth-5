import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { db } from "@/db";
import { users } from "@/db/schema/users";

import { loginSchema } from "@/schema/login.schema";
import { getUserByEmail, getUserById } from "./data";
import { env } from "@/env.mjs";
import { getTwoFactorAuthConfirmationById } from "./twoFactorAuthConfirmation";
import { twoFactorAuth } from "@/db/schema/twoFactorAuth";
import { getAccountByUserId } from "./account";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  pages: {
    error: "/error",
    signIn: "/login",
  },
  events: {
    async linkAccount({ user, account }) {
      console.log("[PROVIDER: ]", account?.provider);
      await db.update(users).set({ emailVerified: new Date() }).where(
        eq(users.id, user.id),
      );
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorAuthConfirmation =
          await getTwoFactorAuthConfirmationById(existingUser.id);

        if (!twoFactorAuthConfirmation) {
          return false;
        }

        await db.delete(twoFactorAuth).where(
          eq(twoFactorAuth.id, twoFactorAuthConfirmation.id),
        );
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOauth = !!existingAccount;

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isOauth = token.isOauth as boolean;
      }

      return session;
    },
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
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
    }),
  ],
});
