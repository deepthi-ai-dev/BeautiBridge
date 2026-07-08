"use client";

import { MessageSquarePlus, Sparkles, Trash2, X } from "lucide-react";
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
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border/50 bg-white/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:z-auto md:translate-x-0 md:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between gap-3 border-b border-border/60 px-4 py-4">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-salmon-300 to-primary shadow-[0_4px_12px_rgba(84,40,67,0.2)]">
              <Sparkles className="size-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-foreground">Conversations</span>
              <p className="text-[10px] text-muted-foreground">{conversations.length} chats</p>
            </div>
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
            className="flex w-full items-center gap-2.5 rounded-xl border border-dashed border-border bg-transparent px-4 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
            onClick={handleNew}
          >
            <MessageSquarePlus className="size-4" />
            New Conversation
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          {conversations.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
                <Sparkles className="size-6 text-muted-foreground/40" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground/60">No chats yet</p>
                <p className="mt-1 text-xs text-muted-foreground">Start a conversation!</p>
              </div>
            </div>
          ) : (
            <ul className="space-y-1" role="list">
              {conversations.map((conv) => (
                <li key={conv.id}>
                  <div
                    className={cn(
                      "group relative flex w-full cursor-pointer flex-col gap-0.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 select-none",
                      activeConversationId === conv.id
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "hover:bg-muted text-foreground/80",
                    )}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelect(conv.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleSelect(conv.id)}
                  >
                    <span className="line-clamp-1 pr-6 text-xs font-semibold">
                      {conv.title || "New Conversation"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(conv.updatedAt)} · {conv.messages.length} msg{conv.messages.length !== 1 ? "s" : ""}
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
          <div className="border-t border-border/60 p-3">
            <Button
              className="w-full rounded-xl text-xs text-destructive/70 hover:bg-destructive/5 hover:text-destructive"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (confirm("Clear all conversations? This cannot be undone.")) {
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
