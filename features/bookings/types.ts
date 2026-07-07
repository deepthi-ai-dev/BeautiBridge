export type BookingData = {
  id: string;
  artistSlug: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

export type BookingStep = 1 | 2 | 3;
