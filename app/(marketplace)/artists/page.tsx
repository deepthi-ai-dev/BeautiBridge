import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MarketplaceListing } from "@/components/marketplace/marketplace-listing";

export const metadata: Metadata = {
  title: "Find Beauty Artists – BeautiBridge",
  description:
    "Browse 500+ verified freelance makeup artists, hair stylists, nail artists, and beauty professionals near you. Filter by category, city, rating, and price.",
};

export default function ArtistsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Hero banner */}
        <div className="warm-surface border-b border-border py-12">
          <div className="page-container">
            <p className="text-secondary text-xs font-semibold tracking-[0.42em] uppercase">
              Marketplace
            </p>
            <h1 className="text-primary mt-3 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Find Your Perfect Beauty Artist
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7">
              Browse {500}+ verified freelance makeup artists, hairstylists,
              nail artists, and skincare specialists in your city.
            </p>
          </div>
        </div>

        {/* Listing */}
        <div className="page-container py-8">
          <MarketplaceListing />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
