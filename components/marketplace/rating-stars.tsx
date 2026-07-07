import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  rating: number;
  max?: number;
  className?: string;
  showValue?: boolean;
};

export function RatingStars({
  rating,
  max = 5,
  className,
  showValue = false,
}: RatingStarsProps) {
  return (
    <span className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <span className="relative size-3.5 shrink-0" key={i}>
            <Star className="text-muted-foreground/35 size-3.5 fill-current" />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
              >
                <Star className="fill-accent text-accent size-3.5" />
              </span>
            )}
          </span>
        );
      })}
      {showValue && (
        <span className="text-foreground ml-0.5 text-xs font-semibold tabular-nums">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
