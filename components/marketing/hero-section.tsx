import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, HoverLift } from "@/lib/motion";

const stats = [
  { label: "Verified artists", value: "500+" },
  { label: "Cities served", value: "50+" },
  { label: "Average rating", value: "4.9" },
] as const;

export function HeroSection() {
  return (
    <section className="warm-surface overflow-hidden">
      <div className="page-container grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <FadeUp>
          <Badge className="gap-2" variant="cream">
            <Sparkles className="text-accent size-3.5" />
            AI Powered
          </Badge>
          <p className="text-secondary mt-6 text-xs font-semibold tracking-[0.42em] uppercase">
            Beauty, at your doorstep
          </p>
          <h1 className="text-primary mt-6 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
            Find Your Perfect Beauty Professional with AI
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
            Discover, chat with, and book skilled freelance makeup artists,
            hairstylists, and nail artists in your city, all from home, all at
            fair prices you can trust.
          </p>
          <p className="text-primary/75 mt-4 max-w-xl text-sm leading-7 font-medium italic">
            AI matches you with trusted local beauty professionals based on your
            budget, location, occasion and preferences.
          </p>
          <div className="border-border bg-card shadow-soft mt-9 flex max-w-xl items-center gap-3 rounded-full border p-2">
            <Sparkles className="text-accent ml-3 size-5" />
            <span className="text-muted-foreground flex-1 truncate text-left text-sm">
              Describe what you&apos;re looking for...
            </span>
            <Button size="md">Search</Button>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button className="px-8" variant="salmon">
              Explore artists near me
            </Button>
            <Link
              className="text-primary inline-flex items-center gap-3 px-3 font-semibold"
              href="/artists"
            >
              <span>Browse all artists</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-muted-foreground text-sm">{stat.label}</dt>
                <dd className="text-primary text-xl font-semibold">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
        <FadeUp className="relative mx-auto w-full max-w-[38rem] lg:ml-auto">
          <Image
            alt="Makeup artist applying bridal makeup"
            className="shadow-premium aspect-[4/5] w-full rounded-[2rem] object-cover"
            height={1120}
            priority
            src="/images/marketing/hero-makeup.svg"
            width={900}
          />
          <HoverLift className="bg-card/95 shadow-card absolute top-8 -right-4 rounded-2xl p-4 backdrop-blur sm:right-[-2rem]">
            <div className="flex items-center gap-3">
              <span className="bg-accent/20 grid size-10 place-items-center rounded-full">
                <Star className="fill-accent text-accent size-5" />
              </span>
              <div>
                <p className="text-primary font-semibold">4.9 / 5</p>
                <p className="text-muted-foreground text-xs">
                  from 30k+ reviews
                </p>
              </div>
            </div>
          </HoverLift>
          <HoverLift className="border-beige-100 bg-card shadow-card absolute -bottom-8 -left-4 hidden w-64 overflow-hidden rounded-2xl border-4 sm:block">
            <Image
              alt="Beauty makeup palette"
              className="aspect-[4/3] w-full object-cover"
              height={620}
              src="/images/marketing/nail-art.svg"
              width={760}
            />
          </HoverLift>
          <div className="absolute -right-8 bottom-20 hidden size-8 rounded-full bg-teal-400 lg:block" />
        </FadeUp>
      </div>
    </section>
  );
}
