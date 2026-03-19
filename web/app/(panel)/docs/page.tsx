"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Copy, Check } from "lucide-react";

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
  { method: "GET", path: "/api/admin/settings", desc: "Get global settings" },
  { method: "POST", path: "/api/admin/settings", desc: "Update settings" },
  { method: "POST", path: "/api/sdk/generate-pin", desc: "Generate PIN (SDK)" },
  { method: "POST", path: "/api/sdk/verify-pin", desc: "Verify PIN (SDK)" },
  { method: "GET", path: "/api/sdk/ads", desc: "Get ads (SDK)" },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-500/10",
  POST: "text-blue-400 bg-blue-500/10",
  PATCH: "text-amber-400 bg-amber-500/10",
  DELETE: "text-red-400 bg-red-500/10",
};

function CodeSnippet({ code, id }: { code: string; id: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
      {/* Header with copy */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-white/[0.04]">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
          <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
          <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1 rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-zinc-500 transition-all hover:bg-white/[0.08] hover:text-zinc-300 active:scale-95"
        >
          {copied === id ? (
            <><Check className="h-2.5 w-2.5" /> Copied</>
          ) : (
            <><Copy className="h-2.5 w-2.5" /> Copy</>
          )}
        </button>
      </div>
      {/* Code */}
      <div className="overflow-x-auto px-3.5 py-3">
        <pre className="text-[12px] leading-relaxed text-zinc-400 font-mono">
          <code className="whitespace-pre-wrap break-all sm:whitespace-pre sm:break-normal">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div>
      <PageHeader
        title="SDK Docs"
        description="API endpoints and integration guide"
      />

      <div className="space-y-5">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950 p-5">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Quick Start
          </p>
          <div className="space-y-3">
            <CodeSnippet
              id="gradle"
              code={`// build.gradle\nimplementation project(':adverify')`}
            />
            <CodeSnippet
              id="init"
              code={`// Initialize in Application.onCreate()\nAdVerify.init(context,\n  "YOUR_API_KEY",\n  "https://api.yoursite.com");`}
            />
            <CodeSnippet
              id="show"
              code={`// Show an ad\nAdVerify.showAd(activity,\n  new AdCallback() {\n    @Override\n    public void onAdClosed() {\n      /* continue */\n    }\n});`}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            API Endpoints
          </p>
          <p className="mb-4 text-[13px] text-zinc-500">
            Admin endpoints use HTTP Basic Auth. SDK endpoints use{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-mono text-zinc-400">
              x-api-key
            </code>{" "}
            header.
          </p>
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full min-w-[480px] text-left text-[13px]">
              <thead className="border-b border-white/[0.04] text-[11px] text-zinc-500">
                <tr>
                  <th className="pb-2.5 pr-3 font-medium w-16">Method</th>
                  <th className="pb-2.5 pr-3 font-medium">Path</th>
                  <th className="pb-2.5 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {ENDPOINTS.map(({ method, path, desc }) => (
                  <tr key={`${method}-${path}`}>
                    <td className="py-2.5 pr-3">
                      <span className={`inline-block rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${METHOD_COLORS[method] || ""}`}>
                        {method}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-zinc-200 whitespace-nowrap">
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
