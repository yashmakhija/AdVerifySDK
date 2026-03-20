"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import type { ActivityLog } from "@/lib/types";

function actionVariant(action: string) {
  if (action === "purchase" || action === "plan_assigned") return "success" as const;
  if (action === "plan_cancelled" || action === "plan_cancelled_by_admin") return "destructive" as const;
  if (action === "account_created") return "success" as const;
  return "default" as const;
}

function actionLabel(action: string) {
  const labels: Record<string, string> = {
    login: "Login",
    account_created: "Account Created",
    purchase: "Purchase",
    plan_assigned: "Plan Assigned",
    plan_cancelled: "Cancelled",
    plan_cancelled_by_admin: "Cancelled by Admin",
  };
  return labels[action] || action;
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ActivityPage() {
  const token = useAuthStore((s) => s.token)!;
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  async function load() {
    try {
      const data = await api<ActivityLog[]>("/admin/manage/activity-logs", { token });
      setLogs(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = filter
    ? logs.filter((l) => l.action.toLowerCase().includes(filter.toLowerCase()))
    : logs;

  return (
    <div>
      <PageHeader title="Activity Logs" description="Track all user and system activity" />

      {/* Filter */}
      <div className="mb-4">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by action (login, purchase...)"
          className="w-full sm:max-w-xs rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/[0.15] focus:bg-white/[0.06]"
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-[13px] text-zinc-600">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <Activity className="mx-auto h-8 w-8 text-zinc-700" />
          <p className="mt-3 text-sm font-medium text-zinc-400">
            {filter ? "No matching logs" : "No activity yet"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((log) => (
            <div
              key={log.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.03]"
            >
              {/* Header: avatar + user + action + time */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[11px] font-bold text-zinc-400 uppercase">
                    {(log.user?.username || "?")[0]}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[13px] font-medium text-white">
                      {log.user?.username || "—"}
                    </span>
                    <p className="text-[11px] text-zinc-600 truncate">
                      {log.user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  <Badge variant={actionVariant(log.action)}>
                    {actionLabel(log.action)}
                  </Badge>
                  <span className="hidden sm:block text-[11px] text-zinc-600 whitespace-nowrap">
                    {formatTime(log.createdAt)}
                  </span>
                </div>
              </div>

              {/* Details — fully visible, no truncation */}
              {log.details && (
                <p className="mt-2.5 text-[13px] text-zinc-400 leading-relaxed">
                  {log.details}
                </p>
              )}

              {/* Meta: performed by, IP, time (mobile) */}
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-600">
                {log.performedBy && (
                  <span>
                    Assigned by{" "}
                    <span className="text-zinc-400 font-medium">
                      {log.performedBy.username}
                    </span>
                  </span>
                )}
                {log.ipAddress && (
                  <span className="font-mono">{log.ipAddress}</span>
                )}
                <span className="sm:hidden">{formatTime(log.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
