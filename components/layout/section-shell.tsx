import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = HTMLAttributes<HTMLElement> & {
  variant?: "cream" | "default" | "plum" | "warm";
};

export function SectionShell({
  className,
  variant = "default",
  ...props
}: SectionShellProps) {
  return (
    <section
      className={cn(
        "section-y",
        variant === "cream" && "bg-beige-100",
        variant === "plum" && "plum-panel",
        variant === "warm" && "warm-surface",
        className,
      )}
      {...props}
    />
  );
}

export function SectionContainer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("page-container", className)} {...props} />;
}
