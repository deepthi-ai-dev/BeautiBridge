"use server";

import { z } from "zod";

import { UserRole } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { Route } from "next";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { auth, unstable_update } from "@/auth";
import { db } from "@/server/db";
import {
  defaultAuthenticatedRedirect,
  authRoutes,
} from "@/server/auth";
import { getSafeCallbackUrl } from "@/features/auth/redirect";
import { registerSchema, roleSelectionSchema } from "@/features/auth/schemas";

export type AuthActionResult = {
  fieldErrors?: Partial<Record<"name" | "phone" | "city" | "email" | "password" | "confirmPassword" | "dob" | "address" | "experience" | "about" | "languages" | "hobbies", string>>;
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
        name: fieldErrors.name?.[0],
        phone: fieldErrors.phone?.[0],
        city: fieldErrors.city?.[0],
        dob: fieldErrors.dob?.[0],
        address: fieldErrors.address?.[0],
        experience: fieldErrors.experience?.[0],
        about: fieldErrors.about?.[0],
        languages: fieldErrors.languages?.[0],
        hobbies: fieldErrors.hobbies?.[0],
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
    existingUser = await db.user.findFirst({
      where: {
        email: {
          equals: parsedInput.data.email,
          mode: "insensitive",
        },
      },
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
        name: parsedInput.data.name,
        phone: parsedInput.data.phone,
        city: parsedInput.data.city,
        dob: parsedInput.data.dob,
        address: parsedInput.data.address,
        experience: parsedInput.data.experience,
        about: parsedInput.data.about,
        languages: parsedInput.data.languages,
        hobbies: parsedInput.data.hobbies,
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

const completeProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  city: z.string().min(2, "City is required"),
  dob: z.string().min(2, "Date of birth is required"),
  address: z.string().min(5, "Address is required"),
});

export async function completeUserProfileAction(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) return { status: "error", message: "Unauthorized" };

  const parsed = completeProfileSchema.safeParse(input);
  if (!parsed.success) return { status: "error", message: "Invalid fields" };

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: parsed.data,
    });
    
    // Update the JWT session cookie to reflect the new data immediately
    await unstable_update({
      user: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        city: parsed.data.city,
        dob: parsed.data.dob,
        address: parsed.data.address,
      }
    });

    return { status: "success", message: "Profile updated successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to update profile" };
  }
}
