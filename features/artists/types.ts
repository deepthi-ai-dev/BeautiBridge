export type ArtistCategory =
  | "bridal"
  | "editorial"
  | "hair"
  | "makeup"
  | "nail"
  | "skincare";

export type Artist = {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  coverImage: string;
  category: ArtistCategory;
  services: string[];
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  bio: string;
  yearsExperience: number;
  isVerified: boolean;
  badge?: "Highly Booked" | "Rising Star" | "Top Rated";
  portfolio: string[];
  languages: string[];
  availability: "available" | "busy" | "unavailable";
  source?: "beautibridge" | "maps";
  externalUrl?: string;
  distanceKm?: number;
};

export type ArtistFilters = {
  query: string;
  category: ArtistCategory | "all";
  city: string;
  sortBy: "distance" | "rating" | "price_asc" | "price_desc" | "reviews";
  page: number;
  latitude?: number;
  longitude?: number;
};

export const CATEGORIES: { label: string; value: ArtistCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Makeup", value: "makeup" },
  { label: "Bridal", value: "bridal" },
  { label: "Hair", value: "hair" },
  { label: "Nail Art", value: "nail" },
  { label: "Skincare", value: "skincare" },
  { label: "Editorial", value: "editorial" },
];

export const CITIES = [
  "All Cities",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Coimbatore",
  "Visakhapatnam",
  "Nagpur",
  "Surat",
];

export const PAGE_SIZE = 12;
