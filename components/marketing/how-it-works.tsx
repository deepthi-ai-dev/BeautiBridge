import { CalendarCheck, MessageSquareText, Search } from "lucide-react";
import { FadeUp } from "@/lib/motion";

const steps = [
  {
    description:
      "Tell us the look, occasion, budget, and city in your own words.",
    icon: Search,
    title: "Search your way",
  },
  {
    description: "Browse verified portfolios, ratings, and prices, then chat.",
    icon: MessageSquareText,
    title: "Compare & chat",
  },
  {
    description: "Confirm your at-home appointment and get ready to glow.",
    icon: CalendarCheck,
    title: "Book & glow",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="section-y bg-beige-100" id="how-it-works">
      <div className="page-container">
        <FadeUp className="text-center">
          <p className="text-secondary text-xs font-semibold tracking-[0.42em] uppercase">
            Simple by design
          </p>
          <h2 className="text-primary mt-5 text-4xl font-semibold">
            Beautiful in three easy steps.
          </h2>
        </FadeUp>
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <FadeUp
              className="md:pt-[calc(var(--offset)*1rem)]"
              key={step.title}
            >
              <div
                className="relative"
                style={{ "--offset": index * 3 } as React.CSSProperties}
              >
                <p className="text-salmon-300/45 text-7xl font-semibold">
                  0{index + 1}
                </p>
                <span className="border-border bg-card mt-4 grid size-12 place-items-center rounded-2xl border">
                  <step.icon className="text-secondary size-5" />
                </span>
                <h3 className="text-primary mt-5 text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-xs leading-7">
                  {step.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
