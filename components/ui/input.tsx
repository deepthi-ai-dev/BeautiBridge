import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "border-input bg-card text-foreground placeholder:text-muted-foreground",
        "focus:border-ring focus:ring-ring/25 h-11 w-full rounded-xl border px-4 text-sm shadow-sm",
        "transition-all duration-200 outline-none focus:ring-2 focus:shadow-sm",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
        "hover:border-primary/30",
        className,
      )}
      {...props}
    />
  );
}
