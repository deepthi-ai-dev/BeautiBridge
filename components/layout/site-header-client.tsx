"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserNav } from "@/components/layout/user-nav";
import { cn } from "@/lib/utils";

const guestNavItems = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/artists", label: "Explore artists" },
  { href: "/assistant", label: "AI Assistant" },
] as const;

const customerNavItems = [
  { href: "/artists", label: "Find Artists" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/dashboard", label: "Customer Dashboard" },
] as const;

const artistNavItems = [
  { href: "/artist-dashboard", label: "Artist Dashboard" },
  { href: "/artist-dashboard/requests", label: "Booking Requests" },
  { href: "/artist-dashboard/calendar", label: "Calendar" },
  { href: "/artist-dashboard/portfolio", label: "Portfolio" },
  { href: "/artist-dashboard/services", label: "Services" },
  { href: "/artist-dashboard/availability", label: "Availability" },
  { href: "/assistant", label: "AI Assistant" },
] as const;

type NavItem = { href: string; label: string };

function NavLinks({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
      {items.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("#")[0] || "/") && item.href !== "/";
        return (
          <Link
            className={cn(
              "nav-link relative py-1 transition-colors duration-200",
              isActive
                ? "text-primary font-semibold"
                : "text-foreground/70 hover:text-primary",
            )}
            href={item.href as Route}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

type SiteHeaderProps = {
  className?: string;
  isLoggedIn?: boolean;
  isArtist?: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  } | null;
};

export function SiteHeaderClient({
  className,
  isLoggedIn = false,
  isArtist = false,
  user,
}: Readonly<SiteHeaderProps>) {
  const navItems = !isLoggedIn
    ? guestNavItems
    : isArtist
      ? artistNavItems
      : customerNavItems;

  return (
    <header
      className={cn(
        "border-border/60 bg-background/92 sticky top-0 z-40 border-b backdrop-blur-2xl",
        "transition-shadow duration-300",
        className,
      )}
    >
      <div className="page-container flex h-[4.5rem] items-center justify-between gap-6">
        {/* Logo */}
        <Link
          className="group flex items-center gap-2.5 text-base font-bold tracking-tight"
          href="/"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-salmon-300 to-primary text-[11px] font-black text-white shadow-soft transition-transform duration-200 group-hover:scale-105">
            B
          </span>
          <span className="text-primary">BeautiBridge</span>
        </Link>

        {/* Desktop Nav */}
        <NavLinks items={navItems} />

        {/* Right actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                className="text-foreground/75 hover:text-primary rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="text-foreground/75 hover:text-primary rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                href="/register"
              >
                Sign Up
              </Link>
              <Link href="/artists">
                <Button
                  variant="primary"
                  size="md"
                  className="shadow-soft hover:shadow-card"
                >
                  Find Artists
                </Button>
              </Link>
            </>
          ) : (
            <UserNav user={user!} />
          )}
        </div>

        {/* Mobile nav toggle */}
        <MobileNav
          items={navItems}
          isLoggedIn={isLoggedIn}
          user={user ?? undefined}
        />
      </div>
    </header>
  );
}
