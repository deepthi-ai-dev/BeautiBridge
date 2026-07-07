import type { Metadata } from "next";
import { BookingRequests } from "@/components/dashboard/artist/booking-requests";

export const metadata: Metadata = {
  title: "Booking Requests | BeautiBridge Artist",
};

export default function RequestsPage() {
  return <BookingRequests />;
}
