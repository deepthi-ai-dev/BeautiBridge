export interface ParsedArtist {
  name: string;
  category: string;
  city: string;
  rating: number;
  startingPrice: number;
  specialty: string;
  badge?: string;
}

/**
 * Extracts the structured artist JSON block from an AI response text.
 * The AI is prompted to include a ```json [...] ``` block at the end
 * when the user asks to find/book artists.
 */
export function parseArtistJSON(text: string): ParsedArtist[] | null {
  // Match ```json ... ``` block — greedy enough to capture the full array
  const match = text.match(/```json\s*(\[[\s\S]*?\])\s*```/);
  if (!match?.[1]) return null;
  try {
    const parsed = JSON.parse(match[1]) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed as ParsedArtist[];
  } catch {
    return null;
  }
}

/**
 * Strips the structured JSON block from the AI response so the
 * user only sees the prose part of the message.
 */
export function stripArtistJSON(text: string): string {
  return text.replace(/```json\s*\[[\s\S]*?\]\s*```/, "").trim();
}
