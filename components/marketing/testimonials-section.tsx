import Image from "next/image";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/lib/motion";

const reviews = [
  {
    city: "Visakhapatnam",
    name: "Lakshmi P.",
    text: "I found a bridal artist just 10 minutes away, saw her real work, and booked in under five minutes. My wedding look was everything I dreamed of.",
  },
  {
    city: "Coimbatore",
    name: "Fatima S.",
    text: "The AI assistant understood exactly what I wanted for my sister's engagement. Transparent pricing, no stress. This is how beauty booking should feel.",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="section-y bg-beige-200">
      <div className="page-container grid items-center gap-8 lg:grid-cols-[0.9fr_0.9fr_0.9fr]">
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
              <Card className="shadow-soft rounded-[1.75rem] p-6">
                <div className="text-accent flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star className="size-4 fill-current" key={index} />
                  ))}
                </div>
                <p className="text-primary mt-5 leading-7">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{review.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-primary font-semibold">{review.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {review.city}
                    </p>
                  </div>
                </div>
              </Card>
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
    </section>
  );
}
