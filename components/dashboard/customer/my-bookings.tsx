"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Calendar, Clock, XCircle, CalendarClock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { useBookingStore } from "@/stores/booking-store";
import { rupeeFormatter } from "@/lib/formatters";

// ----- types ----------------------------------------------------------------

type DbBookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface DbBooking {
  id: string;
  date: string;
  time: string;
  status: DbBookingStatus;
  notes?: string | null;
  artist: {
    id: string;
    name: string | null;
    image: string | null;
    city: string | null;
    specialties: string | null;
  };
  service: {
    id: string;
    name: string;
    price: number;
    duration: string;
  };
}

// A unified display model for the card UI
interface DisplayBooking {
  id: string;
  artistName: string;
  artistAvatar: string;
  serviceName: string;
  price: number;
  date: string;
  timeSlot: string;
  status: "Upcoming" | "Completed" | "Cancelled" | "Pending";
  source: "db" | "local";
}

// ----- helpers --------------------------------------------------------------

function dbStatusToDisplay(s: DbBookingStatus): DisplayBooking["status"] {
  switch (s) {
    case "PENDING":
      return "Pending";
    case "CONFIRMED":
      return "Upcoming";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
  }
}

const FALLBACK_AVATAR = "/placeholder-artist.jpg";

// ---------------------------------------------------------------------------

export function MyBookings() {
  const { bookings: localBookings, cancelBooking } = useBookingStore();

  const [dbBookings, setDbBookings] = useState<DbBooking[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  // ----- fetch DB bookings ---------------------------------------------------

  const fetchDbBookings = useCallback(async () => {
    try {
      setDbLoading(true);
      const res = await fetch("/api/bookings");
      if (!res.ok) return; // silently fall back to local store
      const data = await res.json();
      setDbBookings(data.bookings ?? []);
    } catch {
      // silently ignore – we still show local store bookings
    } finally {
      setDbLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDbBookings();
  }, [fetchDbBookings]);

  // ----- merge DB + local store ---------------------------------------------
  // DB bookings take precedence; supplement with any local-only bookings that
  // don't have a matching DB entry (edge case during same session).

  const dbIds = new Set(dbBookings.map((b) => b.id));

  const displayBookings: DisplayBooking[] = [
    // DB bookings first (most authoritative)
    ...dbBookings.map<DisplayBooking>((b) => ({
      id: b.id,
      artistName: b.artist.name ?? "Artist",
      artistAvatar: b.artist.image ?? FALLBACK_AVATAR,
      serviceName: b.service.name,
      price: b.service.price,
      date: b.date,
      timeSlot: b.time,
      status: dbStatusToDisplay(b.status),
      source: "db",
    })),
    // Local store bookings not yet in DB (freshly created this session)
    ...localBookings
      .filter((lb) => !dbIds.has(lb.id))
      .map<DisplayBooking>((lb) => ({
        id: lb.id,
        artistName: lb.artistName,
        artistAvatar: lb.artistAvatar,
        serviceName: lb.serviceName,
        price: lb.price,
        date: lb.date,
        timeSlot: lb.timeSlot,
        status: lb.status,
        source: "local",
      })),
  ];

  const upcomingBookings = displayBookings.filter(
    (b) => b.status === "Upcoming" || b.status === "Pending"
  );
  const cancelledBookings = displayBookings.filter((b) => b.status === "Cancelled");

  // ----- cancel action ------------------------------------------------------

  async function handleCancel(booking: DisplayBooking) {
    setCancelling(booking.id);
    try {
      if (booking.source === "db") {
        const res = await fetch(`/api/bookings/${booking.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "CANCELLED" }),
        });
        if (!res.ok) throw new Error("Failed to cancel");
        await fetchDbBookings();
      } else {
        // Local store booking
        cancelBooking(booking.id);
      }
    } catch {
      alert("Something went wrong cancelling the booking. Please try again.");
    } finally {
      setCancelling(null);
    }
  }

  // ----- render --------------------------------------------------------------

  const isLoading = dbLoading;

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">My Bookings</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          ) : (
            <>
              {upcomingBookings.length} Active Booking
              {upcomingBookings.length !== 1 ? "s" : ""}
            </>
          )}
        </span>
      </div>

      {!isLoading && displayBookings.length === 0 ? (
        <div className="premium-card flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Calendar className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">No Active Bookings</h3>
          <p className="text-muted-foreground mb-8 max-w-md">
            You don&apos;t have any upcoming appointments scheduled yet. Explore our marketplace
            to find the perfect artist.
          </p>
          <Link href="/artists">
            <button className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-plum-600 transition-colors flex items-center gap-2">
              Explore Artists <ArrowRight className="size-4" />
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Skeleton while loading */}
          {isLoading && (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="premium-card overflow-hidden">
                  <div className="flex items-start gap-4 border-b border-border p-5">
                    <div className="skeleton size-12 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2.5 py-0.5">
                      <div className="skeleton h-4 w-2/5 rounded-lg" />
                      <div className="skeleton h-3 w-3/5 rounded-lg" />
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="skeleton h-3 w-4/5 rounded-lg" />
                    <div className="skeleton h-3 w-3/5 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming / Pending */}
          {!isLoading && upcomingBookings.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingBookings.map((booking, i) => {
                const displayDate = new Date(booking.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                const isCancelling = cancelling === booking.id;

                return (
                  <FadeUp
                    key={booking.id}
                    className="premium-card overflow-hidden flex flex-col justify-between"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {/* Artist + service */}
                    <div className="flex items-start gap-4 border-b border-border p-5">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border">
                        <Image
                          alt={booking.artistName}
                          className="object-cover"
                          fill
                          sizes="48px"
                          src={booking.artistAvatar}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = FALLBACK_AVATAR;
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-foreground truncate">{booking.artistName}</h3>
                        <p className="text-xs text-muted-foreground">{booking.serviceName}</p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          {rupeeFormatter.format(booking.price)}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${
                          booking.status === "Pending"
                            ? "bg-amber-500/10 text-amber-700 border-amber-500/20"
                            : "bg-teal-500/10 text-teal-600 border-teal-500/20"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Date/Time */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-foreground/80">
                        <Calendar className="size-3.5 text-primary shrink-0" />
                        <span>{displayDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground/80">
                        <Clock className="size-3.5 text-primary shrink-0" />
                        <span>{booking.timeSlot}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground pt-1">
                        ID: #{booking.id.toUpperCase().slice(0, 12)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-border p-4 flex gap-2">
                      <button
                        disabled={isCancelling}
                        onClick={() => handleCancel(booking)}
                        className="flex-1 rounded-full border border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 py-2 text-xs font-semibold text-destructive transition-all flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isCancelling ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <XCircle className="size-3.5" />
                        )}
                        Cancel
                      </button>
                      <button
                        onClick={() =>
                          alert(
                            "Rescheduling coming soon! Please contact the artist or book a new slot."
                          )
                        }
                        className="flex-1 rounded-full border border-border hover:bg-muted py-2 text-xs font-semibold text-primary transition-all flex items-center justify-center gap-1.5"
                      >
                        <CalendarClock className="size-3.5" /> Reschedule
                      </button>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          )}

          {/* Cancelled notice */}
          {!isLoading && cancelledBookings.length > 0 && (
            <FadeUp className="rounded-xl border border-border bg-card p-4 flex gap-3 items-start text-xs text-muted-foreground">
              <XCircle className="size-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground/80">Cancelled Bookings</p>
                <p className="mt-0.5">
                  {cancelledBookings.length} cancelled appointment
                  {cancelledBookings.length !== 1 ? "s" : ""} are archived in your{" "}
                  <a href="/dashboard/history" className="text-primary hover:underline font-medium">
                    Booking History
                  </a>
                  .
                </p>
              </div>
            </FadeUp>
          )}
        </>
      )}
    </StaggerContainer>
  );
}
