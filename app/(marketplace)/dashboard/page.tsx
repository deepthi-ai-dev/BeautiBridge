import type { Metadata } from "next";
import { DashboardHome } from "@/components/dashboard/customer/dashboard-home";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard | BeautiBridge",
};

export default async function DashboardPage() {
  const session = await auth();
  return <DashboardHome user={session?.user} />;
}
