"use client";

import { AlertTriangle, Loader2, Calendar, CheckCircle, Heart, Bot, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/dashboard/ui-helpers";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completeUserProfileAction } from "@/features/auth/actions";
import {
  MOCK_ACTIVITIES,
  MOCK_FAVORITE_ARTISTS,
  MOCK_AI_HISTORY,
} from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { useBookingStore } from "@/stores/booking-store";
import { rupeeFormatter } from "@/lib/formatters";

interface DashboardHomeProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone?: string | null;
    city?: string | null;
  };
}

export function DashboardHome({ user }: DashboardHomeProps) {
  const name = user?.name?.split(" ")[0] || "Beautiful Guest";
  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const { bookings } = useBookingStore();

  const upcomingBookings = bookings.filter((b) => b.status === "Upcoming");
  const completedBookings = bookings.filter((b) => b.status === "Completed");
  const nextBooking = upcomingBookings[0] ?? null;

  const displayDate = nextBooking
    ? new Date(nextBooking.date).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const isProfileIncomplete = !user?.name || !user?.phone || !user?.city;
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
    };

    startTransition(async () => {
      const res = await completeUserProfileAction(data);
      if (res.status === "error") {
        setErrorMsg(res.message);
      } else {
        setShowProfileForm(false);
        router.refresh(); // to update user session data and hide banner
      }
    });
  };

  return (
    <StaggerContainer className="space-y-6">
      {isProfileIncomplete && (
        <FadeUp className="rounded-xl border border-warning/20 bg-warning/10 p-4">
          {!showProfileForm ? (
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-3">
                <AlertTriangle className="size-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-warning-foreground">
                    Complete your profile
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Please provide your name, phone number, and city to unlock all features.
                  </p>
                </div>
              </div>
              <Button size="sm" onClick={() => setShowProfileForm(true)}>
                Complete Profile
              </Button>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex gap-2 items-center mb-2">
                <AlertTriangle className="size-4 text-warning" />
                <h3 className="text-sm font-semibold text-warning-foreground">Complete Profile</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium" htmlFor="profile-name">Name</label>
                  <Input id="profile-name" name="name" defaultValue={user?.name ?? ""} required placeholder="Your name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium" htmlFor="profile-phone">Phone</label>
                  <Input id="profile-phone" name="phone" type="tel" defaultValue={user?.phone ?? ""} required placeholder="Your phone number" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium" htmlFor="profile-city">City</label>
                  <Input id="profile-city" name="city" defaultValue={user?.city ?? ""} required placeholder="Your city" />
                </div>
              </div>
              {errorMsg && <p className="text-destructive text-xs">{errorMsg}</p>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowProfileForm(false)} disabled={isPending}>Cancel</Button>
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 size-3 animate-spin" />}
                  Save Details
                </Button>
              </div>
            </form>
          )}
        </FadeUp>
      )}

      {/* Welcome Banner */}
      <FadeUp className="relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-sm border border-white/60 backdrop-blur-xl">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-30 bg-radial-gradient pointer-events-none">
          <Sparkles className="absolute right-10 top-1/2 -translate-y-1/2 size-24 text-gold-400/40" />
        </div>
        <div className="relative z-10 space-y-2">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Customer Dashboard
          </span>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl flex items-center gap-2">
            {getGreeting()}, {name}! <span className="animate-wiggle">👋</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            {todayStr} · Welcome to your personal beauty sanctuary dashboard.
          </p>
        </div>
      </FadeUp>

      {/* Stats Cards Row */}
      <FadeUp className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Calendar}
          label="Upcoming Bookings"
          value={upcomingBookings.length}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed Bookings"
          value={completedBookings.length}
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

          {nextBooking ? (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                  <Image
                    src={nextBooking.artistAvatar}
                    alt={nextBooking.artistName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground truncate">
                    {nextBooking.artistName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {nextBooking.serviceName}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-muted px-2.5 py-1 text-xs text-foreground font-medium">
                      {nextBooking.serviceName}
                    </span>
                    <StatusBadge status="confirmed" />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    {rupeeFormatter.format(nextBooking.price)}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 p-4 grid gap-3 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-muted-foreground block">Date &amp; Time</span>
                  <span className="font-semibold text-foreground">
                    {displayDate} at {nextBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Booking ID</span>
                  <span className="font-semibold text-foreground uppercase">
                    #{nextBooking.id}
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
            {bookings.length > 0 ? (
              <ul className="space-y-3" role="list">
                {bookings
                  .slice()
                  .reverse()
                  .slice(0, 3)
                  .map((b) => (
                    <li key={b.id} className="flex gap-2.5 text-xs">
                      <span className="mt-0.5 text-base">📅</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground/90 font-medium leading-relaxed">
                          Booked {b.artistName} for {b.serviceName}
                        </p>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(b.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
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
            )}
          </FadeUp>
        </div>
      </div>
    </StaggerContainer>
  );
}
