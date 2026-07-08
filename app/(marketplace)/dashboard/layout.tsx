import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { authRoutes, getDashboardRouteForRole, isArtistRole } from "@/server/auth";
import { CustomerDashboardShell } from "@/components/dashboard/customer/customer-dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect(`${authRoutes.login}?callbackUrl=/dashboard`);
  }

  if (!session.user.role) {
    redirect(`${authRoutes.selectRole}?callbackUrl=/dashboard`);
  }

  if (isArtistRole(session.user.role)) {
    redirect(getDashboardRouteForRole(session.user.role));
  }

  return (
    <CustomerDashboardShell user={session.user}>
      {children}
    </CustomerDashboardShell>
  );
}
