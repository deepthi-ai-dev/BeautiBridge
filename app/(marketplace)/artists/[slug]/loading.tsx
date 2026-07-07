import { SiteHeader } from "@/components/layout/site-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistProfileLoading() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pb-24">
        {/* Hero cover skeleton */}
        <Skeleton className="aspect-[21/8] w-full rounded-none sm:aspect-[21/7]" />

        {/* Identity strip */}
        <div className="border-border border-b py-8">
          <div className="page-container">
            <div className="flex items-end gap-5">
              <Skeleton className="size-20 shrink-0 rounded-2xl sm:size-24" />
              <div className="space-y-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton className="h-9 w-36 rounded-full" key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="page-container mt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-12">
              {/* About */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              {/* Portfolio */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-28" />
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton className="aspect-square rounded-xl" key={i} />
                  ))}
                </div>
              </div>
              {/* Services */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-44" />
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton className="h-40 w-full rounded-2xl" key={i} />
                ))}
              </div>
              {/* Reviews */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-24 w-full rounded-2xl" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton className="h-36 w-full rounded-2xl" key={i} />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-[34rem] w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
