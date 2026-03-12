import { FileCode2, Terminal, Globe } from "lucide-react";

const ENDPOINTS = [
  { method: "GET", path: "/api/admin/stats", desc: "Dashboard stats" },
  { method: "GET", path: "/api/admin/keys", desc: "List API keys" },
  { method: "POST", path: "/api/admin/keys", desc: "Create API key" },
  { method: "PATCH", path: "/api/admin/keys/:id", desc: "Update API key" },
  { method: "DELETE", path: "/api/admin/keys/:id", desc: "Delete API key" },
  { method: "GET", path: "/api/admin/ads", desc: "List ads" },
  { method: "POST", path: "/api/admin/ads", desc: "Create ad" },
  { method: "POST", path: "/api/admin/pin-config", desc: "Save PIN config" },
  {
    method: "POST",
    path: "/api/sdk/generate-pin",
    desc: "Generate PIN (public)",
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-600 bg-emerald-50 border-emerald-100",
  POST: "text-indigo-600 bg-indigo-50 border-indigo-100",
  PATCH: "text-amber-600 bg-amber-50 border-amber-100",
  DELETE: "text-red-600 bg-red-50 border-red-100",
};

export function DocsSection() {
  return (
    <section id="docs" className="w-full relative bg-[#fafafa] border-t border-zinc-100">
      <div className="wrapper py-20 md:py-28">
        <div className="mb-16 max-w-xl">
          <span className="inline-block rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1 text-xs font-semibold text-emerald-600 mb-4">
            Developer Docs
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-zinc-900">
            SDK &{" "}
            <span className="gradient-text bg-gradient-to-r from-indigo-600 to-violet-600">
              API reference
            </span>
          </h2>
          <p className="mt-4 text-base text-zinc-500 leading-relaxed">
            Everything you need to integrate. Full docs in the admin panel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 rounded-3xl bg-zinc-950 p-6 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full" />

            <div className="flex items-center gap-2 mb-5">
              <Terminal className="h-4 w-4 text-zinc-400" />
              <span className="text-xs font-semibold text-zinc-400">
                Quick Start
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest">
                  1. Dependency
                </p>
                <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-3 text-[11px] leading-relaxed text-violet-300 font-mono">
                  <code>{`implementation project(':adverify')`}</code>
                </pre>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest">
                  2. Initialize
                </p>
                <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-3 text-[11px] leading-relaxed text-violet-300 font-mono">
                  <code>{`AdVerify.init(
  context,
  "YOUR_API_KEY",
  "https://api.yoursite.com"
);`}</code>
                </pre>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest">
                  3. Show ads
                </p>
                <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-3 text-[11px] leading-relaxed text-violet-300 font-mono">
                  <code>{`AdVerify.showAd(activity, callback);`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Globe className="h-4 w-4 text-zinc-400" />
              <span className="text-xs font-semibold text-zinc-500">
                API Endpoints
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-100 text-[10px] uppercase text-zinc-400 tracking-widest">
                  <tr>
                    <th className="py-2.5 pr-3">Method</th>
                    <th className="py-2.5 pr-3">Endpoint</th>
                    <th className="py-2.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {ENDPOINTS.map(({ method, path, desc }) => (
                    <tr
                      key={`${method}-${path}`}
                      className="hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="py-2.5 pr-3">
                        <span
                          className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold ${METHOD_COLORS[method]}`}
                        >
                          {method}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 font-mono text-[11px] text-zinc-900">
                        {path}
                      </td>
                      <td className="py-2.5 text-zinc-500">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
