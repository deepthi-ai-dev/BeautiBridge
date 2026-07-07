import { cn } from "@/lib/utils";
import type { BookingStatus, AppointmentStatus } from "@/lib/mock-data";

type AnyStatus = BookingStatus | AppointmentStatus;

const STATUS_CONFIG: Record<AnyStatus, { label: string; className: string }> = {
  cancelled: { className: "bg-destructive/10 text-destructive", label: "Cancelled" },
  completed: { className: "bg-teal-400/15 text-teal-400", label: "Completed" },
  confirmed: { className: "bg-primary/10 text-primary", label: "Confirmed" },
  pending: { className: "bg-gold-400/15 text-amber-600 dark:text-gold-400", label: "Pending" },
  upcoming: { className: "bg-primary/10 text-primary", label: "Upcoming" },
};

interface StatusBadgeProps {
  status: AnyStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { className: "bg-muted text-muted-foreground", label: status };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className,
      )}
    >
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

export function EmptyState({ icon = "📭", title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-16 text-center", className)}>
      <span className="text-4xl">{icon}</span>
      <div>
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
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
          className="premium-card relative overflow-hidden p-4"
        >
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface AvatarInitialsProps {
  initials: string;
  gradient?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarInitials({ initials, gradient = "from-salmon-300 to-primary", size = "md", className }: AvatarInitialsProps) {
  const sizes = {
    lg: "size-14 text-base",
    md: "size-10 text-sm",
    sm: "size-8 text-xs",
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl font-bold text-white bg-gradient-to-br",
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
          className={cn("size-3.5", i < Math.floor(rating) ? "text-gold-400" : "text-muted")}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs font-medium text-muted-foreground">{rating.toFixed(1)}</span>
    </span>
  );
}
