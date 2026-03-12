"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { FormInput, FormSelect } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import type { PinConfig, ApiKey } from "@/lib/types";

export default function PinConfigPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToast();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [configs, setConfigs] = useState<PinConfig[]>([]);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [form, setForm] = useState({
    pinEnabled: true,
    pinMessage: "Enter your PIN to unlock the app",
    maxAttempts: 5,
    getPinUrl: "",
    getPinBtnText: "Get PIN",
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
          getPinUrl: existing.getPinUrl,
          getPinBtnText: existing.getPinBtnText,
        });
      } else {
        setForm({
          pinEnabled: true,
          pinMessage: "Enter your PIN to unlock the app",
          maxAttempts: 5,
          getPinUrl: "",
          getPinBtnText: "Get PIN",
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
        description="Configure PIN verification per app"
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
          className="max-w-lg space-y-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="pinEnabled"
              checked={form.pinEnabled}
              onChange={(e) =>
                setForm({ ...form, pinEnabled: e.target.checked })
              }
              className="h-4 w-4 rounded border-zinc-300 accent-indigo-600"
            />
            <label
              htmlFor="pinEnabled"
              className="text-sm font-medium text-zinc-900"
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

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
              Get PIN URL{" "}
              <span className="text-zinc-300">
                (use {"{device_id}"} as placeholder)
              </span>
            </label>
            <input
              value={form.getPinUrl}
              onChange={(e) => setForm({ ...form, getPinUrl: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              placeholder="https://yoursite.com/get-pin?device={device_id}"
            />
          </div>

          <FormInput
            label="Get PIN Button Text"
            value={form.getPinBtnText}
            onChange={(e) =>
              setForm({ ...form, getPinBtnText: e.target.value })
            }
          />

          <Button type="submit" variant="gradient" className="w-full">
            Save Configuration
          </Button>
        </form>
      )}
    </div>
  );
}
