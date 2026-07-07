import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { getAuthReadiness } from "@/features/auth/readiness";

type LoginPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
    registered?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const readiness = await getAuthReadiness();
  const params = await searchParams;
  const readinessMessage =
    [readiness.databaseMessage, readiness.secretMessage]
      .filter(Boolean)
      .join(" ") || null;

  return (
    <AuthCard
      description="Welcome back. Sign in with Google or your email and password."
      title="Sign in to BeautiBridge"
    >
      <LoginForm
        callbackUrl={params?.callbackUrl}
        googleDisabledReason={
          readiness.canUseGoogleOAuth
            ? null
            : "Google sign-in is unavailable. Add AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET in .env."
        }
        isGoogleOAuthAvailable={readiness.canUseGoogleOAuth}
        isReady={!readiness.hasBlockingIssue}
        readinessMessage={readinessMessage}
        successMessage={
          params?.registered === "1"
            ? "Account created successfully. Please sign in."
            : undefined
        }
      />
    </AuthCard>
  );
}
