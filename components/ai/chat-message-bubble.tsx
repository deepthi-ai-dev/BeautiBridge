"use client";

import { useState } from "react";
import { Bot, Check, Copy, RefreshCw, Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/features/ai/types";
import { parseArtistJSON, stripArtistJSON } from "@/lib/ai-parser";
import { ParsedArtistCards } from "@/components/ai/parsed-artist-cards";
import { ArtistRecommendations } from "@/components/ai/artist-recommendations";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onRegenerate?: () => void;
  isLastAssistant?: boolean;
  isLoading?: boolean;
  conversationText?: string;
}

const AI_STEPS = [
  "User request",
  "Thinking",
  "Searching",
  "Matching artists",
  "Results",
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5 h-5 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block size-2 rounded-full bg-secondary"
          style={{ animation: `typing-dot 1.2s ease-in-out ${i * 0.22}s infinite` }}
        />
      ))}
    </span>
  );
}

function StreamingProgress({ step }: { step: number }) {
  return (
    <div className="space-y-4 py-1">
      {/* Step pills */}
      <div className="flex flex-wrap gap-2">
        {AI_STEPS.map((label, i) => (
          <span
            key={label}
            className={cn(
              "rounded-full border px-3 py-1 text-[11px] font-semibold transition-all duration-300",
              i < step
                ? "border-secondary/30 bg-secondary/10 text-secondary"
                : i === step
                  ? "border-primary/80 bg-gradient-to-r from-primary to-plum-700 text-white shadow-[0_4px_12px_rgba(84,40,67,0.3)]"
                  : "border-border/50 bg-muted/40 text-muted-foreground/50",
            )}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Status message */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/50 px-4 py-3">
        <TypingDots />
        <p className="text-sm font-medium text-foreground/80">
          {step === 0 && "Analyzing your request..."}
          {step === 1 && "Thinking about the best beauty approach..."}
          {step === 2 && "Searching verified artists in your area..."}
          {step === 3 && "Matching top-rated artists for you..."}
          {step >= 4 && "Preparing your results..."}
        </p>
      </div>

      {/* Gradient progress bar */}
      <div className="relative h-2 overflow-hidden rounded-full bg-muted/60">
        <motion.div
          animate={{ width: `${Math.min(((step + 1) / AI_STEPS.length) * 100, 95)}%` }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal-400 via-secondary to-salmon-400"
          initial={{ width: "8%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

export function ChatMessageBubble({
  message,
  onRegenerate,
  isLastAssistant,
  isLoading,
  conversationText = "",
}: ChatMessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const contentLen = message.content.length;
  const computedStep =
    contentLen === 0 ? 0
    : contentLen < 60 ? 1
    : contentLen < 180 ? 2
    : contentLen < 380 ? 3
    : 4;

  // Parse JSON artist data from completed AI responses
  const parsedArtists = !message.isStreaming && !isUser && message.content
    ? parseArtistJSON(message.content)
    : null;
  
  // Strip the JSON block from the display text
  const displayContent = !isUser && message.content
    ? stripArtistJSON(message.content)
    : message.content;

  async function handleCopy() {
    await navigator.clipboard.writeText(displayContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (isUser) {
    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end px-4 py-2"
        initial={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex max-w-[80%] flex-col items-end gap-1.5">
          <div className="relative overflow-hidden rounded-[1.4rem] rounded-tr-sm bg-gradient-to-br from-primary to-plum-700 px-5 py-3.5 shadow-[0_8px_24px_rgba(84,40,67,0.25)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-sm leading-relaxed text-primary-foreground">{message.content}</p>
          </div>
          <span className="text-[10px] text-muted-foreground/60">{formatTime(message.timestamp)}</span>
        </div>
        <div className="ml-3 mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <User className="size-3.5" />
        </div>
      </motion.div>
    );
  }

  // Assistant message
  const showStreamProgress = message.isStreaming && contentLen < 100;
  const showContent = !showStreamProgress && message.content;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 px-4 py-2"
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
    >
      {/* AI Avatar */}
      <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-salmon-300 to-primary shadow-[0_6px_16px_rgba(84,40,67,0.2)]">
        <Sparkles className="size-4 text-white" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-foreground">BeautiAssist</span>
          <span className="flex items-center gap-1 text-[10px] text-teal-500">
            <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
            AI
          </span>
        </div>

        {/* Card */}
        <div className={cn(
          "relative overflow-hidden rounded-[1.4rem] rounded-tl-sm border shadow-[0_4px_16px_rgba(53,27,49,0.08)]",
          message.isError
            ? "border-destructive/30 bg-destructive/5"
            : "border-border/60 bg-card",
        )}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

          <div className="px-5 py-4">
            <AnimatePresence mode="wait">
              {showStreamProgress ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key="progress"
                >
                  <StreamingProgress step={computedStep} />
                </motion.div>
              ) : showContent ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="prose prose-sm max-w-none prose-p:my-2 prose-headings:mt-4 prose-headings:mb-2 prose-headings:font-bold prose-ul:my-2 prose-li:my-1 prose-code:bg-muted/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-muted prose-pre:text-xs prose-pre:p-4 prose-pre:rounded-xl text-foreground prose-p:text-foreground prose-li:text-foreground prose-headings:text-foreground prose-strong:text-foreground"
                  initial={{ opacity: 0 }}
                  key="content"
                >
                  <ReactMarkdown>{displayContent.trim() ? displayContent : "Here are some artists that match your request:"}</ReactMarkdown>
                  {message.isStreaming && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current align-middle opacity-60" />
                  )}
                </motion.div>
              ) : (
                <TypingDots key="dots" />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* AI-generated artist cards (from JSON in response) */}
        {parsedArtists && parsedArtists.length > 0 && (
          <ParsedArtistCards artists={parsedArtists} />
        )}

        {/* Keyword-based fallback artist recommendations (when no JSON) */}
        {!parsedArtists && !message.isStreaming && !message.isError && message.content && conversationText && (
          <ArtistRecommendations conversationText={conversationText} />
        )}

        {/* Timestamp + actions */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground/60">{formatTime(message.timestamp)}</span>
          {!message.isStreaming && message.content && (
            <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <button
                aria-label="Copy response"
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                onClick={handleCopy}
              >
                {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
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
    </motion.div>
  );
}
