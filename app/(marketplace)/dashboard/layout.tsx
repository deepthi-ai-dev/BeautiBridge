import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import type { SidebarNavItem } from "@/components/dashboard/sidebar";
import { authRoutes, getDashboardRouteForRole, isArtistRole } from "@/server/auth";

const navItems: SidebarNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "layoutdashboard" },
  { label: "My Bookings", href: "/dashboard/bookings", icon: "calendar", badge: 2 },
  { label: "Booking History", href: "/dashboard/history", icon: "history" },
  { label: "Favorite Artists", href: "/dashboard/favorites", icon: "heart" },
  { label: "AI History", href: "/dashboard/ai-history", icon: "bot" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "bell", badge: 2 },
  { label: "Profile", href: "/dashboard/profile", icon: "user" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

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
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <DashboardSidebar
          items={navItems}
          brandLabel="My Dashboard"
          brandHref="/dashboard"
          role="customer"
        />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar
          user={session.user}
          title="Dashboard"
          sidebarItems={navItems}
          sidebarBrandLabel="My Dashboard"
          sidebarBrandHref="/dashboard"
          role="customer"
          notificationCount={2}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
