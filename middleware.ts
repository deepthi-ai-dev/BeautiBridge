import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  defaultAuthenticatedRedirect,
  guestOnlyRoutes,
  protectedRoutePrefixes,
} from "@/server/auth";
import { resolveAuthSecret } from "@/server/auth-config";

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: resolveAuthSecret() });
  const { pathname, search } = request.nextUrl;

  const isGuestOnlyRoute = guestOnlyRoutes.some((routePath) =>
    matchesPrefix(pathname, routePath),
  );
  const isProtectedRoute = protectedRoutePrefixes.some((routePath) =>
    matchesPrefix(pathname, routePath),
  );

  if (token && isGuestOnlyRoute) {
    return NextResponse.redirect(
      new URL(defaultAuthenticatedRedirect, request.url),
    );
  }

  if (!token && isProtectedRoute) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
