"use client";

export function useGeolocation() {
  return {
    coordinates: null,
    isSupported: typeof navigator !== "undefined" && "geolocation" in navigator,
  };
}
