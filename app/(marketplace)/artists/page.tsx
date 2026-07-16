import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MarketplaceListing } from "@/components/marketplace/marketplace-listing";

export const metadata: Metadata = {
  title: "Find Beauty Artists – BeautiBridge",
  description:
    "Browse 500+ verified freelance makeup artists, hair stylists, nail artists, and beauty professionals near you. Filter by category, city, rating, and price.",
};

export default async function ArtistsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Hero banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-beige-100 to-salmon-300/20 border-b border-border py-16 md:py-24">
          {/* Decorative blur blobs */}
          <div className="absolute top-0 left-1/4 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-salmon-300/20 blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-gold-400/10 blur-[80px]" />
          
          <div className="page-container relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-salmon-500 text-xs font-bold tracking-[0.42em] uppercase">
              Marketplace
            </p>
            <h1 className="text-plum-900 mt-4 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
              Find Your Perfect <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-salmon-500 to-accent bg-clip-text text-transparent">Beauty Artist</span>
            </h1>
            <p className="text-plum-700/80 mt-6 max-w-xl text-lg leading-relaxed">
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

