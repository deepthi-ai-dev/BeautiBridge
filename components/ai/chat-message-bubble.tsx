"use client";

import { useState } from "react";
import { Bot, Check, Copy, RefreshCw, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/features/ai/types";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onRegenerate?: () => void;
  isLastAssistant?: boolean;
  isLoading?: boolean;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 h-5 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block size-2 rounded-full bg-current opacity-60"
          style={{
            animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function ChatMessageBubble({
  message,
  onRegenerate,
  isLastAssistant,
  isLoading,
}: ChatMessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "group flex gap-3 px-4 py-3",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-gradient-to-br from-salmon-300 to-primary text-white",
        )}
      >
        {isUser ? (
          <User className="size-3.5" />
        ) : (
          <Bot className="size-3.5" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "flex max-w-[82%] flex-col gap-1.5",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "relative rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : cn(
                  "bg-card border border-border/70 rounded-tl-sm",
                  message.isError && "border-destructive/40 bg-destructive/5",
                ),
          )}
        >
          {message.isStreaming && !message.content ? (
            <TypingDots />
          ) : isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1.5 prose-headings:mt-4 prose-headings:mb-2 prose-headings:font-semibold prose-ul:my-1.5 prose-li:my-1 prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-muted prose-pre:text-xs prose-pre:p-4 prose-pre:rounded-xl">
              <ReactMarkdown>{message.content}</ReactMarkdown>
              {message.isStreaming && (
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current align-middle opacity-60" />
              )}
            </div>
          )}
        </div>

        {/* Timestamp + Actions */}
        <div
          className={cn(
            "flex items-center gap-1.5",
            isUser ? "flex-row-reverse" : "flex-row",
          )}
        >
          <span className="text-[10px] text-muted-foreground/70">
            {formatTime(message.timestamp)}
          </span>

          {!isUser && !message.isStreaming && message.content && (
            <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <button
                aria-label="Copy response"
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="size-3 text-emerald-500" />
                ) : (
                  <Copy className="size-3" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              {isLastAssistant && onRegenerate && !isLoading && (
                <button
                  aria-label="Regenerate response"
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  onClick={onRegenerate}
                >
                  <RefreshCw className="size-3" />
                  Retry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
