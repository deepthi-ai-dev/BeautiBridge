import { cn } from "@/lib/utils";
import type { BookingStatus, AppointmentStatus } from "@/lib/mock-data";

type AnyStatus = BookingStatus | AppointmentStatus;

const STATUS_CONFIG: Record<AnyStatus, { label: string; className: string; dotColor: string }> = {
  cancelled: {
    className: "bg-destructive/10 text-destructive border border-destructive/20",
    dotColor: "bg-destructive",
    label: "Cancelled",
  },
  completed: {
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700/30",
    dotColor: "bg-emerald-500",
    label: "Completed",
  },
  confirmed: {
    className: "bg-primary/8 text-primary border border-primary/15",
    dotColor: "bg-primary",
    label: "Confirmed",
  },
  pending: {
    className: "bg-amber-50 text-amber-700 border border-amber-200/60 dark:bg-amber-900/20 dark:text-gold-400 dark:border-amber-700/30",
    dotColor: "bg-amber-500",
    label: "Pending",
  },
  upcoming: {
    className: "bg-primary/8 text-primary border border-primary/15",
    dotColor: "bg-primary",
    label: "Upcoming",
  },
};

interface StatusBadgeProps {
  status: AnyStatus;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, className, showDot = false }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    className: "bg-muted text-muted-foreground border border-border",
    dotColor: "bg-muted-foreground",
    label: status,
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      {showDot && (
        <span className={cn("size-1.5 rounded-full", config.dotColor)} />
      )}
      {config.label}
    </span>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon = "📭",
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 py-20 text-center",
        className,
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-3xl shadow-sm">
        {icon}
      </div>
      <div className="max-w-xs space-y-1.5">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function DashboardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="premium-card p-4"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-start gap-4">
            <div className="skeleton size-11 rounded-xl" />
            <div className="flex-1 space-y-2.5 py-0.5">
              <div className="skeleton h-3.5 w-2/5 rounded-lg" />
              <div className="skeleton h-3 w-3/5 rounded-lg" />
            </div>
            <div className="skeleton h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="premium-card flex items-start gap-4 p-5">
      <div className="skeleton size-11 rounded-xl" />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-7 w-24 rounded" />
      </div>
    </div>
  );
}

interface AvatarInitialsProps {
  initials: string;
  gradient?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarInitials({
  initials,
  gradient = "from-salmon-300 to-primary",
  size = "md",
  className,
}: AvatarInitialsProps) {
  const sizes = {
    lg: "size-14 text-base",
    md: "size-10 text-sm",
    sm: "size-8 text-xs",
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl font-bold text-white bg-gradient-to-br shadow-sm",
        gradient,
        sizes[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}

export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "size-3.5 transition-colors",
            i < Math.floor(rating) ? "text-gold-400" : "text-muted",
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1.5 text-xs font-semibold text-foreground">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export function SectionDivider({ label }: { label?: string }) {
  if (!label) return <div className="h-px bg-border" />;
  return (
    <div className="relative flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
