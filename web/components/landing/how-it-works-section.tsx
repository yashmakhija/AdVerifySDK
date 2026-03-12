import { Download, Key, ShieldCheck, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  code: string;
  color: string;
  dotColor: string;
}

const STEPS: Step[] = [
  {
    step: "01",
    icon: Download,
    title: "Add the SDK",
    description:
      "Add the AdVerify module to your Android project. Three lines of code in your build.gradle.",
    code: `AdVerify.init(context, "YOUR_API_KEY", "https://api.yoursite.com");`,
    color: "bg-indigo-50 text-indigo-600",
    dotColor: "bg-indigo-500",
  },
  {
    step: "02",
    icon: Key,
    title: "Configure PINs",
    description:
      "Set up PIN verification from the admin panel. Connect your CPA network or link shortener webhook.",
    code: `POST /api/sdk/generate-pin\n{ "apiKey": "...", "deviceId": "..." }`,
    color: "bg-violet-50 text-violet-600",
    dotColor: "bg-violet-500",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Users verify & unlock",
    description:
      "Users get a 6-digit PIN after completing an action. Enter it in-app — device unlocks permanently.",
    code: `// Automatic flow:\n// Action → PIN generated → User enters → Verified`,
    color: "bg-emerald-50 text-emerald-600",
    dotColor: "bg-emerald-500",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Serve ads & track",
    description:
      "Verified users see your ads. Monitor impressions, clicks, and CTR from the live dashboard.",
    code: `AdVerify.showAd(activity, callback);`,
    color: "bg-amber-50 text-amber-600",
    dotColor: "bg-amber-500",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full relative bg-white border-t border-zinc-100">
      <div className="wrapper py-20 md:py-28">
        <div className="mb-16 text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full bg-violet-50 border border-violet-100 px-3.5 py-1 text-xs font-semibold text-violet-600 mb-4">
            How It Works
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-zinc-900">
            Four steps to{" "}
            <span className="gradient-text bg-gradient-to-r from-indigo-600 to-violet-600">
              go live
            </span>
          </h2>
          <p className="mt-4 text-base text-zinc-500 leading-relaxed">
            From zero to serving ads with PIN verification in under 10 minutes.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-violet-200 to-amber-200 hidden md:block" />

          <div className="space-y-8">
            {STEPS.map(
              ({ step, icon: Icon, title, description, code, color, dotColor }, i) => (
                <div
                  key={step}
                  className="relative flex gap-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="hidden md:flex flex-col items-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} shadow-sm`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div
                      className={`mt-2 h-2 w-2 rounded-full ${dotColor}`}
                    />
                  </div>

                  <div className="flex-1 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-zinc-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color} md:hidden`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                          Step {step}
                        </span>
                        <h3 className="text-base font-bold text-zinc-900">
                          {title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                      {description}
                    </p>
                    <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-4 text-xs leading-relaxed text-violet-300 font-mono">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
