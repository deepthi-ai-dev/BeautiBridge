import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Star,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/marketplace/rating-stars";
import { rupeeFormatter } from "@/lib/formatters";
import type { Artist } from "@/features/artists/types";

type ProfileHeroProps = {
  artist: Artist;
  highlights: string[];
};

const badgeVariant = {
  "Top Rated": "gold",
  "Rising Star": "teal",
  "Highly Booked": "salmon",
} as const;

const availabilityConfig = {
  available: { dot: "bg-emerald-400", label: "Available for bookings" },
  busy: { dot: "bg-amber-400", label: "Busy – limited slots" },
  unavailable: { dot: "bg-rose-400", label: "Currently unavailable" },
} as const;

export function ProfileHero({
  artist,
  highlights,
}: Readonly<ProfileHeroProps>) {
  const avail = availabilityConfig[artist.availability];

  return (
    <section aria-label="Artist hero">
      {/* Back breadcrumb */}
      <div className="border-border border-b py-4">
        <div className="page-container">
          <Link
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
            href="/artists"
          >
            <ArrowLeft className="size-4" />
            Back to artists
          </Link>
        </div>
      </div>

      {/* Cover image — full-bleed hero */}
      <div className="relative aspect-[21/8] w-full overflow-hidden sm:aspect-[21/7]">
        <Image
          alt={`${artist.name} portfolio cover`}
          className="h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src={artist.coverImage}
        />
        {/* Gradient overlay */}
        <div className="from-plum-950/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

        {/* Badge */}
        {artist.badge && (
          <Badge
            className="absolute top-5 left-5 text-sm shadow-lg"
            variant={badgeVariant[artist.badge] ?? "salmon"}
          >
            {artist.badge}
          </Badge>
        )}

        {/* Availability pill */}
        <div className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <span className={`size-2 rounded-full ${avail.dot}`} />
          {avail.label}
        </div>
      </div>

      {/* Profile identity strip */}
      <div className="warm-surface border-border border-b">
        <div className="page-container py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* Left: identity */}
            <div className="flex items-end gap-5">
              {/* Avatar */}
              <div className="border-card relative size-20 shrink-0 overflow-hidden rounded-2xl border-4 shadow-lg sm:size-24">
                <Image
                  alt={`${artist.name} avatar`}
                  className="h-full w-full object-cover"
                  fill
                  sizes="96px"
                  src={artist.avatar}
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-primary flex flex-wrap items-center gap-2 text-2xl font-bold sm:text-3xl">
                  {artist.name}
                  {artist.isVerified && (
                    <ShieldCheck
                      aria-label="Verified artist"
                      className="text-teal-400 size-6 shrink-0"
                    />
                  )}
                </h1>
                <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                  <MapPin className="size-3.5 shrink-0" />
                  {artist.city}, {artist.state}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <RatingStars rating={artist.rating} showValue />
                  <span className="text-muted-foreground text-sm">
                    ({artist.reviewCount.toLocaleString("en-IN")} reviews)
                  </span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="text-muted-foreground text-sm">
                    {artist.yearsExperience} yrs experience
                  </span>
                </div>
              </div>
            </div>

            {/* Right: price + instagram */}
            <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
              <div className="text-right">
                <p className="text-muted-foreground text-xs">Starting from</p>
                <p className="text-primary text-2xl font-bold sm:text-3xl">
                  {rupeeFormatter.format(artist.startingPrice)}
                </p>
                <p className="text-muted-foreground text-xs">per session</p>
              </div>
              {artist.languages && (
                <div className="flex flex-wrap gap-1">
                  {artist.languages.map((lang) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Highlights row */}
          {highlights.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {highlights.map((h) => (
                <div
                  className="bg-card border-border flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                  key={h}
                >
                  <Star className="text-accent size-3.5 shrink-0 fill-current" />
                  <span className="text-foreground/80">{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* Instagram handle */}
          {/* Note: instagramHandle passed via prop from page if available */}
        </div>
      </div>
    </section>
  );
}

export function ProfileInstagramBadge({
  handle,
}: Readonly<{ handle: string }>) {
  return (
    <a
      aria-label={`View ${handle} on Instagram`}
      className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
      href={`https://instagram.com/${handle}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ExternalLink className="size-4" />@{handle}
    </a>
  );
}

export function CertificationRow({
  certifications,
}: Readonly<{ certifications: string[] }>) {
  return (
    <div className="flex flex-wrap gap-2">
      {certifications.map((cert) => (
        <div
          className="bg-muted border-border flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
          key={cert}
        >
          <Award className="text-accent size-3.5 shrink-0" />
          <span className="text-foreground/80">{cert}</span>
        </div>
      ))}
    </div>
  );
}
