import Image from "next/image";
import { ShieldAlert, Tags, UserSearch } from "lucide-react";
import { FadeUp } from "@/lib/motion";

const points = [
  {
    icon: UserSearch,
    text: "No easy way to discover skilled artists working right in your neighbourhood.",
  },
  {
    icon: ShieldAlert,
    text: "No verified reviews, portfolios, or ratings, so trust is a leap of faith.",
  },
  {
    icon: Tags,
    text: "Hidden, inconsistent pricing that makes budgeting a real headache.",
  },
] as const;

export function ProblemSection() {
  return (
    <section className="section-y bg-beige-200" id="problem">
      <div className="page-container grid items-center gap-14 lg:grid-cols-[0.9fr_1fr]">
        <FadeUp className="relative">
          <Image
            alt="Customer searching for a trusted beauty artist"
            className="shadow-card aspect-square w-full rounded-[2rem] object-cover"
            height={900}
            src="/images/marketing/problem-phone.svg"
            width={900}
          />
          <div className="bg-card/95 text-primary shadow-soft absolute right-8 bottom-8 max-w-60 rounded-2xl p-4 text-sm">
            &ldquo;I booked blind and paid double, never again.&rdquo;
          </div>
        </FadeUp>
        <FadeUp>
          <p className="text-secondary text-xs font-semibold tracking-[0.42em] uppercase">
            The everyday struggle
          </p>
          <h2 className="text-primary mt-5 max-w-2xl text-4xl leading-tight font-semibold text-balance">
            Finding a trusted artist shouldn&apos;t feel like a gamble.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
            In most Tier 2 and Tier 3 cities, women rely on scattered WhatsApp
            forwards, guesswork, and word of mouth to find a good makeup artist
            or stylist, often with no idea about quality, pricing, or
            reliability until it&apos;s too late.
          </p>
          <div className="mt-10 grid gap-6">
            {points.map((point) => (
              <div className="flex gap-4" key={point.text}>
                <point.icon className="text-secondary mt-1 size-5 shrink-0" />
                <p className="text-primary/85 leading-7">{point.text}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
