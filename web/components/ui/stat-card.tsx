interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: string;
}

export function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 transition-all duration-200 hover:bg-white/[0.04] hover:border-white/[0.1]">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
          {label}
        </p>
        {icon && (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-500 transition-colors group-hover:text-zinc-300"
            style={accent ? { backgroundColor: accent + "15", color: accent } : undefined}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-[28px]">
        {value}
      </p>
    </div>
  );
}
