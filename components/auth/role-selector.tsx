"use client";

import { UserRole } from "@prisma/client";
import { cn } from "@/lib/utils";
import { User, Palette } from "lucide-react";

type RoleSelectorProps = {
  disabled?: boolean;
  onChange: (role: UserRole) => void;
  value: UserRole;
};

const roleOptions = [
  {
    description: "I want to discover and book beauty services.",
    icon: User,
    title: "Customer",
    value: UserRole.CUSTOMER,
    emoji: "💅",
  },
  {
    description: "I provide beauty services as an independent artist.",
    icon: Palette,
    title: "Beauty Artist",
    value: UserRole.ARTIST,
    emoji: "🎨",
  },
] as const;

export function RoleSelector({ disabled, onChange, value }: RoleSelectorProps) {
  return (
    <div aria-label="Select your role" className="grid grid-cols-2 gap-3" role="radiogroup">
      {roleOptions.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            aria-checked={isSelected}
            className={cn(
              "group relative flex flex-col items-center gap-3 rounded-2xl border-2 px-4 py-5 text-center transition-all duration-200",
              "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isSelected
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-primary/40 hover:bg-muted/50",
            )}
            disabled={disabled}
            key={option.value}
            onClick={() => onChange(option.value)}
            role="radio"
            type="button"
          >
            {/* Selected indicator */}
            {isSelected && (
              <span className="absolute top-2.5 right-2.5 flex size-4 items-center justify-center rounded-full bg-primary">
                <svg className="size-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </span>
            )}

            {/* Icon */}
            <span className={cn(
              "flex size-12 items-center justify-center rounded-xl text-xl transition-transform duration-200",
              isSelected ? "bg-primary/10" : "bg-muted group-hover:bg-muted/80",
              "group-hover:scale-105",
            )}>
              {option.emoji}
            </span>

            <div>
              <p className={cn(
                "text-sm font-semibold transition-colors",
                isSelected ? "text-primary" : "text-foreground",
              )}>
                {option.title}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs leading-4">{option.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
