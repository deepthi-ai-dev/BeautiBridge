"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { getSafeCallbackUrl } from "@/features/auth/redirect";
import { defaultAuthenticatedRedirect } from "@/server/auth";

type GoogleSignInButtonProps = {
  disabledReason?: string;
  callbackUrl?: string;
  className?: string;
  isAvailable?: boolean;
  label?: string;
};

function GoogleIcon() {
  return (
    <svg aria-hidden className="size-4" viewBox="0 0 24 24">
      <path
        d="M23.49 12.27c0-.79-.07-1.56-.22-2.3H12v4.36h6.44a5.52 5.52 0 0 1-2.39 3.63v3h3.87c2.27-2.09 3.57-5.17 3.57-8.69Z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.87-3c-1.07.72-2.43 1.14-4.07 1.14-3.13 0-5.78-2.11-6.72-4.95H1.29v3.1A12 12 0 0 0 12 24Z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.55.38-2.28v-3.1H1.29A12 12 0 0 0 0 12c0 1.93.46 3.75 1.29 5.38l3.99-3.1Z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.77c1.76 0 3.33.61 4.57 1.81l3.42-3.42C17.95 1.2 15.24 0 12 0 7.3 0 3.23 2.69 1.29 6.62l3.99 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function GoogleSignInButton({
  disabledReason,
  callbackUrl,
  className,
  isAvailable = true,
  label = "Continue with Google",
}: GoogleSignInButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const safeCallbackUrl = getSafeCallbackUrl(
    callbackUrl,
    defaultAuthenticatedRedirect,
  );

  const handleGoogleSignIn = () => {
    if (!isAvailable) {
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        await signIn("google", {
          callbackUrl: `/select-role?callbackUrl=${encodeURIComponent(safeCallbackUrl)}`,
        });
      } catch {
        setError("Unable to continue with Google. Please try again.");
      }
    });
  };

  return (
    <div className="space-y-2">
      <Button
        aria-disabled={!isAvailable}
        className={className}
        disabled={isPending || !isAvailable}
        onClick={handleGoogleSignIn}
        type="button"
        variant="outline"
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {!isPending ? <GoogleIcon /> : null}
        {label}
      </Button>
      {!isAvailable && disabledReason ? (
        <p className="text-muted-foreground text-sm">{disabledReason}</p>
      ) : null}
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
    </div>
  );
}
