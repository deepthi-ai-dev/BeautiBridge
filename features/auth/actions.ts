"use server";

import { UserRole } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { Route } from "next";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/server/db";
import {
  defaultAuthenticatedRedirect,
  authRoutes,
} from "@/server/auth";
import { getSafeCallbackUrl } from "@/features/auth/redirect";
import { registerSchema, roleSelectionSchema } from "@/features/auth/schemas";

export type AuthActionResult = {
  fieldErrors?: Partial<Record<"email" | "password" | "confirmPassword", string>>;
  message: string;
  status: "error" | "success";
};

function getDatabaseErrorResult(): AuthActionResult {
  return {
    message:
      "The database is not initialized. Please ensure the database schema is pushed.",
    status: "error",
  };
}

export async function registerUserAction(
  input: unknown,
): Promise<AuthActionResult> {
  const parsedInput = registerSchema.safeParse(input);

  if (!parsedInput.success) {
    const fieldErrors = parsedInput.error.flatten().fieldErrors;

    return {
      fieldErrors: {
        confirmPassword: fieldErrors.confirmPassword?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
      message: "Please fix the highlighted fields.",
      status: "error",
    };
  }

  let existingUser: { id: string } | null = null;

  try {
    existingUser = await db.user.findUnique({
      where: { email: parsedInput.data.email },
      select: { id: true },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2021"
    ) {
      return getDatabaseErrorResult();
    }

    throw error;
  }

  if (existingUser) {
    return {
      fieldErrors: {
        email: "An account with this email already exists.",
      },
      message: "Unable to create account.",
      status: "error",
    };
  }

  const hashedPassword = await hash(parsedInput.data.password, 12);

  try {
    await db.user.create({
      data: {
        email: parsedInput.data.email,
        password: hashedPassword,
        role: parsedInput.data.role,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2021"
    ) {
      return getDatabaseErrorResult();
    }

    throw error;
  }

  return {
    message: "Account created successfully. Please sign in.",
    status: "success",
  };
}

export async function selectUserRoleAction(input: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(authRoutes.login);
  }

  const parsedInput = roleSelectionSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      message: "Choose your role before continuing.",
      status: "error" as const,
    };
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: {
        role: parsedInput.data.role as UserRole,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2021"
    ) {
      return {
        message:
          "The database is not initialized. Please ensure the database schema is pushed, then sign in again.",
        status: "error" as const,
      };
    }

    throw error;
  }

  redirect(
    getSafeCallbackUrl(
      parsedInput.data.callbackUrl,
      defaultAuthenticatedRedirect,
    ) as Route,
  );
}
