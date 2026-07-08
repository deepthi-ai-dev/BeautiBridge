import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import type { SidebarNavItem } from "@/components/dashboard/sidebar";
import { authRoutes, getDashboardRouteForRole, isArtistRole } from "@/server/auth";

const navItems: SidebarNavItem[] = [
  { label: "Dashboard", href: "/artist-dashboard", icon: "layoutdashboard" },
  { label: "Booking Requests", href: "/artist-dashboard/requests", icon: "briefcase", badge: 3 },
  { label: "Calendar", href: "/artist-dashboard/calendar", icon: "calendar" },
  { label: "Portfolio", href: "/artist-dashboard/portfolio", icon: "image" },
  { label: "Services", href: "/artist-dashboard/services", icon: "wrench" },
  { label: "Availability", href: "/artist-dashboard/availability", icon: "clock" },
  { label: "Reviews", href: "/artist-dashboard/reviews", icon: "star" },
  { label: "Earnings", href: "/artist-dashboard/earnings", icon: "dollarsign" },
  { label: "Profile", href: "/artist-dashboard/profile", icon: "user" },
  { label: "Settings", href: "/artist-dashboard/settings", icon: "settings" },
];

export default async function ArtistDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect(`${authRoutes.login}?callbackUrl=/artist-dashboard`);
  }

  if (!session.user.role) {
    redirect(`${authRoutes.selectRole}?callbackUrl=/artist-dashboard`);
  }

  if (!isArtistRole(session.user.role)) {
    redirect(getDashboardRouteForRole(session.user.role));
  }

  return (
    <div className="light-section bg-gradient-to-br from-[#fffdf9] via-[#fffbf5] to-[#f9eee1] text-foreground flex h-screen overflow-hidden">
      <div className="hidden lg:flex">
        <DashboardSidebar
          items={navItems}
          brandLabel="Artist Studio"
          brandHref="/artist-dashboard"
          role="artist"
        />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar
          user={session.user}
          title="Artist Dashboard"
          sidebarItems={navItems}
          sidebarBrandLabel="Artist Studio"
          sidebarBrandHref="/artist-dashboard"
          role="artist"
          notificationCount={3}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
