"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import {
  Bell,
  Bot,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Heart,
  History,
  Image,
  LayoutDashboard,
  Settings,
  Star,
  User,
  Wrench,
} from "lucide-react";

const sidebarIcons = {
  bell: Bell,
  bot: Bot,
  briefcase: Briefcase,
  calendar: Calendar,
  clock: Clock,
  dollarsign: DollarSign,
  heart: Heart,
  history: History,
  image: Image,
  layoutdashboard: LayoutDashboard,
  settings: Settings,
  star: Star,
  user: User,
  wrench: Wrench,
} as const;

export type SidebarIconName = keyof typeof sidebarIcons;

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: SidebarIconName;
  badge?: number;
}

interface SidebarProps {
  items: SidebarNavItem[];
  brandLabel: string;
  brandHref: string;
  role: "customer" | "artist";
}

export function DashboardSidebar({
  items,
  brandLabel,
  brandHref,
  role,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card/80 backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-5">
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-xl text-sm font-bold text-white",
            role === "artist"
              ? "bg-gradient-to-br from-gold-400 to-salmon-400"
              : "bg-gradient-to-br from-salmon-300 to-primary",
          )}
        >
          {role === "artist" ? "A" : "C"}
        </div>
        <div>
          <Link
            href={brandHref as Route}
            className="text-sm font-bold text-foreground hover:text-primary transition-colors"
          >
            {brandLabel}
          </Link>
          <p className="text-[10px] text-muted-foreground capitalize">{role} Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5" role="list">
          {items.map((item) => {
            const Icon = sidebarIcons[item.icon];
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href as Route}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-3 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          ← Back to BeautiBridge
        </Link>
      </div>
    </aside>
  );
}
