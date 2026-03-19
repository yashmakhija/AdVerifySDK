"use client";

import {
  ArrowRight,
  Shield,
  ShieldCheck,
  Smartphone,
  Clock,
  Bot,
  Crown,
  ShieldBan,
  Users,
  Send,
  Globe,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

/* ── Phone Mockup ── */
function PhoneMockup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-4 rounded-[2.5rem] bg-white/[0.02] blur-xl" />
      <div className="relative w-[220px] md:w-[250px] rounded-[1.75rem] md:rounded-[2rem] border border-white/[0.12] bg-[#111] p-1.5 md:p-2 shadow-2xl shadow-black/60">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-1.5 pb-0.5">
          <span className="text-[8px] text-zinc-500 font-medium tabular-nums">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-zinc-600" />
            <div className="h-1 w-2.5 rounded-full bg-zinc-600" />
            <div className="h-1 w-3 rounded-sm bg-zinc-600" />
          </div>
        </div>
        <div className="rounded-[1.25rem] bg-white overflow-hidden">{children}</div>
        <div className="flex justify-center pt-1.5 pb-0.5">
          <div className="h-1 w-16 md:w-20 rounded-full bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}

/* ── Info Row ── */
function InfoItem({
  icon,
  text,
  tag,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  tag?: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 py-[5px]">
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: color + "12" }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <span className="text-[10px] font-medium text-zinc-700 flex-1">{text}</span>
      {tag && (
        <span className="rounded-full bg-red-50 px-1.5 py-px text-[7px] font-bold text-red-500 uppercase tracking-wider">
          {tag}
        </span>
      )}
    </div>
  );
}

/* ── Verification Screen ── */
function VerificationScreen({ loading = false }: { loading?: boolean }) {
  return (
    <div className="px-3.5 pt-4 pb-3.5">
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100">
        <Shield className="h-4 w-4 text-zinc-800" />
      </div>
      <h3 className="text-center text-[11px] font-bold text-zinc-900">Device Verification</h3>
      <p className="text-center text-[9px] text-zinc-400 mt-0.5">Verify your device to continue</p>

      <div className="mt-2.5 divide-y divide-zinc-100">
        <InfoItem icon={<Smartphone className="h-3 w-3" />} text="Device Not Registered" tag="Pending" color="#3b82f6" />
        <InfoItem icon={<Clock className="h-3 w-3" />} text="Access Duration: 24 Hours" color="#f59e0b" />
        <InfoItem icon={<Bot className="h-3 w-3" />} text="Automatic Password System" color="#8b5cf6" />
        <InfoItem icon={<Crown className="h-3 w-3" />} text="Premium Users Only" color="#f59e0b" />
        <InfoItem icon={<ShieldBan className="h-3 w-3" />} text="VPN & Emulators Not Allowed" color="#ef4444" />
      </div>

      <div className="mt-3 flex gap-1.5">
        {loading ? (
          <>
            <button className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-zinc-200 py-2 text-[10px] font-semibold text-zinc-500">
              <svg className="h-2.5 w-2.5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
              </svg>
              Generating...
            </button>
            <button className="flex-1 rounded-lg border border-zinc-200 py-2 text-[10px] font-semibold text-zinc-300">Enter PIN</button>
          </>
        ) : (
          <>
            <button className="flex-1 rounded-lg bg-zinc-900 py-2 text-[10px] font-semibold text-white">Get PIN</button>
            <button className="flex-1 rounded-lg border border-zinc-200 py-2 text-[10px] font-semibold text-zinc-700">Enter PIN</button>
          </>
        )}
      </div>

      <div className="mt-2 flex gap-1.5">
        <button className="flex-1 flex items-center justify-center gap-1 rounded-md border border-zinc-100 py-1 text-[8px] text-zinc-400">
          <Globe className="h-2.5 w-2.5" /> Tutorial
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 rounded-md border border-zinc-100 py-1 text-[8px] text-zinc-400">
          <Users className="h-2.5 w-2.5" /> Join Us
        </button>
      </div>
      {!loading && <p className="mt-1.5 text-center text-[8px] text-red-400 font-medium">Exit</p>}
    </div>
  );
}

/* ── PIN Entry Screen ── */
function PinEntryScreen() {
  return (
    <div className="px-3.5 pt-4 pb-3.5">
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100">
        <ShieldCheck className="h-4 w-4 text-zinc-800" />
      </div>
      <h3 className="text-center text-[11px] font-bold text-zinc-900">Enter PIN</h3>
      <p className="text-center text-[9px] text-zinc-400 mt-0.5">Enter the PIN from your browser</p>

      <div className="mt-4 flex justify-center gap-1.5">
        {["4", "8", "2", "\u2022"].map((d, i) => (
          <div
            key={i}
            className="flex h-9 w-8 items-center justify-center rounded-lg border-2 border-zinc-200 bg-zinc-50 text-[14px] font-bold text-zinc-900"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <p className="text-[9px] font-semibold text-red-500">Invalid PIN. Try again.</p>
        <p className="text-[8px] text-zinc-400 mt-0.5 font-mono">2 attempts remaining</p>
      </div>

      <button className="mt-3.5 w-full rounded-lg bg-zinc-900 py-2 text-[10px] font-semibold text-white">Verify</button>

      <button className="mt-2 mx-auto flex items-center gap-0.5 text-[9px] text-zinc-400">
        <ChevronLeft className="h-2.5 w-2.5" /> Back
      </button>
    </div>
  );
}

/* ── Join Screen ── */
function JoinScreen() {
  return (
    <div className="px-3.5 pt-4 pb-3.5">
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100">
        <Users className="h-4 w-4 text-zinc-800" />
      </div>
      <h3 className="text-center text-[11px] font-bold text-zinc-900">Join Our Community</h3>
      <p className="text-center text-[9px] text-zinc-400 mt-0.5">Get updates, mods & support</p>

      <div className="mt-3.5 space-y-1.5">
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 p-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50">
            <Send className="h-3 w-3 text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-zinc-900">OTT Mods</p>
            <p className="text-[8px] text-zinc-400">Telegram Group</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 p-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50">
            <Globe className="h-3 w-3 text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-zinc-900">Public Channel</p>
            <p className="text-[8px] text-zinc-400">Apps, APKs & Mods</p>
          </div>
        </div>
      </div>

      <button className="mt-2.5 w-full rounded-lg border border-zinc-200 py-1.5 text-[10px] font-semibold text-zinc-600">Close</button>

      <div className="mt-2.5 flex gap-1.5">
        <button className="flex-1 rounded-lg bg-zinc-900 py-2 text-[10px] font-semibold text-white">Get PIN</button>
        <button className="flex-1 rounded-lg border border-zinc-200 py-2 text-[10px] font-semibold text-zinc-700">Enter PIN</button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════ */
export function HeroSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dot-dark mask-fade-b" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 h-[600px] w-[800px] md:h-[800px] md:w-[1200px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_55%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-20 md:h-36 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-14 sm:pt-20 md:pt-32">
        {/* ── Text ── */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 sm:px-4 py-1.5 backdrop-blur-sm animate-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] sm:text-[12px] font-medium text-zinc-400">
              Open-source Android SDK for ad serving & PIN verification
            </span>
          </div>

          <h1
            className="text-[2rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] font-extrabold tracking-tight text-white leading-[1.08] animate-in"
            style={{ animationDelay: "100ms" }}
          >
            Monetize your app.
            <br />
            <span className="text-zinc-500">Verify your users.</span>
          </h1>

          <p
            className="mt-4 sm:mt-5 md:mt-6 text-[13px] sm:text-[15px] md:text-[17px] text-zinc-500 leading-relaxed max-w-lg mx-auto animate-in"
            style={{ animationDelay: "200ms" }}
          >
            A drop-in Android SDK with built-in ad serving and 6-digit PIN
            verification. Three lines of code. One dashboard.
          </p>

          <div
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-in"
            style={{ animationDelay: "300ms" }}
          >
            <Link href="/login" className="w-full sm:w-auto">
              <button className="group flex items-center gap-2 rounded-full bg-white px-6 py-2.5 sm:px-7 sm:py-3 text-[13px] sm:text-[14px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.97] shadow-lg shadow-white/5 w-full sm:w-auto justify-center">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link href="/guide" className="w-full sm:w-auto">
              <button className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-2.5 sm:px-7 sm:py-3 text-[13px] sm:text-[14px] font-semibold text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white active:scale-[0.97] w-full sm:w-auto justify-center">
                Read the Docs
              </button>
            </Link>
          </div>
        </div>

        {/* ══ Phone Previews ══ */}

        {/* ── Mobile: 2 phones overlapping ── */}
        <div className="mt-14 sm:mt-20 md:hidden relative flex justify-center items-start animate-in-scale" style={{ animationDelay: "500ms" }}>
          {/* Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_50%)]" />

          {/* Phone 1 - left, slightly back */}
          <div className="relative z-10 -mr-8 mt-4 phone-float-1">
            <PhoneMockup>
              <VerificationScreen />
            </PhoneMockup>
          </div>

          {/* Phone 2 - right, slightly forward */}
          <div className="relative z-20 phone-float-2">
            <PhoneMockup>
              <PinEntryScreen />
            </PhoneMockup>
          </div>
        </div>

        {/* ── Desktop: all 4 phones ── */}
        <div className="mt-24 lg:mt-28 hidden md:block relative animate-in-scale" style={{ animationDelay: "500ms" }}>
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)]" />

          {/* Labels + phones row */}
          <div className="relative flex items-start justify-center gap-5 lg:gap-7">
            {/* Phone 1 */}
            <div className="flex flex-col items-center gap-2.5 phone-float-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Info</span>
              <PhoneMockup>
                <VerificationScreen />
              </PhoneMockup>
            </div>

            {/* Phone 2 - offset down */}
            <div className="flex flex-col items-center gap-2.5 mt-12 phone-float-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Pin Entry</span>
              <PhoneMockup>
                <PinEntryScreen />
              </PhoneMockup>
            </div>

            {/* Phone 3 */}
            <div className="flex flex-col items-center gap-2.5 mt-2 phone-float-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Loading</span>
              <PhoneMockup>
                <VerificationScreen loading />
              </PhoneMockup>
            </div>

            {/* Phone 4 - offset down */}
            <div className="flex flex-col items-center gap-2.5 mt-8 phone-float-4 hidden lg:flex">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Join Us</span>
              <PhoneMockup>
                <JoinScreen />
              </PhoneMockup>
            </div>
          </div>
        </div>

        {/* Bottom fade to hide phone bottoms gracefully */}
        <div className="relative h-16 sm:h-20 md:h-24 -mt-16 sm:-mt-20 md:-mt-24 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none" />
      </div>

      {/* Trust bar */}
      <div className="relative border-t border-white/[0.06] z-30">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-8 sm:gap-x-14 gap-y-3 sm:gap-y-5 py-5 sm:py-8">
            {[
              ["50K+", "Devices verified"],
              ["2M+", "Ads served"],
              ["99.9%", "Uptime SLA"],
              ["<200ms", "Avg response"],
            ].map(([value, label]) => (
              <div key={label as string} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[16px] sm:text-[20px] font-bold text-white tabular-nums">{value}</span>
                <span className="text-[11px] sm:text-[13px] text-zinc-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
