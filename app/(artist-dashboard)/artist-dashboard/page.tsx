import type { Metadata } from "next";
import { DashboardHome } from "@/components/dashboard/artist/dashboard-home";

export const metadata: Metadata = {
  title: "Dashboard | BeautiBridge Artist",
};

export default function ArtistDashboardPage() {
  return <DashboardHome />;
}
