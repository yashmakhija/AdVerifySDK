import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative w-full bg-black border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] px-6 py-16 md:px-16 md:py-24 text-center">
          {/* Background effects */}
          <div className="absolute inset-0 bg-dot-dark opacity-40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

          <div className="relative">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-white leading-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-[15px] text-zinc-500 max-w-md mx-auto leading-relaxed">
              Deploy the server, create an API key, and start serving ads
              with PIN verification in under 10 minutes.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login">
                <button className="group flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.97] shadow-lg shadow-white/5">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
              <Link href="/guide">
                <button className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 py-3 text-[14px] font-semibold text-zinc-400 transition-all hover:bg-white/[0.08] hover:text-white active:scale-[0.97]">
                  Integration Guide
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
