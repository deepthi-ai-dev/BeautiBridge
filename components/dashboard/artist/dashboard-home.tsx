"use client";

import { Calendar, AlertCircle, DollarSign, Users, Star, Wrench, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { StatCard } from "@/components/dashboard/stat-card";
import { AvatarInitials } from "@/components/dashboard/ui-helpers";
import { MOCK_APPOINTMENTS } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function DashboardHome() {
  const todayStr = "Thursday, 7 August 2025";

  // Filter mock appointments for "2025-08-07" to simulate today's appointments
  const todaysBookings = MOCK_APPOINTMENTS.filter(
    (apt) => apt.date === "2025-08-07" && apt.status === "confirmed"
  );

  const pendingRequests = MOCK_APPOINTMENTS.filter((apt) => apt.status === "pending");

  return (
    <StaggerContainer className="space-y-6">
      {/* Welcome Banner */}
      <FadeUp className="plum-panel rounded-2xl p-6 shadow-premium relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-radial-gradient pointer-events-none">
          <Sparkles className="absolute right-10 top-1/2 -translate-y-1/2 size-24 text-beige-50" />
        </div>
        <div className="relative z-10 space-y-2">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-beige-50">
            Artist Dashboard
          </span>
          <h2 className="text-2xl font-bold text-beige-50 md:text-3xl">
            Welcome back, Artist Studio! 🎨
          </h2>
          <p className="text-sm text-beige-100/80">
            {todayStr} · Here&apos;s your studio overview for today.
          </p>
        </div>
      </FadeUp>

      {/* Stats Cards Row */}
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
        {/* Today's Schedule */}
        <FadeUp className="premium-card p-5 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-semibold text-foreground">Today&apos;s Schedule</h3>
            <span className="text-xs text-muted-foreground">Aug 07, 2025 (Mock Date)</span>
          </div>

          {todaysBookings.length > 0 ? (
            <div className="space-y-3">
              {todaysBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
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
              <p className="text-xs text-muted-foreground">Any new appointment requests will show up in requests page.</p>
            </div>
          )}
        </FadeUp>

        {/* Quick Links / Navigation */}
        <FadeUp className="premium-card p-5 space-y-4">
          <h3 className="font-semibold text-foreground border-b border-border pb-3">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-2 text-xs font-semibold">
            <Link href={"/artist-dashboard/requests" as Route}>
              <button className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 hover:bg-plum-600 transition-colors shadow-soft flex items-center justify-center gap-1">
                Manage Booking Requests ({pendingRequests.length}) <ArrowRight className="size-3.5" />
              </button>
            </Link>
            <Link href={"/artist-dashboard/services" as Route}>
              <button className="w-full rounded-xl border border-primary text-primary bg-transparent py-2.5 hover:bg-primary/5 transition-colors">
                Configure Pricing & Services
              </button>
            </Link>
            <Link href={"/artist-dashboard/availability" as Route}>
              <button className="w-full rounded-xl border border-border text-foreground hover:bg-muted py-2.5 bg-card transition-colors">
                Manage Available Slots
              </button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </StaggerContainer>
  );
}
