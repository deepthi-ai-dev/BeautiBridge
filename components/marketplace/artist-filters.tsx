"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/features/artists/types";
import { useMarketplaceStore } from "@/stores/marketplace-store";

export function ArtistFilters() {
  const {
    query,
    category,
    setQuery,
    setCategory,
    reset,
  } = useMarketplaceStore();

  const hasActiveFilters = query.trim() !== "" || category !== "all";

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
        <Input
          aria-label="Search artists"
          className="pl-10 pr-10"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, service or city…"
          type="search"
          value={query}
        />
        {query && (
          <button
            aria-label="Clear search"
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 transition-colors"
            onClick={() => setQuery("")}
            type="button"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div
        aria-label="Filter by category"
        className="flex flex-wrap gap-2"
        role="group"
      >
        <span className="text-muted-foreground mr-1 flex items-center gap-1.5 text-xs font-medium">
          <SlidersHorizontal className="size-3.5" />
          Filter
        </span>
        {CATEGORIES.map(({ label, value }) => {
          const active = category === value;
          return (
            <button
              aria-pressed={active}
              className={[
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-150",
                active
                  ? "bg-primary border-primary text-primary-foreground shadow-sm"
                  : "border-border text-muted-foreground hover:border-primary/60 hover:text-primary bg-transparent",
              ].join(" ")}
              key={value}
              onClick={() => setCategory(value)}
              type="button"
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs font-medium">
            Active filters:
          </span>
          {query && (
            <Badge className="gap-1.5" variant="outline">
              &quot;{query}&quot;
              <button
                aria-label="Remove search filter"
                onClick={() => setQuery("")}
                type="button"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {category !== "all" && (
            <Badge className="gap-1.5 capitalize" variant="outline">
              {category}
              <button
                aria-label={`Remove ${category} filter`}
                onClick={() => setCategory("all")}
                type="button"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          <Button
            className="ml-auto h-7 px-3 text-xs"
            onClick={reset}
            size="sm"
            type="button"
            variant="ghost"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
