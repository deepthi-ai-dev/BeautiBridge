import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
    variants: {
      size: {
        icon: "size-10 p-0",
        lg: "h-13 px-7 text-base",
        md: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
      },
      variant: {
        cream:
          "bg-beige-50 text-primary shadow-soft hover:-translate-y-0.5 hover:bg-white hover:shadow-card active:translate-y-0",
        ghost:
          "bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12",
        outline:
          "border border-border bg-transparent text-primary hover:bg-muted hover:border-primary/40 active:bg-muted/80",
        primary:
          "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-plum-600 hover:shadow-card active:translate-y-0 active:shadow-soft",
        salmon:
          "bg-secondary text-secondary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-salmon-500 hover:shadow-card active:translate-y-0",
      },
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, size, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
