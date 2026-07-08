import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/lib/motion";

const trustBadges = [
  { icon: Star, label: "4.9 Rating" },
  { icon: ShieldCheck, label: "500+ Verified Artists" },
  { icon: Sparkles, label: "AI-Powered Matching" },
] as const;

export function FinalCta() {
  return (
    <section className="cta-glow-bg relative overflow-hidden py-24 text-center text-beige-50 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-salmon-400/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-gold-400/12 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div className="page-container relative">
        <FadeUp>
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                className="marketing-glass inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-beige-50"
                key={label}
              >
                <Icon className="text-gold-400 size-4" />
                {label}
              </span>
            ))}
          </div>

          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
            Book your beauty appointment in minutes.
          </h2>
          <p className="text-beige-100/80 mx-auto mt-6 max-w-2xl text-lg leading-8">
            Join thousands of women discovering trusted, affordable beauty at
            home. Explore artists near you or let our AI assistant find your
            perfect match.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/artists">
              <Button
                className="btn-glow rounded-full bg-gradient-to-r from-secondary via-salmon-400 to-salmon-500 px-8 text-secondary-foreground shadow-[0_20px_45px_rgba(230,151,145,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_rgba(230,151,145,0.45)]"
                variant="salmon"
              >
                Explore Artists
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/assistant">
              <Button
                className="rounded-full border-white/25 bg-white/10 px-8 text-beige-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/18 hover:shadow-premium"
                variant="outline"
              >
                Try AI Assistant
                <Sparkles className="size-4" />
              </Button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
