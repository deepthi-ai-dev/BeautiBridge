import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import { getAuthReadiness } from "@/features/auth/readiness";

type RegisterPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const readiness = await getAuthReadiness();
  const params = await searchParams;
  const readinessMessage =
    [readiness.databaseMessage, readiness.secretMessage]
      .filter(Boolean)
      .join(" ") || null;

  return (
    <AuthCard
      description="Create your account as a customer or beauty artist."
      title="Create your BeautiBridge account"
    >
      <RegisterForm
        callbackUrl={params?.callbackUrl}
        googleDisabledReason={
          readiness.canUseGoogleOAuth
            ? null
            : "Google sign-up is unavailable. Add AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET in .env."
        }
        isGoogleOAuthAvailable={readiness.canUseGoogleOAuth}
        isReady={!readiness.hasBlockingIssue}
        readinessMessage={readinessMessage}
      />
    </AuthCard>
  );
}
