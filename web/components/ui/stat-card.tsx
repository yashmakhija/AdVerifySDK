import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  variant?: "default" | "primary" | "success";
  icon?: LucideIcon;
}

const ICON_STYLES = {
  default: "bg-zinc-100 text-zinc-500",
  primary: "bg-indigo-50 text-indigo-600",
  success: "bg-emerald-50 text-emerald-600",
};

export function StatCard({
  label,
  value,
  variant = "default",
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-200">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          {label}
        </p>
        {Icon && (
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              ICON_STYLES[variant]
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p
        className={cn("mt-2 text-2xl font-bold", {
          "text-zinc-900": variant === "default",
          "text-indigo-600": variant === "primary",
          "text-emerald-600": variant === "success",
        })}
      >
        {value}
      </p>
    </div>
  );
}
