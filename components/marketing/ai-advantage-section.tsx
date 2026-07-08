"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ImageIcon,
  Search,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/lib/motion";

const suggestions = [
  "Bridal makeup under INR 3000 in Vizag",
  "Party hairstyling this weekend",
  "Nail art for an engagement ceremony",
] as const;

const matches = [
  {
    name: "Ananya R.",
    price: "INR 2,800",
    rating: "4.9",
    role: "Bridal MUA",
  },
  {
    name: "Priya M.",
    price: "INR 2,950",
    rating: "4.8",
    role: "Bridal MUA",
  },
] as const;

const demoSteps = [
  "User request",
  "Thinking",
  "Searching",
  "Matching artists",
  "Results",
  "Portfolio preview",
  "Book button",
] as const;

const STEP_DURATION = 2200;

export function AiAdvantageSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % demoSteps.length);
    }, STEP_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-y light-section bg-beige-100 section-glow relative overflow-hidden" id="ai-assistant">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 size-96 rounded-full bg-salmon-300/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-primary/8 blur-[100px]"
      />

      <div className="page-container grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <FadeUp>
          <p className="section-label">The AI advantage</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            Ask for what you want.{" "}
            <span className="bg-[linear-gradient(135deg,var(--primary),var(--salmon-400))] bg-clip-text text-transparent">
              Naturally.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-foreground/70">
            No filters to fight with. Type a request the way you&apos;d say it
            to a friend, and BeautiBridge instantly understands your occasion,
            style, budget, and location.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              { icon: Sparkles, text: "Natural language understanding" },
              { icon: Zap, text: "Instant personalized matches" },
              { icon: UserRound, text: "Powered by verified real artists" },
            ].map(({ icon: Icon, text }) => (
              <div
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3.5 shadow-[0_2px_12px_rgba(53,27,49,0.06)]"
                key={text}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/25 to-salmon-400/15 shadow-[0_4px_10px_rgba(230,151,145,0.2)]">
                  <Icon className="size-4 text-secondary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-semibold text-foreground/80 shadow-[0_2px_8px_rgba(53,27,49,0.06)] transition-colors hover:border-secondary/50 hover:bg-secondary/5"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-card p-6 shadow-[0_24px_60px_rgba(53,27,49,0.14)] sm:p-7">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            <div className="border-border/50 flex items-center gap-3 border-b pb-4">
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-salmon-300 to-primary text-white shadow-[0_8px_20px_rgba(84,40,67,0.25)]">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">BeautiBridge Assistant</h3>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="status-dot-available size-2" />
                  <p className="text-[11px] font-medium text-muted-foreground">
                    Live demo · replies instantly
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {demoSteps.map((step, index) => (
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-300 ${
                    index === activeStep
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : index < activeStep
                        ? "bg-teal-400/15 text-teal-400"
                        : "bg-muted/60 text-muted-foreground"
                  }`}
                  key={step}
                >
                  {step}
                </span>
              ))}
            </div>

            <div className="relative mt-5 min-h-[24rem] space-y-3">
              <AnimatePresence>
                {activeStep >= 0 && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 10 }}
                    key="request"
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-primary text-primary-foreground ml-auto max-w-[88%] rounded-2xl rounded-tr-sm px-4 py-3.5 text-sm leading-relaxed">
                      Find bridal makeup under INR 3000 in Vizag for Saturday morning
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeStep >= 1 && activeStep < 4 && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/60 px-4 py-3.5"
                  initial={{ opacity: 0, y: 10 }}
                  key={`status-${activeStep}`}
                  transition={{ duration: 0.4 }}
                >
                  <span className="inline-flex gap-1">
                    <span className="hero-dot" />
                    <span className="hero-dot" />
                    <span className="hero-dot" />
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    {activeStep === 1 && "Understanding your occasion, budget, and location..."}
                    {activeStep === 2 && "Searching Vizag · Bridal makeup · Under ₹3000"}
                    {activeStep === 3 && "Scoring 48 verified artists in your area..."}
                  </p>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  key="chips"
                >
                  {["Vizag", "Bridal makeup", "Under ₹3000", "Saturday AM"].map((chip) => (
                    <div
                      className="marketing-shimmer flex items-center gap-2 rounded-xl border border-border/50 bg-card/80 px-3 py-2 text-[11px] font-medium"
                      key={chip}
                    >
                      <Search className="text-secondary size-3" />
                      {chip}
                    </div>
                  ))}
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-teal-400/20 bg-teal-400/8 px-4 py-3"
                  initial={{ opacity: 0, y: 8 }}
                  key="progress"
                >
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      animate={{ width: "100%" }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-secondary"
                      initial={{ width: "0%" }}
                      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              )}

              {activeStep >= 4 && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  key="results-block"
                >
                  <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-border/60 bg-muted/80 px-4 py-3 text-sm font-medium leading-relaxed text-foreground">
                    Lovely! I found 2 top-rated bridal artists in Vizag available Saturday
                    morning, both within your budget. ✨
                  </div>
                  {matches.map((match, i) => (
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      className="border-border/60 bg-card flex items-center justify-between rounded-xl border px-4 py-3 shadow-sm"
                      initial={{ opacity: 0, x: 12 }}
                      key={match.name}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="bg-beige-200 grid size-9 place-items-center rounded-xl">
                          <UserRound className="text-secondary size-4" />
                        </span>
                        <div>
                          <p className="text-primary text-sm font-semibold">{match.name}</p>
                          <p className="text-muted-foreground text-[11px]">
                            {match.role} · ★ {match.rating}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-accent text-sm font-bold">{match.price}</p>
                        <p className="text-[10px] font-medium text-emerald-600">Available</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeStep >= 5 && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  key="portfolio"
                >
                  {[1, 2, 3].map((n) => (
                    <div
                      className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-salmon-300/50 via-primary/20 to-gold-400/30 shadow-soft"
                      key={n}
                    >
                      <ImageIcon className="text-primary/30 absolute bottom-2 right-2 size-4" />
                    </div>
                  ))}
                </motion.div>
              )}

              {activeStep >= 6 && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end pt-1"
                  initial={{ opacity: 0, y: 10 }}
                  key="book"
                >
                  <div className="btn-glow rounded-full bg-gradient-to-r from-primary via-plum-600 to-salmon-400 p-[1px] shadow-[0_16px_36px_rgba(84,40,67,0.25)]">
                    <div className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm">
                      <CalendarCheck className="size-4" />
                      Book Ananya R.
                      <ArrowRight className="size-4" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
