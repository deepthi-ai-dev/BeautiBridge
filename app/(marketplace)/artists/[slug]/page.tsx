import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ServiceChip } from "@/components/marketplace/service-chip";
import { ProfileHero, CertificationRow } from "@/components/artist-profile/profile-hero";
import { PortfolioGallery } from "@/components/artist-profile/portfolio-gallery";
import { ServiceMenu } from "@/components/artist-profile/service-menu";
import { ReviewList } from "@/components/artist-profile/review-list";
import { AvailabilityCalendar } from "@/components/artist-profile/availability-calendar";
import { BookingPanel } from "@/components/artist-profile/booking-panel";
import { getRealArtistBySlug } from "@/features/artists/real-queries";
import { getProfileBySlug } from "@/features/artists/profile-mock-data";
import { db } from "@/server/db";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getRealArtistBySlug(slug);
  if (!artist) return { title: "Artist not found – BeautiBridge" };
  return {
    title: `${artist.name} – ${artist.services[0]} | BeautiBridge`,
    description: artist.bio,
    openGraph: {
      title: `${artist.name} – ${artist.services[0]} | BeautiBridge`,
      description: artist.bio,
      images: [artist.coverImage],
    },
  };
}

/** Thin divider with a heading */
function SectionHeader({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <h2 className="text-primary mb-5 flex items-center gap-3 text-xl font-bold">
      {children}
      <span className="bg-border h-px flex-1" />
    </h2>
  );
}

export default async function ArtistProfilePage({ params }: Props) {
  const { slug } = await params;
  const artist = await getRealArtistBySlug(slug);
  if (!artist) notFound();

  const mockProfile = getProfileBySlug(slug);

  // Fetch real data
  const dbServices = await db.servicePackage.findMany({
    where: { artistId: artist.id },
  });
  
  const dbReviews = await db.review.findMany({
    where: { artistId: artist.id },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  // Transform to match UI types
  const servicePackages = dbServices.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    description: pkg.description || "",
    duration: pkg.duration,
    price: pkg.price,
    isPopular: pkg.isPopular,
    includes: pkg.includes ? pkg.includes.split(",") : [],
  }));

  const reviews = dbReviews.map(r => ({
    id: r.id,
    author: {
      name: r.author.name || "Anonymous",
      avatar: r.author.image || "/images/marketing/hero-makeup.svg",
      location: r.author.city || "Unknown",
    },
    rating: r.rating,
    date: r.createdAt.toISOString(),
    service: r.service || "General",
    body: r.body,
    helpful: r.helpful,
  }));
  
  const profile = {
    ...mockProfile,
    servicePackages: servicePackages.length > 0 ? servicePackages : mockProfile.servicePackages,
    reviews: reviews.length > 0 ? reviews : mockProfile.reviews,
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pb-24">
        {/* ── Hero (cover + identity strip) ── */}
        <ProfileHero artist={artist} highlights={profile.highlights} />

        {/* ── Page body ── */}
        <div className="page-container mt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
            {/* ════ LEFT column ════ */}
            <div className="min-w-0 space-y-12">
              {/* About */}
              <section aria-label="About">
                <SectionHeader>About</SectionHeader>
                <p className="text-muted-foreground text-base leading-8">
                  {artist.bio}
                </p>

                {/* Services */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {artist.services.map((s) => (
                    <ServiceChip
                      className="border-border/60 bg-card px-4 py-1.5 text-sm"
                      key={s}
                      label={s}
                    />
                  ))}
                </div>
              </section>

              {/* Certifications */}
              {profile.certifications.length > 0 && (
                <section aria-label="Certifications">
                  <SectionHeader>Certifications</SectionHeader>
                  <CertificationRow certifications={profile.certifications} />
                </section>
              )}

              {/* Portfolio Gallery */}
              {artist.portfolio.length > 0 && (
                <section aria-label="Portfolio">
                  <SectionHeader>Portfolio</SectionHeader>
                  <PortfolioGallery
                    artistName={artist.name}
                    images={artist.portfolio}
                  />
                </section>
              )}

              {/* Services & Pricing */}
              {profile.servicePackages.length > 0 && (
                <section aria-label="Services and pricing">
                  <SectionHeader>Services &amp; Pricing</SectionHeader>
                  <ServiceMenu packages={profile.servicePackages} artistSlug={artist.slug} />
                </section>
              )}

              {/* Availability Calendar */}
              <section aria-label="Availability">
                <SectionHeader>Weekly Availability</SectionHeader>
                <AvailabilityCalendar slots={profile.weeklyAvailability} />
              </section>

              {/* Reviews */}
              {profile.reviews.length > 0 && (
                <section aria-label="Reviews">
                  <SectionHeader>
                    Reviews
                    <span className="text-muted-foreground text-base font-normal">
                      ({artist.reviewCount.toLocaleString("en-IN")})
                    </span>
                  </SectionHeader>
                  <ReviewList
                    artistId={artist.id}
                    averageRating={artist.rating}
                    reviews={profile.reviews}
                    totalCount={artist.reviewCount}
                  />
                </section>
              )}
            </div>

            {/* ════ RIGHT column — sticky booking card ════ */}
            <BookingPanel artist={artist} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
