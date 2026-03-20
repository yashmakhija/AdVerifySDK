"use client";

import { Lock } from "lucide-react";

export function PlanRequiredCard() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] mb-5">
        <Lock className="h-6 w-6 text-zinc-500" />
      </div>
      <h2 className="text-[16px] font-semibold text-white">
        Active plan required
      </h2>
      <p className="mt-2 max-w-sm text-[13px] text-zinc-500 leading-relaxed">
        You need an active plan to access this feature. Contact support or
        subscribe to a plan to get started.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <a
          href="https://t.me/ShinmenTakezo?text=Hi%2C%20I%20want%20to%20purchase%20an%20AdVerify%20plan."
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-white px-5 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
        >
          Get a Plan
        </a>
        <a
          href="/billing"
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-zinc-400 transition-all hover:bg-white/[0.06] hover:text-white"
        >
          View Billing
        </a>
      </div>
    </div>
  );
}
