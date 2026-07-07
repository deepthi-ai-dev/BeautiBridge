"use client";

import { SUGGESTED_PROMPTS } from "@/features/ai/prompts";
import { cn } from "@/lib/utils";

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-col items-center gap-8 px-4 py-8 text-center">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-salmon-300 via-primary to-plum-800 shadow-premium">
            <span className="text-3xl">✨</span>
          </div>
          <div className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-plum-950 shadow-sm">
            AI
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">BeautiAssist</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your personal AI beauty consultant
          </p>
        </div>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          Ask me anything about bridal makeup, hairstyles, skincare routines,
          occasion styling, or product recommendations.
        </p>
      </div>

      {/* Prompt Categories */}
      <div className="w-full max-w-2xl space-y-4">
        {SUGGESTED_PROMPTS.map((category) => (
          <div key={category.category} className="text-left">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">{category.icon}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {category.category}
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {category.prompts.map((prompt) => (
                <button
                  key={prompt}
                  className={cn(
                    "group flex w-full items-start gap-2 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground/80 shadow-sm transition-all duration-200",
                    "hover:border-primary/30 hover:bg-primary/5 hover:text-foreground hover:shadow-md",
                  )}
                  onClick={() => onSelect(prompt)}
                >
                  <span className="mt-0.5 shrink-0 text-primary/60 transition-colors group-hover:text-primary">
                    →
                  </span>
                  <span className="line-clamp-2">{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
