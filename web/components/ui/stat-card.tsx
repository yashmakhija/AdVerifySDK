interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: string;
}

export function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div className="group relative rounded-xl border border-border bg-surface p-4 sm:p-5 transition-all duration-200 hover:bg-surface-2 hover:border-border-strong">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
          {label}
        </p>
        {icon && (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-muted-foreground transition-colors group-hover:text-foreground"
            style={accent ? { backgroundColor: accent + "15", color: accent } : undefined}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-[28px]">
        {value}
      </p>
    </div>
  );
}
