"use client";

import Link from "next/link";
import type { Route } from "next";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type MobileNavItem = {
  href: Route;
  label: string;
};

type MobileNavProps = {
  items?: readonly MobileNavItem[];
  isLoggedIn?: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
};

export function MobileNav({
  items = [],
  isLoggedIn = false,
  user,
}: Readonly<MobileNavProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "User";
  const initials = user?.name?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className="md:hidden">
      {/* Toggle button */}
      <Button
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={() => setIsOpen((value) => !value)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {isOpen ? (
          <X aria-hidden className="size-5" />
        ) : (
          <Menu aria-hidden className="size-5" />
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-plum-950/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "border-border bg-card shadow-premium absolute inset-x-4 top-[4.75rem] rounded-2xl border p-4 z-50 transition-all duration-200",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        )}
        aria-hidden={!isOpen}
      >
        {/* User info */}
        {isLoggedIn && user && (
          <div className="flex items-center gap-3 px-3 pb-4 mb-1 border-b border-border/60">
            <Avatar className="size-10 shrink-0">
              {user.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="aspect-square h-full w-full object-cover"
                />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">Welcome, {firstName}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="grid gap-0.5 text-sm font-medium mt-1">
          {items.map((item) => (
            <Link
              className="text-foreground/80 hover:text-primary hover:bg-muted rounded-xl px-3 py-2.5 transition-colors duration-150"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Logged-in quick links */}
          {isLoggedIn && (
            <>
              <div className="h-px bg-border/60 my-1.5" />
              <Link
                className="flex items-center gap-2.5 text-foreground/80 hover:text-primary hover:bg-muted rounded-xl px-3 py-2.5 transition-colors duration-150"
                href={
                  (user?.role === "ARTIST"
                    ? "/artist-dashboard/profile"
                    : "/dashboard/profile") as Route
                }
                onClick={() => setIsOpen(false)}
              >
                <User className="size-4 text-muted-foreground" />
                My Profile
              </Link>
              <Link
                className="flex items-center gap-2.5 text-foreground/80 hover:text-primary hover:bg-muted rounded-xl px-3 py-2.5 transition-colors duration-150"
                href={
                  (user?.role === "ARTIST"
                    ? "/artist-dashboard/settings"
                    : "/dashboard/settings") as Route
                }
                onClick={() => setIsOpen(false)}
              >
                <Settings className="size-4 text-muted-foreground" />
                Settings
              </Link>
            </>
          )}

          <div className="h-px bg-border/60 my-1.5" />

          {/* Auth actions */}
          {!isLoggedIn ? (
            <>
              <Link
                className="rounded-xl bg-primary text-primary-foreground px-4 py-3 text-center font-semibold shadow-soft mt-1"
                href="/artists"
                onClick={() => setIsOpen(false)}
              >
                Find Artists
              </Link>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  className="border-border hover:bg-muted rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition-colors"
                  href="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="border-border hover:bg-muted rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition-colors"
                  href="/register"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <button
              className="border-destructive/30 hover:bg-destructive/8 text-destructive mt-1 rounded-xl border px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}
