"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Users, Clock, AlertTriangle } from "lucide-react";
import { MOCK_CALENDAR_SLOTS, type MockCalendarSlot } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const weekDays = [
  { date: "04", day: "Mon" },
  { date: "05", day: "Tue" },
  { date: "06", day: "Wed" },
  { date: "07", day: "Thu", isToday: true },
  { date: "08", day: "Fri" },
  { date: "09", day: "Sat" },
  { date: "10", day: "Sun" },
];

export function CalendarView() {
  const [slots, _setSlots] = useState<MockCalendarSlot[]>(MOCK_CALENDAR_SLOTS);
  const [selectedDay, setSelectedDay] = useState("07");

  function handleSlotClick(slot: MockCalendarSlot) {
    if (slot.status === "available") {
      alert(`Add booking on ${slot.time} coming soon!`);
    } else if (slot.status === "booked") {
      alert(`Booking Details:\nClient: ${slot.customerName}\nService: ${slot.service}\nTime: ${slot.time}`);
    } else {
      alert(`Slot at ${slot.time} is blocked.`);
    }
  }

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Weekly Calendar</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage appointments and block/unblock time slots</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-border bg-card p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-xs font-semibold text-foreground bg-muted px-3 py-2 rounded-xl">
            August 04 - 10, 2025
          </span>
          <button className="rounded-xl border border-border bg-card p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Week days selector grid */}
      <FadeUp className="grid grid-cols-7 gap-2 bg-card border border-border p-2 rounded-2xl">
        {weekDays.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDay(day.date)}
            className={cn(
              "flex flex-col items-center justify-center py-2.5 rounded-xl transition-all",
              selectedDay === day.date
                ? "bg-primary text-primary-foreground shadow-soft"
                : "hover:bg-muted text-foreground/80",
              day.isToday && selectedDay !== day.date && "border border-primary/30 text-primary"
            )}
          >
            <span className="text-[10px] uppercase font-semibold opacity-75">{day.day}</span>
            <span className="text-sm font-bold mt-1">{day.date}</span>
          </button>
        ))}
      </FadeUp>

      {/* Time slots list */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot, i) => (
          <FadeUp
            key={slot.time}
            className={cn(
              "premium-card p-4 flex flex-col justify-between cursor-pointer border-t-4 transition-all duration-200 hover:shadow-md",
              slot.status === "available" && "border-t-teal-400 bg-teal-400/5 hover:bg-teal-400/8",
              slot.status === "booked" && "border-t-primary bg-primary/5 hover:bg-primary/8",
              slot.status === "blocked" && "border-t-muted bg-muted/40 opacity-70"
            )}
            onClick={() => handleSlotClick(slot)}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-sm">{slot.time}</span>
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  slot.status === "available" && "bg-teal-400/20 text-teal-500",
                  slot.status === "booked" && "bg-primary/20 text-primary",
                  slot.status === "blocked" && "bg-muted text-muted-foreground"
                )}
              >
                {slot.status}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40">
              {slot.status === "booked" ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                    <Users className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{slot.customerName}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground ml-5 truncate">{slot.service}</p>
                </div>
              ) : slot.status === "available" ? (
                <div className="flex items-center gap-1 text-xs text-teal-500 font-semibold">
                  <Plus className="size-3.5" /> Book Client Slot
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                  <AlertTriangle className="size-3.5" /> Blocked (Out of Office)
                </div>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </StaggerContainer>
  );
}
