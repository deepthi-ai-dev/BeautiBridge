import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  onReset?: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="bg-muted grid size-20 place-items-center rounded-full">
        <SearchX className="text-muted-foreground size-10" />
      </span>
      <h2 className="text-primary mt-6 text-xl font-semibold">
        No artists found
      </h2>
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
