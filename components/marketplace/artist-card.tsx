"use client";

import Image from "next/image";
import { MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/marketplace/rating-stars";
import { ServiceChip } from "@/components/marketplace/service-chip";
import { rupeeFormatter } from "@/lib/formatters";
import { fadeUpVariants } from "@/lib/motion";
import type { Artist } from "@/features/artists/types";

type ArtistCardProps = {
  artist: Artist;
  onPreview?: (artist: Artist) => void;
};

const badgeVariant = {
  "Top Rated": "gold",
  "Rising Star": "teal",
  "Highly Booked": "salmon",
} as const;

const availabilityConfig = {
  available: { color: "bg-emerald-400", label: "Available" },
  busy: { color: "bg-amber-400", label: "Busy" },
  unavailable: { color: "bg-rose-400", label: "Unavailable" },
} as const;

export function ArtistCard({ artist, onPreview }: ArtistCardProps) {
  const avail = availabilityConfig[artist.availability as keyof typeof availabilityConfig] ?? availabilityConfig.unavailable;

  return (
    <motion.article
      className="premium-card group flex flex-col overflow-hidden cursor-pointer"
      variants={fadeUpVariants}
      onClick={() => onPreview?.(artist)}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          alt={`${artist.name} – ${artist.services[0]}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={artist.coverImage}
        />
        {/* Gradient overlay */}
        <div className="card-image-overlay absolute inset-0" />

        {/* Badge top-left */}
        {artist.badge && (
          <Badge
            className="absolute top-3 left-3 shadow-sm"
            variant={badgeVariant[artist.badge] ?? "salmon"}
          >
            {artist.badge}
          </Badge>
        )}

        {/* Availability indicator */}
        <span
          aria-label={`Availability: ${avail.label}`}
          title={avail.label}
          className={[
            "absolute top-3 right-3 size-2.5 rounded-full ring-2 ring-white shadow-sm transition-transform duration-200",
            avail.color,
          ].join(" ")}
        />

        {/* Price overlay at bottom */}
        <div className="absolute bottom-3 right-3 rounded-lg bg-black/50 px-2 py-1 backdrop-blur-sm">
          <p className="text-xs font-bold text-white">
            {rupeeFormatter.format(artist.startingPrice)}
            <span className="font-normal opacity-80">/session</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name & verified */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-primary flex items-center gap-1.5 text-sm font-semibold leading-snug truncate">
              {artist.name}
              {artist.isVerified && (
                <ShieldCheck
                  aria-label="Verified artist"
                  className="text-teal-400 size-3.5 shrink-0"
                />
              )}
            </h3>
            <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs truncate">
              <MapPin className="size-3 shrink-0" />
              {artist.city}, {artist.state}
            </p>
          </div>
        </div>

        {/* Stars & review count */}
        <div className="flex items-center gap-2">
          <RatingStars rating={artist.rating} showValue />
          <span className="text-muted-foreground text-[11px]">
            ({artist.reviewCount.toLocaleString("en-IN")})
          </span>
        </div>

        {/* Services chips — max 3 */}
        <div className="flex flex-wrap gap-1.5">
          {artist.services.slice(0, 3).map((s) => (
            <ServiceChip key={s} label={s} />
          ))}
          {artist.services.length > 3 && (
            <ServiceChip
              className="text-muted-foreground bg-muted border-transparent"
              label={`+${artist.services.length - 3} more`}
            />
          )}
        </div>

        {/* CTA */}
        <Button
          className="mt-auto w-full"
          onClick={(e) => {
            e.stopPropagation();
            onPreview?.(artist);
          }}
          size="sm"
          variant="outline"
        >
          View Profile
        </Button>
      </div>
    </motion.article>
  );
}
