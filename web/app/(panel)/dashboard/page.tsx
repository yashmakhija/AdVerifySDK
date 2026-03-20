"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { StatCard } from "@/components/ui/stat-card";
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
import { UserAvatar } from "@/components/ui/user-avatar";

const ADMIN_GREETINGS = [
  "Command center ready",
  "All systems operational",
  "Good to see you, boss",
  "Dashboard loaded — let's go",
  "Back at the helm",
  "Running the show",
  "Your empire awaits",
];

const USER_GREETINGS = [
  "Welcome back",
  "Good to see you",
  "Here's your overview",
  "All caught up",
  "Ready when you are",
];

function getTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const token = useAuthStore((s) => s.token);
  const username = useAuthStore((s) => s.username);
  const role = useAuthStore((s) => s.role);
  const avatar = useAuthStore((s) => s.avatar);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pinStats, setPinStats] = useState<PinStats | null>(null);

  const greeting = useMemo(() => {
    const isAdmin = role === "ADMIN";
    const pool = isAdmin ? ADMIN_GREETINGS : USER_GREETINGS;
    const tagline = pool[Math.floor(Math.random() * pool.length)];
    return { time: getTimeGreeting(), tagline };
  }, [role]);

  useEffect(() => {
    if (token) {
      api<Stats>("/admin/stats", { token }).then(setStats).catch(() => {});
      api<PinStats>("/admin/user-pins/stats", { token }).then(setPinStats).catch(() => {});
    }
  }, [token]);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-zinc-600">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-700 border-t-transparent" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6 flex items-center gap-3.5">
        <UserAvatar src={avatar} name={username} size="md" />
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">
            {greeting.time}, {username || "there"}
          </h1>
          <p className="mt-0.5 text-[13px] text-zinc-500">
            {greeting.tagline}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <StatCard
          label="API Keys"
          value={stats.totalKeys}
          icon={<KeyRound className="h-4 w-4" />}
          accent="#6366f1"
        />
        <StatCard
          label="Total Ads"
          value={stats.totalAds}
          icon={<Megaphone className="h-4 w-4" />}
          accent="#3b82f6"
        />
        <StatCard
          label="Total PINs"
          value={stats.totalPins}
          icon={<Lock className="h-4 w-4" />}
          accent="#8b5cf6"
        />
        <StatCard
          label="Used PINs"
          value={stats.usedPins}
          icon={<CheckCircle2 className="h-4 w-4" />}
          accent="#10b981"
        />
        <StatCard
          label="Impressions"
          value={stats.totalImpressions.toLocaleString()}
          icon={<Eye className="h-4 w-4" />}
          accent="#f59e0b"
        />
        <StatCard
          label="Today Impr."
          value={stats.todayImpressions.toLocaleString()}
          icon={<BarChart3 className="h-4 w-4" />}
          accent="#f97316"
        />
        <StatCard
          label="Total Clicks"
          value={stats.totalClicks.toLocaleString()}
          icon={<MousePointerClick className="h-4 w-4" />}
          accent="#ec4899"
        />
        <StatCard
          label="Today Clicks"
          value={stats.todayClicks.toLocaleString()}
          icon={<Zap className="h-4 w-4" />}
          accent="#14b8a6"
        />
        <StatCard
          label="CTR"
          value={`${stats.ctr}%`}
          icon={<TrendingUp className="h-4 w-4" />}
          accent="#22c55e"
        />
      </div>

      {pinStats && (
        <>
          <h2 className="mt-8 mb-3 text-[13px] font-semibold text-zinc-400">
            PIN Analytics
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            <StatCard
              label="PINs Today"
              value={pinStats.todayGenerated}
              icon={<CalendarDays className="h-4 w-4" />}
              accent="#6366f1"
            />
            <StatCard
              label="Used Today"
              value={pinStats.todayUsed}
              icon={<CheckCircle2 className="h-4 w-4" />}
              accent="#10b981"
            />
            <StatCard
              label="PINs Yesterday"
              value={pinStats.yesterdayGenerated}
              icon={<CalendarDays className="h-4 w-4" />}
              accent="#8b5cf6"
            />
            <StatCard
              label="Used Yesterday"
              value={pinStats.yesterdayUsed}
              icon={<CheckCircle2 className="h-4 w-4" />}
              accent="#14b8a6"
            />
            <StatCard
              label="Active PINs"
              value={pinStats.totalActive}
              icon={<ShieldCheck className="h-4 w-4" />}
              accent="#22c55e"
            />
            <StatCard
              label="Expired PINs"
              value={pinStats.totalExpired}
              icon={<ShieldOff className="h-4 w-4" />}
              accent="#ef4444"
            />
          </div>
        </>
      )}
    </div>
  );
}
