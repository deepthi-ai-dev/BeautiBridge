import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/server/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const booking = await db.booking.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, phone: true, image: true, city: true } },
        service: { select: { id: true, name: true, price: true, duration: true } },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Only the customer or the artist can view this booking
    if (booking.userId !== session.user.id && booking.artistId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Booking detail error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body as { status: "CONFIRMED" | "CANCELLED" | "COMPLETED" };

    const allowedStatuses = ["CONFIRMED", "CANCELLED", "COMPLETED"] as const;
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    // Fetch booking first to verify ownership
    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Artists can CONFIRM or CANCEL; customers can only CANCEL
    const isArtist = existing.artistId === session.user.id;
    const isCustomer = existing.userId === session.user.id;

    if (!isArtist && !isCustomer) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!isArtist && status === "CONFIRMED") {
      return NextResponse.json(
        { error: "Only the artist can confirm a booking" },
        { status: 403 }
      );
    }

    const updated = await db.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
