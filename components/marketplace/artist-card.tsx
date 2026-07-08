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
      className="group flex flex-col overflow-hidden cursor-pointer rounded-3xl bg-white border border-beige-300/60 shadow-[0_8px_30px_rgb(84,40,67,0.06)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(84,40,67,0.12)] hover:-translate-y-1"
      variants={fadeUpVariants}
      onClick={() => onPreview?.(artist)}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden p-1.5 pb-0">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            alt={`${artist.name} – ${artist.services[0]}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={artist.coverImage}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-plum-950/60 via-plum-950/10 to-transparent" />

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
        <div className="absolute bottom-3 right-3 rounded-xl bg-white/90 px-3 py-1.5 backdrop-blur-md shadow-sm border border-white/20">
          <p className="text-sm font-bold text-plum-900">
            {rupeeFormatter.format(artist.startingPrice)}
            <span className="text-[10px] font-medium text-plum-600/80 uppercase tracking-wider ml-1">/ session</span>
          </p>
        </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5 pt-4">
        {/* Name & verified */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-plum-900 flex items-center gap-1.5 text-lg font-bold leading-snug truncate">
              {artist.name}
              {artist.isVerified && (
                <ShieldCheck
                  aria-label="Verified artist"
                  className="text-teal-500 size-4 shrink-0"
                />
              )}
            </h3>
            <p className="text-plum-700/70 mt-1 flex items-center gap-1 text-sm truncate font-medium">
              <MapPin className="size-3.5 shrink-0" />
              {artist.city}, {artist.state}
            </p>
          </div>
        </div>

        {/* Stars & review count */}
        <div className="flex items-center gap-2">
          <RatingStars rating={artist.rating} showValue />
          <span className="text-plum-700/60 text-xs font-medium">
            ({artist.reviewCount.toLocaleString("en-IN")} reviews)
          </span>
        </div>

        {/* Services chips — max 3 */}
        <div className="flex flex-wrap gap-2">
          {artist.services.slice(0, 3).map((s) => (
            <ServiceChip key={s} label={s} className="bg-beige-100 text-plum-800 border-none rounded-lg text-xs px-2.5 py-1 font-medium" />
          ))}
          {artist.services.length > 3 && (
            <ServiceChip
              className="text-plum-700/70 bg-transparent border border-beige-300 rounded-lg text-xs px-2.5 py-1 font-medium"
              label={`+${artist.services.length - 3} more`}
            />
          )}
        </div>

        {/* CTA */}
        <Button
          className="mt-auto w-full rounded-xl bg-plum-50 text-plum-900 hover:bg-plum-900 hover:text-white transition-colors border-none font-semibold shadow-none"
          onClick={(e) => {
            e.stopPropagation();
            onPreview?.(artist);
          }}
          size="md"
          variant="outline"
        >
          View Profile
        </Button>
      </div>
    </motion.article>
  );
}
