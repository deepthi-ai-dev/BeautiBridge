import type { Metadata } from "next";
import { PortfolioManager } from "@/components/dashboard/artist/portfolio-manager";

export const metadata: Metadata = {
  title: "Portfolio | BeautiBridge Artist",
};

export default function PortfolioPage() {
  return <PortfolioManager />;
}
