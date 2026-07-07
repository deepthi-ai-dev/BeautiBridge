import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "bg-primary text-primary-foreground rounded-full px-5 py-2 font-semibold",
        className,
      )}
      {...props}
    />
  );
}
