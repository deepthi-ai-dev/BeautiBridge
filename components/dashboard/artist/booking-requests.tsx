"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, X, Calendar, Clock, Loader2 } from "lucide-react";
import { AvatarInitials, StatusBadge, DashboardSkeleton, EmptyState } from "@/components/dashboard/ui-helpers";
import { FadeUp, StaggerContainer } from "@/lib/motion";

// ----- types ----------------------------------------------------------------

type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface ArtistBooking {
  id: string;
  date: string;
  time: string;
  status: BookingStatus;
  notes?: string | null;
  user: {
    id: string;
    name: string | null;
    phone: string | null;
    image: string | null;
    city: string | null;
  };
  service: {
    id: string;
    name: string;
    price: number;
    duration: string;
  };
}

// ----- helpers --------------------------------------------------------------

/** Converts "Priya Kapoor" → "PK" */
function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

/** Maps DB status enum → ui-helpers StatusBadge lowercase keys */
function toDisplayStatus(
  s: BookingStatus
): "pending" | "confirmed" | "completed" | "cancelled" {
  return s.toLowerCase() as "pending" | "confirmed" | "completed" | "cancelled";
}

// ---------------------------------------------------------------------------

export function BookingRequests() {
  const [bookings, setBookings] = useState<ArtistBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // booking id being actioned

  // ----- fetch ---------------------------------------------------------------

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/bookings/artist");
      if (!res.ok) throw new Error("Failed to load bookings");
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } catch (err) {
      setError("Could not load booking requests. Please refresh.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // ----- actions -------------------------------------------------------------

  async function updateStatus(id: string, status: "CONFIRMED" | "CANCELLED") {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update booking");
      // Optimistically update local state, then re-fetch for consistency
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      await fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleAccept(id: string, name: string | null) {
    await updateStatus(id, "CONFIRMED");
    // Small toast-like feedback via alert (same UX as before)
    alert(`Booking from ${name ?? "customer"} confirmed!`);
  }

  async function handleDecline(id: string, name: string | null) {
    if (!confirm(`Decline booking request from ${name ?? "this customer"}?`)) return;
    await updateStatus(id, "CANCELLED");
    alert("Booking request declined.");
  }

  // ----- render --------------------------------------------------------------

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const activeBookings = bookings.filter((b) => b.status !== "CANCELLED");

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Booking Requests</h2>
          <p className="text-xs text-muted-foreground mt-1">Loading your requests…</p>
        </div>
        <DashboardSkeleton rows={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">Booking Requests</h2>
        <EmptyState
          icon="⚠️"
          title="Failed to load"
          description={error}
          action={
            <button
              onClick={fetchBookings}
              className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold hover:bg-plum-600 transition-colors"
            >
              Retry
            </button>
          }
        />
      </div>
    );
  }

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Booking Requests</h2>
          <p className="text-xs text-muted-foreground mt-1">
            You have {pendingCount} pending request{pendingCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {activeBookings.length === 0 ? (
        <EmptyState
          icon="📅"
          title="No active requests"
          description="You don't have any pending or confirmed bookings right now."
        />
      ) : (
        <div className="space-y-3">
          {activeBookings.map((item, i) => {
            const initials = getInitials(item.user.name);
            const displayStatus = toDisplayStatus(item.status);
            const isActioning = actionLoading === item.id;

            return (
              <FadeUp
                key={item.id}
                className="premium-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Customer & Service Info */}
                <div className="flex items-start gap-4">
                  <AvatarInitials initials={initials} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {item.user.name ?? "Unknown Customer"}
                      </h3>
                      <StatusBadge status={displayStatus} />
                    </div>
                    <p className="text-xs text-primary font-medium mt-0.5">
                      {item.service.name}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {item.time} ({item.service.duration})
                      </span>
                      {item.user.city && (
                        <>
                          <span>·</span>
                          <span>{item.user.city}</span>
                        </>
                      )}
                    </div>

                    {item.notes && (
                      <p className="mt-2 text-xs text-muted-foreground italic line-clamp-1">
                        &quot;{item.notes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Price & Action buttons */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-border pt-3 md:pt-0">
                  <div className="md:text-right">
                    <span className="text-[10px] text-muted-foreground block">Session Price</span>
                    <span className="text-base font-bold text-foreground">
                      ₹{item.service.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {item.status === "PENDING" ? (
                    <div className="flex gap-2 shrink-0">
                      <button
                        disabled={isActioning}
                        onClick={() => handleAccept(item.id, item.user.name)}
                        className="rounded-full bg-primary hover:bg-plum-600 px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-all flex items-center gap-1 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isActioning ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <Check className="size-3.5" />
                        )}
                        Accept
                      </button>
                      <button
                        disabled={isActioning}
                        onClick={() => handleDecline(item.id, item.user.name)}
                        className="rounded-full border border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 px-4 py-2 text-xs font-semibold text-destructive transition-all flex items-center gap-1 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isActioning ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <X className="size-3.5" />
                        )}
                        Decline
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground font-medium pr-4 capitalize">
                      {displayStatus}
                    </div>
                  )}
                </div>
              </FadeUp>
            );
          })}
        </div>
      )}
    </StaggerContainer>
  );
}
