"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { AvatarInitials, StarRating, StatusBadge } from "@/components/dashboard/ui-helpers";
import { MOCK_BOOKING_HISTORY, type MockBooking } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function BookingHistory() {
  const [history] = useState<MockBooking[]>(MOCK_BOOKING_HISTORY);

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

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Booking History</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {history.length} Previous Appointment{history.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {history.map((item, i) => (
          <FadeUp
            key={item.id}
            className="premium-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start gap-4">
              <AvatarInitials initials={item.artistInitials} gradient={item.artistColor} />
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
                <div className="w-[105px]" /> // Spacing matching the button width
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </StaggerContainer>
  );
}
