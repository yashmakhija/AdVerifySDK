"use client";

import { ImageIcon, X } from "lucide-react";

interface AdPreviewProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  adType: string;
}

/**
 * Live preview matching the actual Android SDK AdDialog.java layout.
 * Renders inside a phone mockup frame.
 */
export function AdPreview({ title, description, imageUrl, buttonText, adType }: AdPreviewProps) {
  const layout = adType || "card";

  return (
    <div className="flex flex-col items-center w-full">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
        Preview &mdash; {layout}
      </p>

      {/* Phone frame — responsive width */}
      <div className="relative w-[200px] sm:w-[220px] lg:w-[240px] rounded-[1.5rem] sm:rounded-[1.75rem] border border-white/[0.1] bg-[#111] p-1.5 shadow-2xl shadow-black/50">
        {/* Status bar */}
        <div className="flex items-center justify-between px-3 pt-1.5 pb-0.5">
          <span className="text-[7px] sm:text-[8px] text-zinc-500 font-medium tabular-nums">9:41</span>
          <div className="flex items-center gap-0.5">
            <div className="h-1 w-1 rounded-full bg-zinc-600" />
            <div className="h-1 w-2 rounded-full bg-zinc-600" />
            <div className="h-1 w-2.5 rounded-sm bg-zinc-600" />
          </div>
        </div>

        {/* Screen */}
        <div className="rounded-[1rem] sm:rounded-[1.25rem] bg-[#1a1a1a] overflow-hidden relative aspect-[9/16]">
          {/* Dim app bg */}
          <div className="absolute inset-0 flex flex-col p-2.5 opacity-15">
            <div className="h-1.5 w-10 rounded bg-white/20 mb-1.5" />
            <div className="h-1.5 w-16 rounded bg-white/10 mb-3" />
            <div className="h-12 w-full rounded-md bg-white/5 mb-2" />
            <div className="h-1.5 w-14 rounded bg-white/10 mb-1" />
            <div className="h-1.5 w-10 rounded bg-white/5" />
          </div>

          {/* Overlay + ad */}
          {layout === "card" || layout === "interstitial" ? (
            <CardPreview title={title} description={description} imageUrl={imageUrl} buttonText={buttonText} />
          ) : layout === "fullscreen" ? (
            <FullscreenPreview title={title} description={description} imageUrl={imageUrl} buttonText={buttonText} />
          ) : layout === "banner" ? (
            <BannerPreview title={title} imageUrl={imageUrl} buttonText={buttonText} />
          ) : (
            <CardPreview title={title} description={description} imageUrl={imageUrl} buttonText={buttonText} />
          )}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pt-1 pb-0.5">
          <div className="h-0.5 sm:h-1 w-12 sm:w-16 rounded-full bg-zinc-700" />
        </div>
      </div>

      <p className="mt-2 text-[9px] sm:text-[10px] text-zinc-700 text-center">
        {layout === "card" && "Matches current SDK dialog"}
        {layout === "fullscreen" && "Full screen — requires SDK update"}
        {layout === "banner" && "Bottom banner — requires SDK update"}
        {layout === "interstitial" && "Matches current SDK dialog"}
      </p>
    </div>
  );
}

/**
 * Card layout — matches the new AdDialog.java
 *
 * White card centered on dark scrim.
 * Image 16:9 ratio. Title bold. Desc gray. Divider. Close + CTA row.
 */
function CardPreview({ title, description, imageUrl, buttonText }: Omit<AdPreviewProps, "adType">) {
  return (
    <>
      {/* Dark scrim */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Centered card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-3">
        <div className="w-full rounded-[10px] bg-white overflow-hidden shadow-2xl shadow-black/40">
          {/* Image 16:9 */}
          <div className="w-full aspect-[16/9] overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
            {imageUrl ? (
              <img src={imageUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageIcon className="h-5 w-5" style={{ color: "#ccc" }} />
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "10px 12px" }}>
            <p className="truncate" style={{ fontSize: 10, fontWeight: 700, color: "#111", lineHeight: 1.3 }}>
              {title || "Ad Title"}
            </p>
            {description && (
              <p className="line-clamp-2" style={{ fontSize: 8, color: "#888", marginTop: 2, lineHeight: 1.35 }}>
                {description}
              </p>
            )}
            <div style={{ height: 1, backgroundColor: "#f0f0f0", marginTop: 8 }} />
            <div className="flex items-center justify-between" style={{ marginTop: 7 }}>
              <span style={{ fontSize: 8, color: "#999" }}>Close</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: "#fff", backgroundColor: "#111", borderRadius: 6, padding: "4px 10px" }}>
                {buttonText || "Visit"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FullscreenPreview({ title, description, imageUrl, buttonText }: Omit<AdPreviewProps, "adType">) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col bg-white">
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <div className="flex h-full items-center justify-center"><ImageIcon className="h-6 w-6" style={{ color: "#ccc" }} /></div>
        )}
        <div className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <X className="h-2 w-2 text-white" />
        </div>
      </div>
      <div style={{ padding: "8px 10px 10px", backgroundColor: "#fff" }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#111" }} className="truncate">{title || "Ad Title"}</p>
        {description && <p style={{ fontSize: 8, color: "#888", marginTop: 2 }} className="line-clamp-1">{description}</p>}
        <div className="mt-1.5 w-full text-center" style={{ fontSize: 8, fontWeight: 700, color: "#fff", backgroundColor: "#111", borderRadius: 6, padding: "5px 0" }}>
          {buttonText || "Visit"}
        </div>
      </div>
    </div>
  );
}

function BannerPreview({ title, imageUrl, buttonText }: { title: string; imageUrl: string; buttonText: string }) {
  return (
    <>
      {/* App content visible behind */}
      <div className="absolute inset-0 flex flex-col p-2.5">
        <div className="h-1.5 w-10 rounded bg-white/10 mb-1.5" />
        <div className="h-1.5 w-16 rounded bg-white/5 mb-2" />
        <div className="h-16 w-full rounded-md bg-white/[0.03] mb-2" />
        <div className="h-1.5 w-14 rounded bg-white/5 mb-1" />
        <div className="h-1.5 w-10 rounded bg-white/[0.03] mb-2" />
        <div className="h-12 w-full rounded-md bg-white/[0.03] mb-1" />
        <div className="h-1.5 w-20 rounded bg-white/5" />
      </div>

      {/* Banner pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-1.5" style={{ backgroundColor: "#fff", borderTop: "1px solid #eee", padding: "5px 8px" }}>
        <div className="shrink-0 overflow-hidden" style={{ width: 28, height: 28, borderRadius: 5, backgroundColor: "#f0f0f0" }}>
          {imageUrl ? (
            <img src={imageUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : (
            <div className="flex h-full items-center justify-center"><ImageIcon className="h-2.5 w-2.5" style={{ color: "#ccc" }} /></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 8, fontWeight: 700, color: "#111" }} className="truncate">{title || "Ad Title"}</p>
          <p style={{ fontSize: 6, color: "#999" }}>Sponsored</p>
        </div>
        <span style={{ fontSize: 7, fontWeight: 700, color: "#fff", backgroundColor: "#111", borderRadius: 4, padding: "3px 6px" }}>
          {buttonText || "Visit"}
        </span>
      </div>
    </>
  );
}
