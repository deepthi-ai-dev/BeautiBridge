"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useBookingStore } from "@/stores/booking-store";
import type { BookingStep } from "@/features/bookings/types";
import { StepService } from "./step-service";
import { StepDateTime } from "./step-datetime";
import { StepSummary } from "./step-summary";
import type { Artist } from "@/features/artists/types";
import type { ArtistProfile } from "@/features/artists/profile-types";

type BookingWizardProps = {
  artist: Artist;
  profile: ArtistProfile;
  initialServiceId?: string;
};

export function BookingWizard({ artist, profile, initialServiceId }: Readonly<BookingWizardProps>) {
  const router = useRouter();
  const { 
    step, 
    setStep, 
    setArtistSlug, 
    setServiceId, 
    resetBooking 
  } = useBookingStore();

  useEffect(() => {
    // Initialize booking state
    setArtistSlug(artist.slug);
    if (initialServiceId && profile.servicePackages.some(s => s.id === initialServiceId)) {
      setServiceId(initialServiceId);
      setStep(2); // Skip to step 2 if service is pre-selected
    } else {
      setStep(1);
    }

    return () => {
      // Clean up when unmounting
      resetBooking();
    };
  }, [artist.slug, initialServiceId, profile.servicePackages, setArtistSlug, setServiceId, setStep, resetBooking]);

  const handleBack = () => {
    if (step > 1) {
      setStep((step === 3 ? 2 : 1) as BookingStep);
    } else {
      router.push(`/artists/${artist.slug}`);
    }
  };

  const steps = [
    { num: 1, title: "Select Service" },
    { num: 2, title: "Date & Time" },
    { num: 3, title: "Summary" }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Progress */}
      <div className="flex flex-col gap-6">
        <button 
          onClick={handleBack}
          className="text-muted-foreground hover:text-primary flex w-fit items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="size-4" />
          {step === 1 ? "Back to Profile" : "Back"}
        </button>
        
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">with {artist.name}</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between relative mt-4">
          <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {steps.map((s) => {
            const isActive = s.num === step;
            const isCompleted = s.num < step;
            
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                <div className={[
                  "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                  isActive ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : 
                  isCompleted ? "bg-primary text-primary-foreground" : 
                  "bg-muted text-muted-foreground"
                ].join(" ")}>
                  {s.num}
                </div>
                <span className={[
                  "absolute -bottom-6 whitespace-nowrap text-xs font-medium",
                  isActive ? "text-primary" : "text-muted-foreground"
                ].join(" ")}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-8">
        {step === 1 && <StepService packages={profile.servicePackages} />}
        {step === 2 && <StepDateTime availability={profile.weeklyAvailability} />}
        {step === 3 && <StepSummary artist={artist} packages={profile.servicePackages} />}
      </div>
    </div>
  );
}
