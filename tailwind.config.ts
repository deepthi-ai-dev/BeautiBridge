import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./server/**/*.{ts,tsx}",
    "./stores/**/*.{ts,tsx}",
  ],
  plugins: [typography],
} satisfies Config;

export default config;
