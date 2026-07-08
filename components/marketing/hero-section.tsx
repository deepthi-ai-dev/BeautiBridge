import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, HoverLift } from "@/lib/motion";

const stats = [
  { label: "Verified artists", value: "500+" },
  { label: "Cities served", value: "50+" },
  { label: "Average rating", value: "4.9★" },
] as const;

const trustSignals = [
  { icon: Shield, label: "All artists verified" },
  { icon: Users, label: "30,000+ bookings" },
] as const;

export function HeroSection() {
  return (
    <section className="warm-surface overflow-hidden relative">
      {/* Decorative background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-salmon-300/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-gold-400/8 blur-3xl"
      />

      <div className="page-container relative grid min-h-[calc(100svh-5rem)] items-center gap-14 py-16 lg:grid-cols-[1fr_1.05fr] lg:py-20">
        {/* Left: Copy */}
        <FadeUp>
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <Badge className="gap-2 px-3 py-1.5 text-xs" variant="cream">
              <Sparkles className="text-accent size-3.5" />
              AI Powered Matching
            </Badge>
          </div>

          <p className="section-label mt-6">Beauty, at your doorstep</p>

          <h1 className="text-primary mt-4 max-w-2xl text-5xl leading-[1.08] font-semibold tracking-tight text-balance md:text-6xl lg:text-[3.5rem] xl:text-6xl">
            Find Your Perfect{" "}
            <span className="gradient-text">Beauty Artist</span>{" "}
            with AI
          </h1>

          <p className="text-muted-foreground mt-5 max-w-lg text-[1.0625rem] leading-[1.75]">
            Discover, compare, and book skilled freelance makeup artists,
            hairstylists, and nail artists in your city — at fair prices you can
            trust.
          </p>

          {/* AI search bar */}
          <div className="border-border bg-card shadow-card mt-8 flex max-w-lg items-center gap-3 rounded-full border p-2 pr-2 transition-shadow hover:shadow-premium focus-within:shadow-premium focus-within:border-ring">
            <Sparkles className="text-accent ml-3 size-4.5 shrink-0" />
            <span className="text-muted-foreground flex-1 truncate text-left text-sm">
              Describe what you&apos;re looking for...
            </span>
            <Link href="/assistant">
              <Button size="md" className="rounded-full px-5">
                Search
              </Button>
            </Link>
          </div>

          {/* Primary CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/artists">
              <Button className="rounded-full px-7" variant="salmon">
                Explore artists near me
              </Button>
            </Link>
            <Link
              className="text-primary inline-flex items-center gap-2 px-3 text-sm font-semibold hover:gap-3 transition-all"
              href="/artists"
            >
              Browse all artists
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {trustSignals.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
              >
                <Icon className="size-3.5 text-teal-400" />
                {label}
              </span>
            ))}
          </div>

          {/* Stats */}
          <dl className="mt-10 grid max-w-sm grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-primary text-2xl font-bold tracking-tight">
                  {stat.value}
                </dd>
                <dt className="text-muted-foreground mt-0.5 text-xs leading-5">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </FadeUp>

        {/* Right: Visual */}
        <FadeUp className="relative mx-auto w-full max-w-[36rem] lg:ml-auto">
          <div className="relative">
            <Image
              alt="Makeup artist applying bridal makeup"
              className="shadow-premium aspect-[4/5] w-full rounded-[2.25rem] object-cover"
              height={1120}
              priority
              src="/images/marketing/hero-makeup.svg"
              width={900}
            />

            {/* Floating rating callout */}
            <HoverLift className="bg-card/96 shadow-premium absolute top-8 -right-4 rounded-2xl p-4 backdrop-blur-sm border border-border/60 sm:right-[-2.5rem]">
              <div className="flex items-center gap-3">
                <span className="bg-accent/15 grid size-10 place-items-center rounded-full">
                  <Star className="fill-accent text-accent size-5" />
                </span>
                <div>
                  <p className="text-primary text-sm font-bold leading-none">
                    4.9 / 5
                  </p>
                  <p className="text-muted-foreground mt-1 text-[11px]">
                    from 30k+ reviews
                  </p>
                </div>
              </div>
            </HoverLift>

            {/* Floating portfolio thumbnail */}
            <HoverLift className="border-beige-100 bg-card shadow-card absolute -bottom-6 -left-4 hidden w-56 overflow-hidden rounded-2xl border-4 sm:block">
              <Image
                alt="Beauty nail art portfolio"
                className="aspect-[4/3] w-full object-cover"
                height={620}
                src="/images/marketing/nail-art.svg"
                width={760}
              />
            </HoverLift>

            {/* Decorative dot */}
            <div
              aria-hidden
              className="absolute -right-6 bottom-24 hidden size-6 rounded-full bg-teal-400/80 ring-4 ring-teal-400/20 lg:block"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
