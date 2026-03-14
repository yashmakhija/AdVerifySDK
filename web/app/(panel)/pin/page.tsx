"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Clock,
  Infinity,
  MessageSquare,
  Hash,
  Type,
} from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
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
    expiryMode: "never" as "never" | "duration",
    expiryHours: 24,
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
          expiryMode: existing.expiryMode || "never",
          expiryHours: existing.expiryHours || 24,
        });
      } else {
        setForm({
          pinEnabled: true,
          pinMessage: "Enter your PIN to unlock the app",
          maxAttempts: 5,
          getPinBtnText: "Get PIN",
          expiryMode: "never",
          expiryHours: 24,
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

      {/* App selector cards */}
      <div className="mb-6">
        <p className="mb-3 text-[13px] font-medium text-zinc-500">
          Select an app to configure
        </p>
        <div className="flex flex-wrap gap-2">
          {keys.map((k) => {
            const isSelected = selectedKey === k.id;
            const hasConfig = configs.some((c) => c.apiKeyId === k.id);
            return (
              <button
                key={k.id}
                onClick={() => setSelectedKey(k.id)}
                className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-all ${
                  isSelected
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                    : "border-zinc-200/80 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <Shield
                  className={`h-3.5 w-3.5 ${isSelected ? "text-zinc-300" : hasConfig ? "text-emerald-500" : "text-zinc-400"}`}
                />
                {k.appName}
                {hasConfig && !isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
              </button>
            );
          })}
          {keys.length === 0 && (
            <p className="text-sm text-zinc-400">
              No apps yet. Create an API key first.
            </p>
          )}
        </div>
      </div>

      {selectedKey && (
        <form onSubmit={handleSave} className="max-w-2xl space-y-5">
          {/* Enable/disable toggle */}
          <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-white px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100">
                <Shield className="h-4 w-4 text-zinc-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">
                  PIN Verification
                </p>
                <p className="text-xs text-zinc-400">
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
                form.pinEnabled ? "bg-zinc-900" : "bg-zinc-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform ${
                  form.pinEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {form.pinEnabled && (
            <>
              {/* Message & Button text */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-200/80 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                    <label className="text-[13px] font-medium text-zinc-600">
                      PIN Message
                    </label>
                  </div>
                  <input
                    value={form.pinMessage}
                    onChange={(e) =>
                      setForm({ ...form, pinMessage: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 focus:bg-white"
                    placeholder="Enter your PIN to unlock the app"
                  />
                </div>

                <div className="rounded-xl border border-zinc-200/80 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Type className="h-3.5 w-3.5 text-zinc-400" />
                    <label className="text-[13px] font-medium text-zinc-600">
                      Button Text
                    </label>
                  </div>
                  <input
                    value={form.getPinBtnText}
                    onChange={(e) =>
                      setForm({ ...form, getPinBtnText: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 focus:bg-white"
                    placeholder="Get PIN"
                  />
                </div>
              </div>

              {/* Max attempts */}
              <div className="rounded-xl border border-zinc-200/80 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 text-zinc-400" />
                  <label className="text-[13px] font-medium text-zinc-600">
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
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900"
                  />
                  <span className="min-w-[2.5rem] rounded-md bg-zinc-100 px-2.5 py-1 text-center text-sm font-medium text-zinc-900">
                    {form.maxAttempts}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-400">
                  User gets {form.maxAttempts} tries before being locked out
                </p>
              </div>

              {/* Expiry mode */}
              <div className="rounded-xl border border-zinc-200/80 bg-white p-4">
                <p className="mb-3 text-[13px] font-medium text-zinc-600">
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
                        ? "border-zinc-900 bg-zinc-50"
                        : "border-zinc-100 bg-white hover:border-zinc-200"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        form.expiryMode === "never"
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-400"
                      }`}
                    >
                      <Infinity className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          form.expiryMode === "never"
                            ? "text-zinc-900"
                            : "text-zinc-600"
                        }`}
                      >
                        Never Expire
                      </p>
                      <p className="text-xs text-zinc-400">
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
                        ? "border-zinc-900 bg-zinc-50"
                        : "border-zinc-100 bg-white hover:border-zinc-200"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        form.expiryMode === "duration"
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-400"
                      }`}
                    >
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          form.expiryMode === "duration"
                            ? "text-zinc-900"
                            : "text-zinc-600"
                        }`}
                      >
                        Time-based Expiry
                      </p>
                      <p className="text-xs text-zinc-400">
                        PIN expires after set duration
                      </p>
                    </div>
                  </button>
                </div>

                {form.expiryMode === "duration" && (
                  <div className="mt-4 flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
                    <Clock className="h-4 w-4 shrink-0 text-zinc-400" />
                    <span className="text-sm text-zinc-600">Expires after</span>
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
                      className="w-20 rounded-md border border-zinc-200/80 bg-white px-2.5 py-1.5 text-center text-sm font-medium text-zinc-900 outline-none focus:border-zinc-400"
                    />
                    <span className="text-sm text-zinc-600">hours</span>
                    <span className="ml-auto text-xs text-zinc-400">
                      {form.expiryHours >= 24
                        ? `${Math.floor(form.expiryHours / 24)}d ${form.expiryHours % 24}h`
                        : `${form.expiryHours}h`}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-zinc-400">
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
