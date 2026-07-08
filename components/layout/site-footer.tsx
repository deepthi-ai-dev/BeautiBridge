import Link from "next/link";

const footerLinks = {
  explore: [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/artists", label: "Find artists" },
    { href: "/#ai-assistant", label: "AI Assistant" },
  ],
  getStarted: [
    { href: "/artists", label: "Find Artists" },
    { href: "/artist", label: "Join as an artist" },
    { href: "/register", label: "Create account" },
  ],
} as const;

export function SiteFooter() {
  return (
    <footer className="bg-plum-950 text-beige-100">
      {/* Main footer content */}
      <div className="page-container grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:gap-10">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-salmon-300 to-primary text-[11px] font-black text-white">
              B
            </span>
            <span className="text-lg font-bold">BeautiBridge</span>
          </div>
          <p className="text-beige-200/70 mt-5 max-w-xs text-sm leading-6.5">
            Connecting customers with trusted freelance beauty artists nearby.
            Discover, compare, and book with confidence.
          </p>
          {/* Social / Trust signals */}
          <div className="mt-6 flex items-center gap-1.5">
            <span className="flex h-7 items-center gap-1.5 rounded-full bg-white/8 px-3 text-[11px] font-medium text-beige-200/80">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              500+ verified artists
            </span>
          </div>
        </div>

        {/* Explore column */}
        <div>
          <p className="text-accent text-xs font-bold tracking-[0.28em] uppercase">
            Explore
          </p>
          <div className="mt-5 flex flex-col gap-3.5">
            {footerLinks.explore.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-beige-200/70 hover:text-beige-50 text-sm transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Get Started column */}
        <div>
          <p className="text-accent text-xs font-bold tracking-[0.28em] uppercase">
            Get Started
          </p>
          <div className="mt-5 flex flex-col gap-3.5">
            {footerLinks.getStarted.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-beige-200/70 hover:text-beige-50 text-sm transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="page-container flex flex-wrap items-center justify-between gap-4 py-5 text-xs text-beige-200/50">
          <p>© {new Date().getFullYear()} BeautiBridge. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-beige-200/80 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-beige-200/80 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
