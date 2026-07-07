import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, Conversation } from "@/features/ai/types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createConversation(): Conversation {
  const now = new Date();
  return {
    createdAt: now,
    id: generateId(),
    messages: [],
    title: "New Conversation",
    updatedAt: now,
  };
}

interface AssistantState {
  conversations: Conversation[];
  activeConversationId: string | null;

  // Derived
  activeConversation: Conversation | null;

  // Actions
  newConversation: () => string;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  clearAllConversations: () => void;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (content: string, isStreaming?: boolean) => void;
  setMessageError: (id: string) => void;
  updateConversationTitle: (id: string, title: string) => void;
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set, get) => ({
      activeConversation: null,
      activeConversationId: null,
      conversations: [],

      addMessage(message) {
        const { activeConversationId, conversations } = get();
        if (!activeConversationId) return;

        const updated = conversations.map((c) => {
          if (c.id !== activeConversationId) return c;
          const msgs = [...c.messages, message];
          // Auto-title from first user message
          const title =
            c.messages.length === 0 && message.role === "user"
              ? message.content.slice(0, 50)
              : c.title;
          return { ...c, messages: msgs, title, updatedAt: new Date() };
        });

        set({
          activeConversation:
            updated.find((c) => c.id === activeConversationId) ?? null,
          conversations: updated,
        });
      },

      clearAllConversations() {
        set({
          activeConversation: null,
          activeConversationId: null,
          conversations: [],
        });
      },

      deleteConversation(id) {
        const { conversations, activeConversationId } = get();
        const remaining = conversations.filter((c) => c.id !== id);
        const newActive =
          activeConversationId === id
            ? (remaining[0]?.id ?? null)
            : activeConversationId;

        set({
          activeConversation:
            remaining.find((c) => c.id === newActive) ?? null,
          activeConversationId: newActive,
          conversations: remaining,
        });
      },

      newConversation() {
        const conv = createConversation();
        set((state) => ({
          activeConversation: conv,
          activeConversationId: conv.id,
          conversations: [conv, ...state.conversations],
        }));
        return conv.id;
      },

      selectConversation(id) {
        const { conversations } = get();
        const conv = conversations.find((c) => c.id === id) ?? null;
        set({ activeConversation: conv, activeConversationId: id });
      },

      setMessageError(id) {
        const { activeConversationId, conversations } = get();
        if (!activeConversationId) return;

        const updated = conversations.map((c) => {
          if (c.id !== activeConversationId) return c;
          return {
            ...c,
            messages: c.messages.map((m) =>
              m.id === id
                ? { ...m, isError: true, isStreaming: false }
                : m,
            ),
          };
        });

        set({
          activeConversation:
            updated.find((c) => c.id === activeConversationId) ?? null,
          conversations: updated,
        });
      },

      updateConversationTitle(id, title) {
        const updated = get().conversations.map((c) =>
          c.id === id ? { ...c, title } : c,
        );
        set({
          activeConversation:
            updated.find((c) => c.id === id) ??
            get().activeConversation,
          conversations: updated,
        });
      },

      updateLastMessage(content, isStreaming = false) {
        const { activeConversationId, conversations } = get();
        if (!activeConversationId) return;

        const updated = conversations.map((c) => {
          if (c.id !== activeConversationId) return c;
          const msgs = [...c.messages];
          const last = msgs[msgs.length - 1];
          if (!last || last.role !== "assistant") return c;
          msgs[msgs.length - 1] = { ...last, content, isStreaming };
          return { ...c, messages: msgs, updatedAt: new Date() };
        });

        set({
          activeConversation:
            updated.find((c) => c.id === activeConversationId) ?? null,
          conversations: updated,
        });
      },
    }),
    {
      name: "beautibridge-assistant",
      partialize: (state) => ({
        activeConversationId: state.activeConversationId,
        conversations: state.conversations.map((c) => ({
          ...c,
          // Re-hydrate dates as strings from localStorage
          createdAt: c.createdAt,
          messages: c.messages.map((m) => ({ ...m, isStreaming: false })),
          updatedAt: c.updatedAt,
        })),
      }),
    },
  ),
);
