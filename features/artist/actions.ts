"use server";

import { z } from "zod";
import { auth, unstable_update } from "@/auth";
import { db } from "@/server/db";

// All fields optional — form can save partial progress
const artistProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().min(10, "Valid phone is required").optional(),
  city: z.string().min(2, "City is required").optional(),
  dob: z.string().optional(),
  address: z.string().optional(),
  experience: z.string().optional(),
  about: z.string().min(10, "Bio must be at least 10 characters").optional(),
  languages: z.string().optional(),
  hobbies: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  pricing: z.coerce.number().int().min(0).optional(),
  specialties: z.string().optional(),
});

export async function updateArtistProfileAction(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) return { status: "error", message: "Unauthorized" };

  const parsed = artistProfileSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { status: "error", message: firstError ?? "Invalid fields" };
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: parsed.data,
    });

    // Reflect key identity fields in the JWT session immediately
    await unstable_update({
      user: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        city: parsed.data.city,
        dob: parsed.data.dob,
        address: parsed.data.address,
      },
    });

    return { status: "success", message: "Profile updated successfully" };
  } catch (error) {
    console.error("[updateArtistProfileAction] DB error:", error);
    return { status: "error", message: "Failed to update profile. Please try again." };
  }
}
