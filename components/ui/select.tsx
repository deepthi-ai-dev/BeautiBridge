"use client";

import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "border-input bg-card text-foreground",
        "focus:border-ring focus:ring-ring/25 h-11 w-full rounded-xl border px-4 text-sm shadow-sm",
        "transition-all duration-200 outline-none focus:ring-2",
        "hover:border-primary/30",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
        "appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3YTYyNWYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=')] bg-[right_0.75rem_center] bg-no-repeat pr-9",
        className,
      )}
      {...props}
    />
  );
}
