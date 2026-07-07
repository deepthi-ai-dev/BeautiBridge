"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, MessageSquarePlus, Sparkles } from "lucide-react";
import { useAssistantStore } from "@/stores/assistant-store";
import { useChat } from "@/hooks/use-chat";
import { ChatSidebar } from "@/components/ai/chat-sidebar";
import { ChatMessageBubble } from "@/components/ai/chat-message-bubble";
import { SuggestedPrompts } from "@/components/ai/suggested-prompts";
import { ChatInput } from "@/components/ai/chat-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AssistantChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { activeConversation, activeConversationId, newConversation } =
    useAssistantStore();
  const { isLoading, sendMessage, stopGeneration, regenerateLastMessage } =
    useChat();

  const messages = activeConversation?.messages ?? [];
  const lastMessageContent = messages[messages.length - 1]?.content;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, lastMessageContent]);

  function handleNewConversation() {
    newConversation();
    setSidebarOpen(false);
  }

  const lastAssistantIndex = messages
    .map((m, i) => (m.role === "assistant" ? i : -1))
    .filter((i) => i >= 0)
    .at(-1);

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Chat Header */}
        <header className="flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl">
          {/* Mobile sidebar toggle */}
          <button
            aria-label="Toggle sidebar"
            className="flex items-center justify-center rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            aria-label="Toggle sidebar"
            className="hidden items-center justify-center rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <Menu className="size-5" />
          </button>

          <div className="flex flex-1 items-center gap-2 min-w-0">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-salmon-300 to-primary">
              <Sparkles className="size-3.5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {activeConversation?.title ?? "BeautiAssist"}
              </p>
              {isLoading && (
                <p className="text-[10px] text-primary animate-pulse">
                  Generating response...
                </p>
              )}
            </div>
          </div>

          <Button
            aria-label="New conversation"
            size="sm"
            variant="outline"
            onClick={handleNewConversation}
          >
            <MessageSquarePlus className="size-4" />
            <span className="hidden sm:inline">New Chat</span>
          </Button>
        </header>

        {/* Messages Area */}
        <div
          className={cn(
            "flex-1 overflow-y-auto scroll-smooth",
            messages.length === 0 && "flex items-center justify-center",
          )}
          id="chat-messages"
        >
          {messages.length === 0 ? (
            <div className="w-full">
              <SuggestedPrompts
                onSelect={(prompt) => {
                  if (!activeConversationId) {
                    newConversation();
                  }
                  sendMessage(prompt);
                }}
              />
            </div>
          ) : (
            <div className="mx-auto max-w-3xl py-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className="animate-[fade-up_0.3s_ease-out]"
                >
                  <ChatMessageBubble
                    isLastAssistant={index === lastAssistantIndex}
                    isLoading={isLoading}
                    message={message}
                    onRegenerate={regenerateLastMessage}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <ChatInput
          isLoading={isLoading}
          onSend={(msg) => {
            if (!activeConversationId) newConversation();
            sendMessage(msg);
          }}
          onStop={stopGeneration}
        />
      </div>
    </div>
  );
}
