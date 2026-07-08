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
        "bg-plum-950/50 fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]",
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
        "border-border/80 bg-card text-card-foreground shadow-premium w-full max-w-lg rounded-2xl border p-6 animate-[scale-in_0.2s_ease-out]",
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
      className={cn("mb-5 space-y-1.5", className)}
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
      className={cn("text-primary text-xl font-bold leading-snug", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6", className)}
      {...props}
    />
  );
}
