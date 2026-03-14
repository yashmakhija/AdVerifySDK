"use client";

import { useEffect, useState } from "react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { FormInput, FormSelect } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import type { PinConfig, ApiKey } from "@/lib/types";

export default function PinConfigPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [configs, setConfigs] = useState<PinConfig[]>([]);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
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
    await api("/admin/pin-config", {
      method: "POST",
      token,
      body: { ...form, apiKeyId: selectedKey },
    });
    toast.show("PIN config saved");
    load();
  }

  return (
    <div>
      <PageHeader
        title="PIN Configuration"
        description="Configure PIN verification and expiry per app"
      />

      <div className="mb-6 max-w-xs">
        <FormSelect
          label="Select App"
          value={selectedKey || ""}
          onChange={(e) => setSelectedKey(Number(e.target.value) || null)}
        >
          <option value="">Choose an app...</option>
          {keys.map((k) => (
            <option key={k.id} value={k.id}>
              {k.appName}
            </option>
          ))}
        </FormSelect>
      </div>

      {selectedKey && (
        <form
          onSubmit={handleSave}
          className="max-w-lg space-y-4 rounded-xl border border-zinc-200 bg-white p-5"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="pinEnabled"
              checked={form.pinEnabled}
              onChange={(e) =>
                setForm({ ...form, pinEnabled: e.target.checked })
              }
              className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
            />
            <label
              htmlFor="pinEnabled"
              className="text-sm font-medium text-zinc-950"
            >
              PIN Verification Enabled
            </label>
          </div>

          <FormInput
            label="PIN Message"
            value={form.pinMessage}
            onChange={(e) => setForm({ ...form, pinMessage: e.target.value })}
          />

          <FormInput
            label="Max Attempts"
            type="number"
            value={form.maxAttempts}
            onChange={(e) =>
              setForm({ ...form, maxAttempts: Number(e.target.value) })
            }
            min={1}
            max={20}
          />

          <FormInput
            label="Get PIN Button Text"
            value={form.getPinBtnText}
            onChange={(e) =>
              setForm({ ...form, getPinBtnText: e.target.value })
            }
          />

          {/* PIN Expiry Settings */}
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 space-y-3">
            <p className="text-[13px] font-medium text-zinc-700">
              PIN Expiry
            </p>

            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="expiryMode"
                  value="never"
                  checked={form.expiryMode === "never"}
                  onChange={() => setForm({ ...form, expiryMode: "never" })}
                  className="accent-zinc-900"
                />
                <span className="text-sm text-zinc-700">Never expire</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="expiryMode"
                  value="duration"
                  checked={form.expiryMode === "duration"}
                  onChange={() => setForm({ ...form, expiryMode: "duration" })}
                  className="accent-zinc-900"
                />
                <span className="text-sm text-zinc-700">
                  Expire after duration
                </span>
              </label>
            </div>

            {form.expiryMode === "duration" && (
              <div className="flex items-center gap-2">
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
                  className="w-24 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                />
                <span className="text-sm text-zinc-500">hours</span>
                <span className="text-xs text-zinc-400 ml-2">
                  ({form.expiryHours >= 24
                    ? `${Math.floor(form.expiryHours / 24)}d ${form.expiryHours % 24}h`
                    : `${form.expiryHours}h`})
                </span>
              </div>
            )}

            <p className="text-xs text-zinc-400">
              {form.expiryMode === "never"
                ? "PIN works forever once verified. User only needs to enter it once."
                : `PIN expires ${form.expiryHours} hours after verification. User must get a new PIN after expiry.`}
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button size="sm" type="submit">
              Save Configuration
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
