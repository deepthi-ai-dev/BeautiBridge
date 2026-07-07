import Image from "next/image";
import { CalendarDays, Eye, Grid2X2, HeartHandshake } from "lucide-react";
import { FadeUp } from "@/lib/motion";

const benefits = [
  {
    description:
      "A beautiful profile with your portfolio, services, and pricing.",
    icon: Grid2X2,
    title: "Showcase your work",
  },
  {
    description:
      "Appear in local searches and AI recommendations for nearby clients.",
    icon: Eye,
    title: "Get discovered",
  },
  {
    description: "Track requests, confirm appointments, and stay organized.",
    icon: CalendarDays,
    title: "Manage bookings",
  },
  {
    description: "Build a steady client stream without middlemen.",
    icon: HeartHandshake,
    title: "Grow your clients",
  },
] as const;

export function ArtistBenefits() {
  return (
    <section className="section-y bg-beige-200">
      <div className="page-container grid items-center gap-14 lg:grid-cols-[0.9fr_1fr]">
        <FadeUp className="relative">
          <Image
            alt="Independent beauty artist"
            className="shadow-card aspect-[4/5] w-full rounded-[2rem] object-cover"
            height={980}
            src="/images/marketing/artist-growth.svg"
            width={900}
          />
        </FadeUp>
        <FadeUp>
          <p className="text-secondary text-xs font-semibold tracking-[0.42em] uppercase">
            For artists
          </p>
          <h2 className="text-primary mt-5 text-4xl leading-tight font-semibold">
            Grow your craft into a thriving business.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
            BeautiBridge gives independent beauty professionals the visibility,
            tools, and steady stream of clients they deserve, no big salon, no
            middlemen, just your talent reaching the women who need it.
          </p>
          <div className="mt-10 grid gap-7 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div className="flex gap-4" key={benefit.title}>
                <benefit.icon className="text-secondary mt-1 size-5 shrink-0" />
                <div>
                  <h3 className="text-primary text-lg font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 leading-6">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
