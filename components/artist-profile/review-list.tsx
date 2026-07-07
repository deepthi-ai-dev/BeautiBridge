import Image from "next/image";
import { Star, ThumbsUp } from "lucide-react";
import { RatingStars } from "@/components/marketplace/rating-stars";
import type { Review } from "@/features/artists/profile-types";

type ReviewListProps = {
  reviews: Review[];
  totalCount: number;
  averageRating: number;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function RatingBar({
  label,
  percent,
}: Readonly<{ label: string; percent: number }>) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="text-muted-foreground w-4 shrink-0 text-right">
        {label}
      </span>
      <Star className="fill-accent text-accent size-3 shrink-0" />
      <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
        <div
          className="bg-accent h-full rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-muted-foreground w-8 shrink-0">{percent}%</span>
    </div>
  );
}

export function ReviewList({
  reviews,
  totalCount,
  averageRating,
}: Readonly<ReviewListProps>) {
  return (
    <section aria-label="Reviews">
      {/* Summary header */}
      <div className="bg-muted mb-6 flex flex-col gap-6 rounded-2xl p-5 sm:flex-row sm:items-center sm:gap-10">
        {/* Big score */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <p className="text-primary text-5xl font-bold tabular-nums">
            {averageRating.toFixed(1)}
          </p>
          <RatingStars rating={averageRating} />
          <p className="text-muted-foreground mt-0.5 text-xs">
            {totalCount.toLocaleString("en-IN")} reviews
          </p>
        </div>

        {/* Bar chart */}
        <div className="flex flex-1 flex-col gap-2">
          <RatingBar label="5" percent={72} />
          <RatingBar label="4" percent={18} />
          <RatingBar label="3" percent={7} />
          <RatingBar label="2" percent={2} />
          <RatingBar label="1" percent={1} />
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-5">
        {reviews.map((review) => (
          <article
            className="premium-card p-5"
            key={review.id}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  alt={review.author.name}
                  className="h-full w-full object-cover"
                  fill
                  sizes="40px"
                  src={review.author.avatar}
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-primary text-sm font-semibold">
                      {review.author.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {review.author.location}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <RatingStars rating={review.rating} />
                    <p className="text-muted-foreground text-xs">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>

                {/* Service tag */}
                <span className="text-primary/70 bg-muted mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium">
                  {review.service}
                </span>

                {/* Body */}
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {review.body}
                </p>

                {/* Helpful */}
                <button
                  className="text-muted-foreground hover:text-primary mt-3 flex items-center gap-1.5 text-xs transition-colors"
                  type="button"
                >
                  <ThumbsUp className="size-3.5" />
                  {review.helpful} found this helpful
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
