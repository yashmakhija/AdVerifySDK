const STEPS = [
  {
    step: "1",
    title: "Install SDK",
    description: "Add the module to your Android project and call init().",
  },
  {
    step: "2",
    title: "Configure PINs",
    description: "Set up verification rules and connect your CPA webhook.",
  },
  {
    step: "3",
    title: "Users verify",
    description: "Users complete an action, get a PIN, enter it to unlock.",
  },
  {
    step: "4",
    title: "Serve & track",
    description: "Ads are served to verified users. Track everything live.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <div className="mb-14 max-w-md">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
            How it works
          </h2>
          <p className="mt-2 text-[15px] text-zinc-500 leading-relaxed">
            Four steps from zero to live.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {STEPS.map(({ step, title, description }) => (
            <div key={step} className="relative">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
                {step}
              </div>
              <h3 className="text-sm font-semibold text-zinc-950">{title}</h3>
              <p className="mt-1 text-[13px] text-zinc-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-950 p-5 md:p-6 overflow-x-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-zinc-800" />
            <div className="h-3 w-3 rounded-full bg-zinc-800" />
            <div className="h-3 w-3 rounded-full bg-zinc-800" />
          </div>
          <pre className="text-[13px] leading-relaxed text-zinc-400 font-mono whitespace-pre">
            <code>{`// 1. Initialize
AdVerify.init(context, "YOUR_API_KEY", "https://api.yoursite.com");

// 2. Webhook generates PINs
POST /api/sdk/generate-pin { "apiKey": "...", "deviceId": "..." }

// 3. User enters PIN → SDK verifies → app unlocked

// 4. Show ads
AdVerify.showAd(activity, callback);`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
