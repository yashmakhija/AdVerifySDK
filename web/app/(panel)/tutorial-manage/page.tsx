"use client";

import { useState } from "react";
import { Upload, CheckCircle2, Film } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { API_BASE } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";

export default function TutorialManagePage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setDone(false);

    try {
      const formData = new FormData();
      formData.append("video", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_BASE}/admin/manage/tutorial`);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      await new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`Upload failed: ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error("Upload failed"));
        xhr.send(formData);
      });

      setDone(true);
      toast.show("Tutorial video uploaded");
    } catch {
      toast.show("Upload failed — try again");
    } finally {
      setUploading(false);
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div>
      <PageHeader
        title="Tutorial Video"
        description="Upload a tutorial video for your users"
      />

      <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        {/* Drop zone */}
        <label
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center cursor-pointer transition-all ${
            file
              ? "border-border-strong bg-surface"
              : "border-border bg-surface hover:border-border-strong hover:bg-surface-2"
          }`}
        >
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setDone(false);
            }}
            disabled={uploading}
          />
          {file ? (
            <>
              <Film className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-[14px] font-medium text-foreground">{file.name}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                {formatSize(file.size)} · Click to change
              </p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-faint mb-3" />
              <p className="text-[14px] font-medium text-muted-foreground">
                Click to select a video
              </p>
              <p className="mt-1 text-[12px] text-faint">
                MP4, WebM, MOV · Max 500 MB
              </p>
            </>
          )}
        </label>

        {/* Progress */}
        {uploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] text-muted-foreground">Uploading...</span>
              <span className="text-[12px] font-medium text-muted-foreground">{progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-[var(--brand)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Success */}
        {done && !uploading && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3.5 py-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <p className="text-[13px] text-emerald-700 dark:text-emerald-300">
              Video uploaded — users can now watch it from the Tutorial page
            </p>
          </div>
        )}

        {/* Upload button */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[11px] text-faint">
            This replaces any existing tutorial video
          </p>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="rounded-xl bg-[var(--brand)] px-5 py-2.5 text-[13px] font-semibold text-black transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
