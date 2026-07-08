"use client";

import Image from "next/image";
import { Calendar, Clock, XCircle, CalendarClock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { useBookingStore } from "@/stores/booking-store";
import { rupeeFormatter } from "@/lib/formatters";

export function MyBookings() {
  const { bookings, cancelBooking } = useBookingStore();

  const upcomingBookings = bookings.filter((b) => b.status === "Upcoming");
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled");

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">My Bookings</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {upcomingBookings.length} Active Booking{upcomingBookings.length !== 1 ? "s" : ""}
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="premium-card flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Calendar className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">No Active Bookings</h3>
          <p className="text-muted-foreground mb-8 max-w-md">
            You don&apos;t have any upcoming appointments scheduled yet. Explore our marketplace to find the perfect artist.
          </p>
          <Link href="/artists">
            <button className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-plum-600 transition-colors flex items-center gap-2">
              Explore Artists <ArrowRight className="size-4" />
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Upcoming */}
          {upcomingBookings.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingBookings.map((booking, i) => {
                const displayDate = new Date(booking.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
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
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-foreground truncate">{booking.artistName}</h3>
                        <p className="text-xs text-muted-foreground">{booking.serviceName}</p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          {rupeeFormatter.format(booking.price)}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-teal-500/10 text-teal-600 border-teal-500/20 shrink-0">
                        Upcoming
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
                        ID: #{booking.id.toUpperCase()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-border p-4 flex gap-2">
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="flex-1 rounded-full border border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 py-2 text-xs font-semibold text-destructive transition-all flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="size-3.5" /> Cancel
                      </button>
                      <button
                        onClick={() => alert("Rescheduling coming soon! Please contact the artist or book a new slot.")}
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
          {cancelledBookings.length > 0 && (
            <FadeUp className="rounded-xl border border-border bg-card p-4 flex gap-3 items-start text-xs text-muted-foreground">
              <XCircle className="size-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground/80">Cancelled Bookings</p>
                <p className="mt-0.5">
                  {cancelledBookings.length} cancelled appointment{cancelledBookings.length !== 1 ? "s" : ""} are archived in your{" "}
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
