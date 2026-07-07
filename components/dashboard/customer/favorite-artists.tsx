"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Heart, MapPin } from "lucide-react";
import { AvatarInitials, StarRating } from "@/components/dashboard/ui-helpers";
import { MOCK_FAVORITE_ARTISTS, type MockFavoriteArtist } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function FavoriteArtists() {
  const [favorites, setFavorites] = useState<MockFavoriteArtist[]>(MOCK_FAVORITE_ARTISTS);

  function handleRemove(id: string, name: string) {
    if (confirm(`Remove ${name} from your favorites?`)) {
      setFavorites((prev) => prev.filter((item) => item.id !== id));
      alert(`${name} removed from favorites.`);
    }
  }

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Favorite Artists</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {favorites.length} Saved Artist{favorites.length !== 1 ? "s" : ""}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
          <span className="text-4xl">💖</span>
          <p className="text-base font-semibold text-foreground">No Favorite Artists yet</p>
          <p className="text-sm text-muted-foreground">
            Explore artists and click the heart icon to save them here.
          </p>
          <Link href="/artists">
            <button className="mt-4 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-plum-600 transition-colors shadow-soft">
              Explore Artists
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((artist, i) => (
            <FadeUp
              key={artist.id}
              className="premium-card p-5 space-y-4 flex flex-col justify-between"
              style={{ animationDelay: `${i * 65}ms` }}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <AvatarInitials initials={artist.initials} gradient={artist.color} size="lg" />
                  <button
                    aria-label="Remove from favorites"
                    onClick={() => handleRemove(artist.id, artist.name)}
                    className="rounded-full bg-destructive/10 hover:bg-destructive/20 p-2 text-destructive transition-colors"
                  >
                    <Heart className="size-4 fill-current" />
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-base truncate">{artist.name}</h3>
                  <p className="text-xs text-primary font-medium">{artist.specialty}</p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground border-t border-border pt-3">
                  <StarRating rating={artist.rating} />
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{artist.location}</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1 text-foreground">
                    <span className="text-[10px] text-muted-foreground">Starting from</span>
                    <span className="font-bold text-sm">
                      ₹{artist.startingPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                {/* Dynamically type cast links to shut down build errors */}
                <Link href={`/artists/${artist.slug}` as Route}>
                  <button className="w-full rounded-full bg-primary hover:bg-plum-600 py-2 text-xs font-semibold text-primary-foreground transition-all shadow-soft">
                    View Profile
                  </button>
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      )}
    </StaggerContainer>
  );
}
