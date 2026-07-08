"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { MOCK_ARTISTS } from "@/features/artists/mock-data";
import type { Artist, ArtistCategory } from "@/features/artists/types";
import { rupeeFormatter } from "@/lib/formatters";

const KEYWORD_MAP: Record<string, ArtistCategory[]> = {
  bridal: ["bridal", "hair", "makeup"],
  bride: ["bridal", "makeup"],
  wedding: ["bridal", "hair", "makeup"],
  engagement: ["bridal", "makeup"],
  reception: ["bridal", "makeup"],
  hair: ["hair"],
  hairstyle: ["hair"],
  updo: ["hair"],
  braid: ["hair"],
  nail: ["nail"],
  nails: ["nail"],
  manicure: ["nail"],
  skincare: ["skincare"],
  skin: ["skincare"],
  glow: ["skincare", "makeup"],
  makeup: ["makeup", "bridal"],
  eyeshadow: ["makeup"],
  airbrush: ["bridal", "makeup"],
  mehendi: ["bridal"],
  sangeet: ["bridal", "makeup"],
  party: ["makeup", "hair"],
  occasion: ["makeup", "bridal"],
};

function detectCategories(text: string): ArtistCategory[] {
  const lower = text.toLowerCase();
  const found = new Set<ArtistCategory>();
  for (const [keyword, cats] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      cats.forEach((c) => found.add(c));
    }
  }
  return Array.from(found);
}

function pickArtists(text: string, count = 3): Artist[] {
  const cats = detectCategories(text);
  if (cats.length === 0) return [];
  const matched = MOCK_ARTISTS.filter((a) => cats.includes(a.category));
  const sorted = matched.sort((a, b) => b.rating - a.rating);
  const seen = new Set<string>();
  const result: Artist[] = [];
  for (const a of sorted) {
    if (!seen.has(a.id)) {
      seen.add(a.id);
      result.push(a);
    }
    if (result.length >= count) break;
  }
  return result;
}

const badgeColors: Record<string, string> = {
  "Top Rated": "bg-gold-400/15 text-gold-500",
  "Rising Star": "bg-teal-400/15 text-teal-500",
  "Highly Booked": "bg-salmon-400/15 text-secondary",
};

interface ArtistRecommendationsProps {
  conversationText: string;
}

export function ArtistRecommendations({ conversationText }: ArtistRecommendationsProps) {
  const artists = pickArtists(conversationText);
  if (artists.length === 0) return null;

  return (
    <div className="mt-4 px-1">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Recommended Artists
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {artists.map((artist) => (
          <Link href={`/artists/${artist.slug}`} key={artist.id} className="group block">
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 shadow-[0_4px_16px_rgba(53,27,49,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-[0_12px_28px_rgba(53,27,49,0.12)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {artist.badge && (
                    <span
                      className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeColors[artist.badge] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {artist.badge}
                    </span>
                  )}
                  <p className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                    {artist.name}
                    {artist.isVerified && (
                      <ShieldCheck className="size-3.5 text-teal-500" />
                    )}
                  </p>
                  <p className="mt-0.5 text-[11px] capitalize text-muted-foreground">
                    {artist.category} · {artist.city}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-gold-400/10 px-2 py-1">
                  <Star className="size-3 fill-gold-400 text-gold-400" />
                  <span className="text-[11px] font-bold text-foreground">{artist.rating}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-primary">
                  From {rupeeFormatter.format(artist.startingPrice)}
                </p>
                <span className="flex items-center gap-1 text-xs font-semibold text-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
          Explore all artists on BeautiBridge
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
