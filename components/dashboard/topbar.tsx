"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { Route } from "next";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import type { SidebarNavItem } from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";

interface DashboardTopbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  sidebarItems: SidebarNavItem[];
  sidebarBrandLabel: string;
  sidebarBrandHref: string;
  role: "customer" | "artist";
  notificationCount?: number;
}

export function DashboardTopbar({
  user,
  title,
  breadcrumbs,
  sidebarItems,
  sidebarBrandLabel,
  sidebarBrandHref,
  role,
  notificationCount = 0,
}: DashboardTopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initials = user.name?.slice(0, 2).toUpperCase() ?? "U";
  const firstName = user.name?.split(" ")[0] ?? "User";

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/92 px-4 py-3 backdrop-blur-2xl lg:px-6">
      {/* Mobile nav toggle */}
      <MobileSidebar
        brandHref={sidebarBrandHref}
        brandLabel={sidebarBrandLabel}
        items={sidebarItems}
        role={role}
      />

      {/* Title + Breadcrumbs */}
      <div className="flex-1 min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-border">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href as Route}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : (
          <h1 className="truncate text-sm font-semibold text-foreground">
            {title}
          </h1>
        )}
      </div>

      {/* Search — hidden on small screens */}
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          className="h-9 w-48 rounded-xl border border-border/80 bg-muted/40 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring/50 transition-all duration-200 hover:bg-muted/60 lg:w-56"
          placeholder="Search..."
          type="search"
          aria-label="Search dashboard"
        />
      </div>

      {/* Notification Bell */}
      <button
        aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ""}`}
        className="relative flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
      >
        <Bell className="size-4" />
        {notificationCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex size-2 items-center justify-center rounded-full bg-primary ring-2 ring-background" />
        )}
      </button>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 rounded-xl border border-border/80 bg-card/80 px-2.5 py-1.5 shadow-sm hover:bg-muted hover:border-border transition-all duration-150"
          onClick={() => setProfileOpen((v) => !v)}
          aria-label="User menu"
          aria-expanded={profileOpen}
        >
          <Avatar className="size-7">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name ?? "User"}
                className="aspect-square h-full w-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="hidden text-xs font-semibold text-foreground sm:block max-w-[5rem] truncate">
            {firstName}
          </span>
          <ChevronDown
            className={cn(
              "hidden size-3 text-muted-foreground transition-transform duration-200 sm:block",
              profileOpen && "rotate-180",
            )}
          />
        </button>

        {profileOpen && (
          <div
            className="dropdown-enter absolute right-0 top-full mt-2 w-52 rounded-xl border border-border/80 bg-card p-2 shadow-premium z-50"
          >
            <div className="mb-2 border-b border-border/60 px-3 py-2">
              <p className="text-xs font-bold truncate text-foreground">{user.name}</p>
              <p className="text-[10px] text-muted-foreground truncate mt-0.5">{user.email}</p>
            </div>
            <div className="space-y-0.5 text-sm">
              <Link
                href={
                  (role === "artist"
                    ? "/artist-dashboard/profile"
                    : "/dashboard/profile") as Route
                }
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-foreground/80 hover:bg-muted hover:text-foreground transition-colors duration-150"
                onClick={() => setProfileOpen(false)}
              >
                My Profile
              </Link>
              <Link
                href={
                  (role === "artist"
                    ? "/artist-dashboard/settings"
                    : "/dashboard/settings") as Route
                }
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-foreground/80 hover:bg-muted hover:text-foreground transition-colors duration-150"
                onClick={() => setProfileOpen(false)}
              >
                Settings
              </Link>
              <div className="h-px bg-border/60 my-1" />
              <button
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/8 transition-colors duration-150"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
