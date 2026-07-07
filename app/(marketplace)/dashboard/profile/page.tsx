import type { Metadata } from "next";
import { ProfileForm } from "@/components/dashboard/customer/profile-form";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Profile | BeautiBridge",
};

export default async function ProfilePage() {
  const session = await auth();
  return <ProfileForm user={session?.user} />;
}
