"use client";

import { useCallback, useRef, useState } from "react";
import { useAssistantStore } from "@/stores/assistant-store";
import type { ChatMessage } from "@/features/ai/types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const {
    addMessage,
    updateLastMessage,
    setMessageError,
    activeConversationId,
    newConversation,
    activeConversation,
  } = useAssistantStore();

  const sendMessage = useCallback(
    async (userContent: string) => {
      if (!userContent.trim() || isLoading) return;

      // Ensure we have an active conversation
      let convId = activeConversationId;
      if (!convId) {
        convId = newConversation();
      }

      const userMsg: ChatMessage = {
        content: userContent.trim(),
        id: generateId(),
        role: "user",
        timestamp: new Date(),
      };
      addMessage(userMsg);

      const assistantId = generateId();
      const assistantMsg: ChatMessage = {
        content: "",
        id: assistantId,
        isStreaming: true,
        role: "assistant",
        timestamp: new Date(),
      };
      addMessage(assistantMsg);

      setIsLoading(true);
      abortRef.current = new AbortController();

      try {
        // Build message history for API (all existing messages + new user msg)
        const allMessages = [
          ...(activeConversation?.messages ?? []),
          userMsg,
        ].map((m) => ({ content: m.content, role: m.role }));

        const response = await fetch("/api/ai/chat", {
          body: JSON.stringify({ messages: allMessages }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          const data = (await response.json()) as { error?: string };
          throw new Error(data.error ?? "Request failed");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          updateLastMessage(accumulated, true);
        }

        updateLastMessage(accumulated, false);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const errorContent =
          err instanceof Error
            ? `Sorry, I encountered an error: ${err.message}. Please try again.`
            : "Something went wrong. Please try again.";
        updateLastMessage(errorContent, false);
        setMessageError(assistantId);
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [
      isLoading,
      activeConversationId,
      activeConversation,
      addMessage,
      updateLastMessage,
      setMessageError,
      newConversation,
    ],
  );

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  const regenerateLastMessage = useCallback(async () => {
    const messages = activeConversation?.messages ?? [];
    // Find the last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;
    await sendMessage(lastUserMsg.content);
  }, [activeConversation, sendMessage]);

  return {
    isLoading,
    regenerateLastMessage,
    sendMessage,
    stopGeneration,
  };
}
