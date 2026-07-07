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
  "/profile",
  "/bookings",
] as const;

export const defaultAuthenticatedRedirect = "/artists";
