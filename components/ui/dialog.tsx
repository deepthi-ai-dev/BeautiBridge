"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Dialog({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-plum-950/45 fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-border bg-card text-card-foreground shadow-premium w-full max-w-lg rounded-xl border p-6",
        className,
      )}
      {...props}
    />
  );
}

export function DialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("space-y-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-primary text-2xl font-semibold", className)}
      {...props}
    />
  );
}
