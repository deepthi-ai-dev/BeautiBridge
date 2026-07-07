import { cn } from "@/lib/utils";
import type { DaySlot } from "@/features/artists/profile-types";

type AvailabilityCalendarProps = {
  slots: DaySlot[];
};

const statusConfig = {
  available: {
    bg: "bg-emerald-400/20 hover:bg-emerald-400/30",
    dot: "bg-emerald-400",
    label: "Available",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-400/30",
  },
  booked: {
    bg: "bg-rose-400/10",
    dot: "bg-rose-400",
    label: "Booked",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-400/20",
  },
  off: {
    bg: "bg-muted",
    dot: "bg-muted-foreground/30",
    label: "Day off",
    text: "text-muted-foreground",
    border: "border-transparent",
  },
} as const;

export function AvailabilityCalendar({
  slots,
}: Readonly<AvailabilityCalendarProps>) {
  return (
    <section aria-label="Weekly availability">
      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-4 text-xs">
        {(["available", "booked", "off"] as const).map((s) => (
          <span className="flex items-center gap-1.5" key={s}>
            <span
              className={cn("size-2.5 rounded-full", statusConfig[s].dot)}
            />
            <span className="text-muted-foreground">{statusConfig[s].label}</span>
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-2">
        {slots.map((slot) => {
          const cfg = statusConfig[slot.status];
          return (
            <div
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border p-2 text-center transition-colors sm:p-3",
                cfg.bg,
                cfg.border,
              )}
              key={slot.day}
            >
              <span className={cn("text-xs font-semibold", cfg.text)}>
                {slot.day}
              </span>
              <span className={cn("size-2 rounded-full", cfg.dot)} />
              {slot.status === "available" && slot.slots && (
                <span className="text-muted-foreground text-[10px] leading-tight">
                  {slot.slots.length} slot{slot.slots.length !== 1 ? "s" : ""}
                </span>
              )}
              {slot.status === "booked" && (
                <span className="text-muted-foreground text-[10px]">Full</span>
              )}
              {slot.status === "off" && (
                <span className="text-muted-foreground text-[10px]">Off</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Available time slots list */}
      {slots.some((s) => s.status === "available" && s.slots?.length) && (
        <div className="mt-4 space-y-2">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
            Open slots this week
          </p>
          <div className="flex flex-wrap gap-2">
            {slots
              .filter((s) => s.status === "available" && s.slots?.length)
              .flatMap((s) =>
                (s.slots ?? []).map((time) => ({
                  day: s.day,
                  time,
                })),
              )
              .map(({ day, time }) => (
                <span
                  className="bg-card border-border rounded-full border px-3 py-1 text-xs font-medium"
                  key={`${day}-${time}`}
                >
                  {day} · {time}
                </span>
              ))}
          </div>
        </div>
      )}

      <p className="text-muted-foreground mt-4 text-xs">
        * Availability shown is indicative. Booking system coming soon.
      </p>
    </section>
  );
}
