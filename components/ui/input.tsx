import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "border-input bg-card text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/30 h-11 w-full rounded-full border px-4 text-sm shadow-sm transition-colors outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
