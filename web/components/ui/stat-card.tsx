interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200/80 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          {label}
        </p>
        {icon && (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-50 text-zinc-400">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
        {value}
      </p>
    </div>
  );
}
