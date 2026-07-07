"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, AlertCircle } from "lucide-react";
import { AvatarInitials, DashboardSkeleton, EmptyState, StatusBadge } from "@/components/dashboard/ui-helpers";
import { MOCK_UPCOMING_BOOKINGS, type MockBooking } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function MyBookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<MockBooking[]>(MOCK_UPCOMING_BOOKINGS);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  function handleCancel(id: string) {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
      );
      alert("Booking cancellation request sent to artist.");
    }
  }

  function handleReschedule(id: string) {
    alert("Rescheduling coming soon! Please contact the artist or book a new slot.");
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">My Bookings</h2>
        <DashboardSkeleton rows={2} />
      </div>
    );
  }

  const activeBookings = bookings.filter((b) => b.status !== "cancelled");

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">My Bookings</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {activeBookings.length} Active Booking{activeBookings.length !== 1 ? "s" : ""}
        </span>
      </div>

      {activeBookings.length === 0 ? (
        <EmptyState
          title="No Active Bookings"
          description="You don't have any upcoming or pending appointments."
          icon="🗓️"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {activeBookings.map((booking, i) => (
            <FadeUp
              key={booking.id}
              className="premium-card p-5 space-y-4 flex flex-col justify-between"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <AvatarInitials
                    initials={booking.artistInitials}
                    gradient={booking.artistColor}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {booking.artistName}
                    </h3>
                    <p className="text-xs text-muted-foreground">{booking.artistSpecialty}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-muted px-2.5 py-0.5 text-xs text-foreground font-medium">
                        {booking.service}
                      </span>
                      <StatusBadge status={booking.status} />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-foreground">
                      ₹{booking.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-muted/40 p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Calendar className="size-3.5 text-primary shrink-0" />
                    <span>
                      {new Date(booking.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Clock className="size-3.5 text-primary shrink-0" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{booking.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2 border-t border-border pt-4">
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="flex-1 rounded-full border border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 py-2 text-xs font-semibold text-destructive transition-all"
                >
                  Cancel Booking
                </button>
                <button
                  onClick={() => handleReschedule(booking.id)}
                  className="flex-1 rounded-full border border-border hover:bg-muted py-2 text-xs font-semibold text-primary transition-all"
                >
                  Reschedule
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      )}

      {/* Cancelled booking list info block */}
      {bookings.some((b) => b.status === "cancelled") && (
        <FadeUp className="rounded-xl border border-border bg-card p-4 flex gap-3 items-start text-xs text-muted-foreground">
          <AlertCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground/80">Cancelled Bookings</p>
            <p className="mt-0.5">
              Cancelled appointments are archived in your{" "}
              <a href="/dashboard/history" className="text-primary hover:underline font-medium">
                Booking History
              </a>
              . Refunds for pre-payments are processed within 3-5 business days.
            </p>
          </div>
        </FadeUp>
      )}
    </StaggerContainer>
  );
}
