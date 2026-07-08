import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-muted relative overflow-hidden rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
