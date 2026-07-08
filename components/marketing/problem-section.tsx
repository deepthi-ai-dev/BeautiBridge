"use client";

import {
  AlertTriangle,
  Ban,
  CalendarX,
  CheckCircle2,
  MessageSquareWarning,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer } from "@/lib/motion";

const painPoints = [
  {
    icon: MessageSquareWarning,
    label: "WhatsApp referrals",
    detail: "Hit-or-miss word of mouth",
  },
  {
    icon: Ban,
    label: "Unknown pricing",
    detail: "Surprise bills after the service",
  },
  {
    icon: AlertTriangle,
    label: "Fake reviews",
    detail: "No way to verify real quality",
  },
  {
    icon: CalendarX,
    label: "Last-minute cancellations",
    detail: "Left scrambling on your big day",
  },
] as const;

const solutionPoints = [
  {
    icon: Sparkles,
    label: "AI recommendations",
    detail: "Matched to your style & budget",
  },
  {
    icon: ShieldCheck,
    label: "Verified artists",
    detail: "Portfolio + identity verified",
  },
  {
    icon: TrendingUp,
    label: "Transparent pricing",
    detail: "Upfront costs, zero surprises",
  },
  {
    icon: Zap,
    label: "Instant booking",
    detail: "Confirm your slot in minutes",
  },
] as const;

export function ProblemSection() {
  return (
    <section className="section-y light-section relative overflow-hidden bg-background">
      {/* Ambient background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-salmon-300/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-primary/12 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/8 blur-[120px]"
      />

      <div className="page-container relative">
        {/* Section heading */}
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="section-label">The Problem</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            Beauty booking shouldn&apos;t{" "}
            <span className="bg-[linear-gradient(135deg,var(--primary),var(--salmon-400),#f3c4c0)] bg-clip-text text-transparent">
              feel like a gamble.
            </span>
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-[1.0625rem] sm:leading-8">
            In Tier 2 and Tier 3 cities, women still rely on informal referrals,
            guesswork, and word of mouth — with no clarity on quality, pricing,
            or eligibility until it&apos;s too late.
          </p>
        </FadeUp>

        {/* Comparison cards */}
        <StaggerContainer className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* ── Without BeautiBridge ── */}
          <FadeUp>
            <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-destructive/20 bg-gradient-to-br from-card via-card to-[color-mix(in_srgb,var(--destructive)_5%,var(--card))] p-7 shadow-[0_16px_48px_rgba(53,27,49,0.10)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(53,27,49,0.14)] sm:p-8">
              {/* Subtle inner glow */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-destructive/20 to-transparent" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-destructive/6 blur-[60px]" />

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                  <Ban className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-destructive/80">
                    Without BeautiBridge
                  </p>
                  <h3 className="mt-0.5 text-lg font-semibold text-foreground sm:text-xl">
                    The old way feels broken
                  </h3>
                </div>
              </div>

              {/* Pain points */}
              <div className="mt-6 grid gap-3">
                {painPoints.map(({ icon: Icon, label, detail }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-3.5 rounded-2xl border border-destructive/10 bg-background/60 px-4 py-3.5 backdrop-blur-sm transition-colors duration-200 hover:border-destructive/20 hover:bg-background/80"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/8 text-destructive/80">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {label}
                      </p>
                      <p className="mt-0.5 text-xs leading-4 text-muted-foreground">
                        {detail}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-full bg-destructive/10 p-1">
                      <Ban className="h-3 w-3 text-destructive/60" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial quote */}
              <div className="mt-6 rounded-2xl border border-destructive/10 bg-destructive/5 px-5 py-4">
                <p className="text-sm italic leading-6 text-foreground/70">
                  &ldquo;I booked blind and paid double. Never again.&rdquo;
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-muted" />
                  <p className="text-xs font-medium text-muted-foreground">
                    Real customer, Vizag
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* ── With BeautiBridge ── */}
          <FadeUp transition={{ delay: 0.12 }}>
            <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-teal-400/25 bg-gradient-to-br from-[color-mix(in_srgb,var(--plum-950)_100%,transparent)] via-[color-mix(in_srgb,var(--plum-800)_95%,transparent)] to-[color-mix(in_srgb,var(--plum-950)_100%,transparent)] p-7 shadow-[0_16px_48px_rgba(53,27,49,0.22)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(53,27,49,0.32)] sm:p-8">
              {/* Glowing top border line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
              {/* Inner highlight corner */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/10 blur-[70px]" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-salmon-400/10 blur-[80px]" />

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-400/20 text-teal-400 ring-1 ring-teal-400/30">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-400">
                    With BeautiBridge
                  </p>
                  <h3 className="mt-0.5 text-lg font-semibold text-[#fff8ef] sm:text-xl">
                    Confidence from the first search
                  </h3>
                </div>
              </div>

              {/* Solution points */}
              <div className="mt-6 grid gap-3">
                {solutionPoints.map(({ icon: Icon, label, detail }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.14 + i * 0.08,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/6 px-4 py-3.5 backdrop-blur-sm transition-colors duration-200 hover:border-white/14 hover:bg-white/10"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-400/15 text-teal-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#fff8ef]">
                        {label}
                      </p>
                      <p className="mt-0.5 text-xs leading-4 text-[#cbb9ac]">
                        {detail}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-full bg-teal-400/15 p-1">
                      <CheckCircle2 className="h-3 w-3 text-teal-400" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Confidence callout */}
              <div className="mt-6 rounded-2xl border border-teal-400/20 bg-teal-400/8 px-5 py-4">
                <div className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 fill-gold-400 text-gold-400" />
                  <p className="text-sm leading-6 text-[#e3d5c4]">
                    Every match is verified, priced upfront, and ready to book
                    in minutes.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-gold-400 text-gold-400"
                    />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-[#cbb9ac]">
                    4.9 avg · 500+ verified artists
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </StaggerContainer>

        {/* Bottom divider decoration */}
        <FadeUp className="mt-16 flex items-center justify-center gap-4" transition={{ delay: 0.2 }}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 shadow-[0_4px_18px_rgba(53,27,49,0.06)]">
            <Search className="h-3.5 w-3.5 text-primary/70" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              The smarter way to book
            </p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
        </FadeUp>
      </div>
    </section>
  );
}
