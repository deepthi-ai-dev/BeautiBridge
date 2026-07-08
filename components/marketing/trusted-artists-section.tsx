import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { queryArtists } from "@/features/artists/queries";
import type { Artist } from "@/features/artists/types";
import { rupeeFormatter } from "@/lib/formatters";

const badgeVariant = {
  "Top Rated": "gold",
  "Rising Star": "teal",
  "Highly Booked": "salmon",
} as const;

export function TrustedArtistsSection() {
  const { artists } = queryArtists({
    query: "",
    category: "all",
    city: "",
    sortBy: "rating",
    page: 1,
  });
  const featured = artists.slice(0, 6);

  return (
    <section className="section-y bg-beige-200">
      <div className="page-container">
        <FadeUp className="text-center mb-14">
          <p className="section-label">Our artists</p>
          <h2 className="text-primary mt-4 text-4xl font-semibold tracking-tight">
            Meet trusted local experts
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Every BeautiBridge artist is individually verified for portfolio
            quality, professional experience, and client ratings.
          </p>
        </FadeUp>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((artist: Artist) => (
            <FadeUp key={artist.id}>
              <Link
                href={`/artists/${artist.slug}`}
                className="group block"
              >
                <div className="premium-card overflow-hidden">
                  {/* Cover image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={artist.coverImage}
                    />
                    <div className="card-image-overlay absolute inset-0" />
                    {artist.badge && (
                      <Badge
                        className="absolute top-3 left-3"
                        variant={
                          badgeVariant[
                            artist.badge as keyof typeof badgeVariant
                          ] ?? "salmon"
                        }
                      >
                        {artist.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-foreground truncate flex items-center gap-1.5 text-sm">
                          {artist.name}
                          {artist.isVerified && (
                            <ShieldCheck className="text-teal-400 size-3.5 shrink-0" />
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                          {artist.category} · {artist.city}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-gold-400">
                          ★ {artist.rating}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {artist.reviewCount.toLocaleString("en-IN")} reviews
                        </p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-primary mt-3">
                      From {rupeeFormatter.format(artist.startingPrice)}
                    </p>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </StaggerContainer>

        <FadeUp className="mt-12 text-center">
          <Link href="/artists">
            <Button variant="outline" className="rounded-full px-8 gap-2">
              View all artists <ArrowRight className="size-4" />
            </Button>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
