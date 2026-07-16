import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/server/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { artistId, rating, service, body: reviewBody } = body;

    if (!artistId || !rating || !reviewBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const review = await db.review.create({
      data: {
        authorId: session.user.id,
        artistId,
        rating: Number(rating),
        service,
        body: reviewBody,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
