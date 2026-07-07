import type { UserRole } from "@prisma/client";

export const authRoutes = {
  login: "/login",
  register: "/register",
  selectRole: "/select-role",
} as const;

export const guestOnlyRoutes = [
  authRoutes.login,
  authRoutes.register,
] as const;

export const protectedRoutePrefixes = [
  "/dashboard",
  "/artist-dashboard",
  "/profile",
  "/bookings",
] as const;

export const defaultAuthenticatedRedirect = "/dashboard";

export function isArtistRole(role: UserRole | null | undefined) {
  return role === "ARTIST";
}

export function getDashboardRouteForRole(role: UserRole | null | undefined) {
  return isArtistRole(role) ? "/artist-dashboard" : "/dashboard";
}
