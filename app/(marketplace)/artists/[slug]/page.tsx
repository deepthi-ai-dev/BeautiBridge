import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  ShieldCheck,
  Clock,
  Languages,
  ArrowLeft,
  Star,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/marketplace/rating-stars";
import { ServiceChip } from "@/components/marketplace/service-chip";
import { rupeeFormatter } from "@/lib/formatters";
import { getArtistBySlug } from "@/features/artists/queries";
import { MOCK_ARTISTS } from "@/features/artists/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return MOCK_ARTISTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return { title: "Artist not found – BeautiBridge" };
  return {
    title: `${artist.name} – ${artist.services[0]} | BeautiBridge`,
    description: artist.bio,
  };
}

const badgeVariant = {
  "Top Rated": "gold",
  "Rising Star": "teal",
  "Highly Booked": "salmon",
} as const;

export default async function ArtistProfilePage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) notFound();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pb-20">
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

        <div className="page-container mt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
            {/* Left: main content */}
            <div className="min-w-0 space-y-8">
              {/* Cover image */}
              <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl">
                <Image
                  alt={`${artist.name} portfolio cover`}
                  className="h-full w-full object-cover"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  src={artist.coverImage}
                />
                <div className="from-plum-950/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                {artist.badge && (
                  <Badge
                    className="absolute top-4 left-4 text-sm"
                    variant={badgeVariant[artist.badge] ?? "salmon"}
                  >
                    {artist.badge}
                  </Badge>
                )}
              </div>

              {/* Bio */}
              <div>
                <h2 className="text-primary text-xl font-semibold">About</h2>
                <p className="text-muted-foreground mt-3 text-base leading-7">
                  {artist.bio}
                </p>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-primary text-xl font-semibold">
                  Services Offered
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {artist.services.map((s) => (
                    <ServiceChip
                      className="border-border/60 bg-card px-4 py-1.5 text-sm"
                      key={s}
                      label={s}
                    />
                  ))}
                </div>
              </div>

              {/* Portfolio */}
              {artist.portfolio.length > 0 && (
                <div>
                  <h2 className="text-primary text-xl font-semibold">
                    Portfolio
                  </h2>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {artist.portfolio.map((img, idx) => (
                      <div
                        className="relative aspect-square overflow-hidden rounded-xl"
                        key={idx}
                      >
                        <Image
                          alt={`Portfolio ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          fill
                          sizes="(max-width: 640px) 50vw, 200px"
                          src={img}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sticky booking card */}
            <aside className="space-y-0">
              <div className="premium-card sticky top-24 p-6">
                {/* Name + location */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h1 className="text-primary flex items-center gap-1.5 text-2xl font-semibold">
                      {artist.name}
                      {artist.isVerified && (
                        <ShieldCheck
                          aria-label="Verified artist"
                          className="text-teal-400 size-5 shrink-0"
                        />
                      )}
                    </h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                      <MapPin className="size-3.5 shrink-0" />
                      {artist.city}, {artist.state}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="mt-4 flex items-center gap-2">
                  <RatingStars rating={artist.rating} showValue />
                  <span className="text-muted-foreground text-sm">
                    ({artist.reviewCount.toLocaleString("en-IN")} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="bg-muted mt-5 rounded-xl p-4 text-center">
                  <p className="text-muted-foreground text-xs">Starting from</p>
                  <p className="text-primary mt-1 text-3xl font-bold">
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
                    <p className="text-primary mt-1 text-sm font-semibold">
                      {artist.languages.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={[
                      "size-2 rounded-full",
                      artist.availability === "available"
                        ? "bg-emerald-400"
                        : artist.availability === "busy"
                          ? "bg-amber-400"
                          : "bg-rose-400",
                    ].join(" ")}
                  />
                  <span className="text-muted-foreground text-sm capitalize">
                    {artist.availability === "available"
                      ? "Available for bookings"
                      : artist.availability === "busy"
                        ? "Busy – limited slots"
                        : "Currently unavailable"}
                  </span>
                </div>

                {/* Booking CTA – disabled (Phase not yet built) */}
                <Button
                  className="mt-5 w-full"
                  disabled
                  size="lg"
                  variant="primary"
                >
                  <Star className="size-4" />
                  Book Session (Coming Soon)
                </Button>
                <p className="text-muted-foreground mt-2 text-center text-xs">
                  Booking & payments coming in a future phase.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
