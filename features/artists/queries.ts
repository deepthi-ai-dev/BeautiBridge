import { MOCK_ARTISTS } from "./mock-data";
import { type Artist, type ArtistFilters, PAGE_SIZE } from "./types";

export type ArtistQueryResult = {
  artists: Artist[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export function queryArtists(filters: ArtistFilters): ArtistQueryResult {
  let results = [...MOCK_ARTISTS];

  // Text search across name, services, city
  if (filters.query.trim()) {
    const q = filters.query.toLowerCase().trim();
    results = results.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.services.some((s) => s.toLowerCase().includes(q)) ||
        a.city.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    );
  }

  // Category filter
  if (filters.category !== "all") {
    results = results.filter((a) => a.category === filters.category);
  }

  // City filter
  if (filters.city && filters.city !== "All Cities") {
    results = results.filter((a) => a.city === filters.city);
  }

  // Sort
  switch (filters.sortBy) {
    case "rating":
      results.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case "price_asc":
      results.sort((a, b) => a.startingPrice - b.startingPrice);
      break;
    case "price_desc":
      results.sort((a, b) => b.startingPrice - a.startingPrice);
      break;
    case "reviews":
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, filters.page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const artists = results.slice(start, start + PAGE_SIZE);

  return { artists, total, totalPages, currentPage: safePage };
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return MOCK_ARTISTS.find((a) => a.slug === slug);
}
