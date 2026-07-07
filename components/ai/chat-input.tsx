"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";
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
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
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
    <div className="border-t border-border bg-background/80 backdrop-blur-xl px-4 py-3">
      <div className="mx-auto max-w-3xl">
        <div
          className={cn(
            "relative flex items-end gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition-all duration-200",
            "focus-within:border-ring/50 focus-within:shadow-md focus-within:ring-2 focus-within:ring-ring/20",
          )}
        >
          <textarea
            ref={textareaRef}
            aria-label="Message BeautiAssist"
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
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
                className="flex size-8 items-center justify-center rounded-xl bg-destructive/90 text-white transition-colors hover:bg-destructive"
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
                    ? "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-plum-600"
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

        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          BeautiAssist may make mistakes. Verify important beauty advice with a
          professional.
        </p>
      </div>
    </div>
  );
}
