"use server";

import { z } from "zod";
import { auth, unstable_update } from "@/auth";
import { db } from "@/server/db";

const artistProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  city: z.string().min(2, "City is required"),
  dob: z.string().min(2, "Date of birth is required"),
  address: z.string().min(5, "Address is required"),
  experience: z.string().min(1, "Experience is required"),
  about: z.string().min(10, "Bio must be at least 10 characters"),
  languages: z.string().min(2, "Languages are required"),
  hobbies: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  pricing: z.coerce.number().optional(),
  specialties: z.string().optional(),
});

export async function updateArtistProfileAction(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) return { status: "error", message: "Unauthorized" };

  const parsed = artistProfileSchema.safeParse(input);
  if (!parsed.success) return { status: "error", message: "Invalid fields" };

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: parsed.data,
    });
    
    // Update the JWT session cookie to reflect the new core data immediately
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
