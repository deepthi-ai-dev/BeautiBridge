import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  onReset?: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-6">
        <span className="flex size-20 items-center justify-center rounded-2xl bg-muted shadow-sm">
          <SearchX className="text-muted-foreground size-9" />
        </span>
        <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-background text-base shadow-sm">
          🔍
        </span>
      </div>
      <h2 className="text-primary text-xl font-semibold">No artists found</h2>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-6">
        We couldn&apos;t find any artists matching your filters. Try adjusting
        your search or clearing some filters.
      </p>
      {onReset && (
        <Button className="mt-6" onClick={onReset} variant="primary">
          Clear all filters
        </Button>
      )}
    </div>
  );
}
