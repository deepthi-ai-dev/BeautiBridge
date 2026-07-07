import { SiteHeader } from "@/components/layout/site-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistProfileLoading() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pb-20">
        <div className="border-border border-b py-4">
          <div className="page-container">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="page-container mt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-8">
              <Skeleton className="aspect-[16/7] w-full rounded-2xl" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-40" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton className="h-8 w-28 rounded-full" key={i} />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
