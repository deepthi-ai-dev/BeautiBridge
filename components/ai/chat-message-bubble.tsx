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
    <span className="inline-flex items-end gap-1 h-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block size-1.5 rounded-full bg-current opacity-60"
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
        "group flex gap-3 px-4 py-2",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-gradient-to-br from-salmon-300 to-primary text-white",
        )}
      >
        {isUser ? (
          <User className="size-4" />
        ) : (
          <Bot className="size-4" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-1.5",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "relative rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : cn(
                  "bg-card border border-border rounded-tl-sm",
                  message.isError && "border-destructive/40 bg-destructive/5",
                ),
          )}
        >
          {message.isStreaming && !message.content ? (
            <TypingDots />
          ) : isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:mt-3 prose-headings:mb-1 prose-ul:my-1 prose-li:my-0.5 prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-muted prose-pre:text-xs prose-pre:p-3 prose-pre:rounded-lg">
              <ReactMarkdown>{message.content}</ReactMarkdown>
              {message.isStreaming && (
                <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-current align-middle opacity-70" />
              )}
            </div>
          )}
        </div>

        {/* Timestamp + Actions */}
        <div
          className={cn(
            "flex items-center gap-2",
            isUser ? "flex-row-reverse" : "flex-row",
          )}
        >
          <span className="text-[10px] text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>

          {!isUser && !message.isStreaming && message.content && (
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                aria-label="Copy response"
                className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="size-3 text-green-500" />
                ) : (
                  <Copy className="size-3" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              {isLastAssistant && onRegenerate && !isLoading && (
                <button
                  aria-label="Regenerate response"
                  className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={onRegenerate}
                >
                  <RefreshCw className="size-3" />
                  Regenerate
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
