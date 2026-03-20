import { Check, Plus, Crown, Lock } from "lucide-react";

const EARLY_FEATURES = [
  "Server PIN Dialog — verify real devices",
  "Custom Ads on App — card, fullscreen & banner",
  "Admin Dashboard — manage ads & pins",
  "API Key & SDK integration",
  "Future updates & new features",
  "Priority support",
];

const REGULAR_FEATURES = [
  { text: "Server PIN Dialog — verify real devices", included: true },
  { text: "Custom Ads Plugin", included: false, addon: "+₹200/mo" },
  { text: "Admin Dashboard — manage ads & pins", included: true },
  { text: "API Key & SDK integration", included: true },
  { text: "Future updates & new features", included: true },
  { text: "Priority support", included: true },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative w-full bg-black border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">
            Pricing
          </p>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-white leading-tight">
            Simple monthly pricing
            <br className="hidden sm:block" />
            <span className="text-zinc-600">cancel anytime</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-6 md:grid-cols-2">
          {/* ── Early Bird ── */}
          <div className="group relative rounded-2xl border border-white/[0.15] bg-black transition-colors duration-300 hover:border-white/[0.25]">
            {/* Top glow */}
            <div className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-white/[0.3] to-transparent" />

            {/* Badge */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <div className="flex items-center gap-2">
                <Crown className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                  Early Bird
                </span>
              </div>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black">
                20 Spots
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-col p-5 md:p-6">
              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-[18px] font-semibold text-zinc-600 line-through decoration-red-500/60">
                  ₹799
                </span>
                <span className="text-[36px] font-extrabold tracking-tight text-white leading-none">
                  ₹499
                </span>
                <span className="text-[13px] text-zinc-600">/mo</span>
              </div>
              <p className="mt-1.5 text-[12px] text-zinc-600">
                Locked price for first{" "}
                <span className="text-zinc-400 font-medium">20 members</span>{" "}
                · increases after
              </p>

              {/* Divider */}
              <div className="my-5 h-px bg-white/[0.06]" />

              {/* Features */}
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
                Everything included
              </p>
              <ul className="flex flex-col gap-2.5">
                {EARLY_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13px] text-zinc-400 leading-snug"
                  >
                    <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] bg-white text-black">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://t.me/ShinmenTakezo?text=Hi%2C%20I%20want%20to%20purchase%20the%20early%20bird%20plan%20%E2%80%93%20Server%20PIN%20%2B%20Custom%20Ads%20(%E2%82%B9499%2Fmo)"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 block w-full rounded-xl bg-white py-3.5 text-center text-[14px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
              >
                Get Early Access
              </a>

              {/* Spots bar */}
              <div className="mt-4 flex items-center gap-2.5">
                <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[30%] rounded-full bg-white/[0.4]" />
                </div>
                <span className="shrink-0 text-[10px] font-medium tracking-wide text-zinc-600">
                  filling up
                </span>
              </div>
            </div>
          </div>

          {/* ── Regular (future pricing) ── */}
          <div className="group relative rounded-2xl border border-white/[0.06] bg-black opacity-60">
            {/* Badge */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-zinc-600" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
                  After Early Bird
                </span>
              </div>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-zinc-600">
                After 20 users
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-col p-5 md:p-6">
              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-extrabold tracking-tight text-white leading-none">
                  ₹599
                </span>
                <span className="text-[13px] text-zinc-600">/mo</span>
              </div>
              <p className="mt-1.5 text-[12px] text-zinc-600">
                Server PIN only · Custom Ads as add-on
              </p>

              {/* Divider */}
              <div className="my-5 h-px bg-white/[0.06]" />

              {/* Features */}
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
                Includes
              </p>
              <ul className="flex flex-col gap-2.5">
                {REGULAR_FEATURES.map(({ text, included, addon }) => (
                  <li
                    key={text}
                    className="flex items-start gap-2.5 text-[13px] leading-snug"
                  >
                    <span
                      className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] ${
                        included
                          ? "bg-white text-black"
                          : "border border-white/[0.08] bg-white/[0.03] text-zinc-600"
                      }`}
                    >
                      {included ? (
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </span>
                    <span className={included ? "text-zinc-400" : "text-zinc-600"}>
                      {text}
                      {addon && (
                        <span className="ml-1.5 inline-block rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-px text-[10px] font-medium text-zinc-500">
                          {addon}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Locked CTA */}
              <div className="mt-7 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] py-3.5 text-center text-[13px] font-medium text-zinc-600">
                Available after early bird fills up
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-[12px] text-zinc-700">
          Billed monthly. Cancel anytime. Early bird price locked for the
          duration of your subscription.
        </p>
      </div>
    </section>
  );
}
