import { Prisma, UserRole, type User } from "@prisma/client";
import { db } from "@/server/db";
import { PLACEHOLDER_IMAGE } from "@/lib/image";
import { toSlug } from "@/lib/slug";
import {
  type Artist,
  type ArtistCategory,
  type ArtistFilters,
  PAGE_SIZE,
} from "./types";
import { queryNearbyMapArtists, getCityCoords } from "./external-places";
import { MOCK_ARTISTS } from "./mock-data";

// Ensure every mock artist is tagged as beautibridge source
const SEEDED_MOCK_ARTISTS: Artist[] = MOCK_ARTISTS.map((a) => ({
  ...a,
  source: "beautibridge" as const,
}));

export type ArtistQueryResult = {
  artists: Artist[];
  total: number;
  totalPages: number;
  currentPage: number;
};

type ArtistUser = Pick<
  User,
  | "id"
  | "name"
  | "phone"
  | "image"
  | "city"
  | "address"
  | "experience"
  | "about"
  | "languages"
  | "pricing"
  | "specialties"
  | "createdAt"
>;

const DEFAULT_SERVICES = ["Makeup", "Hair Styling", "Beauty Consultation"];
const DEFAULT_PRICE = 2500;

function splitCsv(value: string | null | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function inferCategory(services: string[]): ArtistCategory {
  const text = services.join(" ").toLowerCase();

  if (text.includes("bridal") || text.includes("wedding")) return "bridal";
  if (text.includes("hair")) return "hair";
  if (text.includes("nail")) return "nail";
  if (text.includes("skin") || text.includes("facial")) return "skincare";
  if (text.includes("editorial") || text.includes("fashion")) return "editorial";

  return "makeup";
}

function parseExperienceYears(experience: string | null | undefined) {
  const match = experience?.match(/\d+/);
  return match ? Number(match[0]) : 1;
}

function parseState(address: string | null | undefined) {
  const parts = splitCsv(address);
  return parts.at(-1) ?? "India";
}

function getArtistSlug(user: ArtistUser) {
  const name = user.name?.trim() || "beauty-artist";
  return `${toSlug(name)}-${user.id}`;
}

export function artistFromUser(user: ArtistUser): Artist {
  const services = splitCsv(user.specialties);
  const languages = splitCsv(user.languages);
  const category = inferCategory(services.length > 0 ? services : DEFAULT_SERVICES);

  return {
    id: user.id,
    slug: getArtistSlug(user),
    name: user.name?.trim() || "BeautiBridge Artist",
    avatar: user.image || PLACEHOLDER_IMAGE,
    coverImage: user.image || PLACEHOLDER_IMAGE,
    category,
    services: services.length > 0 ? services : DEFAULT_SERVICES,
    city: user.city?.trim() || "Online",
    state: parseState(user.address),
    rating: 0,
    reviewCount: 0,
    startingPrice: user.pricing ?? DEFAULT_PRICE,
    bio:
      user.about?.trim() ||
      "Independent beauty professional available for bookings through BeautiBridge.",
    yearsExperience: parseExperienceYears(user.experience),
    isVerified: Boolean(user.name && user.phone && user.city && user.about),
    badge: undefined,
    portfolio: user.image ? [user.image] : [],
    languages: languages.length > 0 ? languages : ["English"],
    availability: "available",
    source: "beautibridge",
  };
}

function getSlugId(slug: string) {
  return slug.split("-").at(-1) ?? slug;
}

export async function queryRealArtists(
  filters: ArtistFilters,
): Promise<ArtistQueryResult> {
  const where: Prisma.UserWhereInput = {
    role: UserRole.ARTIST,
  };

  const hasCoordinates =
    filters.latitude !== undefined &&
    filters.longitude !== undefined &&
    Number.isFinite(filters.latitude) &&
    Number.isFinite(filters.longitude);

  const hasExplicitCity = Boolean(filters.city && filters.city !== "All Cities");

  if (hasExplicitCity) {
    where.city = {
      contains: filters.city,
      mode: "insensitive",
    };
  }

  const users = await db.user.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      phone: true,
      image: true,
      city: true,
      address: true,
      experience: true,
      about: true,
      languages: true,
      pricing: true,
      specialties: true,
      createdAt: true,
    },
  });

  // Fetch real rating stats from the Review table and merge into each artist
  const reviewStats = await db.review.groupBy({
    by: ['artistId'],
    _avg: { rating: true },
    _count: { id: true },
  });
  const statsMap = new Map(
    reviewStats.map((s) => [
      s.artistId,
      { avg: s._avg.rating ?? 0, count: s._count.id },
    ]),
  );

  let beautiBridgeArtists = users.map(artistFromUser);

  beautiBridgeArtists = beautiBridgeArtists.map((artist) => {
    const stats = statsMap.get(artist.id);
    return stats
      ? { ...artist, rating: Math.round(stats.avg * 10) / 10, reviewCount: stats.count }
      : artist;
  });

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase().trim();
    beautiBridgeArtists = beautiBridgeArtists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(q) ||
        artist.services.some((service) => service.toLowerCase().includes(q)) ||
        artist.city.toLowerCase().includes(q) ||
        artist.category.toLowerCase().includes(q),
    );
  }

  if (filters.category !== "all") {
    beautiBridgeArtists = beautiBridgeArtists.filter((artist) => artist.category === filters.category);
  }

  // ── Merge mock artists (hackathon demo data) ─────────────────────────────
  // Deduplicate: skip any mock artist whose slug matches a real DB artist
  const realSlugs = new Set(beautiBridgeArtists.map((a) => a.slug));

  let mockArtists = SEEDED_MOCK_ARTISTS.filter((a) => !realSlugs.has(a.slug));

  // Apply the same search/category/city filters to mock artists
  if (filters.query.trim()) {
    const q = filters.query.toLowerCase().trim();
    mockArtists = mockArtists.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.services.some((s) => s.toLowerCase().includes(q)) ||
        a.city.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    );
  }

  if (filters.category !== "all") {
    mockArtists = mockArtists.filter((a) => a.category === filters.category);
  }

  if (hasExplicitCity) {
    mockArtists = mockArtists.filter(
      (a) => a.city.toLowerCase() === filters.city!.toLowerCase(),
    );
  }
  // ─────────────────────────────────────────────────────────────────────────

  let mapArtists: Artist[] = [];

  // Resolve which coordinates to use for map search:
  // 1. If a city is explicitly chosen, use that city's hardcoded centre coords.
  // 2. Otherwise fall back to the user's real GPS coordinates.
  let searchCoords: { latitude: number; longitude: number } | null = null;

  if (hasExplicitCity) {
    searchCoords = getCityCoords(filters.city!);
  } else if (hasCoordinates) {
    searchCoords = {
      latitude: filters.latitude!,
      longitude: filters.longitude!,
    };
  }

  if (searchCoords) {
    mapArtists = await queryNearbyMapArtists({
      latitude: searchCoords.latitude,
      longitude: searchCoords.longitude,
      category: filters.category,
      query: filters.query,
      radiusMeters: hasExplicitCity ? 15000 : 8000, // wider radius for city search
    });
  }

  // Order: real DB artists first → mock demo artists → nearby map artists
  const results = [...beautiBridgeArtists, ...mockArtists, ...mapArtists];

  switch (filters.sortBy) {
    case "price_asc":
      results.sort(
        (a, b) =>
          Number(a.source !== "beautibridge") - Number(b.source !== "beautibridge") ||
          a.startingPrice - b.startingPrice,
      );
      break;
    case "price_desc":
      results.sort(
        (a, b) =>
          Number(a.source !== "beautibridge") - Number(b.source !== "beautibridge") ||
          b.startingPrice - a.startingPrice,
      );
      break;
    case "reviews":
      results.sort(
        (a, b) =>
          Number(a.source !== "beautibridge") - Number(b.source !== "beautibridge") ||
          b.reviewCount - a.reviewCount,
      );
      break;
    case "rating":
      results.sort(
        (a, b) =>
          Number(a.source !== "beautibridge") - Number(b.source !== "beautibridge") ||
          b.rating - a.rating ||
          b.reviewCount - a.reviewCount,
      );
      break;
    case "distance":
      results.sort(
        (a, b) =>
          Number(a.source !== "beautibridge") - Number(b.source !== "beautibridge") ||
          (a.distanceKm ?? Number.POSITIVE_INFINITY) -
            (b.distanceKm ?? Number.POSITIVE_INFINITY),
      );
      break;
  }

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, filters.page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const artists = results.slice(start, start + PAGE_SIZE);

  return { artists, total, totalPages, currentPage: safePage };
}

export async function getRealArtistBySlug(slug: string): Promise<Artist | null> {
  const id = getSlugId(slug);

  const user = await db.user.findFirst({
    where: {
      id,
      role: UserRole.ARTIST,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      image: true,
      city: true,
      address: true,
      experience: true,
      about: true,
      languages: true,
      pricing: true,
      specialties: true,
      createdAt: true,
    },
  });

  // ── Fallback: check mock artists if no real DB user found ─────────────────
  if (!user) {
    const mockArtist = SEEDED_MOCK_ARTISTS.find(
      (a) => a.slug === slug || a.id === id,
    );
    return mockArtist ?? null;
  }
  // ─────────────────────────────────────────────────────────────────────────

  const artist = artistFromUser(user);

  // Attach real rating stats for this single artist
  const reviewStats = await db.review.groupBy({
    by: ['artistId'],
    where: { artistId: id },
    _avg: { rating: true },
    _count: { id: true },
  });
  const stat = reviewStats[0];
  if (stat) {
    artist.rating = Math.round((stat._avg.rating ?? 0) * 10) / 10;
    artist.reviewCount = stat._count.id;
  }

  return artist;
}
