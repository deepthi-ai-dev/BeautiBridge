import Link from "next/link";
import { CheckCircle, Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function BookingSuccessPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pb-24 pt-20 flex justify-center">
        <div className="page-container max-w-xl">
          <div className="premium-card flex flex-col items-center p-10 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle className="size-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-primary mb-3">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your appointment has been successfully scheduled. We&apos;ve sent the details to your registered email.
            </p>
            
            <div className="w-full rounded-2xl bg-muted p-6 mb-8 text-left space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="size-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">See dashboard for details</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-semibold text-foreground">See dashboard for details</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="size-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Artist</p>
                  <p className="font-semibold text-foreground">See dashboard for details</p>
                </div>
              </div>
            </div>
            
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Link href="/artists" className="flex-1">
                <Button className="w-full" variant="outline">
                  <ArrowLeft className="mr-2 size-4" />
                  Back to Artists
                </Button>
              </Link>
              <Link href="/bookings" className="flex-1">
                <Button className="w-full" variant="primary">
                  View Bookings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
