const isProduction = process.env.NODE_ENV === "production";

function normalizeEnvValue(value: string | undefined) {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : null;
}

export const authConfig = {
  get googleClientId() {
    return normalizeEnvValue(process.env.AUTH_GOOGLE_ID);
  },
  get googleClientSecret() {
    return normalizeEnvValue(process.env.AUTH_GOOGLE_SECRET);
  },
  get isGoogleOAuthEnabled() {
    return Boolean(this.googleClientId && this.googleClientSecret);
  },
  isProduction,
};

export function resolveAuthSecret() {
  const configuredSecret = normalizeEnvValue(process.env.AUTH_SECRET);

  if (configuredSecret) {
    return configuredSecret;
  }

  const appUrl = normalizeEnvValue(process.env.NEXT_PUBLIC_APP_URL);

  return `${appUrl ?? "local-app-url"}:auth-fallback-secret`;
}
