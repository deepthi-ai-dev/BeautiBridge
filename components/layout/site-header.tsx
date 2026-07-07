import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserNav } from "@/components/layout/user-nav";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { isArtistRole } from "@/server/auth";

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

export async function SiteHeader({ className }: Readonly<{ className?: string }>) {
  const session = await auth();
  const user = session?.user;
  console.log("[SiteHeader] user:", user);
  const isLoggedIn = Boolean(user);
  const isArtist = isArtistRole(user?.role);
  const navItems = !isLoggedIn
    ? guestNavItems
    : isArtist
      ? artistNavItems
      : customerNavItems;

  return (
    <header
      className={cn(
        "border-border/70 bg-background/90 sticky top-0 z-40 border-b backdrop-blur-xl",
        className,
      )}
    >
      <div className="page-container flex h-20 items-center justify-between gap-6">
        <Link
          className="text-primary text-base font-bold tracking-tight"
          href="/"
        >
          BeautiBridge
        </Link>
        <nav className="text-foreground/75 hidden items-center gap-10 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              className="hover:text-primary transition-colors"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                className="text-primary hover:bg-muted rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="text-primary hover:bg-muted rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                href="/register"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <UserNav user={user!} />
          )}
          {!isLoggedIn ? (
            <Link href="/artists">
              <Button variant="primary">Find Artists</Button>
            </Link>
          ) : null}
        </div>
        <MobileNav items={navItems} isLoggedIn={isLoggedIn} user={user} />
      </div>
    </header>
  );
}
