import { SiteHeader } from "@/components/layout/site-header";
import { ArtistGridSkeleton } from "@/components/marketplace/artist-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistsLoading() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Hero banner skeleton */}
        <div className="warm-surface border-b border-border py-12">
          <div className="page-container space-y-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-96 max-w-full" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>

        {/* Filters skeleton */}
        <div className="page-container py-8">
          <div className="space-y-4">
            <Skeleton className="h-11 w-full rounded-full" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton className="h-8 w-20 rounded-full" key={i} />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <ArtistGridSkeleton count={12} />
          </div>
        </div>
      </main>
    </>
  );
}
