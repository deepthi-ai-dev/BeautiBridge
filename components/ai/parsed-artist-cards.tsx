"use client";

import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { rupeeFormatter } from "@/lib/formatters";
import type { ParsedArtist } from "@/lib/ai-parser";

const badgeColors: Record<string, string> = {
  "Top Rated": "bg-gold-400/15 text-gold-500",
  "Rising Star": "bg-teal-400/15 text-teal-600",
  "Highly Booked": "bg-salmon-400/15 text-secondary",
};

const categoryEmoji: Record<string, string> = {
  bridal: "💍",
  makeup: "💄",
  hair: "💇",
  nail: "💅",
  skincare: "🌿",
  editorial: "📸",
};

interface ParsedArtistCardsProps {
  artists: ParsedArtist[];
}

export function ParsedArtistCards({ artists }: ParsedArtistCardsProps) {
  if (artists.length === 0) return null;

  return (
    <div className="mt-4 px-1">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3 text-secondary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            AI-Matched Artists
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {artists.map((artist, idx) => (
          <Link
            href={`/artists?category=${encodeURIComponent(artist.category)}&city=${encodeURIComponent(artist.city)}`}
            key={idx}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 shadow-[0_4px_16px_rgba(53,27,49,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-[0_12px_28px_rgba(53,27,49,0.12)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {artist.badge && (
                    <span
                      className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        badgeColors[artist.badge] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {artist.badge}
                    </span>
                  )}
                  <p className="text-sm font-bold text-foreground">{artist.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] capitalize text-muted-foreground">
                    <span>{categoryEmoji[artist.category] ?? "✨"}</span>
                    {artist.category}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-gold-400/10 px-2 py-1">
                  <Star className="size-3 fill-gold-400 text-gold-400" />
                  <span className="text-[11px] font-bold text-foreground">{artist.rating}</span>
                </div>
              </div>

              <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                {artist.specialty}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">
                    From {rupeeFormatter.format(artist.startingPrice)}
                  </p>
                  <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MapPin className="size-2.5" />
                    {artist.city}
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-lg border border-secondary/30 bg-secondary/5 px-2.5 py-1.5 text-xs font-semibold text-secondary opacity-0 transition-all duration-200 group-hover:opacity-100">
                  View
                  <ArrowRight className="size-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-3 text-center">
        <Link
          href="/artists"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/70 transition-colors hover:text-primary"
        >
          Browse all verified artists on BeautiBridge
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
