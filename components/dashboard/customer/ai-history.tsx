"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { MessageSquare, Calendar, Trash2, ArrowRight } from "lucide-react";
import { MOCK_AI_HISTORY, type MockAiHistory } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function AiHistory() {
  const [history, setHistory] = useState<MockAiHistory[]>(MOCK_AI_HISTORY);

  function handleDelete(id: string, title: string) {
    if (confirm(`Delete conversation: "${title}"?`)) {
      setHistory((prev) => prev.filter((item) => item.id !== id));
      alert("AI conversation deleted.");
    }
  }

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">AI History</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {history.length} Consultation{history.length !== 1 ? "s" : ""}
        </span>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
          <span className="text-4xl">🤖</span>
          <p className="text-base font-semibold text-foreground">No AI consultations yet</p>
          <p className="text-sm text-muted-foreground">
            Get instant recommendations on makeup, hair, and styling.
          </p>
          <Link href="/assistant">
            <button className="mt-4 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-plum-600 transition-colors shadow-soft">
              Start AI Chat
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {history.map((chat, i) => (
            <FadeUp
              key={chat.id}
              className="premium-card p-5 space-y-4 flex flex-col justify-between"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <MessageSquare className="size-4 text-primary" />
                    <h3 className="text-sm truncate max-w-[200px]">{chat.title}</h3>
                  </div>
                  <button
                    aria-label="Delete chat"
                    onClick={() => handleDelete(chat.id, chat.title)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {chat.preview}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-muted-foreground border-t border-border pt-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {new Date(chat.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{chat.messageCount} messages</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/assistant">
                  <button className="w-full rounded-full border border-border hover:bg-muted py-2 text-xs font-semibold text-primary transition-all flex items-center justify-center gap-1">
                    Continue Chat <ArrowRight className="size-3" />
                  </button>
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      )}
    </StaggerContainer>
  );
}
