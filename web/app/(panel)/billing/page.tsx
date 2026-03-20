"use client";

import { useEffect, useState } from "react";
import { Receipt, CheckCircle2, Clock, XCircle, Download } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import type { Purchase } from "@/lib/types";

function statusVariant(status: string) {
  if (status === "active") return "success" as const;
  if (status === "cancelled") return "destructive" as const;
  return "default" as const;
}

function statusIcon(status: string) {
  if (status === "active") return <CheckCircle2 className="h-3.5 w-3.5" />;
  if (status === "cancelled") return <XCircle className="h-3.5 w-3.5" />;
  return <Clock className="h-3.5 w-3.5" />;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BillingPage() {
  const token = useAuthStore((s) => s.token)!;
  const username = useAuthStore((s) => s.username);
  const email = useAuthStore((s) => s.email);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api<Purchase[]>("/auth/purchases", { token });
        setPurchases(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const activePlan = purchases.find((p) => p.status === "active");

  return (
    <div>
      <PageHeader
        title="Billing"
        description="Your subscription and payment history"
      />

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-[13px] text-zinc-600">
          Loading...
        </div>
      ) : (
        <>
          {/* Current Plan */}
          <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-3">
              Current Plan
            </p>
            {activePlan ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[18px] font-bold text-white">
                      {activePlan.plan?.name}
                    </span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <p className="mt-1 text-[13px] text-zinc-500">
                    ₹{activePlan.amount}/mo · Renews {formatDate(activePlan.expiresAt)}
                  </p>
                </div>
                <a
                  href="https://t.me/ShinmenTakezo?text=Hi%2C%20I%20have%20a%20question%20about%20my%20subscription."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-zinc-400 transition-all hover:bg-white/[0.06] hover:text-white text-center"
                >
                  Contact Support
                </a>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-[13px] text-zinc-500">
                  No active plan. Contact admin to get started.
                </p>
                <a
                  href="https://t.me/ShinmenTakezo?text=Hi%2C%20I%20want%20to%20purchase%20a%20plan%20for%20AdVerify."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] text-center"
                >
                  Get a Plan
                </a>
              </div>
            )}
          </div>

          {/* Invoice History */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-3">
            Invoice History
          </p>

          {purchases.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
              <Receipt className="mx-auto h-8 w-8 text-zinc-700" />
              <p className="mt-3 text-sm font-medium text-zinc-400">No invoices yet</p>
              <p className="mt-1 text-[12px] text-zinc-600">
                Your payment history will appear here once your plan is activated
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {purchases.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                >
                  <div className="p-4 sm:p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                          {statusIcon(p.status)}
                        </div>
                        <div>
                          <span className="text-[14px] font-medium text-white">
                            {p.plan?.name || "Plan"}
                          </span>
                          <p className="text-[11px] text-zinc-600">
                            Invoice #{String(p.id).padStart(4, "0")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[16px] font-bold text-white">
                          ₹{p.amount}
                        </span>
                        <div className="mt-0.5">
                          <Badge variant={statusVariant(p.status)}>
                            {p.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-[12px]">
                      <div>
                        <p className="text-zinc-600 mb-0.5">Purchased</p>
                        <p className="text-zinc-400">{formatDate(p.purchasedAt)}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 mb-0.5">Expires</p>
                        <p className="text-zinc-400">{formatDate(p.expiresAt)}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 mb-0.5">Duration</p>
                        <p className="text-zinc-400">{p.plan?.durationDays || 30} days</p>
                      </div>
                    </div>

                    {/* Admin note */}
                    {p.note && (
                      <div className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600 mb-1">
                          Payment Note
                        </p>
                        <p className="text-[13px] text-zinc-400 leading-relaxed">
                          {p.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
