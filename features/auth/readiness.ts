import { Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { authConfig } from "@/server/auth-config";

export type AuthReadiness = {
  canUseGoogleOAuth: boolean;
  databaseMessage: string | null;
  hasBlockingIssue: boolean;
  secretMessage: string | null;
};

export async function getAuthReadiness(): Promise<AuthReadiness> {
  let databaseMessage: string | null = null;

  try {
    await db.user.count();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2021"
    ) {
      databaseMessage =
        "The database is not initialized. Please run `npx prisma db push` to create the required tables.";
    } else {
      console.error("[Auth Readiness] Database connection failed:", error);
      databaseMessage =
        "Unable to connect to the PostgreSQL database. Please verify your DATABASE_URL environment variable.";
    }
  }

  const secretMessage = process.env.AUTH_SECRET?.trim()
    ? null
    : "AUTH_SECRET is missing. Add it in .env to avoid insecure local fallback and production failures.";

  return {
    canUseGoogleOAuth: authConfig.isGoogleOAuthEnabled,
    databaseMessage,
    hasBlockingIssue: Boolean(databaseMessage),
    secretMessage,
  };
}
