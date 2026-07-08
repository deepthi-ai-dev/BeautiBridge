// Server Component — no "use client" directive.
// SiteHeader and SiteFooter are async Server Components that call auth().
// They MUST live in a server context. Only BookingConfirmationCard is client-side.

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BookingConfirmationCard } from "@/components/booking/booking-confirmation-card";

export default function BookingSuccessPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pb-24 pt-20 flex justify-center">
        <div className="page-container max-w-xl">
          <BookingConfirmationCard />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
