"use client";

import { useEffect, useState } from "react";
import {
  Receipt,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Ban,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import type { Purchase, PlanStatus } from "@/lib/types";

function statusVariant(status: string) {
  if (status === "active") return "success" as const;
  if (status === "cancelled") return "destructive" as const;
  return "default" as const;
}

function statusIcon(status: string) {
  if (status === "active") return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
  if (status === "cancelled") return <XCircle className="h-4 w-4 text-red-400" />;
  return <Clock className="h-4 w-4 text-zinc-400" />;
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
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [planStatus, setPlanStatus] = useState<PlanStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, s] = await Promise.all([
          api<Purchase[]>("/auth/purchases", { token }).catch(() => []),
          api<PlanStatus>("/auth/plan-status", { token }).catch(() => null),
        ]);
        setPurchases(Array.isArray(p) ? p : []);
        setPlanStatus(s);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

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
          {/* Plan Status Card */}
          <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-3">
              Plan Status
            </p>

            {/* Active */}
            {planStatus?.status === "active" && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-bold text-white">
                        {planStatus.plan?.name}
                      </span>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <p className="mt-0.5 text-[12px] text-zinc-500">
                      {planStatus.daysLeft} days remaining · Expires {planStatus.expiresAt && formatDate(planStatus.expiresAt)}
                    </p>
                  </div>
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
            )}

            {/* Expiring Soon */}
            {planStatus?.status === "expiring_soon" && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-bold text-white">
                        {planStatus.plan?.name}
                      </span>
                      <Badge variant="destructive">Expiring Soon</Badge>
                    </div>
                    <p className="mt-0.5 text-[12px] text-amber-400/70">
                      Expires in {planStatus.daysLeft} day{planStatus.daysLeft !== 1 ? "s" : ""} · Renew now to avoid disruption
                    </p>
                  </div>
                </div>
                <a
                  href="https://t.me/ShinmenTakezo?text=Hi%2C%20I%20want%20to%20renew%20my%20AdVerify%20plan.%20It%20expires%20soon."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl bg-amber-500 px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-amber-400 active:scale-[0.98] text-center"
                >
                  Renew Now
                </a>
              </div>
            )}

            {/* Grace Period */}
            {planStatus?.status === "grace" && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-bold text-white">
                        Grace Period
                      </span>
                      <Badge variant="destructive">Expired</Badge>
                    </div>
                    <p className="mt-0.5 text-[12px] text-red-400/70">
                      {planStatus.message} · Your API keys still work but will be suspended soon
                    </p>
                  </div>
                </div>
                <a
                  href="https://t.me/ShinmenTakezo?text=Hi%2C%20my%20AdVerify%20plan%20has%20expired.%20I%20want%20to%20renew."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl bg-red-500 px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-red-400 active:scale-[0.98] text-center"
                >
                  Renew Now
                </a>
              </div>
            )}

            {/* Suspended */}
            {planStatus?.status === "suspended" && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                    <Ban className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-bold text-white">
                        Suspended
                      </span>
                      <Badge variant="destructive">Keys Disabled</Badge>
                    </div>
                    <p className="mt-0.5 text-[12px] text-red-400/70">
                      Your API keys are suspended. Renew your plan to reactivate everything instantly.
                    </p>
                  </div>
                </div>
                <a
                  href="https://t.me/ShinmenTakezo?text=Hi%2C%20my%20AdVerify%20API%20keys%20are%20suspended.%20I%20want%20to%20renew."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl bg-red-500 px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-red-400 active:scale-[0.98] text-center"
                >
                  Renew Now
                </a>
              </div>
            )}

            {/* No Plan / Expired */}
            {(!planStatus || planStatus.status === "expired") && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                    <Receipt className="h-5 w-5 text-zinc-500" />
                  </div>
                  <div>
                    <span className="text-[16px] font-bold text-white">
                      No Active Plan
                    </span>
                    <p className="mt-0.5 text-[12px] text-zinc-500">
                      Get a plan to unlock API keys, ads, PINs, and all features
                    </p>
                  </div>
                </div>
                <a
                  href="https://t.me/ShinmenTakezo?text=Hi%2C%20I%20want%20to%20purchase%20an%20AdVerify%20plan."
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
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.06]">
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
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4 text-[12px]">
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
                      {p.assignedBy && (
                        <div>
                          <p className="text-zinc-600 mb-0.5">Activated by</p>
                          <p className="text-zinc-400">{p.assignedBy.username}</p>
                        </div>
                      )}
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
