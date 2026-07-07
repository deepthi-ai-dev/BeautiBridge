import { cn } from "@/lib/utils";

type ServiceChipProps = {
  label: string;
  className?: string;
};

export function ServiceChip({ label, className }: ServiceChipProps) {
  return (
    <span
      className={cn(
        "border-border bg-background text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        className,
      )}
    >
      {label}
    </span>
  );
}
