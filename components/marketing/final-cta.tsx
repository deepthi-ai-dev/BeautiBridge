import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/lib/motion";

export function FinalCta() {
  return (
    <section className="bg-plum-900 text-beige-50 relative overflow-hidden py-28 text-center">
      <Image
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover opacity-28 mix-blend-screen"
        fill
        src="/images/marketing/cta-eyes.svg"
      />
      <div className="page-container relative">
        <FadeUp>
          <p className="text-accent text-xs font-semibold tracking-[0.42em] uppercase">
            Your glow, one tap away
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold">
            Ready to meet your city&apos;s best beauty artists?
          </h2>
          <p className="text-beige-100/85 mx-auto mt-6 max-w-2xl text-lg leading-8">
            Join thousands of women discovering trusted, affordable beauty at
            home. Explore artists near you or book a personal demo today.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="px-8" variant="salmon">
              Explore artists
            </Button>
            <Button className="px-8" variant="cream">
              Try AI Assistant
            </Button>
          </div>
          <Link className="sr-only" href="/artists">
            Explore BeautiBridge artists
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
