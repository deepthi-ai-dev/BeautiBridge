"use client";

import { CheckCircle, Calendar, Clock, User, ArrowLeft, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBookingStore } from "@/stores/booking-store";
import { PopIn } from "@/lib/motion";

export function BookingConfirmationCard() {
  const { bookings } = useBookingStore();
  const latestBooking = bookings[bookings.length - 1] ?? null;

  const displayDate = latestBooking
    ? new Date(latestBooking.date).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <PopIn className="premium-card flex flex-col items-center p-8 text-center md:p-12">
      {/* Success icon */}
      <div className="relative mb-6">
        <div className="flex size-24 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20">
          <CheckCircle className="size-12 text-emerald-500 dark:text-emerald-400" />
        </div>
        <span className="absolute -top-1 -right-1 flex size-8 items-center justify-center rounded-full bg-gold-400 text-sm shadow-sm">
          <Sparkles className="size-4 text-plum-950" />
        </span>
      </div>

      <h1 className="text-3xl font-bold text-primary">Booking Confirmed!</h1>
      <p className="text-muted-foreground mt-2 mb-8 max-w-md text-sm leading-6">
        Your appointment has been successfully scheduled. You&apos;ll receive a
        confirmation soon. Head to your dashboard to manage it.
      </p>

      {/* Booking details card */}
      <div className="w-full rounded-2xl border border-border/60 bg-muted/40 p-6 mb-8 text-left">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Booking Details
        </p>
        <div className="space-y-4">
          {latestBooking ? (
            <>
              <div className="flex items-center gap-3.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <User className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground">Artist</p>
                  <p className="font-semibold text-foreground text-sm">{latestBooking.artistName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/20">
                  <Tag className="size-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground">Service</p>
                  <p className="font-semibold text-foreground text-sm">{latestBooking.serviceName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-400/10">
                  <Calendar className="size-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground text-sm">{displayDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <Clock className="size-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground">Time</p>
                  <p className="font-semibold text-foreground text-sm">{latestBooking.timeSlot}</p>
                </div>
              </div>
              <div className="border-t border-border/60 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Booking ID
                </p>
                <p className="font-mono text-sm font-semibold text-foreground mt-1 uppercase">
                  #{latestBooking.id}
                </p>
              </div>
            </>
          ) : (
            <>
              {[
                { icon: User, label: "Artist", color: "bg-primary/10 text-primary" },
                { icon: Calendar, label: "Date", color: "bg-teal-400/10 text-teal-400" },
                { icon: Clock, label: "Time", color: "bg-accent/10 text-accent-foreground" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${color.split(" ")[0]}`}>
                    <Icon className={`size-4 ${color.split(" ")[1]}`} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
                    <p className="font-semibold text-foreground text-sm">See dashboard for details</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Link href="/artists" className="flex-1">
          <Button className="w-full" variant="outline">
            <ArrowLeft className="size-4" />
            Back to Artists
          </Button>
        </Link>
        <Link href="/dashboard/bookings" className="flex-1">
          <Button className="w-full" variant="primary">
            View My Bookings
          </Button>
        </Link>
      </div>
    </PopIn>
  );
}
