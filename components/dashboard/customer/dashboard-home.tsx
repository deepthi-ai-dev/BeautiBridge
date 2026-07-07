"use client";

import { Calendar, CheckCircle, Heart, Bot, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { StatCard } from "@/components/dashboard/stat-card";
import { AvatarInitials, StatusBadge } from "@/components/dashboard/ui-helpers";
import {
  MOCK_UPCOMING_BOOKINGS,
  MOCK_ACTIVITIES,
  MOCK_FAVORITE_ARTISTS,
  MOCK_AI_HISTORY,
  MOCK_BOOKING_HISTORY,
} from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

interface DashboardHomeProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardHome({ user }: DashboardHomeProps) {
  const name = user?.name?.split(" ")[0] || "Beautiful Guest";
  const todayStr = "Thursday, 7 August 2025";

  const upcomingBooking = MOCK_UPCOMING_BOOKINGS.find(
    (b) => b.status === "confirmed" || b.status === "pending"
  );

  return (
    <StaggerContainer className="space-y-6">
      {/* Welcome Banner */}
      <FadeUp className="plum-panel rounded-2xl p-6 shadow-premium relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-radial-gradient pointer-events-none">
          <Sparkles className="absolute right-10 top-1/2 -translate-y-1/2 size-24 text-beige-50" />
        </div>
        <div className="relative z-10 space-y-2">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-beige-50">
            Customer Dashboard
          </span>
          <h2 className="text-2xl font-bold text-beige-50 md:text-3xl">
            Good morning, {name}! 👋
          </h2>
          <p className="text-sm text-beige-100/80">
            {todayStr} · Welcome to your personal beauty sanctuary dashboard.
          </p>
        </div>
      </FadeUp>

      {/* Stats Cards Row */}
      <FadeUp className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Calendar}
          label="Upcoming Bookings"
          value={MOCK_UPCOMING_BOOKINGS.length}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed Bookings"
          value={MOCK_BOOKING_HISTORY.filter((b) => b.status === "completed").length}
          iconColor="text-teal-400"
          iconBg="bg-teal-400/10"
        />
        <StatCard
          icon={Heart}
          label="Favorite Artists"
          value={MOCK_FAVORITE_ARTISTS.length}
          iconColor="text-secondary"
          iconBg="bg-secondary/10"
        />
        <StatCard
          icon={Bot}
          label="AI Consultations"
          value={MOCK_AI_HISTORY.length}
          iconColor="text-accent"
          iconBg="bg-accent/10"
        />
      </FadeUp>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Upcoming Appointment */}
        <FadeUp className="premium-card p-5 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-semibold text-foreground">Upcoming Appointment</h3>
            <Link
              href={"/dashboard/bookings" as Route}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          </div>

          {upcomingBooking ? (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <AvatarInitials
                  initials={upcomingBooking.artistInitials}
                  gradient={upcomingBooking.artistColor}
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground truncate">
                    {upcomingBooking.artistName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {upcomingBooking.artistSpecialty}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-muted px-2.5 py-1 text-xs text-foreground font-medium">
                      {upcomingBooking.service}
                    </span>
                    <StatusBadge status={upcomingBooking.status} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    ₹{upcomingBooking.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 p-4 grid gap-3 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-muted-foreground block">Date & Time</span>
                  <span className="font-semibold text-foreground">
                    15 Aug 2025{" "}
                    at {upcomingBooking.time}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Location</span>
                  <span className="font-semibold text-foreground truncate block">
                    {upcomingBooking.location}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={"/dashboard/bookings" as Route} className="flex-1">
                  <button className="w-full rounded-full border border-border bg-transparent hover:bg-muted py-2 text-xs font-semibold text-primary transition-colors">
                    Manage Booking
                  </button>
                </Link>
                <Link href={"/assistant" as Route}>
                  <button className="rounded-full bg-primary hover:bg-plum-600 px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors flex items-center gap-1.5 shadow-soft">
                    <Bot className="size-3.5" /> Consult AI
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
              <span className="text-3xl">🗓️</span>
              <p className="text-sm font-medium text-foreground">No upcoming bookings</p>
              <p className="text-xs text-muted-foreground">Book your next beauty experience now.</p>
              <Link href="/artists">
                <button className="mt-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold hover:bg-plum-600 transition-colors">
                  Find Artists
                </button>
              </Link>
            </div>
          )}
        </FadeUp>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <FadeUp className="premium-card p-5 space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-3">
              Quick Actions
            </h3>
            <div className="grid gap-2 text-xs font-semibold">
              <Link href="/artists">
                <button className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 hover:bg-plum-600 transition-colors shadow-soft">
                  Book New Appointment
                </button>
              </Link>
              <Link href="/assistant">
                <button className="w-full rounded-xl border border-primary text-primary bg-transparent py-2.5 hover:bg-primary/5 transition-colors">
                  Chat with BeautiAssist
                </button>
              </Link>
              <Link href={"/dashboard/favorites" as Route}>
                <button className="w-full rounded-xl border border-border text-foreground hover:bg-muted py-2.5 bg-card transition-colors">
                  View Saved Artists
                </button>
              </Link>
            </div>
          </FadeUp>

          {/* Recent Activity */}
          <FadeUp className="premium-card p-5 space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-3">
              Recent Activity
            </h3>
            <ul className="space-y-3" role="list">
              {MOCK_ACTIVITIES.slice(0, 3).map((act) => (
                <li key={act.id} className="flex gap-2.5 text-xs">
                  <span className="mt-0.5 text-base">
                    {act.type === "booking"
                      ? "📅"
                      : act.type === "review"
                      ? "⭐"
                      : act.type === "favorite"
                      ? "💖"
                      : "🤖"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground/90 font-medium leading-relaxed">
                      {act.description}
                    </p>
                    <span className="text-[10px] text-muted-foreground">{act.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </StaggerContainer>
  );
}
