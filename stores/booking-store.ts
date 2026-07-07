import { create } from "zustand";

type BookingState = {
  serviceId: string | null;
  setServiceId: (serviceId: string | null) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  serviceId: null,
  setServiceId: (serviceId) => set({ serviceId }),
}));
