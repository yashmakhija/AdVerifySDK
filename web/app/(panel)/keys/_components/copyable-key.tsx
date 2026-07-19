"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToastStore } from "@/lib/store";

export function CopyableKey({ value }: { value: string }) {
  const toast = useToastStore();
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.show("API key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      title="Click to copy"
      className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-all hover:border-border-strong hover:bg-surface-2 active:scale-[0.98] max-w-full"
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <Check className="h-3 w-3 shrink-0 text-emerald-400" />
      ) : (
        <Copy className="h-3 w-3 shrink-0 text-faint transition-colors group-hover:text-foreground" />
      )}
    </button>
  );
}
