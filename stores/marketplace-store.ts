"use client";

import { create } from "zustand";
import type { ArtistFilters, ArtistCategory } from "@/features/artists/types";

type MarketplaceStore = ArtistFilters & {
  setQuery: (query: string) => void;
  setCategory: (category: ArtistCategory | "all") => void;
  setCity: (city: string) => void;
  setSortBy: (sortBy: ArtistFilters["sortBy"]) => void;
  setPage: (page: number) => void;
  reset: () => void;
};

const DEFAULT_FILTERS: ArtistFilters = {
  query: "",
  category: "all",
  city: "",
  sortBy: "rating",
  page: 1,
};

export const useMarketplaceStore = create<MarketplaceStore>((set) => ({
  ...DEFAULT_FILTERS,
  setQuery: (query) => set({ query, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setCity: (city) => set({ city, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }),
  setPage: (page) => set({ page }),
  reset: () => set(DEFAULT_FILTERS),
}));
