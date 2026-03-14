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
  GET: "text-emerald-600 bg-emerald-500/10",
  POST: "text-blue-600 bg-blue-500/10",
};

export function DocsSection() {
  return (
    <section id="docs" className="w-full bg-white border-t border-zinc-200/40">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-3">
            Developer Experience
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-zinc-950 leading-tight">
            Clean API.
            <span className="text-zinc-300"> Simple integration.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Code block */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                </div>
                <span className="ml-2 text-[11px] text-zinc-500 font-mono">build.gradle</span>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-2.5">
                  1. Add dependency
                </p>
                <pre className="rounded-lg bg-zinc-900/80 p-3 text-[12px] leading-relaxed font-mono overflow-x-auto">
                  <span className="text-emerald-400">implementation</span>
                  <span className="text-zinc-500">{` project(`}</span>
                  <span className="text-amber-300">{`':adverify'`}</span>
                  <span className="text-zinc-500">{`)`}</span>
                </pre>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-2.5">
                  2. Initialize
                </p>
                <pre className="rounded-lg bg-zinc-900/80 p-3 text-[12px] leading-relaxed font-mono overflow-x-auto">
                  <span className="text-blue-400">AdVerify</span>
                  <span className="text-zinc-500">.init(</span>
                  <span className="text-zinc-300">context</span>
                  <span className="text-zinc-500">,{"\n  "}</span>
                  <span className="text-amber-300">&quot;YOUR_API_KEY&quot;</span>
                  <span className="text-zinc-500">,{"\n  "}</span>
                  <span className="text-amber-300">&quot;https://api.yoursite.com&quot;</span>
                  <span className="text-zinc-500">);</span>
                </pre>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-2.5">
                  3. Show ads
                </p>
                <pre className="rounded-lg bg-zinc-900/80 p-3 text-[12px] leading-relaxed font-mono overflow-x-auto">
                  <span className="text-blue-400">AdVerify</span>
                  <span className="text-zinc-500">.showAd(</span>
                  <span className="text-zinc-300">activity</span>
                  <span className="text-zinc-500">, </span>
                  <span className="text-zinc-300">callback</span>
                  <span className="text-zinc-500">);</span>
                </pre>
              </div>
            </div>
          </div>

          {/* API endpoints */}
          <div className="rounded-2xl border border-zinc-200/60 bg-white overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                REST API Endpoints
              </span>
              <Link href="/guide" className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-400 hover:text-zinc-950 transition-colors">
                Full docs <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="divide-y divide-zinc-100/60">
              {ENDPOINTS.map(({ method, path, desc }) => (
                <div
                  key={`${method}-${path}`}
                  className="flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-zinc-50/50"
                >
                  <span className={`w-[52px] shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold text-center ${METHOD_COLORS[method] || ""}`}>
                    {method}
                  </span>
                  <span className="flex-1 font-mono text-[12px] text-zinc-800 truncate">
                    /api{path}
                  </span>
                  <span className="hidden sm:block text-[12px] text-zinc-400 shrink-0">
                    {desc}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 px-5 py-2.5 bg-zinc-50/30">
              <p className="text-[11px] text-zinc-400">
                Admin endpoints use HTTP Basic Auth. SDK endpoints use <code className="font-mono text-zinc-500">x-api-key</code> header.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
