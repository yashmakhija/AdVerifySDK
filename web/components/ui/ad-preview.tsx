"use client";

import { ImageIcon } from "lucide-react";

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
    <div className="flex flex-col items-center">
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
        Preview &mdash; {layout}
      </p>

      {/* Phone frame */}
      <div className="relative w-[240px] rounded-[1.75rem] border border-white/[0.1] bg-[#111] p-1.5 shadow-2xl shadow-black/50">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-1.5 pb-0.5">
          <span className="text-[8px] text-zinc-500 font-medium tabular-nums">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-zinc-600" />
            <div className="h-1 w-2.5 rounded-full bg-zinc-600" />
            <div className="h-1 w-3 rounded-sm bg-zinc-600" />
          </div>
        </div>

        {/* Screen area - dark app background */}
        <div className="rounded-[1.25rem] bg-[#1a1a1a] overflow-hidden relative" style={{ minHeight: 400 }}>
          {/* Dim app content behind */}
          <div className="absolute inset-0 flex flex-col p-3 opacity-20">
            <div className="h-2 w-14 rounded bg-white/20 mb-2" />
            <div className="h-2 w-20 rounded bg-white/10 mb-4" />
            <div className="h-16 w-full rounded-lg bg-white/5 mb-2" />
            <div className="h-2 w-24 rounded bg-white/10 mb-1" />
            <div className="h-2 w-16 rounded bg-white/5" />
          </div>

          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Ad dialog - matches AdDialog.java exactly */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
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
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pt-1.5 pb-0.5">
          <div className="h-1 w-16 rounded-full bg-zinc-700" />
        </div>
      </div>

      <p className="mt-3 text-[10px] text-zinc-700 text-center max-w-[200px]">
        {layout === "card" && "Matches current SDK dialog"}
        {layout === "fullscreen" && "Full screen — requires SDK update"}
        {layout === "banner" && "Bottom banner — requires SDK update"}
      </p>
    </div>
  );
}

/**
 * Card layout — exact match to AdDialog.java
 *
 * Android specs:
 * - 340dp wide, 20dp rounded corners
 * - bg: #fafafa
 * - Image: match_parent × 160dp, center_crop, bg #eeeeee
 * - Content padding: 24dp horizontal, 20dp vertical
 * - Title: 17sp bold #111111
 * - Desc: 13sp #888888, 1.35 line-height, 6dp top margin
 * - Divider: 1dp #f2f2f2, 16dp top margin
 * - Buttons: Close (#999) left, CTA (white on #111, 10dp radius, bold) right, 12dp top margin
 */
function CardPreview({
  title,
  description,
  imageUrl,
  buttonText,
}: Omit<AdPreviewProps, "adType">) {
  return (
    <div
      className="w-full overflow-hidden shadow-2xl shadow-black/50"
      style={{
        backgroundColor: "#fafafa",
        borderRadius: 14, // ~20dp scaled
        maxWidth: 220,
      }}
    >
      {/* Image — 160dp height at ~0.65x scale = ~104px */}
      <div
        className="w-full overflow-hidden"
        style={{ height: 104, backgroundColor: "#eeeeee" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-6 w-6" style={{ color: "#cccccc" }} />
          </div>
        )}
      </div>

      {/* Content — 24dp padding horizontal, 20dp vertical → ~16px, ~13px */}
      <div style={{ padding: "13px 16px" }}>
        {/* Title — 17sp bold #111 */}
        <p
          className="truncate"
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.3,
          }}
        >
          {title || "Ad Title"}
        </p>

        {/* Description — 13sp #888, 6dp top, 1.35 line height */}
        {description && (
          <p
            className="line-clamp-2"
            style={{
              fontSize: 9,
              color: "#888888",
              marginTop: 4,
              lineHeight: 1.35,
            }}
          >
            {description}
          </p>
        )}

        {/* Divider — 1dp #f2f2f2, 16dp top margin */}
        <div
          style={{
            height: 1,
            backgroundColor: "#f2f2f2",
            marginTop: 10,
          }}
        />

        {/* Button row — Close left, CTA right, 12dp top */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: 8 }}
        >
          <span
            style={{
              fontSize: 9,
              color: "#999999",
            }}
          >
            Close
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "#ffffff",
              backgroundColor: "#111111",
              borderRadius: 7,
              padding: "5px 13px",
            }}
          >
            {buttonText || "Visit"}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Fullscreen layout — not yet in SDK, shows planned design */
function FullscreenPreview({
  title,
  description,
  imageUrl,
  buttonText,
}: Omit<AdPreviewProps, "adType">) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: "#eeeeee" }}>
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <div className="flex h-full items-center justify-center"><ImageIcon className="h-8 w-8" style={{ color: "#ccc" }} /></div>
        )}
        {/* Close X */}
        <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <span className="text-[8px] text-white font-bold">✕</span>
        </div>
      </div>
      <div style={{ padding: "10px 14px 12px", backgroundColor: "#fafafa" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#111" }} className="truncate">{title || "Ad Title"}</p>
        {description && <p style={{ fontSize: 9, color: "#888", marginTop: 2 }} className="line-clamp-1">{description}</p>}
        <div className="mt-2 w-full text-center" style={{ fontSize: 9, fontWeight: 700, color: "#fff", backgroundColor: "#111", borderRadius: 7, padding: "6px 0" }}>
          {buttonText || "Visit"}
        </div>
      </div>
    </div>
  );
}

/** Banner layout — not yet in SDK, shows planned design */
function BannerPreview({
  title,
  imageUrl,
  buttonText,
}: {
  title: string;
  imageUrl: string;
  buttonText: string;
}) {
  return (
    <>
      {/* Remove overlay for banner - show app content */}
      <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col p-3">
        <div className="h-2 w-14 rounded bg-white/10 mb-2" />
        <div className="h-2 w-20 rounded bg-white/5 mb-3" />
        <div className="h-24 w-full rounded-lg bg-white/[0.03] mb-2" />
        <div className="h-2 w-24 rounded bg-white/5 mb-1" />
        <div className="h-2 w-16 rounded bg-white/[0.03]" />
      </div>

      {/* Banner at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-center gap-2"
        style={{
          backgroundColor: "#fafafa",
          borderTop: "1px solid #eee",
          padding: "6px 10px",
        }}
      >
        <div
          className="shrink-0 overflow-hidden"
          style={{
            width: 36,
            height: 36,
            borderRadius: 6,
            backgroundColor: "#eee",
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : (
            <div className="flex h-full items-center justify-center"><ImageIcon className="h-3 w-3" style={{ color: "#ccc" }} /></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 9, fontWeight: 700, color: "#111" }} className="truncate">{title || "Ad Title"}</p>
          <p style={{ fontSize: 7, color: "#999" }}>Sponsored</p>
        </div>
        <span style={{ fontSize: 8, fontWeight: 700, color: "#fff", backgroundColor: "#111", borderRadius: 5, padding: "4px 8px" }}>
          {buttonText || "Visit"}
        </span>
      </div>
    </>
  );
}
