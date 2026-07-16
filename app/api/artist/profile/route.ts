import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

// ─── GET /api/artist/profile ───────────────────────────────────────────────
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      phone: true,
      city: true,
      dob: true,
      address: true,
      experience: true,
      about: true,
      languages: true,
      instagram: true,
      facebook: true,
      pricing: true,
      specialties: true,
      email: true,
      image: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

// ─── Patch schema (all fields optional for partial saves) ──────────────────
const patchSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().min(10, "Phone must be at least 10 digits").optional(),
  city: z.string().min(2, "City is required").optional(),
  about: z.string().min(10, "Bio must be at least 10 characters").optional(),
  specialties: z.string().optional(),
  languages: z.string().optional(),
  experience: z.string().optional(),
  pricing: z.coerce.number().int().min(0).optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  dob: z.string().optional(),
  address: z.string().optional(),
});

// ─── PATCH /api/artist/profile ─────────────────────────────────────────────
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const updated = await db.user.update({
      where: { id: session.user.id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        phone: true,
        city: true,
        about: true,
        specialties: true,
        languages: true,
        experience: true,
        pricing: true,
        instagram: true,
        facebook: true,
        dob: true,
        address: true,
      },
    });

    return NextResponse.json({ user: updated, message: "Profile updated successfully" });
  } catch (error) {
    console.error("[PATCH /api/artist/profile] DB error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
