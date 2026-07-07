"use client";

import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeUp } from "@/lib/motion";

type AuthCardProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export function AuthCard({ children, description, title }: AuthCardProps) {
  return (
    <FadeUp>
      <Card className="premium-card w-full max-w-xl border-0">
        <CardHeader className="space-y-3 pb-4">
          <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
          <CardDescription className="text-sm leading-6">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </FadeUp>
  );
}
