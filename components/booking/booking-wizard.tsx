"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { useBookingStore } from "@/stores/booking-store";
import type { BookingStep } from "@/features/bookings/types";
import { StepService } from "./step-service";
import { StepDateTime } from "./step-datetime";
import { StepSummary } from "./step-summary";
import type { Artist } from "@/features/artists/types";
import type { ArtistProfile } from "@/features/artists/profile-types";
import { cn } from "@/lib/utils";

type BookingWizardProps = {
  artist: Artist;
  profile: ArtistProfile;
  initialServiceId?: string;
};

const steps = [
  { num: 1, title: "Select Service", shortTitle: "Service" },
  { num: 2, title: "Date & Time", shortTitle: "Date" },
  { num: 3, title: "Review & Confirm", shortTitle: "Confirm" },
] as const;

export function BookingWizard({ artist, profile, initialServiceId }: Readonly<BookingWizardProps>) {
  const router = useRouter();
  const {
    step,
    setStep,
    setArtistSlug,
    setServiceId,
    resetBooking,
  } = useBookingStore();

  // Track whether the user completed the flow (went to success).
  // If they did, we must NOT call resetBooking on unmount — the success page
  // and the dashboard still need the wizard state.
  const confirmedRef = useRef(false);

  // Expose a way for StepSummary to signal completion
  const handleConfirmed = () => {
    confirmedRef.current = true;
  };

  useEffect(() => {
    // Initialize booking state when wizard mounts
    setArtistSlug(artist.slug);
    if (initialServiceId && profile.servicePackages.some(s => s.id === initialServiceId)) {
      setServiceId(initialServiceId);
      setStep(2); // Skip to step 2 if service is pre-selected
    } else {
      setStep(1);
    }

    return () => {
      // Only reset if the user did NOT confirm — i.e. they navigated away
      // without completing the booking (back button, closed tab mid-flow, etc.)
      if (!confirmedRef.current) {
        resetBooking();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    if (step > 1) {
      setStep((step === 3 ? 2 : 1) as BookingStep);
    } else {
      router.push(`/artists/${artist.slug}`);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Progress */}
      <div className="flex flex-col gap-6">
        <button
          onClick={handleBack}
          className="group text-muted-foreground hover:text-primary flex w-fit items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {step === 1 ? "Back to Profile" : "Back"}
        </button>

        <div>
          <h1 className="text-2xl font-bold text-primary md:text-3xl">Book an Appointment</h1>
          <p className="text-muted-foreground mt-1 text-sm">with {artist.name}</p>
        </div>

        {/* Progress Stepper */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-[18px] left-[18px] right-[18px] h-0.5 bg-muted overflow-hidden rounded-full">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex items-start justify-between">
            {steps.map((s) => {
              const isActive = s.num === step;
              const isCompleted = s.num < step;

              return (
                <div key={s.num} className="flex flex-col items-center gap-2 z-10">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                      isCompleted
                        ? "bg-primary text-primary-foreground shadow-soft scale-95"
                        : isActive
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-soft"
                          : "bg-muted text-muted-foreground border border-border",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="size-4" />
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap transition-colors duration-200",
                      isActive ? "text-primary" : isCompleted ? "text-primary/70" : "text-muted-foreground",
                    )}
                  >
                    <span className="hidden sm:inline">{s.title}</span>
                    <span className="sm:hidden">{s.shortTitle}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="animate-[fade-in_0.2s_ease-out]">
        {step === 1 && <StepService packages={profile.servicePackages} />}
        {step === 2 && <StepDateTime availability={profile.weeklyAvailability} />}
        {step === 3 && (
          <StepSummary
            artist={artist}
            packages={profile.servicePackages}
            onConfirmed={handleConfirmed}
          />
        )}
      </div>
    </div>
  );
}
