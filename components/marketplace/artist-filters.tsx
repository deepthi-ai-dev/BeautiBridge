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
        <Search className="text-plum-700/50 pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
        <Input
          aria-label="Search artists"
          className="pl-11 pr-10 h-12 bg-white/50 border-beige-300 rounded-xl shadow-inner focus-visible:ring-salmon-300 text-plum-900 placeholder:text-plum-700/50"
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
        className="flex flex-wrap gap-2 items-center"
        role="group"
      >
        <span className="text-plum-700/70 mr-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
          <SlidersHorizontal className="size-3.5" />
          Filter
        </span>
        {CATEGORIES.map(({ label, value }) => {
          const active = category === value;
          return (
            <button
              aria-pressed={active}
              className={[
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                active
                  ? "bg-plum-900 border-plum-900 text-white shadow-md scale-105"
                  : "border-beige-300 text-plum-700/80 hover:bg-beige-100 hover:text-plum-900 bg-white/50",
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
