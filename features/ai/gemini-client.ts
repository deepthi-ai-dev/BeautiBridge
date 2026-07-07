import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { BEAUTY_SYSTEM_PROMPT } from "@/features/ai/prompts";
import type { MessageRole } from "@/features/ai/types";

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export type GeminiMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

function toGeminiRole(role: MessageRole): "user" | "model" {
  return role === "user" ? "user" : "model";
}

export async function streamBeautyChat(
  messages: { role: MessageRole; content: string }[],
  onChunk: (chunk: string) => void,
): Promise<void> {
  const ai = getGenAI();

  const model = ai.getGenerativeModel({
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
    model: "gemini-2.5-flash",
    safetySettings,
    systemInstruction: BEAUTY_SYSTEM_PROMPT,
  });

  // Build history from all messages except the last user message
  const history: GeminiMessage[] = messages.slice(0, -1).map((m) => ({
    parts: [{ text: m.content }],
    role: toGeminiRole(m.role),
  }));

  const lastMessage = messages[messages.length - 1];

  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream(lastMessage.content);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      onChunk(text);
    }
  }
}
