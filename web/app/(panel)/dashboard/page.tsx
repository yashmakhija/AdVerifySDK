"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
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
  AlertTriangle,
  ArrowRight,
  Smartphone,
  PlayCircle,
  Info,
  X,
} from "lucide-react";
import type { Stats, PinStats, Purchase, Announcement } from "@/lib/types";
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

function getDaysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const QUICK_START_STEPS = [
  {
    step: 1,
    title: "Create an API Key",
    description: "Register your app and get an API key to start integrating",
    href: "/keys",
    icon: KeyRound,
    cta: "Create Key",
  },
  {
    step: 2,
    title: "Watch the Tutorial",
    description: "Follow the video guide to set up everything step by step",
    href: "/tutorial",
    icon: PlayCircle,
    cta: "Watch Video",
  },
  {
    step: 3,
    title: "Patch your APK",
    description: "Use MT Manager to inject the AdVerify SDK into your app",
    href: "/mt-manager",
    icon: Smartphone,
    cta: "View Guide",
  },
  {
    step: 4,
    title: "Create your first Ad",
    description: "Set up a card, fullscreen, or banner ad to serve to your users",
    href: "/ads",
    icon: Megaphone,
    cta: "Create Ad",
  },
];

export default function DashboardPage() {
  const token = useAuthStore((s) => s.token);
  const username = useAuthStore((s) => s.username);
  const role = useAuthStore((s) => s.role);
  const avatar = useAuthStore((s) => s.avatar);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pinStats, setPinStats] = useState<PinStats | null>(null);
  const [activePurchase, setActivePurchase] = useState<Purchase | null>(null);
  const [purchaseLoaded, setPurchaseLoaded] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedIds, setDismissedIds] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("adverify-dismissed-announcements") || "[]");
    } catch {
      return [];
    }
  });

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
      api<Purchase[]>("/auth/purchases", { token })
        .then((purchases) => {
          const active = purchases?.find((p) => p.status === "active") || null;
          setActivePurchase(active);
        })
        .catch(() => {})
        .finally(() => setPurchaseLoaded(true));
      api<Announcement[]>("/auth/announcements", { token })
        .then((data) => setAnnouncements(Array.isArray(data) ? data : []))
        .catch(() => {});
    }
  }, [token]);

  const daysLeft = activePurchase?.expiresAt
    ? getDaysUntil(activePurchase.expiresAt)
    : null;

  const visibleAnnouncements = announcements.filter((a) => !dismissedIds.includes(a.id));

  function dismissAnnouncement(id: number) {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    localStorage.setItem("adverify-dismissed-announcements", JSON.stringify(updated));
  }

  const showExpiryWarning = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
  const showExpired = daysLeft !== null && daysLeft <= 0;
  const isNewUser = stats && stats.totalKeys === 0;

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

      {/* Announcements */}
      {visibleAnnouncements.length > 0 && (
        <div className="mb-5 flex flex-col gap-2.5">
          {visibleAnnouncements.map((a) => {
            const colors = {
              info: "border-blue-500/20 bg-blue-500/[0.06]",
              update: "border-emerald-500/20 bg-emerald-500/[0.06]",
              warning: "border-amber-500/20 bg-amber-500/[0.06]",
            };
            const textColors = {
              info: "text-blue-300",
              update: "text-emerald-300",
              warning: "text-amber-300",
            };
            const subColors = {
              info: "text-blue-400/60",
              update: "text-emerald-400/60",
              warning: "text-amber-400/60",
            };
            const iconColors = {
              info: "bg-blue-500/10 text-blue-400",
              update: "bg-emerald-500/10 text-emerald-400",
              warning: "bg-amber-500/10 text-amber-400",
            };
            return (
              <div
                key={a.id}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${colors[a.type]}`}
              >
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconColors[a.type]}`}>
                  <Info className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-medium ${textColors[a.type]}`}>
                    {a.title}
                  </p>
                  {a.content && (
                    <p className={`mt-0.5 text-[12px] ${subColors[a.type]}`}>
                      {a.content}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => dismissAnnouncement(a.id)}
                  className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded text-zinc-600 transition-colors hover:text-zinc-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Expiry Warning */}
      {showExpiryWarning && (
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-amber-300">
                Your plan expires in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
              </p>
              <p className="text-[11px] text-amber-400/60">
                {activePurchase?.plan?.name} · Renew to keep your ads and PINs active
              </p>
            </div>
          </div>
          <a
            href="https://t.me/ShinmenTakezo?text=Hi%2C%20I%20want%20to%20renew%20my%20AdVerify%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-[13px] font-semibold text-black transition-all hover:bg-amber-400 active:scale-[0.98] text-center"
          >
            Renew Now
          </a>
        </div>
      )}

      {/* Expired Banner */}
      {showExpired && (
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-red-300">
                Your plan has expired
              </p>
              <p className="text-[11px] text-red-400/60">
                {activePurchase?.plan?.name} · Renew to restore access
              </p>
            </div>
          </div>
          <a
            href="https://t.me/ShinmenTakezo?text=Hi%2C%20my%20AdVerify%20plan%20has%20expired.%20I%20want%20to%20renew."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-red-500 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:bg-red-400 active:scale-[0.98] text-center"
          >
            Renew Now
          </a>
        </div>
      )}

      {/* Quick Start — show for new users with no API keys */}
      {isNewUser ? (
        <div className="mb-8">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <h2 className="text-[14px] font-semibold text-white">
                Get started in 4 steps
              </h2>
              <p className="mt-0.5 text-[12px] text-zinc-600">
                Set up your first app with AdVerify
              </p>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {QUICK_START_STEPS.map(({ step, title, description, href, icon: Icon, cta }) => (
                <Link
                  key={step}
                  href={href}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors group-hover:border-white/[0.15] group-hover:bg-white/[0.06]">
                    <Icon className="h-[18px] w-[18px] text-zinc-500 transition-colors group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-zinc-500">
                        {step}
                      </span>
                      <h3 className="text-[13px] font-medium text-white">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-0.5 text-[12px] text-zinc-600 pl-7">
                      {description}
                    </p>
                  </div>
                  <span className="hidden sm:flex shrink-0 items-center gap-1 text-[12px] font-medium text-zinc-600 transition-colors group-hover:text-white">
                    {cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Stats Grid */}
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
