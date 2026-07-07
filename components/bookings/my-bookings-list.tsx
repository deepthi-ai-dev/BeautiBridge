"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Clock, XCircle, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/stores/booking-store";
import { rupeeFormatter } from "@/lib/formatters";

export function MyBookingsList() {
  const { mockBookings, cancelMockBooking } = useBookingStore();

  if (mockBookings.length === 0) {
    return (
      <div className="premium-card flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Calendar className="size-8 text-muted-foreground" />
        </div>
        
        <h2 className="text-xl font-semibold text-primary mb-2">No Active Bookings</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          You don&apos;t have any upcoming appointments scheduled yet. Explore our marketplace to find the perfect artist for your needs.
        </p>
        
        <Link href="/artists">
          <Button variant="primary">
            Explore Artists <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {mockBookings.map((booking) => {
        const displayDate = new Date(booking.date).toLocaleDateString("en-US", { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });

        return (
          <div key={booking.id} className="premium-card overflow-hidden">
            <div className="flex flex-col sm:flex-row border-b border-border">
              {/* Artist Info */}
              <div className="bg-muted/30 p-5 sm:w-1/3 flex items-start gap-4 border-b sm:border-b-0 sm:border-r border-border">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border">
                  <Image
                    alt={booking.artistName}
                    className="h-full w-full object-cover"
                    fill
                    sizes="48px"
                    src={booking.artistAvatar}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{booking.artistName}</h3>
                  <Link href={`/artists/${booking.artistSlug}`} className="text-xs text-accent hover:underline font-medium">
                    View Profile
                  </Link>
                </div>
              </div>
              
              {/* Booking Details */}
              <div className="p-5 flex-1 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Service</p>
                  <p className="font-medium text-foreground">{booking.serviceName}</p>
                  <p className="text-sm font-semibold text-primary mt-1">{rupeeFormatter.format(booking.price)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Schedule</p>
                  <div className="space-y-1">
                    <p className="text-sm text-foreground flex items-center gap-2">
                      <Calendar className="size-3.5 text-muted-foreground" />
                      {displayDate}
                    </p>
                    <p className="text-sm text-foreground flex items-center gap-2">
                      <Clock className="size-3.5 text-muted-foreground" />
                      {booking.timeSlot}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Bar */}
            <div className="bg-card p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                  booking.status === 'Upcoming' ? 'bg-teal-500/10 text-teal-600 border-teal-500/20' : 
                  booking.status === 'Cancelled' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                  'bg-primary/10 text-primary border-primary/20'
                }`}>
                  {booking.status}
                </span>
                <span className="text-xs text-muted-foreground hidden sm:inline-block">
                  ID: #{booking.id.toUpperCase()}
                </span>
              </div>
              
              {booking.status === 'Upcoming' && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => cancelMockBooking(booking.id)}
                  >
                    <XCircle className="size-3.5 mr-1.5" />
                    Cancel
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarClock className="size-3.5 mr-1.5" />
                    Reschedule
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
