import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import type { UserRole } from "@prisma/client";
import {
  defaultAuthenticatedRedirect,
  guestOnlyRoutes,
  protectedRoutePrefixes,
  authRoutes,
  getDashboardRouteForRole,
  isArtistRole,
} from "@/server/auth";
import { resolveAuthSecret } from "@/server/auth-config";

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

const { auth } = NextAuth({
  secret: resolveAuthSecret(),
  session: { strategy: "jwt" },
  providers: [],
  trustHost: true,
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as UserRole) ?? null;
      }
      return session;
    },
  },
});

export default auth((request) => {
  const session = request.auth;
  const token = session?.user;
  const { pathname, search } = request.nextUrl;
  const role = token?.role;

  console.log("[Middleware] Session exists:", !!session, "Role:", role);

  const isGuestOnlyRoute = guestOnlyRoutes.some((routePath) =>
    matchesPrefix(pathname, routePath),
  );
  const isProtectedRoute = protectedRoutePrefixes.some((routePath) =>
    matchesPrefix(pathname, routePath),
  );
  const isCustomerDashboardRoute = matchesPrefix(pathname, "/dashboard");
  const isArtistDashboardRoute = matchesPrefix(pathname, "/artist-dashboard");

  if (session && isGuestOnlyRoute) {
    return NextResponse.redirect(
      new URL(defaultAuthenticatedRedirect, request.url),
    );
  }

  if (!session && isProtectedRoute) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && !role && isProtectedRoute) {
    const redirectUrl = new URL(authRoutes.selectRole, request.url);
    redirectUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && role && isCustomerDashboardRoute && isArtistRole(role)) {
    return NextResponse.redirect(
      new URL(getDashboardRouteForRole(role), request.url),
    );
  }

  if (session && role && isArtistDashboardRoute && !isArtistRole(role)) {
    return NextResponse.redirect(
      new URL(getDashboardRouteForRole(role), request.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
