import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Heart, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { queryRealArtists } from "@/features/artists/real-queries";
import type { Artist } from "@/features/artists/types";
import { rupeeFormatter } from "@/lib/formatters";

const badgeVariant = {
  "Top Rated": "gold",
  "Rising Star": "teal",
  "Highly Booked": "salmon",
} as const;

export async function TrustedArtistsSection() {
  const { artists } = await queryRealArtists({
    query: "",
    category: "all",
    city: "",
    sortBy: "rating",
    page: 1,
  });
  const featured = artists.slice(0, 6);

  return (
    <section className="section-y plum-panel relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 size-80 rounded-full bg-salmon-400/10 blur-[120px]"
      />

      <div className="page-container relative">
        <FadeUp className="mb-12 text-center">
          <p className="text-accent text-xs font-semibold tracking-[0.42em] uppercase">
            Our artists
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-[2.75rem]">
            Meet trusted local experts
          </h2>
          <p className="text-beige-100/75 mx-auto mt-4 max-w-xl text-base leading-relaxed">
            Every BeautiBridge artist is individually verified for portfolio
            quality, professional experience, and client ratings.
          </p>
        </FadeUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((artist: Artist) => (
            <FadeUp key={artist.id}>
              <Link href={`/artists/${artist.slug}`} className="group block">
                <article className="artist-showcase-card">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={artist.coverImage}
                    />
                    <div className="card-image-overlay absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                    <span
                      aria-hidden
                      className="absolute top-3 right-3 grid size-9 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white"
                    >
                      <Heart className="size-4 transition-transform duration-300 group-hover:scale-125 group-hover:fill-current" />
                    </span>

                    {artist.badge && (
                      <Badge
                        className="absolute top-3 left-3"
                        variant={
                          badgeVariant[artist.badge as keyof typeof badgeVariant] ?? "salmon"
                        }
                      >
                        {artist.badge}
                      </Badge>
                    )}

                    <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-primary shadow-premium backdrop-blur-sm">
                        <CalendarCheck className="size-3.5" />
                        Book Now
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 truncate text-base font-bold text-foreground">
                          {artist.name}
                          {artist.isVerified && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-teal-400/15 px-1.5 py-0.5 text-[10px] font-bold text-teal-400">
                              <ShieldCheck className="size-3" />
                              Verified
                            </span>
                          )}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs capitalize">
                          {artist.category} · {artist.city}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-gold-400">★ {artist.rating}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {artist.reviewCount.toLocaleString("en-IN")} reviews
                        </p>
                      </div>
                    </div>
                    <p className="text-primary mt-3 text-sm font-semibold">
                      From {rupeeFormatter.format(artist.startingPrice)}
                    </p>
                  </div>
                </article>
              </Link>
            </FadeUp>
          ))}
        </StaggerContainer>

        <FadeUp className="mt-12 text-center">
          <Link href="/artists">
            <Button
              className="btn-glow rounded-full border-white/20 bg-white/10 px-8 text-beige-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/18 hover:shadow-premium"
              variant="outline"
            >
              View all artists <ArrowRight className="size-4" />
            </Button>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
