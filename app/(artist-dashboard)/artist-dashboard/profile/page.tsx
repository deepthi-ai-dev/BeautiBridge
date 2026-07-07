import type { Metadata } from "next";
import { ArtistProfileForm } from "@/components/dashboard/artist/artist-profile-form";

export const metadata: Metadata = {
  title: "Profile | BeautiBridge Artist",
};

export default function ProfilePage() {
  return <ArtistProfileForm />;
}
