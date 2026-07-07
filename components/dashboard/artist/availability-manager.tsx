"use client";

import { useState } from "react";
import { Plus, X, Calendar, Clock, Sparkles } from "lucide-react";
import { MOCK_AVAILABILITY, type MockAvailabilityDay } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AvailabilityManager() {
  const [schedule, setSchedule] = useState<MockAvailabilityDay[]>(MOCK_AVAILABILITY);

  function toggleDay(dayName: string) {
    setSchedule((prev) =>
      prev.map((day) =>
        day.day === dayName ? { ...day, isAvailable: !day.isAvailable } : day
      )
    );
  }

  function handleAddSlot(dayName: string) {
    const time = prompt("Enter time slot (e.g. 02:00 PM):");
    if (time) {
      setSchedule((prev) =>
        prev.map((day) =>
          day.day === dayName ? { ...day, slots: [...day.slots, time] } : day
        )
      );
    }
  }

  function handleRemoveSlot(dayName: string, slotIndex: number) {
    setSchedule((prev) =>
      prev.map((day) =>
        day.day === dayName
          ? { ...day, slots: day.slots.filter((_, idx) => idx !== slotIndex) }
          : day
      )
    );
  }

  return (
    <StaggerContainer className="space-y-6">
      <div className="border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground">Weekly Availability</h2>
        <p className="text-xs text-muted-foreground mt-1">Configure your weekly work days and session booking slots</p>
      </div>

      <div className="grid gap-4">
        {schedule.map((day, i) => (
          <FadeUp
            key={day.day}
            className={cn(
              "premium-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all duration-200 border-l-4",
              day.isAvailable ? "border-l-primary bg-card" : "border-l-muted bg-muted/20 opacity-70"
            )}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Day Header & Toggle */}
            <div className="flex items-center justify-between md:justify-start gap-4 shrink-0">
              <div className="space-y-0.5 min-w-[120px]">
                <h3 className="font-bold text-foreground text-sm">{day.day}</h3>
                <span className="text-[10px] text-muted-foreground">
                  {day.isAvailable ? `${day.slots.length} working slots` : "Off Day"}
                </span>
              </div>

              {/* Custom Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={day.isAvailable}
                onClick={() => toggleDay(day.day)}
                className={cn(
                  "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring",
                  day.isAvailable ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block size-4 transform rounded-full bg-white shadow transition duration-200",
                    day.isAvailable ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Slots Grid */}
            <div className="flex-1">
              {day.isAvailable ? (
                <div className="flex flex-wrap items-center gap-2">
                  {day.slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className="group/slot flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-foreground border border-border"
                    >
                      <Clock className="size-3 text-muted-foreground shrink-0" />
                      <span>{slot}</span>
                      <button
                        aria-label="Remove slot"
                        onClick={() => handleRemoveSlot(day.day, idx)}
                        className="opacity-0 group-hover/slot:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddSlot(day.day)}
                    className="flex items-center gap-1 rounded-lg border border-dashed border-primary/45 hover:border-primary text-primary hover:bg-primary/5 px-2.5 py-1 text-xs font-semibold transition-all"
                  >
                    <Plus className="size-3" /> Add Slot
                  </button>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground italic leading-relaxed">
                  Off day. System blocks any scheduling requests for {day.day}s.
                </span>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </StaggerContainer>
  );
}
