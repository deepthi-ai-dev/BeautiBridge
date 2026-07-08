"use client";

import {
  CalendarCheck,
  MapPin,
  Search,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";
import { FadeUp, StaggerContainer } from "@/lib/motion";

const benefits = [
  {
    description:
      "Location-aware discovery surfaces talented, best-reviewed artists near you.",
    icon: MapPin,
    title: "Discover artists right around the corner",
    span: "md:col-span-2 md:row-span-2",
    preview: (
      <div className="mt-6 grid gap-2">
        {["Ananya R.", "Priya M.", "Saanvi K."].map((name, i) => (
          <div
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/6 px-3 py-2.5"
            key={name}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-secondary/30 text-[10px] font-bold text-white">
                {name.slice(0, 1)}
              </span>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-beige-100/60 text-[10px]">0.{i + 3} km away</p>
              </div>
            </div>
            <span className="text-gold-400 text-xs font-bold">★ 4.{9 - i}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    description:
      "Just tell it what you want in plain words — it finds the right artist, style, and budget.",
    icon: Sparkles,
    title: "AI chat assistant",
    span: "md:col-span-1",
    preview: (
      <div className="mt-5 space-y-2">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-white/12 px-3 py-2 text-[11px] leading-5">
          Party makeup under ₹2500 this Saturday
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-beige-100/70">
          <span className="hero-dot" />
          <span className="hero-dot" />
          <span className="hero-dot" />
          Matching artists...
        </div>
      </div>
    ),
  },
  {
    description:
      "Verified reviews and genuine work galleries so you always know what you're booking.",
    icon: Star,
    title: "Ratings & real portfolios",
    span: "md:col-span-1",
    preview: (
      <div className="mt-5 grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((n) => (
          <div
            className="aspect-square rounded-lg bg-gradient-to-br from-salmon-300/40 to-primary/30"
            key={n}
          />
        ))}
      </div>
    ),
  },
  {
    description:
      "See clear upfront prices and confirm your at-home appointment in just a few taps.",
    icon: CalendarCheck,
    title: "Transparent pricing & effortless booking",
    span: "md:col-span-2",
    preview: (
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="rounded-xl border border-white/10 bg-white/6 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-beige-100/60">From</p>
          <p className="text-accent text-lg font-bold">₹2,450</p>
        </div>
        <div className="rounded-xl border border-teal-400/20 bg-teal-400/10 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-beige-100/60">Next slot</p>
          <p className="text-sm font-semibold">Tomorrow · 10 AM</p>
        </div>
        <div className="rounded-full bg-secondary/80 px-4 py-2 text-xs font-semibold">
          Book in 3 taps
        </div>
      </div>
    ),
  },
] as const;

export function CustomerBenefits() {
  return (
    <section className="section-y plum-panel relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-20 size-64 rounded-full bg-salmon-400/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 size-72 rounded-full bg-gold-400/8 blur-[110px]"
      />

      <div className="page-container relative">
        <FadeUp className="max-w-2xl">
          <p className="text-accent text-xs font-semibold tracking-[0.42em] uppercase">
            For customers
          </p>
          <h2 className="mt-5 text-4xl font-semibold text-balance sm:text-[2.75rem]">
            Everything you need to look and feel your best.
          </h2>
          <p className="text-beige-100/75 mt-4 max-w-xl text-base leading-7">
            A premium discovery experience built around how women actually book beauty today.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-4">
          {benefits.map((benefit) => (
            <FadeUp className={benefit.span} key={benefit.title}>
              <div className="bento-card marketing-shimmer group h-full p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-secondary/90 to-salmon-500 shadow-[0_12px_28px_rgba(230,151,145,0.35)] transition-transform duration-300 group-hover:scale-105">
                    <benefit.icon className="size-5 text-white" />
                  </span>
                  {benefit.icon === Sparkles && (
                    <WandSparkles className="text-accent/40 float-soft size-5" />
                  )}
                  {benefit.icon === MapPin && (
                    <Search className="text-accent/30 size-5" />
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold sm:text-xl">{benefit.title}</h3>
                <p className="text-beige-100/75 mt-2 text-sm leading-6">
                  {benefit.description}
                </p>
                {benefit.preview}
              </div>
            </FadeUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
