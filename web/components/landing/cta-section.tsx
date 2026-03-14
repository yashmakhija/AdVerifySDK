import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="w-full border-t border-zinc-200/40">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-4">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-950 px-6 py-14 md:px-16 md:py-20 text-center">
          {/* Grid bg */}
          <div className="absolute inset-0 bg-grid-dark opacity-40" />

          {/* Radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

          <div className="relative">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-white leading-tight">
              Ready to get started?
            </h2>
            <p className="mt-3 text-[14px] md:text-[15px] text-zinc-500 max-w-md mx-auto leading-relaxed">
              Deploy the server, create an API key, and start serving ads
              with PIN verification in under 10 minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-zinc-950 hover:bg-zinc-100 h-11 px-6 text-[14px] shadow-lg shadow-white/10"
                >
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/guide">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white h-11 px-6 text-[14px]"
                >
                  Integration Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
