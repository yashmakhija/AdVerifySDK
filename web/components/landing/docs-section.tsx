const ENDPOINTS = [
  { method: "GET", path: "/api/admin/stats", desc: "Dashboard stats" },
  { method: "GET", path: "/api/admin/keys", desc: "List API keys" },
  { method: "POST", path: "/api/admin/keys", desc: "Create key" },
  { method: "PATCH", path: "/api/admin/keys/:id", desc: "Update key" },
  { method: "DELETE", path: "/api/admin/keys/:id", desc: "Delete key" },
  { method: "GET", path: "/api/admin/ads", desc: "List ads" },
  { method: "POST", path: "/api/admin/ads", desc: "Create ad" },
  { method: "POST", path: "/api/admin/pin-config", desc: "PIN config" },
  { method: "POST", path: "/api/sdk/generate-pin", desc: "Generate PIN" },
];

export function DocsSection() {
  return (
    <section id="docs" className="w-full border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <div className="mb-12 max-w-md">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
            API Reference
          </h2>
          <p className="mt-2 text-[15px] text-zinc-500 leading-relaxed">
            Quick start and endpoint overview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-zinc-950 p-5 md:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Quick Start
            </p>
            <div className="space-y-3">
              <pre className="rounded-lg bg-zinc-900 p-3 text-[12px] leading-relaxed text-zinc-400 font-mono overflow-x-auto">
                <code>{`// build.gradle
implementation project(':adverify')`}</code>
              </pre>
              <pre className="rounded-lg bg-zinc-900 p-3 text-[12px] leading-relaxed text-zinc-400 font-mono overflow-x-auto">
                <code>{`AdVerify.init(
  context,
  "YOUR_API_KEY",
  "https://api.yoursite.com"
);`}</code>
              </pre>
              <pre className="rounded-lg bg-zinc-900 p-3 text-[12px] leading-relaxed text-zinc-400 font-mono overflow-x-auto">
                <code>{`AdVerify.showAd(activity, cb);`}</code>
              </pre>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-xl border border-zinc-200 bg-white p-5 md:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              Endpoints
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="border-b border-zinc-100 text-[11px] text-zinc-400">
                  <tr>
                    <th className="pb-2.5 pr-4 font-medium">Method</th>
                    <th className="pb-2.5 pr-4 font-medium">Path</th>
                    <th className="pb-2.5 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {ENDPOINTS.map(({ method, path, desc }) => (
                    <tr key={`${method}-${path}`}>
                      <td className="py-2.5 pr-4 font-mono text-[11px] text-zinc-500">
                        {method}
                      </td>
                      <td className="py-2.5 pr-4 font-mono text-[11px] text-zinc-950">
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
