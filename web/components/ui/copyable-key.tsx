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
      className="group inline-flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1.5 font-mono text-[11px] text-zinc-500 transition-all hover:border-zinc-300 hover:bg-zinc-100 active:scale-[0.98] max-w-full"
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <Check className="h-3 w-3 shrink-0 text-emerald-500" />
      ) : (
        <Copy className="h-3 w-3 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600" />
      )}
    </button>
  );
}
