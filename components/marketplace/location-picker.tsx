"use client";

import { MapPin } from "lucide-react";
import { Select } from "@/components/ui/select";
import { CITIES } from "@/features/artists/types";
import { useMarketplaceStore } from "@/stores/marketplace-store";

export function LocationPicker() {
  const { city, setCity } = useMarketplaceStore();

  return (
    <div className="flex items-center gap-2">
      <MapPin className="text-muted-foreground size-4 shrink-0" />
      <Select
        aria-label="Filter by city"
        className="w-40"
        onChange={(e) => setCity(e.target.value === "All Cities" ? "" : e.target.value)}
        value={city || "All Cities"}
      >
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
    </div>
  );
}
