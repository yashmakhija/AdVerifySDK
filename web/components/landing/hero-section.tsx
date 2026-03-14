import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid mask-fade-b" />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-18">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-4 py-1.5 shadow-sm shadow-zinc-100 animate-in"
          >
            <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[12px] font-medium text-zinc-500">
              Open-source Android SDK for ad serving + PIN verification
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-zinc-950 leading-[1.1] animate-in"
            style={{ animationDelay: "80ms" }}
          >
            Monetize your app.
            <br />
            <span className="text-zinc-300">Verify your users.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-5 text-[15px] md:text-[17px] text-zinc-400 leading-relaxed max-w-lg mx-auto animate-in"
            style={{ animationDelay: "160ms" }}
          >
            A drop-in Android SDK with built-in ad serving and 6-digit PIN
            verification. Three lines of code. One admin dashboard.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-in"
            style={{ animationDelay: "240ms" }}
          >
            <Link href="/login">
              <Button size="lg" className="gap-2 px-6 h-11 text-[14px] shadow-md shadow-zinc-950/15">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/guide">
              <Button variant="outline" size="lg" className="px-6 h-11 text-[14px] border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300">
                Read the Docs
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div
          className="mt-14 md:mt-18 animate-in-scale"
          style={{ animationDelay: "400ms" }}
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Glow behind */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-b from-zinc-200/40 to-transparent blur-2xl" />

            {/* Browser chrome */}
            <div className="relative rounded-xl border border-zinc-200/80 bg-white shadow-2xl shadow-zinc-300/30 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-2.5 bg-zinc-50/60">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-300/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-300/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-300/60" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="mx-auto max-w-xs rounded-md bg-zinc-100/80 px-3 py-1 text-center">
                    <span className="text-[11px] text-zinc-400 font-mono">adverify.yourdomain.com/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Fake dashboard */}
              <div className="p-4 md:p-6 bg-[#f8f8fa]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="h-4 w-24 rounded-md bg-zinc-900" />
                    <div className="mt-1.5 h-3 w-36 rounded bg-zinc-200/80" />
                  </div>
                  <div className="h-8 w-20 rounded-lg bg-zinc-900" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
                  {[
                    { label: "API Keys", value: "12", color: "bg-emerald-500/10 text-emerald-600" },
                    { label: "Active Ads", value: "48", color: "bg-blue-500/10 text-blue-600" },
                    { label: "Impressions", value: "2.4M", color: "bg-amber-500/10 text-amber-600" },
                    { label: "CTR", value: "3.2%", color: "bg-violet-500/10 text-violet-600" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="rounded-lg border border-zinc-200/60 bg-white p-3">
                      <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">{label}</p>
                      <p className="mt-1 text-lg font-bold text-zinc-950">{value}</p>
                      <div className={`mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${color}`}>
                        +12%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fake table */}
                <div className="rounded-lg border border-zinc-200/60 bg-white overflow-hidden">
                  <div className="grid grid-cols-4 gap-4 border-b border-zinc-100 px-4 py-2.5">
                    {["App Name", "Package", "Status", "Impressions"].map((h) => (
                      <div key={h} className="h-2.5 w-full rounded bg-zinc-200/60" />
                    ))}
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 px-4 py-2.5 border-b border-zinc-50 last:border-0">
                      <div className="h-2.5 rounded bg-zinc-100" style={{ width: `${60 + i * 10}%` }} />
                      <div className="h-2.5 rounded bg-zinc-100" style={{ width: `${70 - i * 5}%` }} />
                      <div className="h-2.5 w-12 rounded-full bg-emerald-100/80" />
                      <div className="h-2.5 rounded bg-zinc-100" style={{ width: `${40 + i * 15}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-t border-zinc-100 bg-zinc-50/40">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 py-6">
            {[
              ["50K+", "Devices verified"],
              ["2M+", "Ads served"],
              ["99.9%", "Uptime SLA"],
              ["<200ms", "Avg response"],
            ].map(([value, label]) => (
              <div key={label as string} className="flex items-center gap-2.5">
                <span className="text-[17px] font-bold text-zinc-950 tabular-nums">{value}</span>
                <span className="text-[13px] text-zinc-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
