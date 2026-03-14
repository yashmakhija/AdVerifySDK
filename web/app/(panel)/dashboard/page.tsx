"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader } from "@/components/ui/page-header";
import {
  KeyRound,
  Megaphone,
  Lock,
  CheckCircle2,
  Eye,
  MousePointerClick,
  TrendingUp,
  BarChart3,
  Zap,
  CalendarDays,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import type { Stats, PinStats } from "@/lib/types";

export default function DashboardPage() {
  const token = useAuthStore((s) => s.token);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pinStats, setPinStats] = useState<PinStats | null>(null);

  useEffect(() => {
    if (token) {
      api<Stats>("/admin/stats", { token }).then(setStats).catch(() => {});
      api<PinStats>("/admin/user-pins/stats", { token }).then(setPinStats).catch(() => {});
    }
  }, [token]);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your AdVerify platform"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard
          label="API Keys"
          value={stats.totalKeys}
          icon={<KeyRound className="h-4 w-4" />}
        />
        <StatCard
          label="Total Ads"
          value={stats.totalAds}
          icon={<Megaphone className="h-4 w-4" />}
        />
        <StatCard
          label="Total PINs"
          value={stats.totalPins}
          icon={<Lock className="h-4 w-4" />}
        />
        <StatCard
          label="Used PINs"
          value={stats.usedPins}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <StatCard
          label="Impressions"
          value={stats.totalImpressions.toLocaleString()}
          icon={<Eye className="h-4 w-4" />}
        />
        <StatCard
          label="Today Impr."
          value={stats.todayImpressions.toLocaleString()}
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <StatCard
          label="Total Clicks"
          value={stats.totalClicks.toLocaleString()}
          icon={<MousePointerClick className="h-4 w-4" />}
        />
        <StatCard
          label="Today Clicks"
          value={stats.todayClicks.toLocaleString()}
          icon={<Zap className="h-4 w-4" />}
        />
        <StatCard
          label="CTR"
          value={`${stats.ctr}%`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {pinStats && (
        <>
          <h2 className="mt-8 mb-4 text-sm font-semibold text-zinc-950">
            PIN Analytics
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <StatCard
              label="PINs Today"
              value={pinStats.todayGenerated}
              icon={<CalendarDays className="h-4 w-4" />}
            />
            <StatCard
              label="Used Today"
              value={pinStats.todayUsed}
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <StatCard
              label="PINs Yesterday"
              value={pinStats.yesterdayGenerated}
              icon={<CalendarDays className="h-4 w-4" />}
            />
            <StatCard
              label="Used Yesterday"
              value={pinStats.yesterdayUsed}
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <StatCard
              label="Active PINs"
              value={pinStats.totalActive}
              icon={<ShieldCheck className="h-4 w-4" />}
            />
            <StatCard
              label="Expired PINs"
              value={pinStats.totalExpired}
              icon={<ShieldOff className="h-4 w-4" />}
            />
          </div>
        </>
      )}
    </div>
  );
}
