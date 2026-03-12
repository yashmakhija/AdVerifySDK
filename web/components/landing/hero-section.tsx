import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Zap,
  Key,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full overflow-hidden relative bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)] pointer-events-none" />

      <div className="wrapper relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-20 md:py-28">
          <div className="flex flex-col justify-center gap-8">
            <div className="flex items-center gap-2.5 w-fit rounded-full border border-indigo-200/60 bg-indigo-50 px-4 py-1.5 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
              </span>
              <span className="text-xs font-semibold text-indigo-700">
                Open Source Android SDK
              </span>
            </div>

            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] leading-[1.1] text-zinc-900 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Monetize with ads.
              <br />
              <span className="gradient-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
                Verify with PINs.
              </span>
            </h1>

            <p
              className="text-lg text-zinc-500 max-w-lg leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              A complete Android SDK for ad serving with built-in PIN
              verification. One dashboard to manage it all.
            </p>

            <div
              className="flex flex-wrap items-center gap-3 pt-1 animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <Link href="/login">
                <Button variant="gradient" size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              {[
                { icon: Smartphone, text: "Android Native" },
                { icon: ShieldCheck, text: "PIN Secured" },
                { icon: Zap, text: "Real-time Stats" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-2 text-sm text-zinc-400"
                >
                  <Icon className="h-4 w-4 text-indigo-500" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div
            className="hidden lg:flex items-center justify-center animate-slide-in-right"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />

              <div className="relative space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 text-white shadow-2xl shadow-indigo-600/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-indigo-200" />
                      <span className="text-xs font-semibold text-indigo-200">
                        Today&apos;s Performance
                      </span>
                    </div>
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold">
                      Live
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Impressions", value: "12.8K" },
                      { label: "Clicks", value: "1,024" },
                      { label: "CTR", value: "7.97%" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-2xl font-bold">{s.value}</p>
                        <p className="text-[11px] text-indigo-200">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-lg shadow-zinc-200/50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-500">
                        Verified
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900">8,291</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                      +12.4% this week
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-lg shadow-zinc-200/50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                        <Key className="h-4 w-4 text-violet-600" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-500">
                        API Keys
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900">4</p>
                    <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                      All active
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-lg shadow-zinc-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500">
                        <ShieldCheck className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">
                          PIN Verified
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          device_a4f2...8c91
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                      Unlocked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="wrapper">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-5">
            {[
              { value: "50K+", label: "Devices Verified" },
              { value: "2M+", label: "Ads Served" },
              { value: "99.9%", label: "Uptime" },
              { value: "<30s", label: "PIN Verify Time" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="text-lg font-bold text-zinc-900">
                  {s.value}
                </span>
                <span className="text-xs text-zinc-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
}
