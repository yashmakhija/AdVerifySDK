"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader } from "@/components/ui/page-header";
import type { Stats } from "@/lib/types";
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
} from "lucide-react";

export default function DashboardPage() {
  const token = useAuthStore((s) => s.token);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (token) {
      api<Stats>("/admin/stats", { token }).then(setStats).catch(() => {});
    }
  }, [token]);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <span className="text-sm">Loading dashboard...</span>
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="API Keys"
          value={stats.totalKeys}
          variant="primary"
          icon={KeyRound}
        />
        <StatCard label="Total Ads" value={stats.totalAds} icon={Megaphone} />
        <StatCard label="Total PINs" value={stats.totalPins} icon={Lock} />
        <StatCard
          label="Used PINs"
          value={stats.usedPins}
          variant="success"
          icon={CheckCircle2}
        />
        <StatCard
          label="Total Impressions"
          value={stats.totalImpressions.toLocaleString()}
          icon={Eye}
        />
        <StatCard
          label="Today Impressions"
          value={stats.todayImpressions.toLocaleString()}
          icon={BarChart3}
        />
        <StatCard
          label="Total Clicks"
          value={stats.totalClicks.toLocaleString()}
          icon={MousePointerClick}
        />
        <StatCard
          label="Today Clicks"
          value={stats.todayClicks.toLocaleString()}
          icon={Zap}
        />
        <StatCard
          label="CTR"
          value={`${stats.ctr}%`}
          variant="success"
          icon={TrendingUp}
        />
      </div>
    </div>
  );
}
