import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getArtistBySlug } from "@/features/artists/queries";
import { getProfileBySlug } from "@/features/artists/profile-mock-data";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const session = await auth();
  const { slug } = await params;
  
  if (!session) {
    redirect(`/login?callbackUrl=/artists/${slug}/book`);
  }

  const artist = getArtistBySlug(slug);
  if (!artist) {
    redirect("/artists");
  }

  const profile = getProfileBySlug(slug);
  const { service } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pb-24 pt-10">
        <div className="page-container max-w-4xl">
          <BookingWizard 
            artist={artist} 
            profile={profile} 
            initialServiceId={service} 
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
