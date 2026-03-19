import {
  Smartphone,
  Lock,
  Key,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Smartphone,
    title: "Android Native SDK",
    description:
      "Drop-in library. Three lines to initialize. Supports interstitial, banner, and native ad formats out of the box.",
    tag: "3 lines of code",
  },
  {
    icon: Lock,
    title: "PIN Verification",
    description:
      "6-digit PINs tied to device IDs. One-time use, per-device binding. Integrates with any CPA network or link shortener.",
    tag: "Per-device binding",
  },
  {
    icon: Key,
    title: "API Key Management",
    description:
      "Create, rotate, and revoke keys per app. Enable or disable with one click from the admin dashboard.",
    tag: "One-click control",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track impressions, clicks, CTR, and PIN usage across all your apps. Live dashboard with daily breakdowns.",
    tag: "Live tracking",
  },
  {
    icon: ShieldCheck,
    title: "Device Security",
    description:
      "Per-device PIN binding prevents sharing. Configurable max attempts, custom error messages, per-app settings.",
    tag: "Anti-sharing",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Full REST API with Basic auth. Deploy the server, grab an API key, patch your APK, and you're live.",
    tag: "Ship in minutes",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative w-full bg-black border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">
            Features
          </p>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-white leading-tight">
            Everything you need to
            <br className="hidden sm:block" />
            <span className="text-zinc-600">serve ads and verify users</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.03]">
          {FEATURES.map(({ icon: Icon, title, description, tag }) => (
            <div
              key={title}
              className="group relative bg-black p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              {/* Icon */}
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                <Icon className="h-[18px] w-[18px] text-zinc-400 transition-colors group-hover:text-white" />
              </div>

              <h3 className="text-[15px] font-semibold text-white">{title}</h3>

              <p className="mt-2.5 text-[13px] text-zinc-500 leading-relaxed">
                {description}
              </p>

              <div className="mt-4 inline-flex rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1">
                <span className="text-[11px] font-medium text-zinc-500">{tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
