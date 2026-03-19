import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "destructive";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        variant === "success" && "bg-emerald-500/10 text-emerald-400",
        variant === "destructive" && "bg-red-500/10 text-red-400",
        variant === "default" && "bg-white/[0.06] text-zinc-400",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          variant === "success" && "bg-emerald-400",
          variant === "destructive" && "bg-red-400",
          variant === "default" && "bg-zinc-500"
        )}
      />
      {children}
    </span>
  );
}
