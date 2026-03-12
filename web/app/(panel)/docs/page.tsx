"use client";

import { PageHeader } from "@/components/ui/page-header";

const ENDPOINTS = [
  { method: "GET", path: "/api/admin/stats", desc: "Dashboard statistics" },
  { method: "GET", path: "/api/admin/keys", desc: "List all API keys" },
  { method: "POST", path: "/api/admin/keys", desc: "Create new API key" },
  { method: "PATCH", path: "/api/admin/keys/:id", desc: "Update key" },
  { method: "DELETE", path: "/api/admin/keys/:id", desc: "Delete key" },
  { method: "GET", path: "/api/admin/ads", desc: "List all ads" },
  { method: "POST", path: "/api/admin/ads", desc: "Create new ad" },
  { method: "PATCH", path: "/api/admin/ads/:id", desc: "Update ad" },
  { method: "DELETE", path: "/api/admin/ads/:id", desc: "Delete ad" },
  { method: "GET", path: "/api/admin/pin-config", desc: "List PIN configs" },
  { method: "POST", path: "/api/admin/pin-config", desc: "Upsert PIN config" },
  { method: "POST", path: "/api/sdk/generate-pin", desc: "Generate PIN (SDK)" },
  { method: "POST", path: "/api/sdk/verify-pin", desc: "Verify PIN (SDK)" },
  { method: "GET", path: "/api/sdk/ads", desc: "Get ads (SDK)" },
];

export default function DocsPage() {
  return (
    <div>
      <PageHeader
        title="SDK Docs"
        description="API endpoints and integration guide"
      />

      <div className="space-y-6">
        <div className="rounded-xl border border-zinc-200 bg-zinc-950 p-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Quick Start
          </p>
          <div className="space-y-3">
            <pre className="rounded-lg bg-zinc-900 p-3 text-[12px] leading-relaxed text-zinc-400 font-mono overflow-x-auto">
              <code>{`// build.gradle
implementation project(':adverify')`}</code>
            </pre>
            <pre className="rounded-lg bg-zinc-900 p-3 text-[12px] leading-relaxed text-zinc-400 font-mono overflow-x-auto">
              <code>{`// Initialize in Application.onCreate()
AdVerify.init(context, "YOUR_API_KEY", "https://api.yoursite.com");`}</code>
            </pre>
            <pre className="rounded-lg bg-zinc-900 p-3 text-[12px] leading-relaxed text-zinc-400 font-mono overflow-x-auto">
              <code>{`// Show an ad
AdVerify.showAd(activity, new AdCallback() {
    @Override public void onAdClosed() { /* continue */ }
});`}</code>
            </pre>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            API Endpoints
          </p>
          <p className="mb-4 text-[13px] text-zinc-500">
            All admin endpoints use HTTP Basic Auth. SDK endpoints use an{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px] font-mono text-zinc-700">
              apiKey
            </code>{" "}
            in the request body.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-[13px]">
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
  );
}
