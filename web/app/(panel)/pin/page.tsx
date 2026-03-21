"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Clock,
  Infinity,
  MessageSquare,
  Hash,
  Type,
  Link2,
  Key,
  Globe,
} from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { AppSelector } from "@/components/ui/app-selector";
import type { PinConfig, ApiKey } from "@/lib/types";

export default function PinConfigPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [configs, setConfigs] = useState<PinConfig[]>([]);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    pinEnabled: true,
    pinMessage: "Enter your PIN to unlock the app",
    maxAttempts: 5,
    getPinBtnText: "Get PIN",
    enterPinBtnText: "Enter PIN",
    expiryMode: "never" as "never" | "duration",
    expiryHours: 24,
    shortenerApiUrl: "",
    shortenerApiSecret: "",
    shortenerFrontendUrl: "",
  });

  async function load() {
    const [k, c] = await Promise.all([
      api<ApiKey[]>("/admin/keys", { token }),
      api<PinConfig[]>("/admin/pin-config", { token }),
    ]);
    setKeys(Array.isArray(k) ? k : []);
    setConfigs(Array.isArray(c) ? c : []);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (selectedKey) {
      const existing = configs.find((c) => c.apiKeyId === selectedKey);
      if (existing) {
        setForm({
          pinEnabled: existing.pinEnabled,
          pinMessage: existing.pinMessage,
          maxAttempts: existing.maxAttempts,
          getPinBtnText: existing.getPinBtnText,
          enterPinBtnText: existing.enterPinBtnText || "Enter PIN",
          expiryMode: existing.expiryMode || "never",
          expiryHours: existing.expiryHours || 24,
          shortenerApiUrl: existing.shortenerApiUrl || "",
          shortenerApiSecret: existing.shortenerApiSecret || "",
          shortenerFrontendUrl: existing.shortenerFrontendUrl || "",
        });
      } else {
        setForm({
          pinEnabled: true,
          pinMessage: "Enter your PIN to unlock the app",
          maxAttempts: 5,
          getPinBtnText: "Get PIN",
          enterPinBtnText: "Enter PIN",
          expiryMode: "never",
          expiryHours: 24,
          shortenerApiUrl: "",
          shortenerApiSecret: "",
          shortenerFrontendUrl: "",
        });
      }
    }
  }, [selectedKey, configs]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedKey) return;
    setSaving(true);
    try {
      await api("/admin/pin-config", {
        method: "POST",
        token,
        body: { ...form, apiKeyId: selectedKey },
      });
      toast.show("PIN config saved");
      load();
    } finally {
      setSaving(false);
    }
  }

  const selectedApp = keys.find((k) => k.id === selectedKey);

  return (
    <div>
      <PageHeader
        title="PIN Configuration"
        description="Configure PIN verification and expiry per app"
      />

      {/* App selector */}
      <div className="mb-6 max-w-sm">
        <p className="mb-2 text-[13px] font-medium text-zinc-500">
          Select an app to configure
        </p>
        <AppSelector
          keys={keys}
          selectedId={selectedKey}
          onSelect={(id) => setSelectedKey(id)}
          placeholder="Search and select an app..."
        />
      </div>

      {selectedKey && (
        <form onSubmit={handleSave} className="max-w-2xl space-y-5">
          {/* Enable/disable toggle */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
                <Shield className="h-4 w-4 text-zinc-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  PIN Verification
                </p>
                <p className="text-xs text-zinc-500">
                  Require PIN before app access
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={form.pinEnabled}
              onClick={() =>
                setForm({ ...form, pinEnabled: !form.pinEnabled })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                form.pinEnabled ? "bg-white" : "bg-white/[0.08]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full shadow-sm ring-0 transition-transform ${
                  form.pinEnabled ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-400"
                }`}
              />
            </button>
          </div>

          {form.pinEnabled && (
            <>
              {/* Message */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-zinc-500" />
                  <label className="text-[13px] font-medium text-zinc-400">
                    PIN Message
                  </label>
                </div>
                <input
                  value={form.pinMessage}
                  onChange={(e) =>
                    setForm({ ...form, pinMessage: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06]"
                  placeholder="Enter your PIN to unlock the app"
                />
              </div>

              {/* Button texts */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Type className="h-3.5 w-3.5 text-zinc-500" />
                    <label className="text-[13px] font-medium text-zinc-400">
                      Get PIN Button
                    </label>
                  </div>
                  <input
                    value={form.getPinBtnText}
                    onChange={(e) =>
                      setForm({ ...form, getPinBtnText: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06]"
                    placeholder="Get PIN"
                  />
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Type className="h-3.5 w-3.5 text-zinc-500" />
                    <label className="text-[13px] font-medium text-zinc-400">
                      Enter PIN Button
                    </label>
                  </div>
                  <input
                    value={form.enterPinBtnText}
                    onChange={(e) =>
                      setForm({ ...form, enterPinBtnText: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06]"
                    placeholder="Enter PIN"
                  />
                </div>
              </div>

              {/* Max attempts */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 text-zinc-500" />
                  <label className="text-[13px] font-medium text-zinc-400">
                    Max Attempts
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={form.maxAttempts}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        maxAttempts: Number(e.target.value),
                      })
                    }
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/[0.08] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                  <span className="min-w-[2.5rem] rounded-md bg-white/[0.06] px-2.5 py-1 text-center text-sm font-medium text-white">
                    {form.maxAttempts}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  User gets {form.maxAttempts} tries before being locked out
                </p>
              </div>

              {/* Expiry mode */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="mb-3 text-[13px] font-medium text-zinc-400">
                  PIN Expiry
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, expiryMode: "never" })
                    }
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      form.expiryMode === "never"
                        ? "border-white bg-white/[0.04]"
                        : "border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        form.expiryMode === "never"
                          ? "bg-white text-black"
                          : "bg-white/[0.06] text-zinc-500"
                      }`}
                    >
                      <Infinity className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          form.expiryMode === "never"
                            ? "text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        Never Expire
                      </p>
                      <p className="text-xs text-zinc-500">
                        One-time verification, lasts forever
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, expiryMode: "duration" })
                    }
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      form.expiryMode === "duration"
                        ? "border-white bg-white/[0.04]"
                        : "border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        form.expiryMode === "duration"
                          ? "bg-white text-black"
                          : "bg-white/[0.06] text-zinc-500"
                      }`}
                    >
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          form.expiryMode === "duration"
                            ? "text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        Time-based Expiry
                      </p>
                      <p className="text-xs text-zinc-500">
                        PIN expires after set duration
                      </p>
                    </div>
                  </button>
                </div>

                {form.expiryMode === "duration" && (
                  <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.03] px-4 py-3">
                    <Clock className="h-4 w-4 shrink-0 text-zinc-500" />
                    <span className="text-sm text-zinc-400">Expires after</span>
                    <input
                      type="number"
                      value={form.expiryHours}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          expiryHours: Math.max(1, Number(e.target.value)),
                        })
                      }
                      min={1}
                      className="w-20 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-center text-sm font-medium text-white outline-none focus:border-white/[0.15]"
                    />
                    <span className="text-sm text-zinc-400">hours</span>
                    <span className="ml-auto text-xs text-zinc-500">
                      {form.expiryHours >= 24
                        ? `${Math.floor(form.expiryHours / 24)}d ${form.expiryHours % 24}h`
                        : `${form.expiryHours}h`}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Custom Link Shortener */}
          {form.pinEnabled && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="mb-1 flex items-center gap-2">
                <Link2 className="h-3.5 w-3.5 text-zinc-500" />
                <p className="text-[13px] font-medium text-zinc-400">
                  Custom Link Shortener
                </p>
              </div>
              <p className="mb-4 text-[12px] text-zinc-600">
                Leave empty to use the default system shortener. Set these to use your own.
              </p>

              <div className="space-y-3">
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Globe className="h-3 w-3 text-zinc-600" />
                    <label className="text-[12px] font-medium text-zinc-500">
                      Shortener API URL
                    </label>
                  </div>
                  <input
                    value={form.shortenerApiUrl}
                    onChange={(e) =>
                      setForm({ ...form, shortenerApiUrl: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/[0.15] focus:bg-white/[0.06]"
                    placeholder="https://your-shortener.com"
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Key className="h-3 w-3 text-zinc-600" />
                    <label className="text-[12px] font-medium text-zinc-500">
                      Shortener API Secret
                    </label>
                  </div>
                  <input
                    value={form.shortenerApiSecret}
                    onChange={(e) =>
                      setForm({ ...form, shortenerApiSecret: e.target.value })
                    }
                    type="password"
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/[0.15] focus:bg-white/[0.06]"
                    placeholder="Your shortener's secret key"
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Link2 className="h-3 w-3 text-zinc-600" />
                    <label className="text-[12px] font-medium text-zinc-500">
                      Shortener Frontend URL
                    </label>
                  </div>
                  <input
                    value={form.shortenerFrontendUrl}
                    onChange={(e) =>
                      setForm({ ...form, shortenerFrontendUrl: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/[0.15] focus:bg-white/[0.06]"
                    placeholder="https://your-shortener.com"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-zinc-500">
              {selectedApp
                ? `Configuring: ${selectedApp.appName}`
                : ""}
            </p>
            <Button size="sm" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
