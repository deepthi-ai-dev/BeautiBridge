import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeUp } from "@/lib/motion";

const reviews = [
  {
    city: "Visakhapatnam",
    name: "Lakshmi P.",
    text: "I found a bridal artist just 10 minutes away, saw her real work, and booked in under five minutes. My wedding look was everything I dreamed of.",
    rating: 5,
    service: "Bridal Makeup",
  },
  {
    city: "Coimbatore",
    name: "Fatima S.",
    text: "The AI assistant understood exactly what I wanted for my sister's engagement. Transparent pricing, no stress. This is how beauty booking should feel.",
    rating: 5,
    service: "Engagement Styling",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="section-y bg-beige-200">
      <div className="page-container">
        {/* Section header */}
        <FadeUp className="mb-14 text-center">
          <p className="section-label">Trusted by thousands</p>
          <h2 className="text-primary mt-4 text-4xl font-semibold tracking-tight">
            Real stories from real customers
          </h2>
        </FadeUp>

        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_0.9fr_0.9fr]">
          <FadeUp>
            <Image
              alt="Bridal makeup portfolio"
              className="shadow-card aspect-[3/4] w-full rounded-[1.75rem] object-cover"
              height={980}
              src="/images/marketing/bridal-look.svg"
              width={760}
            />
          </FadeUp>

          <div className="grid gap-6">
            {reviews.map((review) => (
              <FadeUp key={review.name}>
                <div className="rounded-[1.75rem] bg-card border border-border/60 shadow-soft p-6 hover:shadow-card transition-shadow duration-300">
                  {/* Quote icon */}
                  <Quote className="text-primary/20 size-7 mb-3" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star
                        className="size-4 fill-gold-400 text-gold-400"
                        key={index}
                      />
                    ))}
                  </div>

                  <p className="text-foreground/85 leading-7 text-sm">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                        {review.name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-foreground text-sm font-semibold">{review.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {review.service} · {review.city}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <Image
              alt="Elegant hairstyling portfolio"
              className="shadow-card aspect-[3/4] w-full rounded-[1.75rem] object-cover"
              height={980}
              src="/images/marketing/hair-style.svg"
              width={760}
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
