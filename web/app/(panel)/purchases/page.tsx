"use client";

import { useEffect, useState } from "react";
import { Receipt, XCircle, UserCog } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Modal, FormSelect, FormTextarea, ModalActions } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import type { Purchase, User, Plan } from "@/lib/types";

function statusVariant(status: string) {
  if (status === "active") return "success" as const;
  if (status === "cancelled") return "destructive" as const;
  return "default" as const;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PurchasesPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ userId: "", planId: "", note: "" });

  async function load() {
    try {
      const [p, u, pl] = await Promise.all([
        api<Purchase[]>("/admin/manage/purchases", { token }),
        api<User[]>("/admin/manage/users", { token }),
        api<Plan[]>("/admin/manage/plans", { token }),
      ]);
      setPurchases(Array.isArray(p) ? p : []);
      setUsers(Array.isArray(u) ? u : []);
      setPlans(Array.isArray(pl) ? pl : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    const selectedUser = users.find((u) => u.id === Number(form.userId));
    const selectedPlan = plans.find((p) => p.id === Number(form.planId));
    await api("/admin/manage/purchases", {
      method: "POST",
      token,
      body: {
        userId: Number(form.userId),
        planId: Number(form.planId),
        note: form.note || undefined,
      },
    });
    toast.show(
      `Assigned "${selectedPlan?.name}" to ${selectedUser?.username || "user"}`
    );
    setModal(false);
    setForm({ userId: "", planId: "", note: "" });
    load();
  }

  async function cancelPurchase(id: number) {
    if (!confirm("Cancel this purchase?")) return;
    await api(`/admin/manage/purchases/${id}/cancel`, { method: "POST", token });
    toast.show("Purchase cancelled");
    load();
  }

  return (
    <div>
      <PageHeader
        title="Purchases"
        description="View and manage plan assignments"
        actionLabel="Assign Plan"
        onAction={() => setModal(true)}
      />

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-[13px] text-zinc-600">
          Loading...
        </div>
      ) : purchases.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <Receipt className="mx-auto h-8 w-8 text-zinc-700" />
          <p className="mt-3 text-sm font-medium text-zinc-400">No purchases yet</p>
          <p className="mt-1 text-[12px] text-zinc-600">Assign a plan to a user to get started</p>
          <Button size="sm" className="mt-4" onClick={() => setModal(true)}>
            Assign Plan
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden lg:block rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">Plan</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Purchased</th>
                  <th className="px-5 py-3.5">Expires</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {purchases.map((p) => (
                  <tr key={p.id} className="text-zinc-400 transition-colors hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5">
                      <div>
                        <span className="font-medium text-white">{p.user?.username || "—"}</span>
                        <p className="text-[11px] text-zinc-600">{p.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] text-zinc-300">{p.plan?.name || "—"}</span>
                      {p.note && (
                        <p className="mt-0.5 text-[11px] text-zinc-600">{p.note}</p>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-[13px]">₹{p.amount}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-zinc-500">{formatDate(p.purchasedAt)}</td>
                    <td className="px-5 py-3.5 text-[12px] text-zinc-500">{formatDate(p.expiresAt)}</td>
                    <td className="px-5 py-3.5 text-right">
                      {p.status === "active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => cancelPurchase(p.id)}
                          className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 h-7 px-2.5 gap-1.5"
                        >
                          <XCircle className="h-3.5 w-3.5" /> Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-3 lg:hidden">
            {purchases.map((p) => (
              <div key={p.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-medium text-white truncate">{p.user?.username || "—"}</h3>
                      <p className="text-[11px] text-zinc-600 mt-0.5">{p.user?.email}</p>
                    </div>
                    <Badge variant={statusVariant(p.status)} className="shrink-0">{p.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
                    <span className="text-zinc-300">{p.plan?.name}</span>
                    <span className="text-zinc-500">₹{p.amount}</span>
                    <span className="text-zinc-600">{formatDate(p.purchasedAt)} → {formatDate(p.expiresAt)}</span>
                  </div>
                  {p.note && (
                    <p className="text-[11px] text-zinc-600 mt-1">{p.note}</p>
                  )}
                </div>
                {p.status === "active" && (
                  <div className="border-t border-white/[0.06]">
                    <button
                      onClick={() => cancelPurchase(p.id)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Cancel Purchase
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Assign Plan to User">
        <form onSubmit={handleAssign} className="space-y-4">
          <FormSelect
            label="User"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
            required
          >
            <option value="">Select user...</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username} ({u.email})
              </option>
            ))}
          </FormSelect>
          <FormSelect
            label="Plan"
            value={form.planId}
            onChange={(e) => setForm({ ...form, planId: e.target.value })}
            required
          >
            <option value="">Select plan...</option>
            {plans
              .filter((p) => p.isActive)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.currency}{p.price}/{p.durationDays}d
                </option>
              ))}
          </FormSelect>
          <FormTextarea
            label="Note (visible to user as invoice remark)"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="e.g. Paid ₹499 via UPI on 20 Mar 2026"
          />
          <ModalActions onClose={() => setModal(false)} submitLabel="Assign Plan" />
        </form>
      </Modal>
    </div>
  );
}
