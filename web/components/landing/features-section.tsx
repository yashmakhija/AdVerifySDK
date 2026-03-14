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
    highlight: "3 lines of code",
    accent: "#10b981",
  },
  {
    icon: Lock,
    title: "PIN Verification",
    description:
      "6-digit PINs tied to device IDs. One-time use, per-device binding. Integrates with any CPA network or link shortener.",
    highlight: "Per-device binding",
    accent: "#6366f1",
  },
  {
    icon: Key,
    title: "API Key Management",
    description:
      "Create, rotate, and revoke keys per app. Enable or disable with one click from the admin dashboard.",
    highlight: "One-click control",
    accent: "#f59e0b",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track impressions, clicks, CTR, and PIN usage across all your apps. Live dashboard with daily breakdowns.",
    highlight: "Live tracking",
    accent: "#3b82f6",
  },
  {
    icon: ShieldCheck,
    title: "Device Security",
    description:
      "Per-device PIN binding prevents sharing. Configurable max attempts, custom error messages, per-app settings.",
    highlight: "Anti-sharing",
    accent: "#ef4444",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Full REST API with Basic auth. Deploy the server, grab an API key, patch your APK, and you're live.",
    highlight: "Ship in minutes",
    accent: "#8b5cf6",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-3">
            Features
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-zinc-950 leading-tight">
            Everything you need to serve ads
            <br className="hidden sm:block" />
            <span className="text-zinc-300"> and verify users</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, highlight, accent }) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-zinc-200/60 bg-white p-5 md:p-6 transition-all duration-300 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-100/80"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: accent + "10" }}
              >
                <Icon
                  className="h-[18px] w-[18px]"
                  style={{ color: accent }}
                />
              </div>

              <h3 className="text-[15px] font-semibold text-zinc-950">{title}</h3>

              <p className="mt-2 text-[13px] text-zinc-400 leading-relaxed">
                {description}
              </p>

              <div className="mt-4 inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1">
                <span className="text-[11px] font-medium text-zinc-500">{highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
