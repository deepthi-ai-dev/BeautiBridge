"use client";

import { useBookingStore } from "@/stores/booking-store";

export function useBookingDraft() {
  return useBookingStore();
}
