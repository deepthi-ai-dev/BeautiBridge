import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MyBookingsList } from "@/components/bookings/my-bookings-list";

export default async function BookingsPage() {
  const session = await auth();
  if (!session) {
    redirect("/login?callbackUrl=/bookings");
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pb-24 pt-10">
        <div className="page-container max-w-4xl">
          <h1 className="text-3xl font-bold text-primary mb-8">Your Bookings</h1>
          
          <MyBookingsList />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
