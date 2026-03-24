"use client";

import { ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyableKey } from "./copyable-key";
import type { ApiKey } from "@/lib/types";

interface KeysTableProps {
  keys: ApiKey[];
  isAdmin: boolean;
  onToggle: (id: number, isActive: boolean) => void;
  onDelete: (id: number) => void;
}

export function KeysTable({ keys, isAdmin, onToggle, onDelete }: KeysTableProps) {
  return (
    <div className="hidden lg:block rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            <th className="px-5 py-3.5 w-[15%]">App</th>
            <th className="px-5 py-3.5 w-[18%]">Package</th>
            <th className="px-5 py-3.5 w-[30%]">API Key</th>
            {isAdmin && <th className="px-5 py-3.5 w-[10%]">Owner</th>}
            <th className="px-5 py-3.5 w-[10%]">Status</th>
            <th className="px-5 py-3.5 w-[17%] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {keys.map((k) => (
            <tr key={k.id} className="text-zinc-400 transition-colors hover:bg-white/[0.02]">
              <td className="px-5 py-3.5">
                <span className="font-medium text-white truncate block">{k.appName}</span>
              </td>
              <td className="px-5 py-3.5 text-zinc-500 text-[13px]">
                <span className="truncate block">{k.packageName || "-"}</span>
              </td>
              <td className="px-5 py-3.5">
                <CopyableKey value={k.key} />
              </td>
              {isAdmin && (
                <td className="px-5 py-3.5 text-[13px]">
                  {k.user ? (
                    <span className="text-zinc-400">{k.user.username}</span>
                  ) : (
                    <span className="text-zinc-700 italic">Unassigned</span>
                  )}
                </td>
              )}
              <td className="px-5 py-3.5">
                <Badge variant={k.isActive ? "success" : "destructive"}>
                  {k.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggle(k.id, k.isActive)}
                    className="text-xs h-7 px-2.5 gap-1.5"
                  >
                    {k.isActive ? (
                      <><ToggleRight className="h-3.5 w-3.5" /> Disable</>
                    ) : (
                      <><ToggleLeft className="h-3.5 w-3.5" /> Enable</>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(k.id)}
                    className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 h-7 px-2.5 gap-1.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
