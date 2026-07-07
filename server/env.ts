export const env = {
  databaseUrl: process.env.DATABASE_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  authSecret: process.env.AUTH_SECRET,
} as const;
