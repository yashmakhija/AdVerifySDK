"use client";

import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
      <KeyRound className="mx-auto h-8 w-8 text-faint" />
      <p className="mt-3 text-sm font-medium text-muted-foreground">No API keys yet</p>
      <p className="mt-1 text-[12px] text-faint">Create your first key to get started</p>
      <Button size="sm" className="mt-4" onClick={onCreateClick}>
        Create Key
      </Button>
    </div>
  );
}
