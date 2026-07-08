import type { Metadata } from "next";
import { DashboardHome } from "@/components/dashboard/artist/dashboard-home";
import { auth } from "@/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | BeautiBridge Artist",
};

export default async function ArtistDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/login");

  return <DashboardHome user={user} />;
}
