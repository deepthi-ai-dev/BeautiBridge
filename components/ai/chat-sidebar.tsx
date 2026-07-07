"use client";

import { Bot, MessageSquarePlus, Trash2, X } from "lucide-react";
import { useAssistantStore } from "@/stores/assistant-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const {
    conversations,
    activeConversationId,
    newConversation,
    selectConversation,
    deleteConversation,
    clearAllConversations,
  } = useAssistantStore();

  function handleNew() {
    newConversation();
    onClose();
  }

  function handleSelect(id: string) {
    selectConversation(id);
    onClose();
  }

  return (
    <>
      {/* Backdrop on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-card/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:z-auto md:translate-x-0 md:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
              <Bot className="size-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              Conversations
            </span>
          </div>
          <button
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            className="flex w-full items-center gap-2.5 rounded-xl border border-dashed border-border bg-transparent px-4 py-3 text-sm font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/5"
            onClick={handleNew}
          >
            <MessageSquarePlus className="size-4" />
            New Conversation
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          {conversations.length === 0 ? (
            <div className="mt-8 flex flex-col items-center gap-2 text-center">
              <Bot className="size-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">
                No conversations yet.
                <br />
                Start chatting!
              </p>
            </div>
          ) : (
            <ul className="space-y-1" role="list">
              {conversations.map((conv) => (
                <li key={conv.id}>
                  <div
                    className={cn(
                      "group relative flex w-full cursor-pointer flex-col gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors select-none",
                      activeConversationId === conv.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-foreground/80",
                    )}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelect(conv.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleSelect(conv.id)}
                  >
                    <span className="line-clamp-1 pr-6 text-xs font-medium">
                      {conv.title || "New Conversation"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(conv.updatedAt)} ·{" "}
                      {conv.messages.length} msg
                      {conv.messages.length !== 1 ? "s" : ""}
                    </span>
                    <button
                      aria-label="Delete conversation"
                      className="absolute right-2 top-2 hidden rounded p-0.5 text-muted-foreground hover:text-destructive group-hover:flex"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {conversations.length > 0 && (
          <div className="border-t border-border p-3">
            <Button
              className="w-full text-xs"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (
                  confirm(
                    "Clear all conversations? This cannot be undone.",
                  )
                ) {
                  clearAllConversations();
                }
              }}
            >
              <Trash2 className="size-3.5" />
              Clear All
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
