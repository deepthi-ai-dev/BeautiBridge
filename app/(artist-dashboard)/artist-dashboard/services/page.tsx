import type { Metadata } from "next";
import { ServicesManager } from "@/components/dashboard/artist/services-manager";

export const metadata: Metadata = {
  title: "Services | BeautiBridge Artist",
};

export default function ServicesPage() {
  return <ServicesManager />;
}
