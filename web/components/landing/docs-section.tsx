import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ENDPOINTS = [
  { method: "POST", path: "/sdk/init", desc: "Initialize device" },
  { method: "GET", path: "/sdk/ads", desc: "Fetch active ads" },
  { method: "POST", path: "/sdk/generate-pin", desc: "Generate PIN" },
  { method: "POST", path: "/sdk/verify-pin", desc: "Verify PIN" },
  { method: "POST", path: "/sdk/impression", desc: "Track impression" },
  { method: "POST", path: "/sdk/click", desc: "Track click" },
  { method: "GET", path: "/admin/stats", desc: "Dashboard stats" },
  { method: "GET", path: "/admin/keys", desc: "List API keys" },
  { method: "POST", path: "/admin/keys", desc: "Create key" },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-400/10",
  POST: "text-blue-400 bg-blue-400/10",
};

export function DocsSection() {
  return (
    <section id="docs" className="relative w-full bg-black border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">
            Developer Experience
          </p>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-white leading-tight">
            Clean API.
            <span className="text-zinc-600"> Simple integration.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Code block */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                </div>
                <span className="ml-2 text-[11px] text-zinc-600 font-mono">build.gradle</span>
              </div>
            </div>

            <div className="p-5 md:p-7 space-y-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-3">
                  1. Add dependency
                </p>
                <pre className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3.5 text-[12px] leading-relaxed font-mono overflow-x-auto">
                  <span className="text-zinc-300">implementation</span>
                  <span className="text-zinc-600">{` project(`}</span>
                  <span className="text-emerald-400/80">{`':adverify'`}</span>
                  <span className="text-zinc-600">{`)`}</span>
                </pre>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-3">
                  2. Initialize
                </p>
                <pre className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3.5 text-[12px] leading-relaxed font-mono overflow-x-auto">
                  <span className="text-white">AdVerify</span>
                  <span className="text-zinc-600">.init(</span>
                  <span className="text-zinc-400">context</span>
                  <span className="text-zinc-600">,{"\n  "}</span>
                  <span className="text-emerald-400/80">&quot;YOUR_API_KEY&quot;</span>
                  <span className="text-zinc-600">,{"\n  "}</span>
                  <span className="text-emerald-400/80">&quot;https://api.yoursite.com&quot;</span>
                  <span className="text-zinc-600">);</span>
                </pre>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-3">
                  3. Show ads
                </p>
                <pre className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3.5 text-[12px] leading-relaxed font-mono overflow-x-auto">
                  <span className="text-white">AdVerify</span>
                  <span className="text-zinc-600">.showAd(</span>
                  <span className="text-zinc-400">activity</span>
                  <span className="text-zinc-600">, </span>
                  <span className="text-zinc-400">callback</span>
                  <span className="text-zinc-600">);</span>
                </pre>
              </div>
            </div>
          </div>

          {/* API endpoints */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                REST API Endpoints
              </span>
              <Link href="/guide" className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-500 hover:text-white transition-colors">
                Full docs <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {ENDPOINTS.map(({ method, path, desc }) => (
                <div
                  key={`${method}-${path}`}
                  className="flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-white/[0.02]"
                >
                  <span className={`w-[52px] shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold text-center ${METHOD_COLORS[method] || ""}`}>
                    {method}
                  </span>
                  <span className="flex-1 font-mono text-[12px] text-zinc-400 truncate">
                    /api{path}
                  </span>
                  <span className="hidden sm:block text-[12px] text-zinc-600 shrink-0">
                    {desc}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.04] px-5 py-2.5">
              <p className="text-[11px] text-zinc-600">
                Admin endpoints use HTTP Basic Auth. SDK endpoints use <code className="font-mono text-zinc-500">x-api-key</code> header.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
