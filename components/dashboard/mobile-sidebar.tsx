"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { DashboardSidebar, type SidebarNavItem } from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  items: SidebarNavItem[];
  brandLabel: string;
  brandHref: string;
  role: "customer" | "artist";
}

export function MobileSidebar({ items, brandLabel, brandHref, role }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open navigation"
        className="flex items-center justify-center rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="size-5" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="relative flex h-full">
          <DashboardSidebar
            brandHref={brandHref}
            brandLabel={brandLabel}
            items={items}
            role={role}
          />
          <button
            aria-label="Close navigation"
            className="absolute right-0 top-4 translate-x-full rounded-r-xl bg-card p-2 shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </>
  );
}
