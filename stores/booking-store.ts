import { create } from "zustand";
import type { BookingStep } from "@/features/bookings/types";

export type CompletedBooking = {
  id: string;
  artistSlug: string;
  artistName: string;
  artistAvatar: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  price: number;
  status: "Upcoming" | "Completed" | "Cancelled";
};

type BookingState = {
  step: BookingStep;
  artistSlug: string | null;
  serviceId: string | null;
  date: string | null;
  timeSlot: string | null;
  mockBookings: CompletedBooking[];

  setStep: (step: BookingStep) => void;
  setArtistSlug: (slug: string) => void;
  setServiceId: (id: string | null) => void;
  setDate: (date: string | null) => void;
  setTimeSlot: (time: string | null) => void;
  resetBooking: () => void;
  addMockBooking: (booking: CompletedBooking) => void;
  cancelMockBooking: (id: string) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  artistSlug: null,
  serviceId: null,
  date: null,
  timeSlot: null,
  mockBookings: [],

  setStep: (step) => set({ step }),
  setArtistSlug: (artistSlug) => set({ artistSlug }),
  setServiceId: (serviceId) => set({ serviceId }),
  setDate: (date) => set({ date }),
  setTimeSlot: (timeSlot) => set({ timeSlot }),
  resetBooking: () =>
    set({ step: 1, artistSlug: null, serviceId: null, date: null, timeSlot: null }),
  addMockBooking: (booking) =>
    set((state) => ({ mockBookings: [...state.mockBookings, booking] })),
  cancelMockBooking: (id) =>
    set((state) => ({
      mockBookings: state.mockBookings.map((b) =>
        b.id === id ? { ...b, status: "Cancelled" } : b
      ),
    })),
}));
