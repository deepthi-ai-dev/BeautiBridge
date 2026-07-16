import { NextResponse } from "next/server";
import { queryRealArtists } from "@/features/artists/real-queries";
import { CATEGORIES, type ArtistCategory, type ArtistFilters } from "@/features/artists/types";

export const dynamic = "force-dynamic";

const sortOptions = ["distance", "rating", "price_asc", "price_desc", "reviews"] as const;

function getCategory(value: string | null): ArtistCategory | "all" {
  const category = value ?? "all";
  return CATEGORIES.some((item) => item.value === category)
    ? (category as ArtistCategory | "all")
    : "all";
}

function getSortBy(value: string | null): ArtistFilters["sortBy"] {
  return sortOptions.some((item) => item === value)
    ? (value as ArtistFilters["sortBy"])
    : "rating";
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const latitude = Number(searchParams.get("latitude"));
  const longitude = Number(searchParams.get("longitude"));

  const filters: ArtistFilters = {
    query: searchParams.get("query") ?? "",
    category: getCategory(searchParams.get("category")),
    city: searchParams.get("city") ?? "",
    sortBy: getSortBy(searchParams.get("sortBy")),
    page: Number(searchParams.get("page") ?? "1") || 1,
    latitude: Number.isFinite(latitude) ? latitude : undefined,
    longitude: Number.isFinite(longitude) ? longitude : undefined,
  };

  try {
    const result = await queryRealArtists(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Artists API] Unexpected error:", error);
    return NextResponse.json(
      { artists: [], total: 0, totalPages: 1, currentPage: 1 },
      { status: 200 }, // Return 200 so the frontend shows empty state not a crash
    );
  }
}

