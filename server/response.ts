import { NextResponse } from "next/server";

export function notImplemented(resource: string) {
  return NextResponse.json(
    {
      data: null,
      error: {
        code: "NOT_IMPLEMENTED",
        message: `${resource} will be implemented in a later phase.`,
      },
    },
    { status: 501 },
  );
}
