import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "border-input bg-card text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/30 min-h-28 w-full rounded-lg border p-4 text-sm shadow-sm transition-colors outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
