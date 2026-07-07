import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Clock,
  Languages,
  Star,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/marketplace/rating-stars";
import { rupeeFormatter } from "@/lib/formatters";
import type { Artist } from "@/features/artists/types";

type BookingPanelProps = {
  artist: Artist;
};

const availabilityConfig = {
  available: { dot: "bg-emerald-400", label: "Available for bookings" },
  busy: { dot: "bg-amber-400", label: "Busy – limited slots" },
  unavailable: { dot: "bg-rose-400", label: "Currently unavailable" },
} as const;

export function BookingPanel({ artist }: Readonly<BookingPanelProps>) {
  const avail = availabilityConfig[artist.availability];

  return (
    <aside aria-label="Booking panel">
      <div className="premium-card sticky top-24 overflow-hidden">
        {/* Top accent bar */}
        <div className="from-primary to-plum-600 h-1.5 bg-gradient-to-r" />

        <div className="p-6">
          {/* Name & verification */}
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-primary flex flex-wrap items-center gap-1.5 text-xl font-bold">
                {artist.name}
                {artist.isVerified && (
                  <ShieldCheck
                    aria-label="Verified artist"
                    className="text-teal-400 size-5 shrink-0"
                  />
                )}
              </h2>
              <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                <MapPin className="size-3.5 shrink-0" />
                {artist.city}, {artist.state}
              </p>
            </div>
          </div>

          {/* Stars */}
          <div className="mt-3 flex items-center gap-2">
            <RatingStars rating={artist.rating} showValue />
            <span className="text-muted-foreground text-sm">
              ({artist.reviewCount.toLocaleString("en-IN")} reviews)
            </span>
          </div>

          {/* Price block */}
          <div className="bg-muted mt-5 rounded-2xl p-4 text-center">
            <p className="text-muted-foreground text-xs">Starting from</p>
            <p className="text-primary mt-0.5 text-3xl font-bold tabular-nums">
              {rupeeFormatter.format(artist.startingPrice)}
            </p>
            <p className="text-muted-foreground text-xs">per session</p>
          </div>

          {/* Meta chips */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-background border-border rounded-xl border p-3">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Clock className="size-3.5" />
                Experience
              </p>
              <p className="text-primary mt-1 font-semibold">
                {artist.yearsExperience} years
              </p>
            </div>
            <div className="bg-background border-border rounded-xl border p-3">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Languages className="size-3.5" />
                Languages
              </p>
              <p className="text-primary mt-1 truncate text-sm font-semibold">
                {artist.languages.slice(0, 2).join(", ")}
                {artist.languages.length > 2 &&
                  ` +${artist.languages.length - 2}`}
              </p>
            </div>
            <div className="bg-background border-border col-span-2 rounded-xl border p-3">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <CalendarCheck className="size-3.5" />
                Services offered
              </p>
              <p className="text-primary mt-1 text-sm font-semibold">
                {artist.services.slice(0, 2).join(" · ")}
                {artist.services.length > 2 &&
                  ` +${artist.services.length - 2} more`}
              </p>
            </div>
          </div>

          {/* Availability indicator */}
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
            <span className={`size-2 rounded-full ${avail.dot}`} />
            <span className="text-muted-foreground text-sm">{avail.label}</span>
          </div>

          <Link href={`/artists/${artist.slug}/book`} className="block w-full">
            <Button className="mt-5 w-full" size="lg" variant="primary">
              <Star className="size-4" />
              Book Session
            </Button>
          </Link>
          <p className="text-muted-foreground mt-2 text-center text-xs">
            Booking &amp; payments coming in a future phase.
          </p>
        </div>
      </div>
    </aside>
  );
}
