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
      <div className="sticky top-[90px] z-30 mb-8 rounded-2xl border border-beige-300/50 bg-white/70 px-5 py-5 backdrop-blur-2xl shadow-sm transition-all duration-300">
        <ArtistFilters />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-plum-700/80 text-sm font-medium">
            <span className="text-plum-900 font-bold">{total}</span>{" "}
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
