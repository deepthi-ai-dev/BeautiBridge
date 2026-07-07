"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { AvatarInitials, StarRating } from "@/components/dashboard/ui-helpers";
import { MOCK_ARTIST_REVIEWS, type MockArtistReview } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function ReviewsPanel() {
  const [reviews] = useState<MockArtistReview[]>(MOCK_ARTIST_REVIEWS);

  const averageRating = 4.9;
  const ratingDistribution = [
    { count: 148, stars: 5 },
    { count: 28, stars: 4 },
    { count: 4, stars: 3 },
    { count: 0, stars: 2 },
    { count: 0, stars: 1 },
  ];
  const totalRatingsCount = ratingDistribution.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <StaggerContainer className="space-y-6">
      <div className="border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground">Client Reviews</h2>
        <p className="text-xs text-muted-foreground mt-1">Feedback and ratings from your completed appointments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Rating Summary Card */}
        <FadeUp className="premium-card p-5 space-y-4">
          <h3 className="font-semibold text-foreground text-sm border-b border-border pb-2">
            Reviews Summary
          </h3>
          <div className="flex flex-col items-center justify-center text-center py-2 space-y-1">
            <span className="text-4xl font-extrabold text-foreground">{averageRating}</span>
            <StarRating rating={averageRating} />
            <span className="text-[10px] text-muted-foreground mt-1">
              Based on {totalRatingsCount} verified bookings
            </span>
          </div>

          {/* Rating Bars */}
          <div className="space-y-2 text-xs">
            {ratingDistribution.map((dist) => {
              const pct = totalRatingsCount > 0 ? (dist.count / totalRatingsCount) * 100 : 0;
              return (
                <div key={dist.stars} className="flex items-center gap-2">
                  <span className="w-3 text-muted-foreground font-semibold">{dist.stars}</span>
                  <Star className="size-3.5 fill-gold-400 text-gold-400 shrink-0" />
                  <div className="flex-1 h-2 rounded bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-muted-foreground">{dist.count}</span>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Detailed Reviews List */}
        <div className="md:col-span-2 space-y-3">
          {reviews.map((item, i) => (
            <FadeUp
              key={item.id}
              className="premium-card p-4 space-y-3"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <AvatarInitials initials={item.customerInitials} />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.customerName}</h4>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <StarRating rating={item.rating} />
                  <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary mt-1">
                    {item.service}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pl-1 flex gap-2">
                <MessageSquare className="size-4 text-primary shrink-0 opacity-40 mt-0.5" />
                <span className="italic">&ldquo;{item.review}&rdquo;</span>
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </StaggerContainer>
  );
}
