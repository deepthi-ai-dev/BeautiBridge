import { CalendarCheck, MessageSquareText, Search } from "lucide-react";
import { FadeUp, StaggerContainer } from "@/lib/motion";

const steps = [
  {
    description: "Tell us the look, occasion, budget, and city in your own words.",
    icon: Search,
    title: "Search your way",
    color: "bg-primary/10 text-primary",
    num: "01",
  },
  {
    description: "Browse verified portfolios, ratings, and prices, then chat with the artist.",
    icon: MessageSquareText,
    title: "Compare & chat",
    color: "bg-secondary/15 text-secondary",
    num: "02",
  },
  {
    description: "Confirm your at-home appointment and get ready to glow.",
    icon: CalendarCheck,
    title: "Book & glow",
    color: "bg-teal-400/10 text-teal-400",
    num: "03",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="section-y bg-beige-100" id="how-it-works">
      <div className="page-container">
        <FadeUp className="text-center">
          <p className="section-label">Simple by design</p>
          <h2 className="text-primary mt-4 text-4xl font-semibold tracking-tight">
            Beautiful in three easy steps.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base leading-relaxed">
            From search to booked in minutes — no calls, no uncertainty.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3 relative">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-9 left-[calc(33.3%+1.5rem)] right-[calc(33.3%+1.5rem)] h-px bg-border"
          />
          <div
            aria-hidden
            className="hidden md:block absolute top-9 left-[calc(66.6%+1.5rem)] right-[1.5rem] h-px bg-border"
          />

          {steps.map((step) => (
            <FadeUp key={step.title}>
              <div className="relative flex flex-col gap-5 p-6 rounded-2xl bg-card border border-border/60 shadow-soft transition-shadow hover:shadow-card group">
                {/* Step number */}
                <span className="text-7xl font-bold text-border/60 select-none leading-none">
                  {step.num}
                </span>

                {/* Icon */}
                <div
                  className={`grid size-12 place-items-center rounded-2xl border border-current/10 ${step.color} transition-transform duration-300 group-hover:scale-105`}
                >
                  <step.icon className="size-5" />
                </div>

                <div>
                  <h3 className="text-primary text-lg font-bold">{step.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
