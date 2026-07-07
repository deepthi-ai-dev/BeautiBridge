import type { Metadata } from "next";
import { AvailabilityManager } from "@/components/dashboard/artist/availability-manager";

export const metadata: Metadata = {
  title: "Availability | BeautiBridge Artist",
};

export default function AvailabilityPage() {
  return <AvailabilityManager />;
}
