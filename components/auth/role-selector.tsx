"use client";

import { UserRole } from "@prisma/client";
import { cn } from "@/lib/utils";

type RoleSelectorProps = {
  disabled?: boolean;
  onChange: (role: UserRole) => void;
  value: UserRole;
};

const roleOptions = [
  {
    description: "I want to discover and book beauty services.",
    title: "Customer",
    value: UserRole.CUSTOMER,
  },
  {
    description: "I provide beauty services as an independent artist.",
    title: "Beauty Artist",
    value: UserRole.ARTIST,
  },
] as const;

export function RoleSelector({ disabled, onChange, value }: RoleSelectorProps) {
  return (
    <div aria-label="Select your role" className="grid gap-3" role="radiogroup">
      {roleOptions.map((option) => (
        <button
          aria-checked={value === option.value}
          className={cn(
            "rounded-2xl border px-4 py-3 text-left transition-colors",
            "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            value === option.value
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/50",
          )}
          disabled={disabled}
          key={option.value}
          onClick={() => onChange(option.value)}
          role="radio"
          type="button"
        >
          <p className="text-primary text-sm font-semibold">{option.title}</p>
          <p className="text-muted-foreground mt-1 text-sm">{option.description}</p>
        </button>
      ))}
    </div>
  );
}
