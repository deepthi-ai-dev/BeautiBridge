"use client";

import { useState } from "react";
import { Check, X, Calendar, Clock, Sparkles } from "lucide-react";
import { AvatarInitials, StatusBadge } from "@/components/dashboard/ui-helpers";
import { MOCK_APPOINTMENTS, type MockAppointment } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function BookingRequests() {
  const [requests, setRequests] = useState<MockAppointment[]>(MOCK_APPOINTMENTS);

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  function handleAccept(id: string, name: string) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "confirmed" } : r))
    );
    alert(`Appointment request from ${name} accepted!`);
  }

  function handleDecline(id: string, name: string) {
    if (confirm(`Decline appointment request from ${name}?`)) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r))
      );
      alert(`Appointment request declined.`);
    }
  }

  const activeRequests = requests.filter((r) => r.status !== "cancelled");

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

      <div className="space-y-3">
        {activeRequests.map((item, i) => (
          <FadeUp
            key={item.id}
            className="premium-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Customer & Service Info */}
            <div className="flex items-start gap-4">
              <AvatarInitials initials={item.customerInitials} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{item.customerName}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-xs text-primary font-medium mt-0.5">{item.service}</p>
                
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
                    {item.time} ({item.duration})
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Action buttons */}
            <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-border pt-3 md:pt-0">
              <div className="md:text-right">
                <span className="text-[10px] text-muted-foreground block">Session Price</span>
                <span className="text-base font-bold text-foreground">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
              </div>

              {item.status === "pending" ? (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleAccept(item.id, item.customerName)}
                    className="rounded-full bg-primary hover:bg-plum-600 px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-all flex items-center gap-1"
                  >
                    <Check className="size-3.5" /> Accept
                  </button>
                  <button
                    onClick={() => handleDecline(item.id, item.customerName)}
                    className="rounded-full border border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 px-4 py-2 text-xs font-semibold text-destructive transition-all flex items-center gap-1"
                  >
                    <X className="size-3.5" /> Decline
                  </button>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground font-medium pr-4">
                  Request Confirmed
                </div>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </StaggerContainer>
  );
}
