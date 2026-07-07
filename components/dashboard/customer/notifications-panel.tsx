"use client";

import { useState } from "react";
import { Bell, Megaphone, Bot, Info, Check, CheckCheck } from "lucide-react";
import { MOCK_NOTIFICATIONS, type MockNotification } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const categoryIcons = {
  ai: Bot,
  booking: Bell,
  promo: Megaphone,
  system: Info,
};

const categoryColors = {
  ai: "text-accent bg-accent/10 border-accent/20",
  booking: "text-primary bg-primary/10 border-primary/20",
  promo: "text-secondary bg-secondary/10 border-secondary/20",
  system: "text-teal-400 bg-teal-400/10 border-teal-400/20",
};

export function NotificationsPanel() {
  const [notifs, setNotifs] = useState<MockNotification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  function markRead(id: string) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
    alert("All notifications marked as read.");
  }

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Notifications</h2>
          <p className="text-xs text-muted-foreground mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="rounded-full bg-primary/10 hover:bg-primary/15 px-4 py-2 text-xs font-semibold text-primary transition-all flex items-center gap-1.5"
          >
            <CheckCheck className="size-3.5" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifs.map((item, i) => {
          const IconComponent = categoryIcons[item.category] || Info;
          const colorClass = categoryColors[item.category] || "text-muted bg-muted/10";

          return (
            <FadeUp
              key={item.id}
              className={cn(
                "premium-card p-4 flex gap-4 transition-all duration-200 border-l-4",
                item.isRead ? "border-l-transparent opacity-80" : "border-l-primary bg-primary/5",
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl border shrink-0",
                  colorClass
                )}
              >
                <IconComponent className="size-4.5" />
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-xs font-bold text-foreground truncate">{item.title}</h3>
                  <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pr-6">{item.message}</p>
              </div>

              {!item.isRead && (
                <button
                  onClick={() => markRead(item.id)}
                  title="Mark as read"
                  className="text-muted-foreground hover:text-primary hover:bg-muted p-1.5 rounded-lg shrink-0 h-fit"
                >
                  <Check className="size-4" />
                </button>
              )}
            </FadeUp>
          );
        })}
      </div>
    </StaggerContainer>
  );
}
