"use client";

import Link from "next/link";
import type { Route } from "next";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type MobileNavItem = {
  href: Route;
  label: string;
};

export function MobileNav({
  items = [],
}: Readonly<{ items?: readonly MobileNavItem[] }>) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? X : Menu;

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
        <div className="border-border bg-card shadow-premium absolute inset-x-4 top-22 rounded-xl border p-4">
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
            <Link
              className="bg-primary text-primary-foreground rounded-full px-4 py-3 text-center"
              href="/artists"
              onClick={() => setIsOpen(false)}
            >
              Find Artists
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
