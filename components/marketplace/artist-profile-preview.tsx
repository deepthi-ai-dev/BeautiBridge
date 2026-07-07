"use client";

import Image from "next/image";
import Link from "next/link";
import { X, MapPin, ShieldCheck, Clock, Languages, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/marketplace/rating-stars";
import { ServiceChip } from "@/components/marketplace/service-chip";
import { rupeeFormatter } from "@/lib/formatters";
import type { Artist } from "@/features/artists/types";

type ArtistProfilePreviewProps = {
  artist: Artist | null;
  onClose: () => void;
};

const badgeVariant = {
  "Top Rated": "gold",
  "Rising Star": "teal",
  "Highly Booked": "salmon",
} as const;

export function ArtistProfilePreview({
  artist,
  onClose,
}: ArtistProfilePreviewProps) {
  return (
    <AnimatePresence>
      {artist && (
        <>
          {/* Backdrop */}
          <motion.div
            animate={{ opacity: 1 }}
            aria-hidden
            className="bg-plum-950/50 fixed inset-0 z-50 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Panel */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            aria-label={`${artist.name} profile preview`}
            className="border-border bg-card shadow-premium fixed inset-x-4 bottom-0 z-50 flex max-h-[90dvh] flex-col overflow-hidden rounded-t-2xl border sm:inset-x-auto sm:top-1/2 sm:right-6 sm:bottom-auto sm:w-96 sm:-translate-y-1/2 sm:rounded-2xl md:right-8"
            exit={{ opacity: 0, y: 24 }}
            initial={{ opacity: 0, y: 24 }}
            role="dialog"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              aria-label="Close profile preview"
              className="text-muted-foreground hover:text-foreground hover:bg-muted absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full transition-colors"
              onClick={onClose}
              type="button"
            >
              <X className="size-4" />
            </button>

            {/* Cover image */}
            <div className="relative aspect-video w-full shrink-0">
              <Image
                alt={`${artist.name} portfolio`}
                className="h-full w-full object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 384px"
                src={artist.coverImage}
              />
              <div className="from-plum-950/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              {artist.badge && (
                <Badge
                  className="absolute top-3 left-3"
                  variant={badgeVariant[artist.badge] ?? "salmon"}
                >
                  {artist.badge}
                </Badge>
              )}
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto overscroll-contain">
              <div className="p-5 pb-safe space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-primary flex items-center gap-1.5 text-lg font-semibold">
                      {artist.name}
                      {artist.isVerified && (
                        <ShieldCheck
                          aria-label="Verified"
                          className="text-teal-400 size-4 shrink-0"
                        />
                      )}
                    </h2>
                    <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-sm">
                      <MapPin className="size-3.5 shrink-0" />
                      {artist.city}, {artist.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-semibold">
                      {rupeeFormatter.format(artist.startingPrice)}
                    </p>
                    <p className="text-muted-foreground text-xs">starting</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <RatingStars rating={artist.rating} showValue />
                  <span className="text-muted-foreground text-xs">
                    {artist.reviewCount.toLocaleString("en-IN")} reviews
                  </span>
                  <Star className="fill-accent text-accent ml-auto size-4 shrink-0" />
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-sm leading-6">
                  {artist.bio}
                </p>

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted rounded-xl p-3">
                    <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Clock className="size-3.5" />
                      Experience
                    </p>
                    <p className="text-primary mt-1 font-semibold">
                      {artist.yearsExperience} yrs
                    </p>
                  </div>
                  <div className="bg-muted rounded-xl p-3">
                    <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Languages className="size-3.5" />
                      Languages
                    </p>
                    <p className="text-primary mt-1 truncate font-semibold text-sm">
                      {artist.languages.slice(0, 2).join(", ")}
                      {artist.languages.length > 2 &&
                        ` +${artist.languages.length - 2}`}
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-widest">
                    Services
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {artist.services.map((s) => (
                      <ServiceChip key={s} label={s} />
                    ))}
                  </div>
                </div>

                {/* Portfolio strip */}
                {artist.portfolio.length > 1 && (
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-widest">
                      Portfolio
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {artist.portfolio.slice(0, 3).map((img, idx) => (
                        <div
                          className="relative aspect-square overflow-hidden rounded-lg"
                          key={idx}
                        >
                          <Image
                            alt={`Portfolio item ${idx + 1}`}
                            className="h-full w-full object-cover"
                            fill
                            sizes="120px"
                            src={img}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Link href={`/artists/${artist.slug}`}>
                    <Button className="w-full" size="sm" variant="outline">
                      Full Profile
                    </Button>
                  </Link>
                  <Link href={`/artists/${artist.slug}/book`}>
                    <Button className="w-full" size="sm" variant="primary">
                      Book Session
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
