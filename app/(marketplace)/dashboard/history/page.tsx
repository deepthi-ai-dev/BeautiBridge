import type { Metadata } from "next";
import { BookingHistory } from "@/components/dashboard/customer/booking-history";

export const metadata: Metadata = {
  title: "Booking History | BeautiBridge",
};

export default function HistoryPage() {
  return <BookingHistory />;
}
