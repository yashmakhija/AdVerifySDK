"use client";

import { useState } from "react";
import {
  Upload,
  Clock,
  Infinity,
  Hash,
  MessageSquare,
  Download,
  Package,
  RotateCcw,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { API_BASE } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CopyableKey } from "@/components/ui/copyable-key";

type Stage = "idle" | "configuring" | "patching" | "done" | "error";

interface PatchResult {
  downloadId: string;
  apiKey: string;
  apiKeyId: number;
  appName: string;
  packageName: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PatchApkPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();

  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PatchResult | null>(null);

  const [config, setConfig] = useState({
    expiryMode: "never" as "never" | "duration",
    expiryHours: 24,
    maxAttempts: 5,
    pinMessage: "Enter your PIN to unlock the app",
  });

  function handleFile(f: File | undefined) {
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".apk")) {
      toast.show("Please select an .apk file");
      return;
    }
    setFile(f);
    setStage("configuring");
    setError("");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  async function handlePatch() {
    if (!file) return;
    setStage("patching");
    setError("");

    try {
      const formData = new FormData();
      formData.append("apk", file);
      formData.append("expiryMode", config.expiryMode);
      formData.append("expiryHours", String(config.expiryHours));
      formData.append("maxAttempts", String(config.maxAttempts));
      formData.append("pinMessage", config.pinMessage);

      const res = await fetch(`${API_BASE}/admin/patch`, {
        method: "POST",
        headers: { Authorization: `Basic ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data: PatchResult = await res.json();
      setResult(data);
      setStage("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Patching failed");
      setStage("error");
    }
  }

  function handleDownload() {
    if (!result) return;
    const link = document.createElement("a");
    link.href = `${API_BASE}/admin/patch/download/${result.downloadId}`;
    link.download = "patched.apk";
    // Add auth via query param isn't available, so we fetch with auth
    fetch(link.href, {
      headers: { Authorization: `Basic ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${result.packageName || "patched"}.apk`;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(() => toast.show("Download failed. Link may have expired."));
  }

  function reset() {
    setStage("idle");
    setFile(null);
    setError("");
    setResult(null);
    setConfig({
      expiryMode: "never",
      expiryHours: 24,
      maxAttempts: 5,
      pinMessage: "Enter your PIN to unlock the app",
    });
  }

  return (
    <div>
      <PageHeader
        title="Patch APK"
        description="Upload an APK to automatically inject AdVerify SDK"
      />

      {/* ─── Upload Zone ─── */}
      {stage === "idle" && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-white px-6 py-16 text-center transition-colors hover:border-zinc-300 hover:bg-zinc-50/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100">
            <Upload className="h-5 w-5 text-zinc-400" />
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-700">
            Drag & drop your APK file here
          </p>
          <p className="mt-1 text-xs text-zinc-400">or click to browse</p>
          <label className="mt-4">
            <input
              type="file"
              accept=".apk"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <span className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800">
              <Package className="h-3.5 w-3.5" />
              Select APK
            </span>
          </label>
          <p className="mt-3 text-[11px] text-zinc-400">Max file size: 500 MB</p>
        </div>
      )}

      {/* ─── Configure PIN ─── */}
      {stage === "configuring" && file && (
        <div className="max-w-2xl space-y-5">
          {/* Selected file */}
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-900">
                {file.name}
              </p>
              <p className="text-xs text-zinc-400">{formatSize(file.size)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset} className="text-xs">
              Change
            </Button>
          </div>

          {/* PIN Message */}
          <div className="rounded-xl border border-zinc-200/80 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
              <label className="text-[13px] font-medium text-zinc-600">
                PIN Message
              </label>
            </div>
            <input
              value={config.pinMessage}
              onChange={(e) =>
                setConfig({ ...config, pinMessage: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 focus:bg-white"
              placeholder="Enter your PIN to unlock the app"
            />
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
                value={config.maxAttempts}
                onChange={(e) =>
                  setConfig({ ...config, maxAttempts: Number(e.target.value) })
                }
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900"
              />
              <span className="min-w-[2.5rem] rounded-md bg-zinc-100 px-2.5 py-1 text-center text-sm font-medium text-zinc-900">
                {config.maxAttempts}
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              User gets {config.maxAttempts} tries before being locked out
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
                onClick={() => setConfig({ ...config, expiryMode: "never" })}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                  config.expiryMode === "never"
                    ? "border-zinc-900 bg-zinc-50"
                    : "border-zinc-100 bg-white hover:border-zinc-200"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    config.expiryMode === "never"
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  <Infinity className="h-5 w-5" />
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      config.expiryMode === "never"
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
                onClick={() => setConfig({ ...config, expiryMode: "duration" })}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                  config.expiryMode === "duration"
                    ? "border-zinc-900 bg-zinc-50"
                    : "border-zinc-100 bg-white hover:border-zinc-200"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    config.expiryMode === "duration"
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      config.expiryMode === "duration"
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

            {config.expiryMode === "duration" && (
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
                <Clock className="h-4 w-4 shrink-0 text-zinc-400" />
                <span className="text-sm text-zinc-600">Expires after</span>
                <input
                  type="number"
                  value={config.expiryHours}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      expiryHours: Math.max(1, Number(e.target.value)),
                    })
                  }
                  min={1}
                  className="w-20 rounded-md border border-zinc-200/80 bg-white px-2.5 py-1.5 text-center text-sm font-medium text-zinc-900 outline-none focus:border-zinc-400"
                />
                <span className="text-sm text-zinc-600">hours</span>
                <span className="ml-auto text-xs text-zinc-400">
                  {config.expiryHours >= 24
                    ? `${Math.floor(config.expiryHours / 24)}d ${config.expiryHours % 24}h`
                    : `${config.expiryHours}h`}
                </span>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button variant="outline" size="sm" onClick={reset}>
              Cancel
            </Button>
            <Button size="sm" onClick={handlePatch}>
              <Package className="mr-1.5 h-3.5 w-3.5" />
              Patch APK
            </Button>
          </div>
        </div>
      )}

      {/* ─── Patching ─── */}
      {stage === "patching" && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200/80 bg-white px-6 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          <p className="mt-4 text-sm font-medium text-zinc-700">
            Patching APK...
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Decompiling, injecting SDK, rebuilding and signing. This may take a minute.
          </p>
        </div>
      )}

      {/* ─── Done ─── */}
      {stage === "done" && result && (
        <div className="max-w-2xl space-y-5">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 px-5 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <p className="text-sm font-medium text-emerald-800">
                APK patched successfully!
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1">
                  App Name
                </p>
                <p className="text-sm font-medium text-zinc-900">
                  {result.appName}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1">
                  Package Name
                </p>
                <p className="text-sm font-medium text-zinc-900">
                  {result.packageName}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                API Key
              </p>
              <CopyableKey value={result.apiKey} />
            </div>

            <p className="text-xs text-zinc-400">
              API key and PIN config were auto-created. You can manage them on the
              API Keys and PIN Config pages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleDownload}>
              <Download className="mr-1.5 h-4 w-4" />
              Download Patched APK
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Patch Another
            </Button>
          </div>
        </div>
      )}

      {/* ─── Error ─── */}
      {stage === "error" && (
        <div className="max-w-2xl space-y-5">
          <div className="rounded-xl border border-red-200 bg-red-50/50 px-5 py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  Patching failed
                </p>
                <p className="mt-1 text-xs text-red-600">{error}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => { setStage("configuring"); setError(""); }}>
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Retry
            </Button>
            <Button variant="outline" onClick={reset}>
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
