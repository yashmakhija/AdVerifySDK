interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: string;
}

export function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 transition-all duration-200 hover:bg-white/[0.04] hover:border-white/[0.1] overflow-hidden">
      {accent && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-50 transition-opacity duration-200 group-hover:opacity-90"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}00)` }}
        />
      )}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
          {label}
        </p>
        {icon && (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110"
            style={accent ? { backgroundColor: accent + "18", color: accent } : { backgroundColor: "rgba(255,255,255,0.06)", color: "#71717a" }}
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
