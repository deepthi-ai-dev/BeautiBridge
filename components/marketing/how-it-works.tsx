"use client";

import { useRef } from "react";
import { CalendarCheck, MessageSquareText, Search } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeUp } from "@/lib/motion";

const steps = [
  {
    description: "Tell us the look, occasion, budget, and city in your own words.",
    icon: Search,
    title: "Search",
    color: "from-primary/15 to-primary/5 text-primary border-primary/15",
    num: "01",
  },
  {
    description: "Browse verified portfolios, ratings, and prices, then chat with the artist.",
    icon: MessageSquareText,
    title: "Compare",
    color: "from-secondary/20 to-secondary/5 text-secondary border-secondary/20",
    num: "02",
  },
  {
    description: "Confirm your at-home appointment and get ready to glow.",
    icon: CalendarCheck,
    title: "Book",
    color: "from-teal-400/15 to-teal-400/5 text-teal-400 border-teal-400/20",
    num: "03",
  },
] as const;

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="section-y light-section warm-surface relative overflow-hidden" id="how-it-works">
      <div className="page-container">
        <FadeUp className="text-center">
          <p className="section-label">Simple by design</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            Beautiful in{" "}
            <span className="bg-[linear-gradient(135deg,var(--primary),var(--salmon-400))] bg-clip-text text-transparent">
              three easy steps.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/65">
            From search to booked in minutes — no calls, no uncertainty.
          </p>
        </FadeUp>

        <div className="relative mt-16" ref={ref}>
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block"
          >
            <motion.div
              animate={{ scaleY: isInView ? 1 : 0 }}
              className="h-full w-full origin-top bg-gradient-to-b from-primary via-secondary to-teal-400"
              initial={{ scaleY: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid gap-10 md:gap-0">
            {steps.map((step, index) => (
              <motion.div
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 24 }
                }
                className={`relative grid items-center gap-6 md:grid-cols-2 md:gap-12 ${
                  index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
                initial={{ opacity: 0, y: 24 }}
                key={step.title}
                transition={{
                  delay: index * 0.2,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={`${index % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                  <span className="text-6xl font-black leading-none select-none text-foreground/10">
                    {step.num}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-foreground/65 md:ml-auto">
                    {step.description}
                  </p>
                </div>

                <div className="relative flex justify-center md:justify-start">
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-beige-100 bg-primary shadow-[0_0_0_6px_rgba(84,40,67,0.15)] md:block"
                  />

                  <div
                    className={`group w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-[0_8px_28px_rgba(53,27,49,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(53,27,49,0.15)]`}
                  >
                    <div
                      className={`grid size-14 place-items-center rounded-2xl border bg-gradient-to-br transition-transform duration-300 group-hover:scale-105 ${step.color}`}
                    >
                      <step.icon className="size-6" />
                    </div>
                    <p className="mt-5 text-sm font-bold text-foreground">
                      Step {step.num} — {step.title}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-foreground/65">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            className="mx-auto mt-12 flex w-fit items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 text-sm font-semibold text-primary shadow-soft"
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <CalendarCheck className="text-teal-400 size-4" />
            Average booking time: under 5 minutes
          </motion.div>
        </div>
      </div>
    </section>
  );
}
