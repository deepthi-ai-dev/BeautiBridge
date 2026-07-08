"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SUGGESTED_PROMPTS } from "@/features/ai/prompts";

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-col items-center gap-10 px-4 py-12 text-center">
      {/* Hero mark */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="relative flex size-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-salmon-300 via-primary to-plum-800 shadow-[0_20px_50px_rgba(84,40,67,0.35)]">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
            <Sparkles className="size-10 text-white drop-shadow-lg" />
          </div>
          <span className="absolute -bottom-1.5 -right-1.5 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-amber-500 text-[11px] font-black text-plum-950 shadow-[0_6px_16px_rgba(220,174,91,0.4)]">
            AI
          </span>
          {/* Pulse ring */}
          <span className="absolute inset-0 animate-ping rounded-[2rem] bg-salmon-300/20" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">BeautiAssist</h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Your personal AI beauty consultant
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["Bridal Looks", "Hairstyles", "Skincare", "Occasion Styling", "Product Tips"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-semibold text-foreground/70"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </motion.div>

      {/* Prompt categories */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-6"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        {SUGGESTED_PROMPTS.map((category, ci) => (
          <div key={category.category} className="text-left">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {category.category}
              </span>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {category.prompts.map((prompt, pi) => (
                <motion.button
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card px-4 py-3.5 text-left shadow-[0_2px_8px_rgba(53,27,49,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-[0_8px_24px_rgba(53,27,49,0.10)]"
                  initial={{ opacity: 0, y: 10 }}
                  key={prompt}
                  onClick={() => onSelect(prompt)}
                  transition={{ delay: 0.2 + ci * 0.06 + pi * 0.03 }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="mt-0.5 text-secondary/60 transition-colors duration-200 group-hover:text-secondary">
                    →
                  </span>
                  <span className="text-sm font-medium text-foreground/75 transition-colors duration-200 group-hover:text-foreground">
                    {prompt}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
