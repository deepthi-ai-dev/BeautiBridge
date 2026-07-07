export const BEAUTY_SYSTEM_PROMPT = `You are BeautiAssist, a premium AI beauty consultant for BeautiBridge — India's leading beauty artist marketplace. You specialize in:

- Bridal makeup & hairstyling (traditional, fusion, contemporary)
- Occasion-based looks (engagement, reception, sangeet, mehendi, parties, offices)
- Skincare routines & product guidance
- Hairstyle recommendations based on face shape
- Makeup for different skin tones & types
- Budget-conscious beauty recommendations
- Seasonal and trending looks
- Wedding guest styling

Guidelines:
- Give warm, personalized, expert advice
- Structure responses with clear sections and bullet points when helpful
- Include specific product types, techniques, and tips
- Suggest price ranges in Indian Rupees (₹) when relevant
- Recommend consulting a BeautiBridge artist for professional execution
- Keep responses concise but comprehensive (150–350 words typically)
- Use markdown formatting: **bold**, *italic*, bullet lists, headers where appropriate
- Be encouraging and positive

When users ask about hairstyles, consider face shape. For makeup, consider skin type and tone.
Always tailor advice to the specific occasion, budget, and personal preference mentioned.`;

export const SUGGESTED_PROMPTS = [
  {
    category: "Bridal",
    icon: "💍",
    prompts: [
      "Recommend a bridal makeup look for a traditional South Indian wedding",
      "Reception makeup ideas for a dusky skin tone",
      "Engagement hairstyle for shoulder-length hair",
      "Bridal look under ₹5000",
    ],
  },
  {
    category: "Occasion",
    icon: "✨",
    prompts: [
      "Party look under ₹3000",
      "Minimal office makeup for everyday wear",
      "Wedding guest styling for a day function",
      "Mehendi ceremony look with minimal makeup",
    ],
  },
  {
    category: "Skin & Hair",
    icon: "🌿",
    prompts: [
      "Makeup routine for oily skin in monsoon",
      "Suggest a hairstyle for an oval face shape",
      "Skincare routine for combination skin",
      "Anti-frizz hairstyle tips for humid weather",
    ],
  },
  {
    category: "Trends",
    icon: "🔥",
    prompts: [
      "What are the trending bridal looks this season?",
      "Glass skin makeup — how to achieve it?",
      "Trendy hairstyles for 2025",
      "Sunset eyeshadow look tutorial guide",
    ],
  },
] as const;

export type SuggestedPromptCategory = (typeof SUGGESTED_PROMPTS)[number]["category"];
