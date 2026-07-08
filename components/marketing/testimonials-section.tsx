"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeUp } from "@/lib/motion";

const reviews = [
  {
    city: "Visakhapatnam",
    name: "Lakshmi P.",
    text: "I found a bridal artist just 10 minutes away, saw her real work, and booked in under five minutes. My wedding look was everything I dreamed of.",
    rating: 5,
    service: "Bridal Makeup",
    initials: "LP",
    accent: "from-salmon-300/40 to-primary/25",
  },
  {
    city: "Coimbatore",
    name: "Fatima S.",
    text: "The AI assistant understood exactly what I wanted for my sister's engagement. Transparent pricing, no stress. This is how beauty booking should feel.",
    rating: 5,
    service: "Engagement Styling",
    initials: "FS",
    accent: "from-gold-400/35 to-teal-400/20",
  },
  {
    city: "Jaipur",
    name: "Meera K.",
    text: "Verified portfolios gave me total confidence. I compared three artists, picked the best fit, and had my appointment confirmed the same evening.",
    rating: 5,
    service: "Party Makeup",
    initials: "MK",
    accent: "from-teal-400/30 to-secondary/25",
  },
] as const;

const ROTATE_MS = 5500;

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const review = reviews[active];

  return (
    <section className="section-y light-section bg-beige-100 section-glow relative overflow-hidden">
      <div className="page-container">
        <FadeUp className="mb-12 text-center">
          <p className="section-label">Trusted by thousands</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            Real stories from{" "}
            <span className="bg-[linear-gradient(135deg,var(--primary),var(--salmon-400))] bg-clip-text text-transparent">
              real customers
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/65">
            Verified reviews from women who booked through BeautiBridge.
          </p>
        </FadeUp>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr_0.85fr]">
          <FadeUp className="hidden lg:block">
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-premium">
              <Image
                alt="Bridal makeup portfolio"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                height={980}
                src="/images/marketing/bridal-look.svg"
                width={760}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/40 to-transparent" />
            </div>
          </FadeUp>

          <div className="relative min-h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-7 shadow-[0_20px_60px_rgba(53,27,49,0.13)] sm:p-8"
                exit={{ opacity: 0, y: -12 }}
                initial={{ opacity: 0, y: 16 }}
                key={review.name}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br ${review.accent} blur-3xl opacity-60`}
                />

                <Quote className="mb-4 size-8 text-secondary/30" />

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star
                        className="size-4 fill-gold-400 text-gold-400"
                        key={index}
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-400/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-500">
                    <BadgeCheck className="size-3" />
                    Verified booking
                  </span>
                </div>

                <p className="mt-5 text-lg font-medium leading-8 text-foreground">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-border/50 pt-6">
                  <Avatar className="size-12 ring-2 ring-secondary/30">
                    <AvatarFallback className="bg-gradient-to-br from-secondary/20 to-salmon-400/15 text-sm font-bold text-primary">
                      {review.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground">{review.name}</p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {review.service} · {review.city}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-2">
              {reviews.map((item, index) => (
                <button
                  aria-label={`Show review from ${item.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === active
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-secondary/60"
                  }`}
                  key={item.name}
                  onClick={() => setActive(index)}
                  type="button"
                />
              ))}
            </div>
          </div>

          <FadeUp className="hidden lg:block">
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-premium">
              <Image
                alt="Elegant hairstyling portfolio"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                height={980}
                src="/images/marketing/hair-style.svg"
                width={760}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/40 to-transparent" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
