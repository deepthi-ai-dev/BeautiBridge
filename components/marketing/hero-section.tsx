"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/lib/motion";

const stats = [
  { label: "Verified Artists", value: "500+" },
  { label: "Cities Served", value: "50+" },
  { label: "Avg. Rating", value: "4.9★" },
] as const;

const trustSignals = [
  { icon: ShieldCheck, label: "Verified Portfolios" },
  { icon: Sparkles, label: "AI-Powered Matching" },
] as const;

const aiSteps = [
  "Thinking...",
  "Searching nearby...",
  "Matching artists...",
  "Success.",
] as const;

const aiResults = ["8 Verified Artists", "98% Match", "Available Tomorrow"] as const;

const floatingCards = [
  { label: "★★★★★ 4.9 Rating", className: "left-0 top-10 sm:-left-8 lg:-left-12" },
  { label: "500+ Verified Artists", className: "right-0 top-16 sm:-right-6 lg:-right-10" },
  { label: "98% AI Match", className: "left-4 bottom-24 sm:-left-4 lg:-left-8" },
  { label: "Instant Booking", className: "right-3 bottom-8 sm:right-0 lg:-right-6" },
  { label: "Verified Portfolio", className: "left-1/2 top-0 -translate-x-1/2 lg:top-6" },
] as const;

const artistCards = [
  {
    name: "Ananya Bridal Studio",
    specialty: "Bridal · Airbrush · HD Finish",
    price: "₹2,800",
    rating: "4.9",
    eta: "Tomorrow · 10:30 AM",
    badge: "Best Match",
  },
  {
    name: "Saanvi Signature Looks",
    specialty: "Wedding Guest · Soft Glam",
    price: "₹2,450",
    rating: "4.8",
    eta: "Saturday · 8:00 AM",
    badge: "Verified Pro",
  },
] as const;

function FloatingSignal({
  label,
  className,
  delay = 0,
}: {
  label: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-20 hidden md:block ${className}`}
    >
      <div className="hero-glass hero-float flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold tracking-[0.02em] text-foreground shadow-[0_18px_45px_rgba(53,27,49,0.12)]">
        <span className="size-2 rounded-full bg-salmon-400 shadow-[0_0_18px_rgba(230,151,145,0.9)]" />
        {label}
      </div>
    </motion.div>
  );
}

function ArtistPreviewCard({
  name,
  specialty,
  price,
  rating,
  eta,
  badge,
  delay,
}: (typeof artistCards)[number] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="hero-glass group relative overflow-hidden rounded-[1.4rem] border border-white/55 p-4 shadow-[0_22px_50px_rgba(53,27,49,0.12)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-80" />
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex rounded-full border border-primary/10 bg-primary/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            {badge}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground sm:text-[15px]">{name}</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
          <Star className="size-3.5 fill-current text-gold-400" />
          {rating}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold tracking-tight text-foreground">{price}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5 text-primary/75" />
            {eta}
          </p>
        </div>
        <div className="rounded-full bg-gradient-to-r from-primary via-plum-600 to-salmon-400 p-[1px] shadow-[0_14px_28px_rgba(84,40,67,0.2)]">
          <div className="rounded-full bg-white/80 px-3.5 py-2 text-xs font-semibold text-primary backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5">
            Book now
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="light-section relative flex min-h-[calc(100svh-6rem)] w-full items-center overflow-hidden bg-background pb-[4.5rem] pt-8 sm:pb-20 sm:pt-14 lg:pb-8">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_18%,rgba(230,151,145,0.28),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(84,40,67,0.18),transparent_24%),radial-gradient(circle_at_72%_62%,rgba(220,174,91,0.14),transparent_24%),linear-gradient(180deg,rgba(255,248,239,0.94),rgba(239,230,216,0.92))]" />
      <div className="hero-orb absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-salmon-300/40 blur-[90px]" />
      <div className="hero-orb-reverse absolute right-[-4rem] top-16 -z-10 h-80 w-80 rounded-full bg-primary/18 blur-[110px]" />
      <div className="hero-orb absolute bottom-[-5rem] left-[22%] -z-10 h-72 w-72 rounded-full bg-gold-400/14 blur-[120px]" />
      <div className="hero-grain absolute inset-0 -z-10 opacity-25" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_18%,transparent_82%,rgba(84,40,67,0.05))]" />

      <div className="page-container relative grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-12">
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <FadeUp>
            <div className="hero-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_12px_30px_rgba(53,27,49,0.08)]">
              <WandSparkles className="size-3.5" />
              AI concierge for beauty bookings
            </div>

            <h1 className="mt-6 max-w-[13ch] text-balance text-[2.85rem] font-semibold leading-[0.96] tracking-[-0.05em] text-foreground sm:text-[4.2rem] lg:text-[5.25rem] xl:text-[5.75rem]">
              Beauty booking,
              <span className="block bg-[linear-gradient(135deg,var(--primary),var(--salmon-400),#f3c4c0)] bg-clip-text text-transparent">
                reimagined by AI.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              BeautiBridge pairs premium beauty discovery with an AI concierge that understands your budget,
              city, date, and style instantly, then surfaces verified artists ready to book.
            </p>
          </FadeUp>

          <FadeUp className="mt-8 w-full max-w-2xl" transition={{ delay: 0.08 }}>
            <div className="hero-glass hero-glow group relative overflow-hidden rounded-[1.75rem] border border-white/65 p-2.5 shadow-[0_25px_70px_rgba(53,27,49,0.14)]">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.32),transparent_40%)]" />
              <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.2rem] bg-white/80 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/12 to-salmon-300/35 text-primary shadow-[0_12px_22px_rgba(84,40,67,0.12)]">
                    <Search className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      <Bot className="size-3.5" />
                      Live AI search preview
                    </div>
                    <input
                      type="text"
                      value="Find bridal makeup under ₹3000 in Vizag this Saturday"
                      readOnly
                      aria-label="AI beauty search preview"
                      className="mt-1 w-full truncate bg-transparent text-sm font-medium text-foreground outline-none sm:text-[15px]"
                    />
                  </div>
                  <span className="hero-cursor hidden h-6 w-px shrink-0 bg-primary/80 sm:block" aria-hidden="true" />
                </div>

                <Link href="/assistant" className="shrink-0">
                  <Button
                    size="lg"
                    className="w-full rounded-[1.1rem] bg-[linear-gradient(135deg,var(--primary),var(--plum-600),var(--salmon-400))] px-6 text-primary-foreground shadow-[0_18px_40px_rgba(84,40,67,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(84,40,67,0.3)] sm:w-auto"
                  >
                    Try AI Assistant
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {aiSteps.slice(0, 3).map((step, index) => (
                  <div
                    key={step}
                    className="hero-glass hero-shimmer flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-foreground/90"
                    style={{ animationDelay: `${index * 240}ms` }}
                  >
                    <span className="inline-flex gap-1">
                      <span className="hero-dot" />
                      <span className="hero-dot" />
                      <span className="hero-dot" />
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            transition={{ delay: 0.16 }}
          >
            <Link href="/artists">
              <Button
                size="lg"
                className="rounded-full bg-[linear-gradient(135deg,var(--primary),var(--plum-600),var(--salmon-400))] px-8 text-primary-foreground shadow-[0_22px_45px_rgba(84,40,67,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(84,40,67,0.3)]"
              >
                Explore Artists
              </Button>
            </Link>
                <Link href="/assistant">
              <Button
                variant="outline"
                size="lg"
                    className="rounded-full border-white/70 bg-white/55 px-8 text-primary shadow-[0_14px_32px_rgba(53,27,49,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80"
              >
                Try AI Assistant
              </Button>
            </Link>
            <Link
              href="/#how-it-works"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              See how it works
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeUp>

          <FadeUp className="mt-10 w-full max-w-xl" transition={{ delay: 0.22 }}>
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="hero-glass rounded-[1.35rem] border border-white/60 px-4 py-4 text-left shadow-[0_16px_35px_rgba(53,27,49,0.08)]"
                >
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {trustSignals.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="hero-glass inline-flex items-center gap-2 rounded-full border border-white/55 px-4 py-2 text-sm text-muted-foreground"
                >
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-3.5" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="relative mx-auto mt-4 flex h-[640px] w-full max-w-[640px] items-center justify-center sm:h-[690px] lg:mt-0 lg:h-[760px] lg:max-w-none">
          <div className="pointer-events-none absolute inset-x-[10%] top-14 h-[78%] rounded-full bg-primary/10 blur-[90px]" />
          <div className="pointer-events-none absolute inset-x-[18%] bottom-[4.5rem] h-[44%] rounded-full bg-salmon-300/25 blur-[80px]" />

          {floatingCards.map((card, index) => (
            <FloatingSignal key={card.label} label={card.label} className={card.className} delay={0.55 + index * 0.08} />
          ))}

          <FadeUp className="relative z-10 w-full max-w-[36rem]" transition={{ delay: 0.2 }}>
            <div className="hero-demo-shell relative overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,248,239,0.70))] p-3 shadow-[0_30px_90px_rgba(53,27,49,0.18)] backdrop-blur-2xl sm:p-4">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(240,179,173,0.18),transparent_32%)]" />

              <div className="relative rounded-[1.6rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,248,239,0.82))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#ff6f7d]" />
                      <span className="size-2.5 rounded-full bg-[#ffbe5c]" />
                      <span className="size-2.5 rounded-full bg-[#2ed47a]" />
                    </div>
                    <div className="rounded-full border border-primary/10 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      BeautiBridge AI
                    </div>
                  </div>
                  <div className="hero-glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground">
                    <Zap className="size-3.5 text-salmon-400" />
                    Live matchmaking
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,var(--primary),var(--plum-600),rgba(230,151,145,0.9))] p-[1px] shadow-[0_22px_45px_rgba(84,40,67,0.24)]">
                    <div className="rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(84,40,67,0.95),rgba(53,27,49,0.9))] px-4 py-4 text-primary-foreground">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                        <MapPin className="size-3.5" />
                        User request
                      </div>
                      <p className="mt-2 text-sm leading-6 sm:text-[15px]">
                        Find bridal makeup under ₹3000 in Vizag this Saturday
                      </p>
                    </div>
                  </div>

                  <div className="hero-glass rounded-[1.5rem] border border-white/60 p-4 shadow-[0_16px_35px_rgba(53,27,49,0.08)] sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Bot className="size-[1.125rem]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">AI Assistant</p>
                          <p className="text-xs text-muted-foreground">Real-time concierge flow</p>
                        </div>
                      </div>
                        <div className="hero-glass rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                        Processing
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2.5">
                      {aiSteps.map((step, index) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="hero-glass flex items-center justify-between rounded-2xl border border-white/55 px-3.5 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              {index === aiSteps.length - 1 ? (
                                <CheckCircle2 className="size-4 text-emerald-500" />
                              ) : (
                                <span className="inline-flex gap-1">
                                  <span className="hero-dot" />
                                  <span className="hero-dot" />
                                  <span className="hero-dot" />
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-foreground">{step}</span>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {index < aiSteps.length - 1 ? "In progress" : "Completed"}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {aiResults.map((result, index) => (
                      <motion.div
                        key={result}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.05 + index * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-glass rounded-[1.25rem] border border-white/60 px-3.5 py-3.5 text-center shadow-[0_10px_26px_rgba(53,27,49,0.06)]"
                      >
                        <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600">
                          <CheckCircle2 className="size-4" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">{result}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid gap-3">
                    {artistCards.map((artist, index) => (
                      <ArtistPreviewCard key={artist.name} {...artist} delay={1.28 + index * 0.12} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
