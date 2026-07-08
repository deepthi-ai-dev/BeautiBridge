"use client";

import { UserRole } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import type { z } from "zod";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { RoleSelector } from "@/components/auth/role-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUserAction } from "@/features/auth/actions";
import { getSafeCallbackUrl } from "@/features/auth/redirect";
import { registerSchema } from "@/features/auth/schemas";
import { FadeUp } from "@/lib/motion";
import { authRoutes, defaultAuthenticatedRedirect } from "@/server/auth";

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  callbackUrl?: string;
  googleDisabledReason?: string | null;
  isGoogleOAuthAvailable: boolean;
  isReady: boolean;
  readinessMessage?: string | null;
};

export function RegisterForm({
  callbackUrl,
  googleDisabledReason,
  isGoogleOAuthAvailable,
  isReady,
  readinessMessage,
}: RegisterFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const safeCallbackUrl = getSafeCallbackUrl(
    callbackUrl,
    defaultAuthenticatedRedirect,
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      dob: "",
      address: "",
      experience: "",
      about: "",
      languages: "",
      hobbies: "",
      confirmPassword: "",
      email: "",
      password: "",
      role: UserRole.CUSTOMER,
    },
    resolver: zodResolver(registerSchema),
  });

  const selectedRole = watch("role");

  const onSubmit = (values: RegisterFormValues) => {
    setErrorMessage(null);

    startTransition(async () => {
      const response = await registerUserAction(values);

      if (response.status === "error") {
        if (response.fieldErrors?.name) {
          setError("name", { message: response.fieldErrors.name });
        }
        if (response.fieldErrors?.phone) {
          setError("phone", { message: response.fieldErrors.phone });
        }
        if (response.fieldErrors?.city) {
          setError("city", { message: response.fieldErrors.city });
        }
        if (response.fieldErrors?.email) {
          setError("email", { message: response.fieldErrors.email });
        }

        if (response.fieldErrors?.password) {
          setError("password", { message: response.fieldErrors.password });
        }

        if (response.fieldErrors?.confirmPassword) {
          setError("confirmPassword", {
            message: response.fieldErrors.confirmPassword,
          });
        }

        setErrorMessage(response.message);
        return;
      }

      router.push(
        `${authRoutes.login}?registered=1&callbackUrl=${encodeURIComponent(safeCallbackUrl)}`,
      );
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

      <FadeUp>
        <GoogleSignInButton
          callbackUrl={safeCallbackUrl}
          className="w-full hover:-translate-y-0.5"
          disabledReason={googleDisabledReason ?? undefined}
          isAvailable={isGoogleOAuthAvailable}
          label="Sign up with Google"
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
          <label className="text-sm font-medium" htmlFor="register-name">
            Full Name
          </label>
          <Input
            aria-describedby={errors.name ? "register-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id="register-name"
            placeholder="John Doe"
            type="text"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-destructive text-sm" id="register-name-error" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="register-phone">
              Phone Number
            </label>
            <Input
              aria-describedby={errors.phone ? "register-phone-error" : undefined}
              aria-invalid={Boolean(errors.phone)}
              autoComplete="tel"
              id="register-phone"
              placeholder="+91 9876543210"
              type="tel"
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="text-destructive text-sm" id="register-phone-error" role="alert">
                {errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="register-city">
              City
            </label>
            <Input
              aria-describedby={errors.city ? "register-city-error" : undefined}
              aria-invalid={Boolean(errors.city)}
              autoComplete="address-level2"
              id="register-city"
              placeholder="Mumbai"
              type="text"
              {...register("city")}
            />
            {errors.city ? (
              <p className="text-destructive text-sm" id="register-city-error" role="alert">
                {errors.city.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="register-dob">
              Date of Birth
            </label>
            <Input
              aria-describedby={errors.dob ? "register-dob-error" : undefined}
              aria-invalid={Boolean(errors.dob)}
              autoComplete="bday"
              id="register-dob"
              type="date"
              {...register("dob")}
            />
            {errors.dob ? (
              <p className="text-destructive text-sm" id="register-dob-error" role="alert">
                {errors.dob.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="register-address">
              Address
            </label>
            <Input
              aria-describedby={errors.address ? "register-address-error" : undefined}
              aria-invalid={Boolean(errors.address)}
              autoComplete="street-address"
              id="register-address"
              placeholder="123 Beauty Lane"
              type="text"
              {...register("address")}
            />
            {errors.address ? (
              <p className="text-destructive text-sm" id="register-address-error" role="alert">
                {errors.address.message}
              </p>
            ) : null}
          </div>
        </div>

        {selectedRole === UserRole.ARTIST && (
          <FadeUp className="space-y-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-sm font-semibold text-primary">Artist Profile Details</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" htmlFor="register-experience">
                  Years of Experience
                </label>
                <Input
                  aria-describedby={errors.experience ? "register-exp-error" : undefined}
                  aria-invalid={Boolean(errors.experience)}
                  id="register-experience"
                  placeholder="e.g. 5"
                  type="text"
                  {...register("experience")}
                />
                {errors.experience ? (
                  <p className="text-destructive text-xs" id="register-exp-error" role="alert">{errors.experience.message}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium" htmlFor="register-languages">
                  Spoken Languages
                </label>
                <Input
                  aria-describedby={errors.languages ? "register-lang-error" : undefined}
                  aria-invalid={Boolean(errors.languages)}
                  id="register-languages"
                  placeholder="English, Hindi, etc."
                  type="text"
                  {...register("languages")}
                />
                {errors.languages ? (
                  <p className="text-destructive text-xs" id="register-lang-error" role="alert">{errors.languages.message}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" htmlFor="register-about">
                Professional Bio / About
              </label>
              <Input
                aria-describedby={errors.about ? "register-about-error" : undefined}
                aria-invalid={Boolean(errors.about)}
                id="register-about"
                placeholder="Tell clients about your expertise..."
                type="text"
                {...register("about")}
              />
              {errors.about ? (
                <p className="text-destructive text-xs" id="register-about-error" role="alert">{errors.about.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" htmlFor="register-hobbies">
                Hobbies & Interests
              </label>
              <Input
                aria-describedby={errors.hobbies ? "register-hobbies-error" : undefined}
                aria-invalid={Boolean(errors.hobbies)}
                id="register-hobbies"
                placeholder="What do you do for fun?"
                type="text"
                {...register("hobbies")}
              />
              {errors.hobbies ? (
                <p className="text-destructive text-xs" id="register-hobbies-error" role="alert">{errors.hobbies.message}</p>
              ) : null}
            </div>
          </FadeUp>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="register-email">
            Email
          </label>
          <Input
            aria-describedby={errors.email ? "register-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="register-email"
            placeholder="you@example.com"
            type="email"
            {...register("email")}
          />
          {errors.email ? (
            <p
              className="text-destructive text-sm"
              id="register-email-error"
              role="alert"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">I am joining as</label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <RoleSelector
                disabled={isPending}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="register-password">
            Password
          </label>
          <div className="relative">
            <Input
              aria-describedby={errors.password ? "register-password-error" : undefined}
              aria-invalid={Boolean(errors.password)}
              autoComplete="new-password"
              id="register-password"
              placeholder="Create a secure password"
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
            <p
              className="text-destructive text-sm"
              id="register-password-error"
              role="alert"
            >
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="register-confirm">
            Confirm password
          </label>
          <div className="relative">
            <Input
              aria-describedby={
                errors.confirmPassword ? "register-confirm-password-error" : undefined
              }
              aria-invalid={Boolean(errors.confirmPassword)}
              autoComplete="new-password"
              id="register-confirm"
              placeholder="Re-enter your password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
            />
            <button
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              aria-pressed={showConfirmPassword}
              className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              onClick={() =>
                setShowConfirmPassword((currentValue) => !currentValue)
              }
              type="button"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p
              className="text-destructive text-sm"
              id="register-confirm-password-error"
              role="alert"
            >
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        <p className="text-muted-foreground text-xs">
          Use at least 8 characters with uppercase, lowercase, and a number.
        </p>

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
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{" "}
        <Link
          className="text-primary font-semibold hover:underline"
          href={`${authRoutes.login}?callbackUrl=${encodeURIComponent(safeCallbackUrl)}`}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
