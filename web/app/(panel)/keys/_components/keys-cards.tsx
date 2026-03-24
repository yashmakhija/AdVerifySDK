"use client";

import { ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CopyableKey } from "./copyable-key";
import type { ApiKey } from "@/lib/types";

interface KeysCardsProps {
  keys: ApiKey[];
  isAdmin: boolean;
  onToggle: (id: number, isActive: boolean) => void;
  onDelete: (id: number) => void;
}

export function KeysCards({ keys, isAdmin, onToggle, onDelete }: KeysCardsProps) {
  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {keys.map((k) => (
        <div
          key={k.id}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
        >
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-medium text-white truncate">{k.appName}</h3>
                <p className="text-[11px] text-zinc-600 mt-0.5">{k.packageName || "-"}</p>
                {isAdmin && (
                  <p className="text-[11px] text-zinc-700 mt-0.5">
                    Owner: {k.user?.username || <span className="italic">Unassigned</span>}
                  </p>
                )}
              </div>
              <Badge variant={k.isActive ? "success" : "destructive"} className="shrink-0">
                {k.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600 mb-1.5">
                API Key
              </p>
              <CopyableKey value={k.key} />
            </div>
          </div>

          <div className="flex border-t border-white/[0.06] divide-x divide-white/[0.06]">
            <button
              onClick={() => onToggle(k.id, k.isActive)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-white/[0.03] active:bg-white/[0.05]"
            >
              {k.isActive ? (
                <><ToggleRight className="h-3.5 w-3.5" /> Disable</>
              ) : (
                <><ToggleLeft className="h-3.5 w-3.5" /> Enable</>
              )}
            </button>
            <button
              onClick={() => onDelete(k.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 active:bg-red-500/15"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
