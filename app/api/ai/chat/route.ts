import { streamBeautyChat } from "@/features/ai/gemini-client";
import type { ChatRequest } from "@/features/ai/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "AI service is not configured. Please add your GEMINI_API_KEY to environment variables.",
        },
        { status: 503 },
      );
    }

    // Build a ReadableStream that forwards Gemini chunks
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          await streamBeautyChat(messages, (chunk) => {
            controller.enqueue(encoder.encode(chunk));
          });
          controller.close();
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "AI service error";
          controller.enqueue(encoder.encode(`\n\n[Error: ${message}]`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
