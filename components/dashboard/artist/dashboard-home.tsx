"use client";

import { Calendar, AlertCircle, DollarSign, Users, Star, Wrench, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { StatCard } from "@/components/dashboard/stat-card";
import { AvatarInitials } from "@/components/dashboard/ui-helpers";
import { MOCK_APPOINTMENTS } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

// ─── Profile completion helpers ──────────────────────────────────────────────
type UserProfile = {
  name?: string | null;
  phone?: string | null;
  city?: string | null;
  dob?: string | null;
  address?: string | null;
  experience?: string | null;
  about?: string | null;
  languages?: string | null;
  specialties?: string | null;
};

/** The 4 core fields customers rely on to discover & evaluate an artist */
const COMPLETION_FIELDS: { key: keyof UserProfile; label: string; emoji: string }[] = [
  { key: "name", label: "Display Name", emoji: "👤" },
  { key: "city", label: "City", emoji: "📍" },
  { key: "about", label: "Bio / About", emoji: "✍️" },
  { key: "specialties", label: "Specialties", emoji: "✨" },
];

function getCompletionInfo(user: UserProfile | undefined) {
  const filled = COMPLETION_FIELDS.filter(({ key }) => {
    const v = user?.[key];
    return v != null && String(v).trim().length > 0;
  });
  const pct = Math.round((filled.length / COMPLETION_FIELDS.length) * 100);
  const missing = COMPLETION_FIELDS.filter(({ key }) => {
    const v = user?.[key];
    return !v || String(v).trim().length === 0;
  });
  return { pct, filled: filled.length, total: COMPLETION_FIELDS.length, missing };
}

// ─── Profile Completion Banner ───────────────────────────────────────────────
function ProfileCompletionBanner({ user }: { user: UserProfile | undefined }) {
  const { pct, filled, total, missing } = getCompletionInfo(user);

  if (pct === 100) return null; // fully complete — hide banner

  const isLow = pct <= 25;
  const isMid = pct > 25 && pct < 75;

  return (
    <FadeUp className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-soft">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-plum-700 to-plum-900 opacity-[0.92]" />
      {/* Decorative sparkle */}
      <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 size-20 text-white/10 pointer-events-none hidden sm:block" />

      <div className="relative z-10 p-5 sm:p-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isLow ? (
                <AlertCircle className="size-5 text-salmon-300 shrink-0" />
              ) : (
                <Sparkles className="size-5 text-gold-400 shrink-0" />
              )}
              <h3 className="text-sm font-bold text-white">
                {pct === 0
                  ? "👋 Welcome! Let's set up your profile"
                  : isLow
                  ? "Your profile needs a few more details"
                  : isMid
                  ? "Almost there — finish your profile!"
                  : "One last step to complete your profile"}
              </h3>
            </div>
            <p className="text-xs text-white/70 leading-relaxed pl-7">
              Complete your profile to get discovered by customers and increase booking requests.
            </p>
          </div>

          <Link
            href={"/artist-dashboard/profile" as Route}
            className="shrink-0 self-start sm:self-center rounded-full bg-white/95 hover:bg-white px-5 py-2 text-xs font-bold text-primary shadow-soft transition-all flex items-center gap-1.5"
          >
            Complete Profile <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Progress bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-white/80">
              {filled} of {total} key fields filled
            </span>
            <span className="text-gold-400">{pct}% complete</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-400 to-salmon-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Missing field chips */}
        {missing.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {missing.map(({ key, label, emoji }) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-medium text-white/80"
              >
                {emoji} {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </FadeUp>
  );
}

// ─── Main DashboardHome ──────────────────────────────────────────────────────
export function DashboardHome({ user }: { user?: UserProfile }) {
  const todayStr = "Thursday, 7 August 2025";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const todaysBookings = MOCK_APPOINTMENTS.filter(
    (apt) => apt.date === "2025-08-07" && apt.status === "confirmed",
  );

  const pendingRequests = MOCK_APPOINTMENTS.filter((apt) => apt.status === "pending");

  return (
    <StaggerContainer className="space-y-6">
      {/* ── Profile completion banner (hides when 100%) ─────────────────────── */}
      <ProfileCompletionBanner user={user} />

      {/* ── Welcome banner ──────────────────────────────────────────────────── */}
      <FadeUp className="relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-sm border border-white/60 backdrop-blur-xl">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-30 bg-radial-gradient pointer-events-none">
          <Sparkles className="absolute right-10 top-1/2 -translate-y-1/2 size-24 text-gold-400/40" />
        </div>
        <div className="relative z-10 space-y-2">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Artist Dashboard
          </span>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl flex items-center gap-2">
            {getGreeting()}, {user?.name ? user.name.split(" ")[0] : "Artist Studio"}!{" "}
            <span className="animate-wiggle">🎨</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            {todayStr} · Here&apos;s your studio overview for today.
          </p>
        </div>
      </FadeUp>

      {/* ── Stats Cards Row ─────────────────────────────────────────────────── */}
      <FadeUp className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Calendar}
          label="Today's Appointments"
          value={todaysBookings.length}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <StatCard
          icon={AlertCircle}
          label="Pending Requests"
          value={pendingRequests.length}
          iconColor="text-secondary"
          iconBg="bg-secondary/10"
        />
        <StatCard
          icon={DollarSign}
          label="Monthly Earnings"
          value="₹98,000"
          iconColor="text-accent"
          iconBg="bg-accent/10"
        />
        <StatCard
          icon={Users}
          label="Total Clients"
          value={180}
          iconColor="text-teal-400"
          iconBg="bg-teal-400/10"
        />
        <StatCard
          icon={Star}
          label="Average Rating"
          value="4.9 / 5.0"
          iconColor="text-accent"
          iconBg="bg-accent/10"
        />
        <StatCard
          icon={Wrench}
          label="Popular Service"
          value="Party Makeup"
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
      </FadeUp>

      <div className="grid gap-6 md:grid-cols-3">
        {/* ── Today's Schedule ─────────────────────────────────────────────── */}
        <FadeUp className="premium-card p-5 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-semibold text-foreground">Today&apos;s Schedule</h3>
            <span className="text-xs text-muted-foreground">Aug 07, 2025 (Mock Date)</span>
          </div>

          {todaysBookings.length > 0 ? (
            <div className="space-y-3">
              {todaysBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <AvatarInitials initials={booking.customerInitials} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{booking.customerName}</h4>
                      <p className="text-[10px] text-muted-foreground">
                        {booking.time} · {booking.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-foreground block">{booking.service}</span>
                    <span className="text-xs font-bold text-primary block">
                      ₹{booking.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
              <span className="text-3xl">📭</span>
              <p className="text-sm font-medium text-foreground">No bookings scheduled for today</p>
              <p className="text-xs text-muted-foreground">
                Any new appointment requests will show up in requests page.
              </p>
            </div>
          )}
        </FadeUp>

        {/* ── Quick Actions ─────────────────────────────────────────────────── */}
        <FadeUp className="premium-card p-5 space-y-4">
          <h3 className="font-semibold text-foreground border-b border-border pb-3">Quick Actions</h3>
          <div className="flex flex-col gap-2 text-xs font-semibold">
            <Link href={"/artist-dashboard/requests" as Route}>
              <button className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 hover:bg-plum-600 transition-colors shadow-soft flex items-center justify-center gap-1">
                Manage Booking Requests ({pendingRequests.length}) <ArrowRight className="size-3.5" />
              </button>
            </Link>
            <Link href={"/artist-dashboard/services" as Route}>
              <button className="w-full rounded-xl border border-primary text-primary bg-transparent py-2.5 hover:bg-primary/5 transition-colors">
                Configure Pricing &amp; Services
              </button>
            </Link>
            <Link href={"/artist-dashboard/availability" as Route}>
              <button className="w-full rounded-xl border border-border text-foreground hover:bg-muted py-2.5 bg-card transition-colors">
                Manage Available Slots
              </button>
            </Link>
            <Link href={"/artist-dashboard/profile" as Route}>
              <button className="w-full rounded-xl border border-border text-foreground hover:bg-muted py-2.5 bg-card transition-colors flex items-center justify-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" /> Edit Profile
              </button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </StaggerContainer>
  );
}
