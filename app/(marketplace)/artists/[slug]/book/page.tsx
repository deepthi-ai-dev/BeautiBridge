import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getRealArtistBySlug } from "@/features/artists/real-queries";
import { getProfileBySlug } from "@/features/artists/profile-mock-data";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { db } from "@/server/db";

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

  const artist = await getRealArtistBySlug(slug);
  if (!artist) {
    redirect("/artists");
  }

  const mockProfile = getProfileBySlug(slug);
  const { service } = await searchParams;

  const dbServices = await db.servicePackage.findMany({
    where: { artistId: artist.id },
  });

  const servicePackages = dbServices.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    description: pkg.description || "",
    duration: pkg.duration,
    price: pkg.price,
    isPopular: pkg.isPopular,
    includes: pkg.includes ? pkg.includes.split(",") : [],
  }));

  const profile = {
    ...mockProfile,
    servicePackages: servicePackages.length > 0 ? servicePackages : mockProfile.servicePackages,
  };

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
