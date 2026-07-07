export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL?.trim(),
  authGoogleId: process.env.AUTH_GOOGLE_ID?.trim(),
  authGoogleSecret: process.env.AUTH_GOOGLE_SECRET?.trim(),
  authSecret: process.env.AUTH_SECRET?.trim(),
  databaseUrl: process.env.DATABASE_URL?.trim(),
  geminiApiKey: process.env.GEMINI_API_KEY?.trim(),
} as const;
