import type { ReactNode } from "react";
import Link from "next/link";

export function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 md:px-6 md:py-12">
      {/* Background */}
      <div className="warm-surface absolute inset-0 -z-10" />
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-salmon-300/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gold-400/10 blur-3xl"
      />

      <div className="relative w-full max-w-xl space-y-6">
        {/* Logo */}
        <Link
          className="group flex items-center justify-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 rounded-full"
          href="/"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-salmon-300 to-primary text-sm font-black text-white shadow-soft transition-transform duration-200 group-hover:scale-105">
            B
          </span>
          <span className="text-primary text-xl font-bold tracking-tight">BeautiBridge</span>
        </Link>
        {children}
      </div>
    </main>
  );
}
