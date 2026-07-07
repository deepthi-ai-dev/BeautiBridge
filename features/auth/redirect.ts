export function getSafeCallbackUrl(
  callbackUrl: string | undefined,
  fallback: string,
) {
  if (!callbackUrl) {
    return fallback;
  }

  if (!callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
    return fallback;
  }

  return callbackUrl;
}
