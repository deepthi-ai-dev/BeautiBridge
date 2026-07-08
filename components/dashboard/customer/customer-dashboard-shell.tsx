"use client";

import { DashboardTopbar } from "@/components/dashboard/topbar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import type { SidebarNavItem } from "@/components/dashboard/sidebar";
import { useBookingStore } from "@/stores/booking-store";

const baseNavItems: SidebarNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "layoutdashboard" },
  { label: "My Bookings", href: "/dashboard/bookings", icon: "calendar" },
  { label: "Booking History", href: "/dashboard/history", icon: "history" },
  { label: "Favorite Artists", href: "/dashboard/favorites", icon: "heart" },
  { label: "AI History", href: "/dashboard/ai-history", icon: "bot" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "bell" },
  { label: "Profile", href: "/dashboard/profile", icon: "user" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

interface CustomerDashboardShellProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  children: React.ReactNode;
}

export function CustomerDashboardShell({ user, children }: CustomerDashboardShellProps) {
  const { bookings, notifications } = useBookingStore();

  const upcomingCount = bookings.filter((b) => b.status === "Upcoming").length;
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  // Build nav items with live badges
  const navItems: SidebarNavItem[] = baseNavItems.map((item) => {
    if (item.href === "/dashboard/bookings") {
      return { ...item, badge: upcomingCount };
    }
    if (item.href === "/dashboard/notifications") {
      return { ...item, badge: unreadNotifCount };
    }
    return item;
  });

  return (
    <div className="light-section bg-gradient-to-br from-[#fffdf9] via-[#fffbf5] to-[#f9eee1] text-foreground flex h-screen overflow-hidden">
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
          user={user}
          title="Dashboard"
          sidebarItems={navItems}
          sidebarBrandLabel="My Dashboard"
          sidebarBrandHref="/dashboard"
          role="customer"
          notificationCount={unreadNotifCount}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
