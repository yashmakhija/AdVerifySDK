"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PlayCircle, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";

const REFRESH_INTERVAL = 50 * 60 * 1000; // refresh link every 50 min (before 1h expiry)

export default function TutorialPage() {
  const token = useAuthStore((s) => s.token)!;
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const load = useCallback(async () => {
    setError(false);
    try {
      const data = await api<{ url: string }>("/auth/tutorial", { token });
      setVideoUrl(data.url || null);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
    // Auto-refresh the signed URL before it expires
    timerRef.current = setInterval(() => {
      load();
    }, REFRESH_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [load]);

  return (
    <div>
      <PageHeader
        title="Tutorial"
        description="Step-by-step video guide to set up AdVerify"
      />

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-[13px] text-zinc-600">
          Loading video...
        </div>
      ) : error || !videoUrl ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <PlayCircle className="mx-auto h-8 w-8 text-zinc-700" />
          <p className="mt-3 text-sm font-medium text-zinc-400">
            {error ? "Failed to load video" : "No tutorial available yet"}
          </p>
          <p className="mt-1 text-[12px] text-zinc-600">
            {error
              ? "Something went wrong. Try again."
              : "Check back later — a tutorial video will be uploaded soon."}
          </p>
          {error && (
            <button
              onClick={load}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-zinc-400 transition-all hover:bg-white/[0.06] hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-xl border border-white/[0.06] bg-black overflow-hidden">
          <video
            src={videoUrl}
            controls
            controlsList="nodownload"
            className="w-full max-h-[75vh] bg-black"
            playsInline
          />
        </div>
      )}
    </div>
  );
}
