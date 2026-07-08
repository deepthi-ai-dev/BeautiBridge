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
        "premium-card flex items-start gap-4 p-5 group",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
          iconBg,
        )}
      >
        <Icon className={cn("size-5", iconColor)} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground leading-none mb-2">
          {label}
        </p>
        <p className="text-2xl font-bold tracking-tight text-foreground leading-none">
          {value}
        </p>
        {delta && (
          <p
            className={cn(
              "mt-2 flex items-center gap-1 text-xs font-semibold",
              deltaPositive ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
            )}
          >
            <span className="text-[10px]">{deltaPositive ? "↑" : "↓"}</span>
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}
