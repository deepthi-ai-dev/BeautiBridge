import type { ReactNode } from "react";
import Link from "next/link";

export function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="warm-surface flex min-h-screen items-center justify-center px-4 py-8 md:px-6 md:py-12">
      <div className="w-full max-w-xl space-y-6">
        <Link
          className="text-primary block text-center text-xl font-bold tracking-tight transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          href="/"
        >
          BeautiBridge
        </Link>
        {children}
      </div>
    </main>
  );
}
