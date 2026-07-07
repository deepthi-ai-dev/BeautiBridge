"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useBookingStore } from "@/stores/booking-store";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Scissors, MapPin, CheckCircle2 } from "lucide-react";
import { rupeeFormatter } from "@/lib/formatters";
import type { Artist } from "@/features/artists/types";
import type { ServicePackage } from "@/features/artists/profile-types";

type StepSummaryProps = {
  artist: Artist;
  packages: ServicePackage[];
};

export function StepSummary({ artist, packages }: Readonly<StepSummaryProps>) {
  const router = useRouter();
  const { serviceId, date, timeSlot, addMockBooking } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const selectedService = packages.find(p => p.id === serviceId);

  // Formatting date for display
  const displayDate = date ? new Date(date).toLocaleDateString("en-US", { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : "";

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Create mock booking record
    if (selectedService && date && timeSlot) {
      addMockBooking({
        id: Math.random().toString(36).substring(2, 9),
        artistSlug: artist.slug,
        artistName: artist.name,
        artistAvatar: artist.coverImage || "/images/placeholder.svg",
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: date,
        timeSlot: timeSlot,
        price: selectedService.price,
        status: "Upcoming",
      });
    }

    // Simulate API call
    setTimeout(() => {
      router.push(`/artists/${artist.slug}/book/success`);
    }, 1500);
  };

  if (!selectedService || !date || !timeSlot) {
    return <div>Missing booking information. Please go back.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">Review & Confirm</h2>
      
      <div className="premium-card overflow-hidden">
        {/* Artist Info Header */}
        <div className="bg-primary/5 p-5 border-b border-border flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
            <Image
              alt={artist.name}
              className="h-full w-full object-cover"
              fill
              sizes="64px"
              src={artist.avatar}
            />
          </div>
          <div>
            <h3 className="font-bold text-primary text-lg">{artist.name}</h3>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <MapPin className="size-3" />
              {artist.city}, {artist.state}
            </p>
          </div>
        </div>
        
        <div className="p-5 sm:p-8 grid gap-8 md:grid-cols-2">
          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Appointment Details
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarIcon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{displayDate}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium text-foreground">{timeSlot}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Scissors className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium text-foreground">{selectedService.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{selectedService.duration}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
              <p className="flex gap-2">
                <CheckCircle2 className="size-4 text-teal-500 shrink-0 mt-0.5" />
                <span>Free cancellation up to 24 hours before the appointment.</span>
              </p>
            </div>
          </div>
          
          {/* Pricing Summary */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Payment Summary
            </p>
            
            <div className="bg-card border-border rounded-2xl border p-5 flex-1 flex flex-col">
              <div className="space-y-3 flex-1 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">{selectedService.name}</span>
                  <span className="font-medium">{rupeeFormatter.format(selectedService.price)}</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium">{rupeeFormatter.format(selectedService.price * 0.18)}</span>
                </div>
              </div>
              
              <div className="border-t border-dashed border-border mt-4 pt-4">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {rupeeFormatter.format(selectedService.price * 1.18)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-right mt-1">
                  Pay at venue
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-muted p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            By confirming, you agree to our Terms of Service and Cancellation Policy.
          </p>
          <Button 
            onClick={handleConfirm} 
            disabled={isSubmitting}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Confirming..." : "Confirm Booking"}
          </Button>
        </div>
      </div>
    </div>
  );
}
