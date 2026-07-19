import { cn } from "@/lib/utils";

/** Branded loading state — the pulsing amber key. Replaces generic spinners. */
export function Loader({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center py-20", className)}>
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{
              background:
                "radial-gradient(circle, var(--brand-glow) 0%, transparent 70%)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/adverify-icon.png"
            alt=""
            draggable={false}
            className="relative h-9 w-9 select-none object-contain animate-loader"
          />
        </div>
        {label && (
          <span className="text-[13px] text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  );
}
