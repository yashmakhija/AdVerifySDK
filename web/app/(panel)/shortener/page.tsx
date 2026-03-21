"use client";

import { useEffect, useState } from "react";
import {
  Link2,
  Globe,
  Key,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import type { ShortenerConfig } from "@/lib/types";

export default function ShortenerPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    shortenerApiUrl: "",
    shortenerApiSecret: "",
    shortenerFrontendUrl: "",
  });

  useEffect(() => {
    api<ShortenerConfig>("/admin/my-settings", { token })
      .then((s) => {
        setForm({
          shortenerApiUrl: s.shortenerApiUrl || "",
          shortenerApiSecret: s.shortenerApiSecret || "",
          shortenerFrontendUrl: s.shortenerFrontendUrl || "",
        });
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api("/admin/my-settings", { method: "POST", token, body: form });
      toast.show("Shortener config saved");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    setSaving(true);
    try {
      const empty = { shortenerApiUrl: "", shortenerApiSecret: "", shortenerFrontendUrl: "" };
      await api("/admin/my-settings", { method: "POST", token, body: empty });
      setForm(empty);
      toast.show("Reset to system default");
    } finally {
      setSaving(false);
    }
  }

  const hasCustomConfig =
    form.shortenerApiUrl || form.shortenerApiSecret || form.shortenerFrontendUrl;
  const isComplete =
    form.shortenerApiUrl && form.shortenerApiSecret && form.shortenerFrontendUrl;

  if (loading) {
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
      <PageHeader
        title="Link Shortener"
        description="One-time setup — applies to all your apps"
      />

      <div className="max-w-2xl space-y-5">
        {/* Status */}
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              isComplete ? "bg-emerald-500/10" : "bg-white/[0.06]"
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <Link2 className="h-4 w-4 text-zinc-400" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {isComplete ? "Custom Shortener Active" : "Using System Default"}
            </p>
            <p className="text-xs text-zinc-500">
              {isComplete
                ? "All your apps use your own link shortener"
                : "Leave fields empty to keep using the default system shortener"}
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-2 text-[13px] font-medium text-zinc-400">
            How it works
          </p>
          <div className="space-y-2 text-[12px] text-zinc-500 leading-relaxed">
            <p>
              <span className="text-zinc-400 font-medium">1.</span> User taps
              &quot;Get PIN&quot; in app &rarr; our server calls your shortener
              API to create a link
            </p>
            <p>
              <span className="text-zinc-400 font-medium">2.</span> User
              completes the task on your shortener page
            </p>
            <p>
              <span className="text-zinc-400 font-medium">3.</span> Your
              shortener calls our{" "}
              <code className="rounded bg-white/[0.06] px-1 py-px text-[11px] font-mono text-zinc-400">
                POST /api/sdk/generate-pin
              </code>{" "}
              with your API secret to generate the PIN
            </p>
          </div>
        </div>

        {/* Config form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-4">
            <div>
              <div className="mb-1.5 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-zinc-500" />
                <label className="text-[13px] font-medium text-zinc-400">
                  Shortener API URL
                </label>
              </div>
              <input
                value={form.shortenerApiUrl}
                onChange={(e) =>
                  setForm({ ...form, shortenerApiUrl: e.target.value })
                }
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/[0.15] focus:bg-white/[0.06]"
                placeholder="https://your-shortener.com"
              />
              <p className="mt-1.5 text-[11px] text-zinc-600">
                We POST to{" "}
                <code className="font-mono text-zinc-500">
                  {"{url}"}/api/v1/adverify/create
                </code>{" "}
                with {"{apiKey, deviceId}"}
              </p>
            </div>

            <div>
              <div className="mb-1.5 flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-zinc-500" />
                <label className="text-[13px] font-medium text-zinc-400">
                  Shortener API Secret
                </label>
              </div>
              <input
                value={form.shortenerApiSecret}
                onChange={(e) =>
                  setForm({ ...form, shortenerApiSecret: e.target.value })
                }
                type="password"
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/[0.15] focus:bg-white/[0.06]"
                placeholder="Your shortener's secret key"
              />
              <p className="mt-1.5 text-[11px] text-zinc-600">
                Your shortener sends this as{" "}
                <code className="font-mono text-zinc-500">
                  Authorization: Bearer {"{secret}"}
                </code>{" "}
                when calling generate-pin
              </p>
            </div>

            <div>
              <div className="mb-1.5 flex items-center gap-1.5">
                <Link2 className="h-3.5 w-3.5 text-zinc-500" />
                <label className="text-[13px] font-medium text-zinc-400">
                  Shortener Frontend URL
                </label>
              </div>
              <input
                value={form.shortenerFrontendUrl}
                onChange={(e) =>
                  setForm({ ...form, shortenerFrontendUrl: e.target.value })
                }
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/[0.15] focus:bg-white/[0.06]"
                placeholder="https://your-shortener.com"
              />
              <p className="mt-1.5 text-[11px] text-zinc-600">
                The base URL where users see the verification page
              </p>
            </div>
          </div>

          {/* Incomplete warning */}
          {hasCustomConfig && !isComplete && (
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-3.5 py-3">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
              <p className="text-[12px] text-amber-300/80">
                All 3 fields are required for a custom shortener. Fill in all
                fields or clear them to use the system default.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            {hasCustomConfig ? (
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleReset}
                disabled={saving}
              >
                Reset to Default
              </Button>
            ) : (
              <div />
            )}
            <Button size="sm" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
