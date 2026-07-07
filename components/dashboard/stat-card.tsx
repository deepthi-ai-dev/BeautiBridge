import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  delta?: string;
  deltaPositive?: boolean;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  delta,
  deltaPositive,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "premium-card flex items-start gap-4 p-5 transition-shadow duration-200 hover:shadow-premium",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          iconBg,
        )}
      >
        <Icon className={cn("size-5", iconColor)} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
        {delta && (
          <p
            className={cn(
              "mt-1 text-xs font-medium",
              deltaPositive ? "text-teal-400" : "text-destructive",
            )}
          >
            {deltaPositive ? "↑" : "↓"} {delta}
          </p>
        )}
      </div>
    </div>
  );
}
