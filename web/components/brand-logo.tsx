import { cn } from "@/lib/utils";

/** AdVerify brand mark — the amber key icon. Size via className (default h-7 w-7). */
export function BrandLogo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/adverify-icon.png"
      alt="AdVerify"
      draggable={false}
      className={cn("h-7 w-7 shrink-0 select-none object-contain", className)}
    />
  );
}
