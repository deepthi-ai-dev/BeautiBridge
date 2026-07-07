import { CalendarCheck, MapPin, Sparkles, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FadeUp, StaggerContainer } from "@/lib/motion";

const benefits = [
  {
    description:
      "Location-aware discovery surfaces talented, best-reviewed artists near you.",
    icon: MapPin,
    title: "Discover artists right around the corner",
    wide: true,
  },
  {
    description:
      "Just tell it what you want in plain words, it finds the right artist, style, and budget for you.",
    icon: Sparkles,
    title: "AI chat assistant",
    wide: false,
  },
  {
    description:
      "Verified reviews and genuine work galleries so you always know exactly what you're booking.",
    icon: Star,
    title: "Ratings & real portfolios",
    wide: false,
  },
  {
    description:
      "See clear upfront prices and confirm your at-home appointment in just a few taps.",
    icon: CalendarCheck,
    title: "Transparent pricing & effortless booking",
    wide: true,
  },
] as const;

export function CustomerBenefits() {
  return (
    <section className="section-y plum-panel">
      <div className="page-container">
        <FadeUp>
          <p className="text-accent text-xs font-semibold tracking-[0.42em] uppercase">
            For customers
          </p>
          <h2 className="mt-5 text-4xl font-semibold text-balance">
            Everything you need to look and feel your best.
          </h2>
        </FadeUp>
        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <Card
              className={`text-beige-50 border-white/10 bg-white/7 p-8 shadow-none backdrop-blur ${benefit.wide ? "md:col-span-2" : ""}`}
              key={benefit.title}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <span className="bg-secondary/80 grid size-14 shrink-0 place-items-center rounded-2xl">
                  <benefit.icon className="size-6 text-white" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-beige-100/80 mt-3 leading-7">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
