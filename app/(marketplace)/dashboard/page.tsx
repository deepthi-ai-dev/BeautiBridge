import type { Metadata } from "next";
import { DashboardHome } from "@/components/dashboard/customer/dashboard-home";
import { auth } from "@/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | BeautiBridge",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  
  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });
  
  return <DashboardHome user={user} />;
}
