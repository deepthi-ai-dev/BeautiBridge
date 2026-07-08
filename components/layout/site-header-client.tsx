"use client";

import Link from "next/link";
import Image from "next/image";
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
  { href: "/dashboard", label: "Dashboard" },
] as const;

const artistNavItems = [
  { href: "/artist-dashboard", label: "Dashboard" },
  { href: "/artist-dashboard/requests", label: "Requests" },
  { href: "/artist-dashboard/calendar", label: "Calendar" },
  { href: "/artist-dashboard/portfolio", label: "Portfolio" },
  { href: "/artist-dashboard/services", label: "Services" },
  { href: "/assistant", label: "AI Assistant" },
] as const;

type NavItem = { href: string; label: string };

function NavLinks({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1.5 md:flex bg-card/40 p-1.5 rounded-full border border-border/40 backdrop-blur-md">
      {items.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href.split("#")[0] || "/") &&
              item.href !== "/";
        return (
          <Link
            className={cn(
              "nav-link relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full",
              isActive
                ? "text-primary bg-background shadow-sm"
                : "text-foreground/70 hover:text-primary hover:bg-muted/50",
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
    <div className="sticky top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 pb-4 w-full bg-background/80 backdrop-blur-3xl border-b border-border/40">
      <header
        className={cn(
          "w-full max-w-6xl rounded-full border border-border/60 bg-card/70 shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
          "transition-all duration-500",
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            className="group flex items-center gap-2.5 text-base font-bold tracking-tight transition-opacity hover:opacity-90"
            href="/"
          >
            <Image
              src="/logo.png"
              alt="BeautiBridge"
              width={160}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <NavLinks items={navItems} />

          {/* Right actions */}
          <div className="hidden items-center gap-2 md:flex">
            {!isLoggedIn ? (
              <>
                <Link
                  className="text-foreground/75 hover:text-primary rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                  href="/login"
                >
                  Log in
                </Link>
                <Link href="/artists">
                  <Button
                    variant="primary"
                    size="md"
                    className="shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 rounded-full px-6"
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
    </div>
  );
}
