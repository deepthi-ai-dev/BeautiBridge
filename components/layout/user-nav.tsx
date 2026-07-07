"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import { User, Calendar, Bot, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserNavProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function UserNav({ user }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const firstName = user.name?.split(" ")[0] || "User";
  const initials = user.name?.slice(0, 2).toUpperCase() || "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-full border border-border bg-card p-1 pr-4 shadow-sm hover:bg-muted transition-colors"
      >
        <Avatar className="size-8">
          {user.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={user.image} alt={user.name || "User"} className="aspect-square h-full w-full object-cover" />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary text-xs">{initials}</AvatarFallback>
          )}
        </Avatar>
        <span className="text-sm font-semibold text-foreground">
          Welcome, {firstName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-premium z-50">
          <div className="px-3 py-2 border-b border-border mb-2">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <Link 
              href={"/profile" as Route} 
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <User className="size-4" />
              My Profile
            </Link>
            <Link 
              href="/bookings" 
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="size-4" />
              My Bookings
            </Link>
            <Link 
              href="/#ai-assistant" 
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <Bot className="size-4" />
              AI Assistant
            </Link>
            <Link 
              href={"/settings" as Route} 
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="size-4" />
              Settings
            </Link>
            
            <div className="h-px bg-border my-1" />
            
            <button 
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted text-destructive w-full text-left"
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: '/' });
              }}
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
