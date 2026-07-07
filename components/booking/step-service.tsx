"use client";

import { useBookingStore } from "@/stores/booking-store";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { rupeeFormatter } from "@/lib/formatters";
import type { ServicePackage } from "@/features/artists/profile-types";

export function StepService({ packages }: Readonly<{ packages: ServicePackage[] }>) {
  const { serviceId, setServiceId, setStep } = useBookingStore();

  const handleSelect = (id: string) => {
    setServiceId(id);
    setStep(2);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-primary mb-2">Select a Service</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {packages.map((pkg) => {
          const isSelected = serviceId === pkg.id;
          
          return (
            <button
              key={pkg.id}
              onClick={() => handleSelect(pkg.id)}
              className={[
                "premium-card text-left relative overflow-hidden p-5 transition-all duration-300 hover:shadow-[var(--shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected ? "ring-2 ring-primary bg-primary/5" : "",
                pkg.isPopular && !isSelected ? "ring-1 ring-primary/30" : ""
              ].join(" ")}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="flex items-center gap-1.5 rounded-bl-xl bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground uppercase tracking-wider">
                    <Sparkles className="size-3" />
                    Popular
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-primary text-lg font-semibold pr-16">{pkg.name}</h3>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 min-h-10">
                {pkg.description}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{pkg.duration}</Badge>
              </div>
              
              <div className="bg-background rounded-xl p-3 mb-4">
                <ul className="space-y-1.5">
                  {pkg.includes.slice(0, 3).map((item) => (
                    <li className="flex items-start gap-2 text-xs" key={item}>
                      <Check className="text-teal-400 mt-0.5 size-3.5 shrink-0" />
                      <span className="text-foreground/80 line-clamp-1">{item}</span>
                    </li>
                  ))}
                  {pkg.includes.length > 3 && (
                    <li className="text-xs text-muted-foreground pl-5 font-medium">
                      + {pkg.includes.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-2">
                <p className="text-primary text-xl font-bold">
                  {rupeeFormatter.format(pkg.price)}
                </p>
                <div className={[
                  "flex size-6 items-center justify-center rounded-full border-2 transition-colors",
                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30 text-transparent"
                ].join(" ")}>
                  <Check className="size-3.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
