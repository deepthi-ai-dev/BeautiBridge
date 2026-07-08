"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquarePlus, PanelLeft, Sparkles } from "lucide-react";
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

  // Build combined conversation text for artist keyword detection
  const conversationText = messages.map((m) => m.content).join(" ");

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
    <div className="light-section bg-background text-foreground flex h-[calc(100vh-5rem)] overflow-hidden">
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Chat Header */}
        <header className="relative flex items-center gap-3 border-b border-border/50 bg-white/85 px-4 py-3 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <button
            aria-label="Toggle sidebar"
            className="flex items-center justify-center rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <PanelLeft className="size-5" />
          </button>

          <div className="flex flex-1 items-center gap-3 min-w-0">
            <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-salmon-300 to-primary shadow-[0_4px_12px_rgba(84,40,67,0.25)]">
              <Sparkles className="size-4 text-white" />
              <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-card bg-teal-500" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">
                {activeConversation?.title ?? "BeautiAssist"}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
                <p className="text-[10px] font-medium text-muted-foreground">
                  {isLoading ? "Generating response..." : "Live · replies instantly"}
                </p>
              </div>
            </div>
          </div>

          <Button
            aria-label="New conversation"
            size="sm"
            variant="outline"
            className="rounded-xl border-border/60 bg-card text-foreground hover:bg-muted"
            onClick={handleNewConversation}
          >
            <MessageSquarePlus className="size-4" />
            <span className="hidden sm:inline">New Chat</span>
          </Button>
        </header>

        {/* Messages Area */}
        <div
          className={cn(
            "flex-1 overflow-y-auto bg-[linear-gradient(180deg,rgba(255,248,239,0.7),rgba(255,244,234,0.5))]",
            messages.length === 0 && "flex items-center justify-center",
          )}
          id="chat-messages"
        >
          {messages.length === 0 ? (
            <div className="w-full">
              <SuggestedPrompts
                onSelect={(prompt) => {
                  if (!activeConversationId) newConversation();
                  sendMessage(prompt);
                }}
              />
            </div>
          ) : (
            <div className="group mx-auto max-w-3xl py-4">
              {messages.map((message, index) => (
                <ChatMessageBubble
                  key={message.id}
                  conversationText={conversationText}
                  isLastAssistant={index === lastAssistantIndex}
                  isLoading={isLoading}
                  message={message}
                  onRegenerate={regenerateLastMessage}
                />
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
