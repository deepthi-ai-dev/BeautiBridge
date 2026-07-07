import type { Metadata } from "next";
import { FavoriteArtists } from "@/components/dashboard/customer/favorite-artists";

export const metadata: Metadata = {
  title: "Favorite Artists | BeautiBridge",
};

export default function FavoritesPage() {
  return <FavoriteArtists />;
}
