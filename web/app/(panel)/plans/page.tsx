"use client";

import { useEffect, useState } from "react";
import { CreditCard, Trash2, Pencil } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Modal, FormInput, FormTextarea, ModalActions } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/types";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  currency: "₹",
  durationDays: "30",
  badge: "",
  subtitle: "",
  maxApps: "0",
  maxAds: "0",
  maxSpots: "",
};

export default function PlansPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  async function load() {
    try {
      const data = await api<Plan[]>("/admin/manage/plans", { token });
      setPlans(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setModal(true);
  }

  function openEdit(plan: Plan) {
    setEditId(plan.id);
    setForm({
      name: plan.name,
      description: plan.description || "",
      price: String(plan.price),
      originalPrice: plan.originalPrice ? String(plan.originalPrice) : "",
      currency: plan.currency || "₹",
      durationDays: String(plan.durationDays),
      badge: plan.badge || "",
      subtitle: plan.subtitle || "",
      maxApps: String(plan.maxApps),
      maxAds: String(plan.maxAds),
      maxSpots: plan.maxSpots ? String(plan.maxSpots) : "",
    });
    setModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      name: form.name,
      description: form.description || undefined,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      currency: form.currency,
      durationDays: Number(form.durationDays),
      badge: form.badge || undefined,
      subtitle: form.subtitle || undefined,
      maxApps: Number(form.maxApps),
      maxAds: Number(form.maxAds),
      maxSpots: form.maxSpots ? Number(form.maxSpots) : undefined,
    };

    if (editId) {
      await api(`/admin/manage/plans/${editId}`, { method: "PATCH", token, body });
      toast.show("Plan updated");
    } else {
      await api("/admin/manage/plans", { method: "POST", token, body });
      toast.show("Plan created");
    }
    setModal(false);
    load();
  }

  async function deletePlan(id: number) {
    if (!confirm("Delete this plan?")) return;
    await api(`/admin/manage/plans/${id}`, { method: "DELETE", token });
    toast.show("Plan deleted");
    load();
  }

  return (
    <div>
      <PageHeader
        title="Plans"
        description="Manage subscription plans"
        actionLabel="New Plan"
        onAction={openCreate}
      />

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-[13px] text-zinc-600">
          Loading...
        </div>
      ) : plans.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <CreditCard className="mx-auto h-8 w-8 text-zinc-700" />
          <p className="mt-3 text-sm font-medium text-zinc-400">No plans yet</p>
          <p className="mt-1 text-[12px] text-zinc-600">Create your first plan to start selling</p>
          <Button size="sm" className="mt-4" onClick={openCreate}>
            Create Plan
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-medium text-white">{plan.name}</h3>
                    {plan.subtitle && (
                      <p className="text-[11px] text-zinc-600 mt-0.5">{plan.subtitle}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {plan.badge && (
                      <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-black">
                        {plan.badge}
                      </span>
                    )}
                    <Badge variant={plan.isActive ? "success" : "destructive"}>
                      {plan.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  {plan.originalPrice && (
                    <span className="text-[14px] font-medium text-zinc-600 line-through">
                      {plan.currency}{plan.originalPrice}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-white">
                    {plan.currency}{plan.price}
                  </span>
                  <span className="text-[12px] text-zinc-600">
                    /{plan.durationDays}d
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-zinc-500">
                    {plan.maxApps === 0 ? "Unlimited" : plan.maxApps} apps
                  </span>
                  <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-zinc-500">
                    {plan.maxAds === 0 ? "Unlimited" : plan.maxAds} ads
                  </span>
                  {plan.maxSpots && (
                    <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-zinc-500">
                      {plan._count?.purchases || 0}/{plan.maxSpots} spots
                    </span>
                  )}
                  <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-zinc-500">
                    {plan._count?.purchases || 0} subscribers
                  </span>
                </div>

                {plan.description && (
                  <p className="text-[12px] text-zinc-600 leading-relaxed">{plan.description}</p>
                )}
              </div>

              <div className="flex border-t border-white/[0.06] divide-x divide-white/[0.06]">
                <button
                  onClick={() => openEdit(plan)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-white/[0.03]"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? "Edit Plan" : "Create Plan"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Early Bird"
            required
          />
          <FormTextarea
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Plan description..."
          />
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="499"
              required
            />
            <FormInput
              label="Original Price"
              type="number"
              value={form.originalPrice}
              onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
              placeholder="799"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Currency"
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              placeholder="₹"
            />
            <FormInput
              label="Duration (days)"
              type="number"
              value={form.durationDays}
              onChange={(e) => setForm({ ...form, durationDays: e.target.value })}
              placeholder="30"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Badge Text"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="20 SPOTS"
            />
            <FormInput
              label="Max Spots"
              type="number"
              value={form.maxSpots}
              onChange={(e) => setForm({ ...form, maxSpots: e.target.value })}
              placeholder="20"
            />
          </div>
          <FormInput
            label="Subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Locked price for first 20 members"
          />
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Max Apps"
              type="number"
              value={form.maxApps}
              onChange={(e) => setForm({ ...form, maxApps: e.target.value })}
              placeholder="5"
              required
            />
            <FormInput
              label="Max Ads"
              type="number"
              value={form.maxAds}
              onChange={(e) => setForm({ ...form, maxAds: e.target.value })}
              placeholder="50"
              required
            />
          </div>
          <ModalActions onClose={() => setModal(false)} submitLabel={editId ? "Update Plan" : "Create Plan"} />
        </form>
      </Modal>
    </div>
  );
}
