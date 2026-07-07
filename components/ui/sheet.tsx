"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Sheet({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-plum-950/35 fixed inset-0 z-50 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export function SheetContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <aside
      className={cn(
        "border-border bg-card text-card-foreground shadow-premium ml-auto flex h-full w-full max-w-sm flex-col border-l p-6",
        className,
      )}
      {...props}
    />
  );
}
