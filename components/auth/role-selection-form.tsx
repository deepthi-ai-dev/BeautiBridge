"use client";

import { UserRole } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { RoleSelector } from "@/components/auth/role-selector";
import { Button } from "@/components/ui/button";
import { selectUserRoleAction } from "@/features/auth/actions";

type RoleSelectionFormProps = {
  callbackUrl?: string;
};

export function RoleSelectionForm({ callbackUrl }: RoleSelectionFormProps) {
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    setErrorMessage(null);

    startTransition(async () => {
      const result = await selectUserRoleAction({ callbackUrl, role });

      if (result?.status === "error") {
        setErrorMessage(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      <RoleSelector disabled={isPending} onChange={setRole} value={role} />

      {errorMessage ? (
        <p className="text-destructive text-sm" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        aria-busy={isPending}
        className="w-full"
        disabled={isPending}
        onClick={onSubmit}
        type="button"
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isPending ? "Saving role..." : "Continue"}
      </Button>
    </div>
  );
}
