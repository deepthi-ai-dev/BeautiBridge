import type { Metadata } from "next";
import { EarningsPanel } from "@/components/dashboard/artist/earnings-panel";

export const metadata: Metadata = {
  title: "Earnings | BeautiBridge Artist",
};

export default function EarningsPage() {
  return <EarningsPanel />;
}
