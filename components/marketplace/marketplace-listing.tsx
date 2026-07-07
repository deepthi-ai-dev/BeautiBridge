"use client";

import { useCallback, useMemo, useState } from "react";
import { ArtistFilters } from "@/components/marketplace/artist-filters";
import { ArtistSort } from "@/components/marketplace/artist-sort";
import { LocationPicker } from "@/components/marketplace/location-picker";
import { ArtistGrid } from "@/components/marketplace/artist-grid";
import { EmptyState } from "@/components/marketplace/empty-state";
import { ArtistProfilePreview } from "@/components/marketplace/artist-profile-preview";
import { Pagination } from "@/components/marketplace/pagination";
import { queryArtists } from "@/features/artists/queries";
import { useMarketplaceStore } from "@/stores/marketplace-store";
import type { Artist } from "@/features/artists/types";

export function MarketplaceListing() {
  const filters = useMarketplaceStore();
  const [previewArtist, setPreviewArtist] = useState<Artist | null>(null);

  const { artists, total, totalPages, currentPage } = useMemo(
    () =>
      queryArtists({
        query: filters.query,
        category: filters.category,
        city: filters.city,
        sortBy: filters.sortBy,
        page: filters.page,
      }),
    [
      filters.query,
      filters.category,
      filters.city,
      filters.sortBy,
      filters.page,
    ],
  );

  const handlePreview = useCallback((artist: Artist) => {
    setPreviewArtist(artist);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewArtist(null);
  }, []);

  return (
    <>
      {/* Filters bar */}
      <div className="sticky top-20 z-30 -mx-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-xl sm:-mx-0 sm:px-0">
        <ArtistFilters />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground text-sm">
            <span className="text-primary font-semibold">{total}</span>{" "}
            {total === 1 ? "artist" : "artists"} found
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <LocationPicker />
            <ArtistSort />
          </div>
        </div>
      </div>

      {/* Grid or empty state */}
      <div className="py-8">
        {artists.length === 0 ? (
          <EmptyState onReset={filters.reset} />
        ) : (
          <ArtistGrid artists={artists} onPreview={handlePreview} pageKey={currentPage} />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="py-8">
          <Pagination
            currentPage={currentPage}
            onPageChange={filters.setPage}
            totalPages={totalPages}
          />
        </div>
      )}

      {/* Profile preview drawer */}
      <ArtistProfilePreview
        artist={previewArtist}
        onClose={handleClosePreview}
      />
    </>
  );
}
