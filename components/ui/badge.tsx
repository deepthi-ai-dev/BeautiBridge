import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    defaultVariants: {
      variant: "salmon",
    },
    variants: {
      variant: {
        cream: "bg-beige-50 text-primary",
        gold: "bg-accent text-accent-foreground",
        outline: "border border-border bg-transparent text-foreground",
        plum: "bg-primary text-primary-foreground",
        salmon: "bg-secondary text-secondary-foreground",
        teal: "bg-teal-400 text-plum-950",
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
