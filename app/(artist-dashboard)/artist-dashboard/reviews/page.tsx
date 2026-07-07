import type { Metadata } from "next";
import { ReviewsPanel } from "@/components/dashboard/artist/reviews-panel";

export const metadata: Metadata = {
  title: "Reviews | BeautiBridge Artist",
};

export default function ReviewsPage() {
  return <ReviewsPanel />;
}
