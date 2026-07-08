import { auth } from "@/auth";
import { isArtistRole } from "@/server/auth";
import { SiteHeaderClient } from "@/components/layout/site-header-client";

export async function SiteHeader({ className }: Readonly<{ className?: string }>) {
  const session = await auth();
  const user = session?.user;
  console.log("[SiteHeader] user:", user);
  const isLoggedIn = Boolean(user);
  const isArtist = isArtistRole(user?.role);

  return (
    <SiteHeaderClient
      className={className}
      isLoggedIn={isLoggedIn}
      isArtist={isArtist}
      user={user}
    />
  );
}
