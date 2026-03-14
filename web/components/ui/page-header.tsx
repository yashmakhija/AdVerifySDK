import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function PageHeader({
  title,
  description,
  actionLabel,
  onAction,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
          {title}
        </h1>
        {description && (
          <p className="mt-0.5 text-[13px] text-zinc-400">{description}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} className="gap-1.5 w-full sm:w-auto">
          <Plus className="h-3.5 w-3.5" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
