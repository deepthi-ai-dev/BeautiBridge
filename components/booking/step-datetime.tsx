"use client";

import { useMemo } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import type { DaySlot } from "@/features/artists/profile-types";

// Helper to get next 14 days
function getNext14Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
}

export function StepDateTime({ availability }: Readonly<{ availability: DaySlot[] }>) {
  const { date, setDate, timeSlot, setTimeSlot, setStep } = useBookingStore();
  
  const availableDates = useMemo(() => getNext14Days(), []);
  
  // Format for state (YYYY-MM-DD)
  const toISODate = (d: Date) => {
    return d.toISOString().split('T')[0];
  };

  // Get slots for a specific date
  const getSlotsForDate = (d: Date) => {
    const dayName = d.toLocaleDateString("en-US", { weekday: 'short' }) as string;
    const avail = availability.find(a => a.day.startsWith(dayName));
    if (!avail || avail.status !== "available") return [];
    return avail.slots || [];
  };

  // Handle Date Selection
  const handleDateSelect = (d: Date) => {
    const iso = toISODate(d);
    setDate(iso);
    setTimeSlot(null); // Reset time when date changes
  };

  const selectedDateObj = availableDates.find(d => toISODate(d) === date) || null;
  const availableSlots = selectedDateObj ? getSlotsForDate(selectedDateObj) : [];

  const handleNext = () => {
    if (date && timeSlot) {
      setStep(3);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Select Date & Time</h2>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* Date Selection */}
        <div className="premium-card p-5">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <CalendarIcon className="size-5" />
            <h3 className="font-semibold">Choose Date</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
            {availableDates.slice(0, 10).map((d) => {
              const iso = toISODate(d);
              const isSelected = date === iso;
              const slots = getSlotsForDate(d);
              const isAvailable = slots.length > 0;
              
              return (
                <button
                  key={iso}
                  disabled={!isAvailable}
                  onClick={() => handleDateSelect(d)}
                  className={[
                    "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                    isSelected ? "border-primary bg-primary/5 text-primary" : 
                    isAvailable ? "border-border bg-card hover:border-primary/40" : 
                    "border-muted bg-muted/50 text-muted-foreground opacity-50 cursor-not-allowed"
                  ].join(" ")}
                >
                  <span className="text-xs uppercase font-semibold mb-1">
                    {d.toLocaleDateString("en-US", { weekday: 'short' })}
                  </span>
                  <span className="text-xl font-bold">
                    {d.getDate()}
                  </span>
                  <span className="text-xs mt-1">
                    {d.toLocaleDateString("en-US", { month: 'short' })}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div className="premium-card p-5">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Clock className="size-5" />
            <h3 className="font-semibold">Available Times</h3>
          </div>
          
          {!date ? (
            <div className="flex h-32 flex-col items-center justify-center text-muted-foreground text-sm text-center border-2 border-dashed border-border rounded-xl">
              <CalendarIcon className="size-6 mb-2 opacity-50" />
              Please select a date first
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center text-muted-foreground text-sm text-center border-2 border-dashed border-border rounded-xl">
              No slots available for this date.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {availableSlots.map((time) => {
                const isSelected = timeSlot === time;
                return (
                  <button
                    key={time}
                    onClick={() => setTimeSlot(time)}
                    className={[
                      "py-3 px-4 rounded-xl text-sm font-semibold transition-all text-center border-2",
                      isSelected ? "border-primary bg-primary text-primary-foreground shadow-md" : 
                      "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
                    ].join(" ")}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button 
          onClick={handleNext} 
          disabled={!date || !timeSlot}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
