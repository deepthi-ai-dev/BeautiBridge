import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { rupeeFormatter } from "@/lib/formatters";
import type { ServicePackage } from "@/features/artists/profile-types";

type ServiceMenuProps = {
  packages: ServicePackage[];
  artistSlug: string;
};

export function ServiceMenu({ packages, artistSlug }: Readonly<ServiceMenuProps>) {
  return (
    <section aria-label="Services and pricing">
      <div className="grid gap-4 sm:gap-5">
        {packages.map((pkg) => (
          <article
            className={[
              "premium-card relative overflow-hidden p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-premium)]",
              pkg.isPopular ? "ring-2 ring-primary/30" : "",
            ].join(" ")}
            key={pkg.id}
          >
            {/* Popular ribbon */}
            {pkg.isPopular && (
              <div className="absolute top-0 right-0">
                <div className="flex items-center gap-1.5 rounded-bl-xl rounded-tr-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                  <Sparkles className="size-3" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Left */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-primary text-lg font-semibold">
                    {pkg.name}
                  </h3>
                  <Badge variant="outline">{pkg.duration}</Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  {pkg.description}
                </p>

                {/* Includes */}
                <ul className="mt-3 space-y-1.5">
                  {pkg.includes.map((item) => (
                    <li className="flex items-start gap-2 text-sm" key={item}>
                      <Check className="text-teal-400 mt-0.5 size-4 shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: price + CTA */}
              <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
                <div className="text-right">
                  <p className="text-primary text-2xl font-bold">
                    {rupeeFormatter.format(pkg.price)}
                  </p>
                  <p className="text-muted-foreground text-xs">per session</p>
                </div>
                <Link href={`/artists/${artistSlug}/book?service=${pkg.id}`}>
                  <Button size="sm" variant="primary">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
