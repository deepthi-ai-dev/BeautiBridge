import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/lib/motion";

const artists = [
  {
    badge: "Top rated",
    city: "Visakhapatnam",
    image: "/images/marketing/bridal-look.svg",
    name: "Ananya R.",
    price: "From INR 2,800",
    service: "Bridal Makeup",
  },
  {
    badge: "Rising star",
    city: "Coimbatore",
    image: "/images/marketing/hair-style.svg",
    name: "Priya M.",
    price: "From INR 1,500",
    service: "Hair Styling",
  },
  {
    badge: "Highly booked",
    city: "Nagpur",
    image: "/images/marketing/nail-art.svg",
    name: "Nisha K.",
    price: "From INR 900",
    service: "Nail Artist",
  },
] as const;

export function TrustedArtistsSection() {
  return (
    <section className="section-y bg-beige-200" id="featured-artists">
      <div className="page-container">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <FadeUp>
            <p className="text-secondary text-xs font-semibold tracking-[0.42em] uppercase">
              Loved & trusted
            </p>
            <h2 className="text-primary mt-5 text-4xl font-semibold">
              Real artists. Real work. Real reviews.
            </h2>
          </FadeUp>
          <dl className="grid grid-cols-3 gap-8 text-center">
            {[
              ["500+", "Verified artists"],
              ["50+", "Cities served"],
              ["4.9", "Average rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-muted-foreground text-sm">{label}</dt>
                <dd className="text-primary font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {artists.map((artist) => (
            <FadeUp key={artist.name}>
              <Card className="overflow-hidden rounded-[1.75rem]">
                <div className="relative">
                  <Image
                    alt={`${artist.name} ${artist.service}`}
                    className="aspect-[4/3] w-full object-cover"
                    height={980}
                    src={artist.image}
                    width={760}
                  />
                  <span className="bg-primary text-primary-foreground absolute top-4 left-4 rounded-full px-4 py-1.5 text-sm font-semibold">
                    {artist.badge}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-accent flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star className="size-4 fill-current" key={index} />
                    ))}
                  </div>
                  <h3 className="text-primary mt-4 text-xl font-semibold">
                    {artist.name}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {artist.service}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <p className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="size-4" />
                      {artist.city}
                    </p>
                    <p className="text-primary font-semibold">{artist.price}</p>
                  </div>
                  <Button className="mt-6 w-full" variant="salmon">
                    Book
                  </Button>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
