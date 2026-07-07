"use client";

import Link from "next/link";
import type { Route } from "next";
import { Menu, X, User, Calendar, Bot, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  };
};

export function MobileNav({
  items = [],
  isLoggedIn = false,
  user,
}: Readonly<MobileNavProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? X : Menu;

  const firstName = user?.name?.split(" ")[0] || "User";
  const initials = user?.name?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className="md:hidden">
      <Button
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={() => setIsOpen((value) => !value)}
        size="icon"
        type="button"
        variant="ghost"
      >
        <Icon aria-hidden className="size-5" />
      </Button>
      {isOpen ? (
        <div className="border-border bg-card shadow-premium absolute inset-x-4 top-22 rounded-xl border p-4 z-50">
          
          {isLoggedIn && user && (
            <div className="flex items-center gap-3 px-3 pb-4 mb-2 border-b border-border">
              <Avatar className="size-10">
                {user.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={user.image} alt={user.name || "User"} className="aspect-square h-full w-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">{initials}</AvatarFallback>
                )}
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">Welcome, {firstName}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          )}

          <nav className="text-primary grid gap-2 text-sm font-semibold">
            {items.map((item) => (
              <Link
                className="hover:bg-muted rounded-lg px-3 py-3"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isLoggedIn && (
              <>
                <div className="h-px bg-border my-1" />
                <Link
                  className="hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-3"
                  href={"/profile" as Route}
                  onClick={() => setIsOpen(false)}
                >
                  <User className="size-4" /> My Profile
                </Link>
                <Link
                  className="hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-3"
                  href="/bookings"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar className="size-4" /> My Bookings
                </Link>
                <Link
                  className="hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-3"
                  href="/#ai-assistant"
                  onClick={() => setIsOpen(false)}
                >
                  <Bot className="size-4" /> AI Assistant
                </Link>
                <Link
                  className="hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-3"
                  href={"/settings" as Route}
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="size-4" /> Settings
                </Link>
              </>
            )}

            <div className="h-px bg-border my-1" />
            
            <Link
              className="bg-primary text-primary-foreground rounded-full px-4 py-3 text-center mt-2"
              href="/artists"
              onClick={() => setIsOpen(false)}
            >
              Find Artists
            </Link>
            
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  className="border-border hover:bg-muted rounded-full border px-4 py-2 text-center"
                  href="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="border-border hover:bg-muted rounded-full border px-4 py-2 text-center"
                  href="/register"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                className="border-destructive/30 hover:bg-destructive/10 text-destructive mt-2 rounded-full border px-4 py-2 text-center flex items-center justify-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
              >
                <LogOut className="size-4" /> Sign Out
              </button>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
