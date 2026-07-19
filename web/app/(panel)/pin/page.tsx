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
        <p className="mb-2 text-[13px] font-medium text-muted-foreground">
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
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  PIN Verification
                </p>
                <p className="text-xs text-muted-foreground">
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
                form.pinEnabled ? "bg-[var(--brand)]" : "bg-surface-2"
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
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-3 flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  <label className="text-[13px] font-medium text-muted-foreground">
                    PIN Message
                  </label>
                </div>
                <input
                  value={form.pinMessage}
                  onChange={(e) =>
                    setForm({ ...form, pinMessage: e.target.value })
                  }
                  className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-border-strong focus:bg-surface-2"
                  placeholder="Enter your PIN to unlock the app"
                />
              </div>

              {/* Button texts */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Type className="h-3.5 w-3.5 text-muted-foreground" />
                    <label className="text-[13px] font-medium text-muted-foreground">
                      Get PIN Button
                    </label>
                  </div>
                  <input
                    value={form.getPinBtnText}
                    onChange={(e) =>
                      setForm({ ...form, getPinBtnText: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-border-strong focus:bg-surface-2"
                    placeholder="Get PIN"
                  />
                </div>

                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Type className="h-3.5 w-3.5 text-muted-foreground" />
                    <label className="text-[13px] font-medium text-muted-foreground">
                      Enter PIN Button
                    </label>
                  </div>
                  <input
                    value={form.enterPinBtnText}
                    onChange={(e) =>
                      setForm({ ...form, enterPinBtnText: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-border-strong focus:bg-surface-2"
                    placeholder="Enter PIN"
                  />
                </div>
              </div>

              {/* Max attempts */}
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                  <label className="text-[13px] font-medium text-muted-foreground">
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
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-surface-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--brand)]"
                  />
                  <span className="min-w-[2.5rem] rounded-md bg-surface-2 px-2.5 py-1 text-center text-sm font-medium text-foreground">
                    {form.maxAttempts}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  User gets {form.maxAttempts} tries before being locked out
                </p>
              </div>

              {/* Expiry mode */}
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="mb-3 text-[13px] font-medium text-muted-foreground">
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
                        ? "border-white bg-surface-2"
                        : "border-border bg-surface hover:border-border-strong"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        form.expiryMode === "never"
                          ? "bg-[var(--brand)] text-black"
                          : "bg-surface-2 text-muted-foreground"
                      }`}
                    >
                      <Infinity className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          form.expiryMode === "never"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        Never Expire
                      </p>
                      <p className="text-xs text-muted-foreground">
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
                        ? "border-white bg-surface-2"
                        : "border-border bg-surface hover:border-border-strong"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        form.expiryMode === "duration"
                          ? "bg-[var(--brand)] text-black"
                          : "bg-surface-2 text-muted-foreground"
                      }`}
                    >
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          form.expiryMode === "duration"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        Time-based Expiry
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PIN expires after set duration
                      </p>
                    </div>
                  </button>
                </div>

                {form.expiryMode === "duration" && (
                  <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3">
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Expires after</span>
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
                      className="w-20 rounded-md border border-border bg-surface-2 px-2.5 py-1.5 text-center text-sm font-medium text-foreground outline-none focus:border-border-strong"
                    />
                    <span className="text-sm text-muted-foreground">hours</span>
                    <span className="ml-auto text-xs text-muted-foreground">
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
            <p className="text-xs text-muted-foreground">
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
