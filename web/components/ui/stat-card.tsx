interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">
          {label}
        </p>
        {icon && <span className="text-zinc-300">{icon}</span>}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
        {value}
      </p>
    </div>
  );
}
