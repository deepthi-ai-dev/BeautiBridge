import { PLACEHOLDER_IMAGE } from "@/lib/image";
import { toSlug } from "@/lib/slug";
import type { Artist, ArtistCategory } from "./types";

type NearbySearchInput = {
  latitude: number;
  longitude: number;
  category: ArtistCategory | "all";
  query: string;
  radiusMeters?: number;
};

type PlaceCandidate = {
  id: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  reviewCount?: number;
  url?: string;
  type?: string;
};

const DEFAULT_RADIUS_METERS = 8000;
const GOOGLE_PLACE_TYPES = [
  "beauty_salon",
  "hair_salon",
  "makeup_artist",
  "nail_salon",
  "spa",
  "skin_care_clinic",
];

function getDistanceKm(
  fromLatitude: number,
  fromLongitude: number,
  toLatitude?: number,
  toLongitude?: number,
) {
  if (toLatitude === undefined || toLongitude === undefined) return undefined;

  const earthRadiusKm = 6371;
  const dLat = ((toLatitude - fromLatitude) * Math.PI) / 180;
  const dLon = ((toLongitude - fromLongitude) * Math.PI) / 180;
  const lat1 = (fromLatitude * Math.PI) / 180;
  const lat2 = (toLatitude * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(earthRadiusKm * c * 10) / 10;
}

function inferExternalCategory(type?: string): ArtistCategory {
  if (type?.includes("hair")) return "hair";
  if (type?.includes("nail")) return "nail";
  if (type?.includes("skin") || type?.includes("spa")) return "skincare";
  if (type?.includes("makeup")) return "makeup";
  return "makeup";
}

function getExternalServices(type?: string) {
  if (type?.includes("hair")) return ["Hair Styling", "Hair Salon"];
  if (type?.includes("nail")) return ["Nail Art", "Nail Care"];
  if (type?.includes("skin")) return ["Skincare", "Facials"];
  if (type?.includes("spa")) return ["Skincare", "Spa"];
  if (type?.includes("makeup")) return ["Makeup", "Beauty Services"];
  return ["Beauty Services", "Makeup", "Styling"];
}

function getCityFromAddress(address?: string) {
  const parts = (address ?? "").split(",").map((part) => part.trim()).filter(Boolean);
  return parts.at(-3) ?? parts.at(-2) ?? "Nearby";
}

function getStateFromAddress(address?: string) {
  const parts = (address ?? "").split(",").map((part) => part.trim()).filter(Boolean);
  return parts.at(-2) ?? "Maps";
}

function candidateToArtist(
  candidate: PlaceCandidate,
  originLatitude: number,
  originLongitude: number,
): Artist {
  const category = inferExternalCategory(candidate.type);
  const distanceKm = getDistanceKm(
    originLatitude,
    originLongitude,
    candidate.latitude,
    candidate.longitude,
  );

  return {
    id: `maps-${candidate.id}`,
    slug: `maps-${toSlug(candidate.name)}-${candidate.id}`,
    name: candidate.name,
    avatar: PLACEHOLDER_IMAGE,
    coverImage: PLACEHOLDER_IMAGE,
    category,
    services: getExternalServices(candidate.type),
    city: getCityFromAddress(candidate.address),
    state: getStateFromAddress(candidate.address),
    rating: candidate.rating ?? 0,
    reviewCount: candidate.reviewCount ?? 0,
    startingPrice: 0,
    bio: [
      candidate.address ?? "Nearby beauty listing from maps data.",
      distanceKm !== undefined ? `${distanceKm} km away.` : null,
    ]
      .filter(Boolean)
      .join(" "),
    yearsExperience: 0,
    isVerified: false,
    portfolio: [],
    languages: ["Contact listing"],
    availability: "available",
    source: "maps",
    externalUrl: candidate.url,
    distanceKm,
  };
}

function matchesQuery(candidate: PlaceCandidate, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return [candidate.name, candidate.address, candidate.type]
    .filter(Boolean)
    .some((value) => value?.toLowerCase().includes(normalizedQuery));
}

function matchesCategory(candidate: PlaceCandidate, category: ArtistCategory | "all") {
  return category === "all" || inferExternalCategory(candidate.type) === category;
}

async function fetchGooglePlaces(input: NearbySearchInput) {
  const apiKey =
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim();

  if (!apiKey) return [];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.googleMapsUri,places.primaryType",
      },
      body: JSON.stringify({
        includedTypes: GOOGLE_PLACE_TYPES,
        maxResultCount: 20,
        rankPreference: "DISTANCE",
        locationRestriction: {
          circle: {
            center: {
              latitude: input.latitude,
              longitude: input.longitude,
            },
            radius: input.radiusMeters ?? DEFAULT_RADIUS_METERS,
          },
        },
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) return [];

    const data = (await response.json()) as {
      places?: Array<{
        id?: string;
        displayName?: { text?: string };
        formattedAddress?: string;
        location?: { latitude?: number; longitude?: number };
        rating?: number;
        userRatingCount?: number;
        googleMapsUri?: string;
        primaryType?: string;
      }>;
    };

    return (data.places ?? [])
      .map((place): PlaceCandidate | null => {
        if (!place.id || !place.displayName?.text) return null;

        return {
          id: place.id,
          name: place.displayName.text,
          address: place.formattedAddress,
          latitude: place.location?.latitude,
          longitude: place.location?.longitude,
          rating: place.rating,
          reviewCount: place.userRatingCount,
          url: place.googleMapsUri,
          type: place.primaryType,
        };
      })
      .filter((place): place is PlaceCandidate => Boolean(place));
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchOpenStreetMapPlaces(input: NearbySearchInput) {
  const query = `
    [out:json][timeout:8];
    (
      node["shop"~"beauty|hairdresser|cosmetics"](around:${input.radiusMeters ?? DEFAULT_RADIUS_METERS},${input.latitude},${input.longitude});
      way["shop"~"beauty|hairdresser|cosmetics"](around:${input.radiusMeters ?? DEFAULT_RADIUS_METERS},${input.latitude},${input.longitude});
      relation["shop"~"beauty|hairdresser|cosmetics"](around:${input.radiusMeters ?? DEFAULT_RADIUS_METERS},${input.latitude},${input.longitude});
    );
    out center 20;
  `;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: new URLSearchParams({ data: query }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) return [];

    const data = (await response.json()) as {
      elements?: Array<{
        id: number;
        lat?: number;
        lon?: number;
        center?: { lat?: number; lon?: number };
        tags?: Record<string, string>;
        type: string;
      }>;
    };

    return (data.elements ?? [])
      .map((element): PlaceCandidate | null => {
        const name = element.tags?.name;
        if (!name) return null;

        const address = [
          element.tags?.["addr:street"],
          element.tags?.["addr:city"],
          element.tags?.["addr:state"],
        ]
          .filter(Boolean)
          .join(", ");

        const type = element.tags?.shop;

        return {
          id: `${element.type}-${element.id}`,
          name,
          address,
          latitude: element.lat ?? element.center?.lat,
          longitude: element.lon ?? element.center?.lon,
          type: type === "hairdresser" ? "hair_salon" : "beauty_salon",
          url:
            element.lat || element.center?.lat
              ? `https://www.openstreetmap.org/${element.type}/${element.id}`
              : undefined,
        };
      })
      .filter((place): place is PlaceCandidate => Boolean(place));
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function queryNearbyMapArtists(input: NearbySearchInput) {
  const places = await fetchGooglePlaces(input).catch(() => []);
  const fallbackPlaces =
    places.length > 0 ? places : await fetchOpenStreetMapPlaces(input).catch(() => []);

  return fallbackPlaces
    .filter((place) => matchesQuery(place, input.query))
    .filter((place) => matchesCategory(place, input.category))
    .map((place) => candidateToArtist(place, input.latitude, input.longitude))
    .sort((a, b) => (a.distanceKm ?? Number.POSITIVE_INFINITY) - (b.distanceKm ?? Number.POSITIVE_INFINITY));
}

/**
 * Approximate city-centre coordinates for all cities in the CITIES list.
 * Used to fetch nearby map artists when a user picks a city from the dropdown.
 */
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  "Mumbai":          { latitude: 19.0760,  longitude: 72.8777 },
  "Delhi":           { latitude: 28.6139,  longitude: 77.2090 },
  "Bangalore":       { latitude: 12.9716,  longitude: 77.5946 },
  "Hyderabad":       { latitude: 17.3850,  longitude: 78.4867 },
  "Chennai":         { latitude: 13.0827,  longitude: 80.2707 },
  "Kolkata":         { latitude: 22.5726,  longitude: 88.3639 },
  "Pune":            { latitude: 18.5204,  longitude: 73.8567 },
  "Jaipur":          { latitude: 26.9124,  longitude: 75.7873 },
  "Coimbatore":      { latitude: 11.0168,  longitude: 76.9558 },
  "Visakhapatnam":   { latitude: 17.6868,  longitude: 83.2185 },
  "Nagpur":          { latitude: 21.1458,  longitude: 79.0882 },
  "Surat":           { latitude: 21.1702,  longitude: 72.8311 },
  "Vizag":           { latitude: 17.6868,  longitude: 83.2185 },
};

export function getCityCoords(city: string) {
  return CITY_COORDS[city] ?? null;
}
