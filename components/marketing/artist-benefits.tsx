import {
  CalendarDays,
  Eye,
  Grid2X2,
  HeartHandshake,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { FadeUp, StaggerContainer } from "@/lib/motion";

const benefits = [
  {
    description:
      "A beautiful profile with your portfolio, services, and pricing.",
    icon: Grid2X2,
    title: "Showcase your work",
  },
  {
    description:
      "Appear in local searches and AI recommendations for nearby clients.",
    icon: Eye,
    title: "Get discovered",
  },
  {
    description: "Track requests, confirm appointments, and stay organized.",
    icon: CalendarDays,
    title: "Manage bookings",
  },
  {
    description: "Build a steady client stream without middlemen.",
    icon: HeartHandshake,
    title: "Grow your clients",
  },
] as const;

const dashboardStats = [
  { label: "Revenue", value: "₹1.2L", change: "+18%", icon: TrendingUp },
  { label: "Bookings", value: "34", change: "+6 this week", icon: CalendarDays },
  { label: "Rating", value: "4.9", change: "128 reviews", icon: Star },
  { label: "Availability", value: "Open", change: "6 slots left", icon: Eye },
  { label: "New clients", value: "12", change: "+4 this month", icon: Users },
  { label: "Portfolio views", value: "2.4K", change: "+22%", icon: Grid2X2 },
] as const;

export function ArtistBenefits() {
  return (
    <section className="section-y light-section bg-beige-200 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(84,40,67,0.08),transparent_60%)]"
      />

      <div className="page-container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <FadeUp className="order-2 lg:order-1">
          <p className="text-xs font-semibold tracking-[0.42em] uppercase text-secondary">
            For artists
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            Grow your craft into a{" "}
            <span className="bg-[linear-gradient(135deg,var(--primary),var(--salmon-400))] bg-clip-text text-transparent">
              thriving business.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            BeautiBridge gives independent beauty professionals the visibility,
            tools, and steady stream of clients they deserve — no big salon, no
            middlemen, just your talent reaching the women who need it.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                className="group rounded-2xl border border-border/70 bg-card p-5 shadow-[0_4px_16px_rgba(53,27,49,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_12px_32px_rgba(53,27,49,0.12)]"
                key={benefit.title}
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-salmon-400/10">
                  <benefit.icon className="size-5 text-secondary" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-foreground/65">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-5 shadow-[0_20px_60px_rgba(53,27,49,0.13)] sm:p-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Artist dashboard
                </p>
                <h3 className="mt-1 text-lg font-bold text-foreground">Ananya Bridal Studio</h3>
              </div>
              <span className="rounded-full bg-teal-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-500">
                Pro
              </span>
            </div>

            <StaggerContainer className="mt-5 grid grid-cols-2 gap-3">
              {dashboardStats.map((stat) => (
                <div
                  className="rounded-xl border border-border/60 bg-background/70 p-3.5 shadow-[0_2px_8px_rgba(53,27,49,0.05)]"
                  key={stat.label}
                >
                  <div className="flex items-center justify-between">
                    <stat.icon className="size-4 text-secondary" />
                    <span className="text-[10px] font-semibold text-teal-500">{stat.change}</span>
                  </div>
                  <p className="mt-2 text-xl font-bold tracking-tight text-foreground">{stat.value}</p>
                  <p className="text-[11px] font-medium text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </StaggerContainer>

            <div className="mt-4 rounded-xl border border-border/50 bg-background/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">Monthly growth</p>
                <span className="text-xs font-bold text-teal-500">+24%</span>
              </div>
              <div className="mt-3 flex h-16 items-end gap-1.5">
                {[35, 48, 42, 58, 52, 72, 68].map((h, i) => (
                  <div
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary/80 to-salmon-400/60 transition-all duration-300 hover:from-primary hover:to-secondary"
                    key={i}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
