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

export function ChatInput({
  onSend,
  onStop,
  isLoading,
  disabled,
}: ChatInputProps) {
  const [value, setValue] = useState("");
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
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  const canSend = value.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="border-t border-border/60 bg-background/90 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl">
        <div
          className={cn(
            "relative flex items-end gap-2 rounded-2xl border bg-card px-4 py-3 shadow-sm transition-all duration-200",
            value.length > 0 || isLoading
              ? "border-ring/40 shadow-md ring-2 ring-ring/15"
              : "border-border hover:border-primary/30",
          )}
        >
          {/* AI indicator */}
          <div className="mb-1 shrink-0">
            <Sparkles
              className={cn(
                "size-4 transition-colors duration-300",
                isLoading ? "text-primary animate-pulse" : "text-muted-foreground",
              )}
            />
          </div>

          <textarea
            ref={textareaRef}
            aria-label="Message BeautiAssist"
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[1.5rem] leading-relaxed"
            disabled={disabled}
            placeholder="Ask about makeup, hairstyles, skincare..."
            rows={1}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <div className="flex shrink-0 items-center gap-1 pb-0.5">
            {isLoading ? (
              <button
                aria-label="Stop generating"
                className="flex size-8 items-center justify-center rounded-xl bg-destructive/85 text-white transition-all hover:bg-destructive hover:scale-105 active:scale-95"
                onClick={onStop}
              >
                <Square className="size-3 fill-current" />
              </button>
            ) : (
              <button
                aria-label="Send message"
                className={cn(
                  "flex size-8 items-center justify-center rounded-xl transition-all duration-200",
                  canSend
                    ? "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-plum-600 hover:shadow-card active:translate-y-0"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                )}
                disabled={!canSend}
                onClick={handleSend}
              >
                <ArrowUp className="size-4" />
              </button>
            )}
          </div>
        </div>

        <p className="mt-2 text-center text-[10px] text-muted-foreground/70">
          BeautiAssist may make mistakes. Verify important beauty advice with a professional.
        </p>
      </div>
    </div>
  );
}
