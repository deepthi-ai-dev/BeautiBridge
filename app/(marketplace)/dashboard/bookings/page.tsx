import type { Metadata } from "next";
import { MyBookings } from "@/components/dashboard/customer/my-bookings";

export const metadata: Metadata = {
  title: "My Bookings | BeautiBridge",
};

export default function BookingsPage() {
  return <MyBookings />;
}
