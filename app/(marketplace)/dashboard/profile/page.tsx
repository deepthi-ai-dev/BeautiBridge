import type { Metadata } from "next";
import { ProfileForm } from "@/components/dashboard/customer/profile-form";
import { auth } from "@/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | BeautiBridge",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  return <ProfileForm user={user} />;
}
