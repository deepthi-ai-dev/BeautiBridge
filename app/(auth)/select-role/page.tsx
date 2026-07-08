import type { Route } from "next";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { RoleSelectionForm } from "@/components/auth/role-selection-form";
import { getSafeCallbackUrl } from "@/features/auth/redirect";
import { db } from "@/server/db";
import {
  authRoutes,
  defaultAuthenticatedRedirect,
} from "@/server/auth";

type SelectRolePageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SelectRolePage({
  searchParams,
}: SelectRolePageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(authRoutes.login);
  }

  let user: { role: string | null } | null = null;

  try {
    user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2021"
    ) {
      return (
        <AuthCard
          description="We could not load your role right now."
          title="Database not initialized"
        >
          <p className="text-muted-foreground text-sm">
            Please ensure the database is initialized and refresh the page.
          </p>
        </AuthCard>
      );
    }

    throw error;
  }

  const params = await searchParams;

  const callbackUrl = getSafeCallbackUrl(
    params?.callbackUrl,
    defaultAuthenticatedRedirect,
  );

  if (user?.role) {
    redirect(callbackUrl as Route);
  }

  return (
    <AuthCard
      description="Choose how you will use BeautiBridge so we can tailor your experience."
      title="Choose your role"
    >
      <RoleSelectionForm callbackUrl={callbackUrl} />
    </AuthCard>
  );
}
