import type { UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole | null;
      phone: string | null;
      city: string | null;
      dob?: string | null;
      address?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole | null;
    phone?: string | null;
    city?: string | null;
    dob?: string | null;
    address?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole | null;
    phone?: string | null;
    city?: string | null;
    dob?: string | null;
    address?: string | null;
  }
}
