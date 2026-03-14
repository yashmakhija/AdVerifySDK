const STEPS = [
  {
    step: "01",
    title: "Install the SDK",
    description: "Add the adverify module to your Android project — or patch any APK with MT Manager using just 3 lines of smali.",
  },
  {
    step: "02",
    title: "Configure PINs",
    description: "Set up verification rules in the dashboard. Connect your link shortener URL for PIN generation.",
  },
  {
    step: "03",
    title: "Users verify",
    description: "Users complete an action on your shortener, receive a unique 6-digit PIN, and enter it in the app to unlock.",
  },
  {
    step: "04",
    title: "Serve & track",
    description: "Once verified, ads are served automatically. Track impressions, clicks, and CTR in real-time.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full bg-[#f8f8fa] border-t border-zinc-200/40">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-3">
            How it works
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-zinc-950 leading-tight">
            From zero to live
            <span className="text-zinc-300"> in four steps</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 mb-16">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-zinc-200" />

          {STEPS.map(({ step, title, description }) => (
            <div key={step} className="relative text-center md:px-5">
              {/* Step number */}
              <div className="relative z-10 mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-[13px] font-bold text-white ring-4 ring-[#f8f8fa] shadow-sm shadow-zinc-950/15">
                {step}
              </div>

              <h3 className="text-[14px] font-semibold text-zinc-950">{title}</h3>
              <p className="mt-1.5 text-[13px] text-zinc-400 leading-relaxed max-w-[220px] mx-auto">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Code preview */}
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute -inset-4 rounded-2xl bg-zinc-950/5 blur-xl" />
          <div className="relative rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl shadow-zinc-950/20">
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-zinc-800/80 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
              </div>
              <span className="ml-2 text-[11px] text-zinc-500 font-mono">MainActivity.smali</span>
            </div>

            <div className="p-4 md:p-6 overflow-x-auto">
              <pre className="text-[12px] md:text-[13px] leading-relaxed font-mono">
                <code>
                  <span className="text-zinc-600">{`# ── Step 1: Add to onCreate after invoke-super ──\n\n`}</span>
                  <span className="text-emerald-400">const-string</span>
                  <span className="text-zinc-300">{` v0, `}</span>
                  <span className="text-amber-300">{`"YOUR_API_KEY"\n`}</span>
                  <span className="text-emerald-400">const-string</span>
                  <span className="text-zinc-300">{` v1, `}</span>
                  <span className="text-amber-300">{`"https://api.yoursite.com"\n`}</span>
                  <span className="text-blue-400">invoke-static</span>
                  <span className="text-zinc-300">{` {p0, v0, v1},\n`}</span>
                  <span className="text-zinc-500">{`  Lcom/adverify/sdk/`}</span>
                  <span className="text-zinc-200">{`AdVerify`}</span>
                  <span className="text-zinc-500">{`;->`}</span>
                  <span className="text-blue-300">{`start`}</span>
                  <span className="text-zinc-600">{`(...)`}</span>
                  <span className="text-zinc-300">V</span>
                  {`\n\n`}
                  <span className="text-zinc-600">{`# That's it. 3 lines. SDK handles everything else.\n`}</span>
                  <span className="text-zinc-600">{`# PIN dialog → verification → ad serving → tracking`}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
