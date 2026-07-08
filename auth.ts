import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { Prisma, UserRole } from "@prisma/client";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/server/db";
import { credentialsLoginSchema } from "@/features/auth/schemas";
import { authConfig, resolveAuthSecret } from "@/server/auth-config";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
      rememberMe: {},
    },
    async authorize(credentials) {
      const parsedCredentials = credentialsLoginSchema.safeParse(credentials);

      if (!parsedCredentials.success) {
        return null;
      }

      try {
        const user = await db.user.findUnique({
          where: { email: parsedCredentials.data.email },
          select: {
            email: true,
            id: true,
            image: true,
            name: true,
            password: true,
            role: true,
          },
        });

        if (!user?.password || !user.email) {
          return null;
        }

        const isValidPassword = await compare(
          parsedCredentials.data.password,
          user.password,
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          email: user.email,
          id: user.id,
          image: user.image,
          name: user.name,
          role: user.role,
        };
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2021"
        ) {
          return null;
        }

        throw error;
      }
    },
  }),
];

if (authConfig.isGoogleOAuthEnabled) {
  providers.unshift(
    Google({
      clientId: authConfig.googleClientId ?? "",
      clientSecret: authConfig.googleClientSecret ?? "",
    }),
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user && "role" in user) {
        token.role = user.role;
      }

      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      // Only fetch from DB if role is strictly missing 
      if (token.sub && !token.role) {
        try {
          const dbUser = await db.user.findUnique({
            where: { id: token.sub },
            select: { role: true },
          });

          token.role = dbUser?.role ?? null;
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2021"
          ) {
            return token;
          }
          throw error;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as UserRole) ?? null;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: resolveAuthSecret(),
  session: {
    strategy: "jwt",
  },
});
