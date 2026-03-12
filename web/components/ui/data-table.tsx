import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  keyExtractor: (item: T) => string | number;
}

export function DataTable<T>({
  columns,
  data: rawData,
  emptyMessage = "No data yet",
  keyExtractor,
}: DataTableProps<T>) {
  const data = Array.isArray(rawData) ? rawData : [];
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-100 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-100 bg-zinc-50/50 text-xs uppercase text-zinc-400 tracking-wider">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cn("px-5 py-3.5 font-medium", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className="transition-colors hover:bg-zinc-50/50"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("px-5 py-3.5", col.className)}>
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-14 text-center text-zinc-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
