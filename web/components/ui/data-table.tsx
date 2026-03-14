"use client";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data: rawData,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  const data = Array.isArray(rawData) ? rawData : [];

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200/80 bg-white p-10 text-center text-[13px] text-zinc-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200/80 bg-white">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="border-b border-zinc-100 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 font-medium sm:px-5">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
          {data.map((row, i) => (
            <tr key={i} className="text-zinc-600 transition-colors hover:bg-zinc-50/60">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 sm:px-5">
                  {col.render
                    ? col.render(row)
                    : (row[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
