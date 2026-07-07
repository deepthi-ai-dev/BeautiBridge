import type { Metadata } from "next";
import { ArtistSettings } from "@/components/dashboard/artist/artist-settings";

export const metadata: Metadata = {
  title: "Settings | BeautiBridge Artist",
};

export default function SettingsPage() {
  return <ArtistSettings />;
}
