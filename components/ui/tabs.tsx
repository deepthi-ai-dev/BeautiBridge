"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Tabs({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-full", className)} {...props} />;
}

export function TabsList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-muted text-muted-foreground inline-flex rounded-full p-1",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "hover:bg-card hover:text-primary rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        className,
      )}
      type="button"
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4", className)} {...props} />;
}
