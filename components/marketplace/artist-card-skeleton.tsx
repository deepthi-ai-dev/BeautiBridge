import { Skeleton } from "@/components/ui/skeleton";

export function ArtistCardSkeleton() {
  return (
    <div className="premium-card overflow-hidden animate-pulse">
      {/* Cover image skeleton */}
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      {/* Body */}
      <div className="flex flex-col gap-3 p-4">
        {/* Name row */}
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-3/5 rounded" />
          <Skeleton className="h-3 w-2/5 rounded" />
        </div>
        {/* Rating */}
        <Skeleton className="h-3.5 w-28 rounded" />
        {/* Chips */}
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        {/* Button */}
        <Skeleton className="mt-1 h-9 w-full rounded-full" />
      </div>
    </div>
  );
}

export function ArtistGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ArtistCardSkeleton key={i} />
      ))}
    </div>
  );
}
