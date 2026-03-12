import {
  ShieldCheck,
  Smartphone,
  Key,
  BarChart3,
  Lock,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  style: "gradient" | "outlined" | "filled";
  gradient?: string;
  bg?: string;
  iconBg: string;
  iconColor: string;
  span?: string;
}

const FEATURES: Feature[] = [
  {
    icon: Smartphone,
    title: "Android Native SDK",
    description:
      "Drop-in library with 3-line initialization. Supports interstitial, banner, and native ad formats. No extra dependencies.",
    style: "gradient",
    gradient: "from-indigo-600 to-violet-700",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    span: "sm:col-span-2",
  },
  {
    icon: Lock,
    title: "PIN Verification",
    description:
      "6-digit PIN system tied to device IDs. Integrates with any CPA network or link shortener.",
    style: "outlined",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Key,
    title: "API Key Management",
    description:
      "Create, rotate, and revoke API keys per app. One-click enable/disable from the dashboard.",
    style: "outlined",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track impressions, clicks, CTR, and PIN usage across all your apps. Live dashboard with daily breakdowns.",
    style: "filled",
    bg: "bg-zinc-900",
    iconBg: "bg-white/10",
    iconColor: "text-white",
  },
  {
    icon: ShieldCheck,
    title: "Device-level Security",
    description:
      "Each PIN is tied to a unique device. Configurable max attempts, custom messages, per-app settings.",
    style: "outlined",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Full REST API for ad management, PIN config, and analytics. All behind Basic auth. Deploy in minutes.",
    style: "outlined",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const { icon: Icon, title, description, style, gradient, bg, iconBg, iconColor } = feature;

  if (style === "gradient") {
    return (
      <div
        className={`group relative rounded-3xl bg-gradient-to-br ${gradient} p-7 text-white shadow-xl shadow-indigo-600/15 overflow-hidden animate-fade-in-up`}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 blur-2xl -translate-y-10 translate-x-10" />
        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} backdrop-blur-sm`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-base font-bold mb-2">{title}</h3>
        <p className="text-sm text-white/70 leading-relaxed">{description}</p>
      </div>
    );
  }

  if (style === "filled") {
    return (
      <div
        className={`group rounded-3xl ${bg} p-7 text-white shadow-xl overflow-hidden animate-fade-in-up`}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <h3 className="text-base font-bold mb-2">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
    );
  }

  return (
    <div
      className="group rounded-3xl border border-zinc-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-zinc-200 hover:-translate-y-0.5 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <h3 className="text-base font-bold text-zinc-900 mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="w-full relative bg-[#fafafa]">
      <div className="wrapper py-20 md:py-28">
        <div className="mb-16 max-w-xl">
          <span className="inline-block rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-semibold text-indigo-600 mb-4">
            Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-zinc-900">
            Everything you need,{" "}
            <span className="gradient-text bg-gradient-to-r from-indigo-600 to-violet-600">
              nothing you don&apos;t
            </span>
          </h2>
          <p className="mt-4 text-base text-zinc-500 leading-relaxed">
            Ads, PINs, analytics, and key management — all from one SDK and one
            dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div key={feature.title} className={feature.span || ""}>
              <FeatureCard feature={feature} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
