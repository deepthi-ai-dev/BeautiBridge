import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors duration-150",
  {
    defaultVariants: {
      variant: "salmon",
    },
    variants: {
      variant: {
        cream: "bg-beige-50 text-primary border border-beige-300/60",
        gold: "bg-accent/15 text-accent-foreground border border-accent/20",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted/50",
        plum: "bg-primary text-primary-foreground",
        salmon: "bg-secondary/20 text-primary border border-secondary/30",
        teal: "bg-teal-400/15 text-teal-600 border border-teal-400/25 dark:text-teal-400",
      },
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
