import { create } from "zustand";

type AssistantState = {
  messages: string[];
  addMessage: (message: string) => void;
};

export const useAssistantStore = create<AssistantState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
