"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUp, Square, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const QUICK_PROMPTS = [
  "Bridal makeup tips",
  "Best hairstyle for my face",
  "Skincare routine",
  "Party look under ₹3000",
];

export function ChatInput({ onSend, onStop, isLoading, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    autoResize();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  const canSend = value.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="border-t border-border/40 bg-white/85 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl space-y-3">
        {/* Quick prompts — only when input is empty and not loading */}
        {!value && !isLoading && (
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground/70 transition-all duration-200 hover:border-secondary/40 hover:bg-secondary/5 hover:text-foreground"
                onClick={() => onSend(p)}
                type="button"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input box */}
        <div
          className={cn(
            "relative flex items-end gap-3 rounded-2xl border bg-white px-4 py-3 transition-all duration-200",
            focused || value.length > 0 || isLoading
              ? "border-secondary/50 shadow-[0_0_0_3px_rgba(230,151,145,0.12),0_8px_24px_rgba(53,27,49,0.10)]"
              : "border-border/60 shadow-[0_2px_8px_rgba(53,27,49,0.06)] hover:border-border",
          )}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-secondary/30 to-transparent opacity-0 transition-opacity duration-300" style={{ opacity: focused ? 1 : 0 }} />

          <div className="mb-1 shrink-0">
            <Sparkles
              className={cn(
                "size-4 transition-all duration-300",
                isLoading ? "animate-pulse text-secondary" : "text-muted-foreground/60",
              )}
            />
          </div>

          <textarea
            ref={textareaRef}
            aria-label="Message BeautiAssist"
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none min-h-[1.5rem] leading-relaxed"
            disabled={disabled}
            placeholder="Ask about makeup, hairstyles, skincare..."
            rows={1}
            value={value}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
          />

          <div className="flex shrink-0 items-center gap-1 pb-0.5">
            {isLoading ? (
              <button
                aria-label="Stop generating"
                className="flex size-8 items-center justify-center rounded-xl bg-destructive/85 text-white transition-all hover:bg-destructive hover:scale-105 active:scale-95"
                onClick={onStop}
                type="button"
              >
                <Square className="size-3 fill-current" />
              </button>
            ) : (
              <button
                aria-label="Send message"
                className={cn(
                  "flex size-8 items-center justify-center rounded-xl transition-all duration-200",
                  canSend
                    ? "bg-gradient-to-br from-primary to-plum-700 text-white shadow-[0_4px_12px_rgba(84,40,67,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(84,40,67,0.35)] active:translate-y-0"
                    : "bg-muted text-muted-foreground/50 cursor-not-allowed",
                )}
                disabled={!canSend}
                onClick={handleSend}
                type="button"
              >
                <ArrowUp className="size-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/50">
          BeautiAssist may make mistakes. Verify important beauty advice with a professional.
        </p>
      </div>
    </div>
  );
}
