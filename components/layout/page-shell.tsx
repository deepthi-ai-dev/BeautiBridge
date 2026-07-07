import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function PageShell({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-background text-foreground min-h-screen", className)}
      {...props}
    />
  );
}

export function PhasePlaceholder({
  title,
  phase,
}: Readonly<{
  title: string;
  phase: string;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="premium-card max-w-xl p-8">
        <p className="text-secondary text-sm font-semibold tracking-[0.24em] uppercase">
          {phase}
        </p>
        <h1 className="text-primary mt-3 text-3xl font-semibold">{title}</h1>
        <p className="text-muted-foreground mt-3">
          This route is scaffolded for the approved architecture and will be
          implemented in its scheduled phase.
        </p>
      </div>
    </main>
  );
}
