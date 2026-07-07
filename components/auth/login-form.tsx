"use client";

import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSafeCallbackUrl } from "@/features/auth/redirect";
import { loginSchema } from "@/features/auth/schemas";
import { FadeUp } from "@/lib/motion";
import { authRoutes, defaultAuthenticatedRedirect } from "@/server/auth";

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  callbackUrl?: string;
  googleDisabledReason?: string | null;
  isGoogleOAuthAvailable: boolean;
  isReady: boolean;
  readinessMessage?: string | null;
  successMessage?: string;
};

export function LoginForm({
  callbackUrl,
  googleDisabledReason,
  isGoogleOAuthAvailable,
  isReady,
  readinessMessage,
  successMessage,
}: LoginFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const safeCallbackUrl = getSafeCallbackUrl(
    callbackUrl,
    defaultAuthenticatedRedirect,
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    setErrorMessage(null);

    startTransition(async () => {
      const response = await signIn("credentials", {
        callbackUrl: safeCallbackUrl,
        email: values.email,
        password: values.password,
        redirect: false,
        rememberMe: values.rememberMe ? "true" : "false",
      });

      if (!response || response.error) {
        setErrorMessage("Invalid email or password.");
        return;
      }

      router.push((response.url ?? safeCallbackUrl) as Route);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      {readinessMessage ? (
        <p
          aria-live="polite"
          className="rounded-xl border border-destructive/35 bg-destructive/10 px-3 py-2 text-sm"
          role="status"
        >
          {readinessMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p
          aria-live="polite"
          className="rounded-xl border border-teal-400/50 bg-teal-400/10 px-3 py-2 text-sm"
          role="status"
        >
          {successMessage}
        </p>
      ) : null}

      <FadeUp>
        <GoogleSignInButton
          callbackUrl={safeCallbackUrl}
          className="w-full hover:-translate-y-0.5"
          disabledReason={googleDisabledReason ?? undefined}
          isAvailable={isGoogleOAuthAvailable}
        />
      </FadeUp>

      <div className="flex items-center gap-3">
        <div className="bg-border h-px flex-1" />
        <span className="text-muted-foreground text-xs font-medium uppercase">
          or
        </span>
        <div className="bg-border h-px flex-1" />
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="login-email">
            Email
          </label>
          <Input
            aria-describedby={errors.email ? "login-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="login-email"
            placeholder="you@example.com"
            type="email"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-destructive text-sm" id="login-email-error" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="login-password">
            Password
          </label>
          <div className="relative">
            <Input
              aria-describedby={errors.password ? "login-password-error" : undefined}
              aria-invalid={Boolean(errors.password)}
              autoComplete="current-password"
              id="login-password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              onClick={() => setShowPassword((currentValue) => !currentValue)}
              type="button"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-destructive text-sm" id="login-password-error" role="alert">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input
              className="accent-primary size-4 rounded"
              type="checkbox"
              {...register("rememberMe")}
            />
            Remember me
          </label>
          <Link className="text-primary hover:underline" href="#">
            Forgot password?
          </Link>
        </div>

        {errorMessage ? (
          <p className="text-destructive text-sm" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <Button
          aria-busy={isPending}
          className="w-full"
          disabled={isPending || !isReady}
          type="submit"
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          className="text-primary font-semibold hover:underline"
          href={
            `${authRoutes.register}?callbackUrl=${encodeURIComponent(safeCallbackUrl)}` as Route
          }
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
