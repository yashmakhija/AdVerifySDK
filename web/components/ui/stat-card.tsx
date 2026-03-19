import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: string;
}

export function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div className="group relative rounded-xl border border-zinc-200/60 bg-white p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:shadow-zinc-200/50 hover:border-zinc-200">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {label}
        </p>
        {icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105",
              accent ? "" : "bg-indigo-50 text-indigo-500"
            )}
            style={accent ? { backgroundColor: accent + "15", color: accent } : undefined}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-[28px]">
        {value}
      </p>
    </div>
  );
}
