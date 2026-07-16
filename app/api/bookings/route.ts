import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/server/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await db.booking.findMany({
      where: { userId: session.user.id },
      include: {
        artist: {
          select: { id: true, name: true, image: true, city: true, specialties: true },
        },
        service: {
          select: { id: true, name: true, price: true, duration: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Customer bookings fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { artistId, serviceId, date, time, notes } = body;

    if (!artistId || !serviceId || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = await db.booking.create({
      data: {
        userId: session.user.id,
        artistId,
        serviceId,
        date,
        time,
        notes,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
