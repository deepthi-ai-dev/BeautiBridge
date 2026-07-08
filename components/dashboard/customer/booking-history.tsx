"use client";

import Image from "next/image";
import { Star, XCircle } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/ui-helpers";
import { MOCK_BOOKING_HISTORY, type MockBooking } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { useBookingStore } from "@/stores/booking-store";
import { rupeeFormatter } from "@/lib/formatters";
import type { CompletedBooking } from "@/stores/booking-store";

function handleRateArtist(artistName: string) {
  const rating = prompt(`Rate your experience with ${artistName} (1-5 stars):`);
  if (rating) {
    const num = parseFloat(rating);
    if (isNaN(num) || num < 1 || num > 5) {
      alert("Please enter a valid number between 1 and 5.");
    } else {
      alert(`Thank you for submitting a ${num}★ rating for ${artistName}!`);
    }
  }
}

export function BookingHistory() {
  const { bookings } = useBookingStore();

  // Cancelled bookings from the live store
  const cancelledFromStore: CompletedBooking[] = bookings.filter(
    (b) => b.status === "Cancelled"
  );

  // Total history count for display
  const totalHistory = MOCK_BOOKING_HISTORY.length + cancelledFromStore.length;

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Booking History</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {totalHistory} Previous Appointment{totalHistory !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {/* Live cancelled bookings from store */}
        {cancelledFromStore.map((booking, i) => {
          const displayDate = new Date(booking.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          return (
            <FadeUp
              key={booking.id}
              className="premium-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border">
                  <Image
                    src={booking.artistAvatar}
                    alt={booking.artistName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{booking.artistName}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-medium text-foreground bg-muted px-2 py-0.5 rounded-lg">
                      {booking.serviceName}
                    </span>
                    <span className="text-muted-foreground">{displayDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-border pt-3 sm:pt-0">
                <div className="sm:text-right space-y-1">
                  <p className="text-sm font-bold text-foreground">
                    {rupeeFormatter.format(booking.price)}
                  </p>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-destructive/10 text-destructive border-destructive/20">
                    <XCircle className="size-3" /> Cancelled
                  </span>
                </div>
                {/* Spacer to match completed row layout */}
                <div className="w-[105px]" />
              </div>
            </FadeUp>
          );
        })}

        {/* Static historical mock bookings */}
        {MOCK_BOOKING_HISTORY.map((item: MockBooking, i: number) => (
          <FadeUp
            key={item.id}
            className="premium-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ animationDelay: `${(cancelledFromStore.length + i) * 60}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white overflow-hidden">
                <span
                  className={`flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${item.artistColor} text-sm font-bold text-white`}
                >
                  {item.artistInitials}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.artistName}</h3>
                <p className="text-xs text-muted-foreground">{item.artistSpecialty}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-medium text-foreground bg-muted px-2 py-0.5 rounded-lg">
                    {item.service}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-border pt-3 sm:pt-0">
              <div className="sm:text-right space-y-1">
                <p className="text-sm font-bold text-foreground">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
                <StatusBadge status={item.status} />
              </div>

              {item.status === "completed" ? (
                <button
                  onClick={() => handleRateArtist(item.artistName)}
                  className="rounded-full bg-secondary hover:bg-salmon-500 text-secondary-foreground px-4 py-2 text-xs font-semibold shadow-soft transition-all flex items-center gap-1.5"
                >
                  <Star className="size-3.5 fill-current" /> Rate Artist
                </button>
              ) : (
                <div className="w-[105px]" />
              )}
            </div>
          </FadeUp>
        ))}

        {/* Empty state when nothing in either source */}
        {totalHistory === 0 && (
          <div className="premium-card flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
            <span className="text-4xl mb-4">📋</span>
            <h3 className="text-lg font-semibold text-foreground mb-2">No History Yet</h3>
            <p className="text-sm text-muted-foreground">
              Cancelled or completed bookings will appear here.
            </p>
          </div>
        )}
      </div>
    </StaggerContainer>
  );
}
