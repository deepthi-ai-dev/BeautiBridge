import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "bg-secondary inline-flex rounded-full px-3 py-1 text-sm",
        className,
      )}
      {...props}
    />
  );
}
