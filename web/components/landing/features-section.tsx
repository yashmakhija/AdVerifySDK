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
      "Drop-in library. Three lines to initialize. Supports interstitial, banner, and native ad formats.",
  },
  {
    icon: Lock,
    title: "PIN Verification",
    description:
      "6-digit PINs tied to device IDs. Integrates with any CPA network or link shortener.",
  },
  {
    icon: Key,
    title: "API Key Management",
    description:
      "Create, rotate, and revoke keys per app. Enable or disable with one click.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track impressions, clicks, CTR, and PIN usage across all apps in real-time.",
  },
  {
    icon: ShieldCheck,
    title: "Device Security",
    description:
      "Per-device PIN binding. Configurable max attempts, custom messages, per-app settings.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Full REST API. Basic auth. Deploy the server, grab an API key, and ship.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <div className="mb-12 max-w-md">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
            Features
          </h2>
          <p className="mt-2 text-[15px] text-zinc-500 leading-relaxed">
            Everything you need to serve ads and verify users.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white p-6">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100">
                <Icon className="h-[18px] w-[18px] text-zinc-600" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-950">{title}</h3>
              <p className="mt-1.5 text-[13px] text-zinc-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
