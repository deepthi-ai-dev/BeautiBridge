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

export function ArtistCard({ artist, onPreview }: ArtistCardProps) {
  return (
    <motion.article
      className="premium-card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-premium)]"
      variants={fadeUpVariants}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          alt={`${artist.name} – ${artist.services[0]}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={artist.coverImage}
        />
        {/* Gradient overlay */}
        <div className="from-plum-950/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

        {/* Badge top-left */}
        {artist.badge && (
          <Badge
            className="absolute top-3 left-3 shadow-sm"
            variant={badgeVariant[artist.badge] ?? "salmon"}
          >
            {artist.badge}
          </Badge>
        )}

        {/* Availability dot */}
        <span
          aria-label={`Availability: ${artist.availability}`}
          className={[
            "absolute top-3 right-3 size-2.5 rounded-full ring-2 ring-white",
            artist.availability === "available"
              ? "bg-emerald-400"
              : artist.availability === "busy"
                ? "bg-amber-400"
                : "bg-rose-400",
          ].join(" ")}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Name & verified */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-primary flex items-center gap-1.5 text-base font-semibold leading-snug">
              {artist.name}
              {artist.isVerified && (
                <ShieldCheck
                  aria-label="Verified artist"
                  className="text-teal-400 size-4 shrink-0"
                />
              )}
            </h3>
            <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
              <MapPin className="size-3 shrink-0" />
              {artist.city}, {artist.state}
            </p>
          </div>
          <p className="text-primary shrink-0 text-sm font-semibold">
            {rupeeFormatter.format(artist.startingPrice)}
            <span className="text-muted-foreground text-[10px] font-normal">
              {" "}
              /session
            </span>
          </p>
        </div>

        {/* Stars & review count */}
        <div className="flex items-center gap-2">
          <RatingStars rating={artist.rating} showValue />
          <span className="text-muted-foreground text-xs">
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
              className="text-primary/70 bg-muted border-transparent"
              label={`+${artist.services.length - 3} more`}
            />
          )}
        </div>

        {/* CTA */}
        <Button
          className="mt-auto w-full"
          onClick={() => onPreview?.(artist)}
          size="sm"
          variant="outline"
        >
          View Profile
        </Button>
      </div>
    </motion.article>
  );
}
