const STEPS = [
  {
    step: "01",
    title: "Install the SDK",
    description: "Add the adverify module to your Android project — or patch any APK with MT Manager using 3 lines of smali.",
  },
  {
    step: "02",
    title: "Configure PINs",
    description: "Set up verification rules in the dashboard. Connect your link shortener URL for PIN generation.",
  },
  {
    step: "03",
    title: "Users verify",
    description: "Users complete an action on your shortener, receive a unique 6-digit PIN, and enter it to unlock the app.",
  },
  {
    step: "04",
    title: "Serve & track",
    description: "Once verified, ads are served automatically. Track impressions, clicks, and CTR in real-time.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative w-full bg-black border-t border-white/[0.06]">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">
            How it works
          </p>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-white leading-tight">
            From zero to live
            <span className="text-zinc-600"> in four steps</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 mb-20">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-white/[0.06]" />

          {STEPS.map(({ step, title, description }, i) => (
            <div
              key={step}
              className="relative text-center md:px-6 animate-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Step circle */}
              <div className="relative z-10 mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[13px] font-bold text-black ring-4 ring-black shadow-lg shadow-white/5">
                {step}
              </div>

              <h3 className="text-[14px] font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[13px] text-zinc-500 leading-relaxed max-w-[200px] mx-auto">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Code preview */}
        <div className="relative mx-auto max-w-3xl">
          {/* Glow */}
          <div className="absolute -inset-4 rounded-2xl bg-white/[0.02] blur-2xl" />

          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0c0c] overflow-hidden shadow-2xl shadow-black/40">
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-white/[0.06] border border-white/[0.08]" />
                <div className="h-3 w-3 rounded-full bg-white/[0.06] border border-white/[0.08]" />
                <div className="h-3 w-3 rounded-full bg-white/[0.06] border border-white/[0.08]" />
              </div>
              <span className="ml-3 text-[11px] text-zinc-600 font-mono">MainActivity.smali</span>
            </div>

            <div className="p-5 md:p-7 overflow-x-auto">
              <pre className="text-[12px] md:text-[13px] leading-[1.8] font-mono">
                <code>
                  <span className="text-zinc-600">{`# ── Step 1: Add to onCreate after invoke-super ──\n\n`}</span>
                  <span className="text-zinc-300">const-string</span>
                  <span className="text-zinc-500">{` v0, `}</span>
                  <span className="text-emerald-400/80">{`"YOUR_API_KEY"\n`}</span>
                  <span className="text-zinc-300">const-string</span>
                  <span className="text-zinc-500">{` v1, `}</span>
                  <span className="text-emerald-400/80">{`"https://api.yoursite.com"\n`}</span>
                  <span className="text-white">invoke-static</span>
                  <span className="text-zinc-500">{` {p0, v0, v1},\n`}</span>
                  <span className="text-zinc-600">{`  Lcom/adverify/sdk/`}</span>
                  <span className="text-white">{`AdVerify`}</span>
                  <span className="text-zinc-600">{`;->`}</span>
                  <span className="text-zinc-300">{`start`}</span>
                  <span className="text-zinc-700">{`(...)`}</span>
                  <span className="text-zinc-400">V</span>
                  {`\n\n`}
                  <span className="text-zinc-700">{`# That's it. 3 lines. SDK handles everything else.\n`}</span>
                  <span className="text-zinc-700">{`# PIN dialog → verification → ad serving → tracking`}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
