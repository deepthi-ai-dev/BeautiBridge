"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArtistFilters } from "@/components/marketplace/artist-filters";
import { ArtistSort } from "@/components/marketplace/artist-sort";
import { LocationPicker } from "@/components/marketplace/location-picker";
import { ArtistGrid } from "@/components/marketplace/artist-grid";
import { EmptyState } from "@/components/marketplace/empty-state";
import { ArtistProfilePreview } from "@/components/marketplace/artist-profile-preview";
import { LocationPermissionModal } from "@/components/marketplace/location-permission-modal";
import { Pagination } from "@/components/marketplace/pagination";
import { useMarketplaceStore } from "@/stores/marketplace-store";
import type { Artist } from "@/features/artists/types";
import type { ArtistQueryResult } from "@/features/artists/real-queries";

type MarketplaceListingProps = {
  initialCity?: string;
};

const EMPTY_RESULT: ArtistQueryResult = {
  artists: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
};

const LOCATION_PREF_KEY = "beautibridge_location_pref";

type LocationStatus = "idle" | "requesting" | "granted" | "denied" | "unsupported";

function getSavedLocationPref(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(LOCATION_PREF_KEY);
  if (val === "granted" || val === "denied") return val;
  return null;
}

export function MarketplaceListing({ initialCity: _initialCity }: MarketplaceListingProps = {}) {
  const {
    query,
    category,
    city,
    sortBy,
    page,
    latitude,
    longitude,
    setCoordinates,
    setPage,
    reset,
  } = useMarketplaceStore();
  const [previewArtist, setPreviewArtist] = useState<Artist | null>(null);
  const [result, setResult] = useState<ArtistQueryResult>(EMPTY_RESULT);
  const [isLoading, setIsLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [showLocationModal, setShowLocationModal] = useState(false);

  // On mount: check saved preference or show modal
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      return;
    }

    const saved = getSavedLocationPref();

    if (saved === "granted") {
      // Re-request silently (they already allowed before)
      requestLocation();
    } else if (saved === "denied") {
      setLocationStatus("denied");
    } else {
      // First time — show the modal after a short delay for polish
      const timer = setTimeout(() => setShowLocationModal(true), 600);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function requestLocation() {
    setLocationStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus("granted");
        localStorage.setItem(LOCATION_PREF_KEY, "granted");
      },
      () => {
        setCoordinates(null);
        setLocationStatus("denied");
        localStorage.setItem(LOCATION_PREF_KEY, "denied");
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000 * 60 * 15,
        timeout: 10000,
      },
    );
  }

  const handleLocationAllow = useCallback(() => {
    setShowLocationModal(false);
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocationDeny = useCallback(() => {
    setShowLocationModal(false);
    setLocationStatus("denied");
    setCoordinates(null);
    localStorage.setItem(LOCATION_PREF_KEY, "denied");
  }, [setCoordinates]);

  const handleLocationModalClose = useCallback(() => {
    setShowLocationModal(false);
    setLocationStatus("denied");
    setCoordinates(null);
    localStorage.setItem(LOCATION_PREF_KEY, "denied");
  }, [setCoordinates]);

  const hasExplicitCity = Boolean(city && city !== "All Cities");

  const searchParams = useMemo(() => {
    const params = new URLSearchParams({
      query,
      category,
      city,
      sortBy,
      page: String(page),
    });

    if (latitude !== undefined && longitude !== undefined) {
      params.set("latitude", String(latitude));
      params.set("longitude", String(longitude));
    }

    return params.toString();
  }, [query, category, city, sortBy, page, latitude, longitude]);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    fetch(`/api/artists?${searchParams}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load artists");
        }

        return response.json() as Promise<ArtistQueryResult>;
      })
      .then(setResult)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setResult(EMPTY_RESULT);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [searchParams]);

  const handlePreview = useCallback((artist: Artist) => {
    setPreviewArtist(artist);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewArtist(null);
  }, []);

  return (
    <>
      {/* Location permission modal */}
      <LocationPermissionModal
        isOpen={showLocationModal}
        onAllow={handleLocationAllow}
        onDeny={handleLocationDeny}
        onClose={handleLocationModalClose}
      />

      {/* Filters bar */}
      <div className="sticky top-[90px] z-30 mb-8 rounded-2xl border border-beige-300/50 bg-white/70 px-5 py-5 backdrop-blur-2xl shadow-sm transition-all duration-300">
        <ArtistFilters />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-plum-700/80 text-sm font-medium">
              {isLoading ? (
                "Finding artists..."
              ) : (
                <>
                  <span className="text-plum-900 font-bold">{result.total}</span>{" "}
                  {result.total === 1 ? "artist" : "artists"} found
                </>
              )}
            </p>
            <p className="mt-1 text-xs font-medium text-plum-700/60">
              {hasExplicitCity && `🏙️ Showing BeautiBridge artists in ${city}.`}
              {!hasExplicitCity && locationStatus === "requesting" && "📍 Getting your location..."}
              {!hasExplicitCity && locationStatus === "granted" && "📍 Showing artists near you — BeautiBridge artists listed first."}
              {!hasExplicitCity && locationStatus === "denied" && "Showing all BeautiBridge listings."}
              {!hasExplicitCity && locationStatus === "unsupported" && "Location is not supported in this browser."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LocationPicker />
            <ArtistSort />
          </div>
        </div>
      </div>

      {/* Grid or empty state */}
      <div className="py-8">
        {isLoading ? (
          <p className="py-24 text-center text-sm font-medium text-muted-foreground">
            Loading artists near you...
          </p>
        ) : result.artists.length === 0 ? (
          <EmptyState onReset={reset} />
        ) : (
          <ArtistGrid artists={result.artists} onPreview={handlePreview} pageKey={result.currentPage} />
        )}
      </div>

      {/* Pagination */}
      {result.totalPages > 1 && (
        <div className="py-8">
          <Pagination
            currentPage={result.currentPage}
            onPageChange={setPage}
            totalPages={result.totalPages}
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
