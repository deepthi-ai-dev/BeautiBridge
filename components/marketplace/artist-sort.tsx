"use client";

import { ArrowUpDown } from "lucide-react";
import { Select } from "@/components/ui/select";
import { useMarketplaceStore } from "@/stores/marketplace-store";
import type { ArtistFilters } from "@/features/artists/types";

const SORT_OPTIONS: { label: string; value: ArtistFilters["sortBy"] }[] = [
  { label: "Nearest", value: "distance" },
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export function ArtistSort() {
  const { sortBy, setSortBy } = useMarketplaceStore();

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="text-muted-foreground size-4 shrink-0" />
      <Select
        aria-label="Sort artists by"
        className="w-44"
        onChange={(e) => setSortBy(e.target.value as ArtistFilters["sortBy"])}
        value={sortBy}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
