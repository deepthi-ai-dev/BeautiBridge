"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import {
  User,
  Calendar,
  Bot,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserNavProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
};

export function UserNav({ user }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const firstName = user.name?.split(" ")[0] || "User";
  const initials = user.name?.slice(0, 2).toUpperCase() || "U";
  const isArtist = user.role === "ARTIST";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      href: (isArtist ? "/artist-dashboard" : "/dashboard") as Route,
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: (isArtist ? "/artist-dashboard/profile" : "/dashboard/profile") as Route,
      icon: User,
      label: "My Profile",
    },
    {
      href: (isArtist ? "/artist-dashboard/requests" : "/dashboard/bookings") as Route,
      icon: Calendar,
      label: isArtist ? "Booking Requests" : "My Bookings",
    },
    {
      href: "/assistant" as Route,
      icon: Bot,
      label: "AI Assistant",
    },
    {
      href: (isArtist ? "/artist-dashboard/settings" : "/dashboard/settings") as Route,
      icon: Settings,
      label: "Settings",
    },
  ] as const;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="User menu"
        className={cn(
          "flex items-center gap-2.5 rounded-xl border bg-card px-3 py-1.5 shadow-sm transition-all duration-150",
          isOpen
            ? "border-primary/30 bg-muted"
            : "border-border/80 hover:bg-muted hover:border-border",
        )}
      >
        <Avatar className="size-7">
          {user.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={user.image}
              alt={user.name || "User"}
              className="aspect-square h-full w-full object-cover"
            />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <span className="text-sm font-semibold text-foreground max-w-24 truncate">
          {firstName}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="dropdown-enter absolute right-0 top-full mt-2 w-56 rounded-xl border border-border/80 bg-card p-2 shadow-premium z-50">
          {/* User info header */}
          <div className="px-3 py-2.5 border-b border-border/60 mb-1.5">
            <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">{user.email}</p>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-0.5 text-sm">
            {menuItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-foreground/75 hover:bg-muted hover:text-foreground transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="size-3.5 text-muted-foreground" />
                {label}
              </Link>
            ))}

            <div className="h-px bg-border/60 my-1" />

            <button
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/8 transition-colors duration-150 w-full text-left"
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              <LogOut className="size-3.5" />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
