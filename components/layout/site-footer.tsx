import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-plum-950 text-beige-100 py-16">
      <div className="page-container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">BeautiBridge</p>
          <p className="text-beige-200/75 mt-4 max-w-sm text-sm leading-6">
            Connecting customers with trusted freelance beauty artists nearby.
          </p>
        </div>
        <div>
          <p className="text-accent text-xs font-semibold tracking-[0.28em] uppercase">
            Explore
          </p>
          <div className="text-beige-200/80 mt-4 grid gap-3 text-sm">
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/artists">Find artists</Link>
            <Link href="/#ai-assistant">AI Assistant</Link>
          </div>
        </div>
        <div>
          <p className="text-accent text-xs font-semibold tracking-[0.28em] uppercase">
            Get Started
          </p>
          <div className="text-beige-200/80 mt-4 grid gap-3 text-sm">
            <Link href="/artists">Find Artists</Link>
            <Link href="/artist">Join as an artist</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
