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
    <div className="hidden lg:block rounded-xl border border-border bg-surface">
      <table className="w-full table-fixed text-left text-sm">
        <thead>
          <tr className="border-b border-border text-[11px] font-medium uppercase tracking-wider text-faint">
            <th className="px-4 py-3 w-[14%]">App</th>
            <th className="px-4 py-3 w-[18%]">Package</th>
            <th className="px-4 py-3">API Key</th>
            {isAdmin && <th className="px-4 py-3 w-[8%]">Owner</th>}
            <th className="px-4 py-3 w-[9%]">Status</th>
            <th className="px-4 py-3 w-[100px] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {keys.map((k) => (
            <tr key={k.id} className="text-muted-foreground transition-colors hover:bg-surface-2">
              <td className="px-4 py-3">
                <span className="font-medium text-foreground truncate block">{k.appName}</span>
              </td>
              <td className="px-4 py-3 text-muted-foreground text-[13px]">
                <span className="truncate block">{k.packageName || "-"}</span>
              </td>
              <td className="px-4 py-3">
                <CopyableKey value={k.key} />
              </td>
              {isAdmin && (
                <td className="px-4 py-3 text-[13px]">
                  {k.user ? (
                    <span className="text-muted-foreground truncate block">{k.user.username}</span>
                  ) : (
                    <span className="text-faint italic">—</span>
                  )}
                </td>
              )}
              <td className="px-4 py-3">
                <Badge variant={k.isActive ? "success" : "destructive"}>
                  {k.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-0.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggle(k.id, k.isActive)}
                    title={k.isActive ? "Disable key" : "Enable key"}
                    className="h-7 w-7 p-0"
                  >
                    {k.isActive ? (
                      <ToggleRight className="h-4 w-4" />
                    ) : (
                      <ToggleLeft className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(k.id)}
                    title="Delete key"
                    className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
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
