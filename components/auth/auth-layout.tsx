import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="light-section bg-[linear-gradient(180deg,rgba(255,248,239,0.8),rgba(255,244,234,0.6))] text-foreground relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 md:px-6 md:py-12">
      {/* Background */}
      <div className="absolute inset-0 -z-10" />
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
          className="group flex items-center justify-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 rounded-xl"
          href="/"
        >
          <Image
            src="/logo.png"
            alt="BeautiBridge"
            width={240}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        {children}
      </div>
    </main>
  );
}
