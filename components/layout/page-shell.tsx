export function PhasePlaceholder({
  title,
  phase,
}: Readonly<{
  title: string;
  phase: string;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="border-border bg-card max-w-xl rounded-[var(--radius)] border p-8 shadow-sm">
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
