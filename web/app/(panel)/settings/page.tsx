"use client";

import { useEffect, useState } from "react";
import {
  Globe,
  AppWindow,
  ShieldBan,
  Check,
  Loader2,
} from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import type { ApiKey, PinUnlockSettings } from "@/lib/types";

const MODES = [
  {
    value: "per_app" as const,
    label: "Per App",
    short: "Separate PIN per app",
    description:
      "Each app requires its own PIN. Verifying on one app does not unlock others.",
    icon: AppWindow,
    accent: "#3b82f6",
    accentLight: "rgba(59,130,246,0.1)",
  },
  {
    value: "global" as const,
    label: "Global Unlock",
    short: "One PIN unlocks all",
    description:
      "One PIN on any app unlocks all apps for that device. Easiest for users.",
    icon: Globe,
    accent: "#10b981",
    accentLight: "rgba(16,185,129,0.1)",
  },
  {
    value: "global_except" as const,
    label: "Global with Exclusions",
    short: "All except selected apps",
    description:
      "One PIN unlocks all apps except specific ones you choose below.",
    icon: ShieldBan,
    accent: "#f59e0b",
    accentLight: "rgba(245,158,11,0.1)",
  },
] as const;

export default function SettingsPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [settings, setSettings] = useState<PinUnlockSettings>({
    pinUnlockMode: "per_app",
    excludedAppIds: [],
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      api<PinUnlockSettings>("/admin/settings", { token }),
      api<ApiKey[]>("/admin/keys", { token }),
    ]).then(([s, k]) => {
      if (s?.pinUnlockMode) setSettings(s);
      setKeys(Array.isArray(k) ? k : []);
      setLoaded(true);
    });
  }, []);

  function toggleExcludedApp(appId: number) {
    setSettings((prev) => ({
      ...prev,
      excludedAppIds: prev.excludedAppIds.includes(appId)
        ? prev.excludedAppIds.filter((id) => id !== appId)
        : [...prev.excludedAppIds, appId],
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await api("/admin/settings", {
        method: "POST",
        token,
        body: settings,
      });
      toast.show("Settings saved");
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  const activeMode = MODES.find((m) => m.value === settings.pinUnlockMode)!;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-lg font-semibold tracking-tight text-white">
          Settings
        </h1>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          Configure how PIN verification works across your apps
        </p>
      </div>

      <div className="mx-auto max-w-xl space-y-6">
        {/* Mode selector */}
        <div>
          <label className="mb-2.5 block text-[13px] font-medium text-white">
            PIN Unlock Mode
          </label>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {MODES.map((mode) => {
              const isActive = settings.pinUnlockMode === mode.value;
              const Icon = mode.icon;
              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      pinUnlockMode: mode.value,
                      excludedAppIds:
                        mode.value === "global_except"
                          ? prev.excludedAppIds
                          : [],
                    }))
                  }
                  className={`group relative flex flex-col items-center gap-2.5 rounded-xl border-2 px-3 py-5 text-center transition-all ${
                    isActive
                      ? "border-white bg-white"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors`}
                    style={{
                      backgroundColor: isActive ? "rgba(0,0,0,0.06)" : mode.accentLight,
                    }}
                  >
                    <Icon
                      className="h-[18px] w-[18px]"
                      style={{ color: isActive ? "#000" : mode.accent }}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-[13px] font-semibold leading-tight ${
                        isActive ? "text-black" : "text-white"
                      }`}
                    >
                      {mode.label}
                    </p>
                    <p
                      className={`mt-0.5 text-[11px] leading-snug ${
                        isActive ? "text-zinc-500" : "text-zinc-500"
                      }`}
                    >
                      {mode.short}
                    </p>
                  </div>
                  {/* Selection dot */}
                  <div
                    className={`absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full transition-all ${
                      isActive
                        ? "bg-black"
                        : "border border-white/[0.08]"
                    }`}
                  >
                    {isActive && (
                      <Check className="h-2.5 w-2.5 text-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Description card */}
        <div
          className="flex items-start gap-3 rounded-xl border px-4 py-3.5"
          style={{
            borderColor: activeMode.accent + "30",
            backgroundColor: activeMode.accentLight,
          }}
        >
          <activeMode.icon
            className="mt-0.5 h-4 w-4 shrink-0"
            style={{ color: activeMode.accent }}
          />
          <p className="text-[13px] leading-relaxed text-zinc-400">
            {activeMode.description}
          </p>
        </div>

        {/* Excluded apps */}
        {settings.pinUnlockMode === "global_except" && (
          <div>
            <label className="mb-1 block text-[13px] font-medium text-white">
              Excluded Apps
            </label>
            <p className="mb-3 text-[12px] text-zinc-500">
              Toggle apps that should require their own separate PIN
            </p>

            {keys.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center">
                <p className="text-sm text-zinc-500">
                  No apps yet. Create an API key first.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04] overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
                {keys.map((k) => {
                  const isExcluded = settings.excludedAppIds.includes(k.id);
                  return (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => toggleExcludedApp(k.id)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04] active:bg-white/[0.06]"
                    >
                      {/* Toggle pill */}
                      <div
                        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                          isExcluded ? "bg-red-500" : "bg-white/[0.08]"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 h-4 w-4 rounded-full shadow-sm transition-transform ${
                            isExcluded ? "left-[18px] bg-white" : "left-0.5 bg-zinc-400"
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {k.appName}
                        </p>
                        {k.packageName && (
                          <p className="text-[11px] text-zinc-500 truncate">
                            {k.packageName}
                          </p>
                        )}
                      </div>

                      <span
                        className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                          isExcluded
                            ? "bg-red-500/10 text-red-400"
                            : "bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {isExcluded ? "Own PIN" : "Global"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {settings.excludedAppIds.length > 0 && (
              <p className="mt-2 text-[11px] text-zinc-500">
                {settings.excludedAppIds.length} app
                {settings.excludedAppIds.length > 1 ? "s" : ""} will require
                separate PIN verification
              </p>
            )}
          </div>
        )}

        {/* Save */}
        <div className="flex items-center justify-between border-t border-white/[0.04] pt-5">
          <p className="text-[12px] text-zinc-500 hidden sm:block">
            Changes apply to all future PIN checks
          </p>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
