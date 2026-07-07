import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-muted relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "bg-secondary text-secondary-foreground flex size-full items-center justify-center text-sm font-semibold",
        className,
      )}
      {...props}
    />
  );
}
