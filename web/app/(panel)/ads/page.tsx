"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  MousePointerClick,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Megaphone,
  Image as ImageIcon,
  ExternalLink,
  Radio,
  Repeat,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Modal, FormInput, FormSelect, FormTextarea } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { AdPreview } from "@/components/ui/ad-preview";
import type { Ad, ApiKey } from "@/lib/types";

const STORAGE_KEY = "adverify-ad-draft";

const EMPTY_FORM = {
  apiKeyId: "",
  title: "",
  description: "",
  imageUrl: "",
  redirectUrl: "",
  adType: "card",
  buttonText: "Visit",
  priority: 1,
  maxImpressions: 0,
  broadcastToVerified: false,
};

const AD_LAYOUTS = [
  { value: "card", label: "Card", desc: "Centered dialog with image" },
  { value: "fullscreen", label: "Fullscreen", desc: "Full screen overlay" },
  { value: "banner", label: "Banner", desc: "Slim bar at bottom" },
];

const FREQUENCY_OPTIONS = [
  { value: 0, label: "Unlimited", desc: "Show every time" },
  { value: 1, label: "Once", desc: "Show once per device" },
  { value: 3, label: "3 times", desc: "Show 3 times per device" },
  { value: 5, label: "5 times", desc: "Show 5 times per device" },
  { value: 10, label: "10 times", desc: "Show 10 times per device" },
];

export default function AdsPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [ads, setAds] = useState<Ad[]>([]);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [step, setStep] = useState<"form" | "preview">("form");

  async function load() {
    const [a, k] = await Promise.all([
      api<Ad[]>("/admin/ads", { token }),
      api<ApiKey[]>("/admin/keys", { token }),
    ]);
    setAds(Array.isArray(a) ? a : []);
    setKeys(Array.isArray(k) ? k : []);
  }

  useEffect(() => { load(); }, []);

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title) setForm({ ...EMPTY_FORM, ...parsed });
      }
    } catch {}
  }, []);

  // Save draft to localStorage on form change
  function updateForm(patch: Partial<typeof EMPTY_FORM>) {
    const next = { ...form, ...patch };
    setForm(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }

  function openCreate() {
    setEditingId(null);
    // Try restoring draft
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title) {
          setForm({ ...EMPTY_FORM, ...parsed });
        } else {
          setForm(EMPTY_FORM);
        }
      } else {
        setForm(EMPTY_FORM);
      }
    } catch {
      setForm(EMPTY_FORM);
    }
    setStep("form");
    setModal(true);
  }

  function openEdit(ad: Ad) {
    setEditingId(ad.id);
    const data = {
      apiKeyId: String(ad.apiKeyId),
      title: ad.title,
      description: ad.description,
      imageUrl: ad.imageUrl,
      redirectUrl: ad.redirectUrl,
      adType: ad.adType,
      buttonText: ad.buttonText,
      priority: ad.priority,
      maxImpressions: ad.maxImpressions ?? 0,
      broadcastToVerified: ad.broadcastToVerified ?? false,
    };
    setForm(data);
    setStep("form");
    setModal(true);
  }

  async function handleSubmit() {
    const body = {
      ...form,
      apiKeyId: Number(form.apiKeyId),
      priority: Number(form.priority),
      maxImpressions: Number(form.maxImpressions),
    };

    if (editingId) {
      await api(`/admin/ads/${editingId}`, { method: "PATCH", token, body });
      toast.show("Ad updated");
    } else {
      await api("/admin/ads", { method: "POST", token, body });
      toast.show("Ad created");
    }
    closeModal();
    load();
  }

  function closeModal() {
    setModal(false);
    setEditingId(null);
    setStep("form");
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  async function toggleAd(id: number, isActive: boolean) {
    await api(`/admin/ads/${id}`, { method: "PATCH", token, body: { isActive: !isActive } });
    toast.show(isActive ? "Ad disabled" : "Ad enabled");
    load();
  }

  async function deleteAd(id: number) {
    if (!confirm("Delete this ad? This cannot be undone.")) return;
    await api(`/admin/ads/${id}`, { method: "DELETE", token });
    toast.show("Ad deleted");
    load();
  }

  const imp = (ad: Ad) => ad._count?.impressions ?? 0;
  const clk = (ad: Ad) => ad._count?.clicks ?? 0;
  const ctr = (ad: Ad) => { const i = imp(ad); return i > 0 ? ((clk(ad) / i) * 100).toFixed(1) : "0.0"; };

  return (
    <div>
      <PageHeader title="Ads" description="Manage ads across your apps" actionLabel="New Ad" onAction={openCreate} />

      {/* Empty */}
      {ads.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <Megaphone className="mx-auto h-8 w-8 text-zinc-700" />
          <p className="mt-3 text-sm font-medium text-zinc-400">No ads yet</p>
          <p className="mt-1 text-[12px] text-zinc-600">Create your first ad to start monetizing</p>
          <Button size="sm" className="mt-4" onClick={openCreate}>Create Ad</Button>
        </div>
      )}

      {/* Cards grid */}
      {ads.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <div key={ad.id} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all hover:border-white/[0.1]">
              <div className="relative aspect-[16/9] bg-white/[0.03] overflow-hidden">
                {ad.imageUrl ? (
                  <img src={ad.imageUrl} alt={ad.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center"><ImageIcon className="h-8 w-8 text-zinc-700" /></div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge variant={ad.isActive ? "success" : "destructive"}>{ad.isActive ? "Active" : "Inactive"}</Badge>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  {ad.broadcastToVerified && (
                    <span className="rounded-md bg-blue-500/80 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-semibold text-white flex items-center gap-0.5">
                      <Radio className="h-2.5 w-2.5" /> Broadcast
                    </span>
                  )}
                  <span className="rounded-md bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-semibold text-white uppercase tracking-wider">{ad.adType}</span>
                </div>
              </div>

              <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-semibold text-white truncate">{ad.title}</h3>
                    <p className="text-[11px] text-zinc-600 truncate mt-0.5">{ad.apiKey?.appName || "Unknown"}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 tabular-nums">P{ad.priority}</span>
                </div>

                {ad.description && <p className="mt-2 text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">{ad.description}</p>}

                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500"><Eye className="h-3 w-3 text-zinc-600" /><span className="tabular-nums">{imp(ad).toLocaleString()}</span></div>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500"><MousePointerClick className="h-3 w-3 text-zinc-600" /><span className="tabular-nums">{clk(ad).toLocaleString()}</span></div>
                  <span className="text-[11px] text-zinc-600 tabular-nums">{ctr(ad)}% CTR</span>
                  {(ad.maxImpressions ?? 0) > 0 && (
                    <div className="flex items-center gap-1 text-[11px] text-amber-400/80"><Repeat className="h-3 w-3" /><span>{ad.maxImpressions}x/device</span></div>
                  )}
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">&quot;{ad.buttonText}&quot;</span>
                  {ad.redirectUrl && (
                    <a href={ad.redirectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 text-[10px] text-zinc-600 hover:text-zinc-400 truncate">
                      <ExternalLink className="h-2.5 w-2.5 shrink-0" /><span className="truncate">{ad.redirectUrl.replace(/^https?:\/\//, "")}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex border-t border-white/[0.06] divide-x divide-white/[0.06]">
                <button onClick={() => openEdit(ad)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-white/[0.03] hover:text-zinc-300"><Pencil className="h-3 w-3" /> Edit</button>
                <button onClick={() => toggleAd(ad.id, ad.isActive)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-white/[0.03] hover:text-zinc-300">
                  {ad.isActive ? <><ToggleRight className="h-3 w-3" /> Disable</> : <><ToggleLeft className="h-3 w-3" /> Enable</>}
                </button>
                <button onClick={() => deleteAd(ad.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium text-red-400/70 transition-colors hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-3 w-3" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      <Modal isOpen={modal} onClose={closeModal} title={editingId ? "Edit Ad" : "Create Ad"} wide>
        {/* Desktop: side-by-side | Mobile: step-based */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Form (always visible on desktop, step 1 on mobile) ── */}
          <div className={`flex-1 min-w-0 space-y-4 ${step === "preview" ? "hidden lg:block" : ""}`}>

            <FormSelect label="App" value={form.apiKeyId} onChange={(e) => updateForm({ apiKeyId: e.target.value })} required>
              <option value="">Select app...</option>
              {keys.map((k) => <option key={k.id} value={k.id}>{k.appName}</option>)}
            </FormSelect>

            <FormInput label="Title" value={form.title} onChange={(e) => updateForm({ title: e.target.value })} placeholder="Ad title shown to users" required />

            <FormTextarea label="Description" value={form.description} onChange={(e) => updateForm({ description: e.target.value })} placeholder="Short description below the title" rows={2} required />

            <FormInput label="Image URL" value={form.imageUrl} onChange={(e) => updateForm({ imageUrl: e.target.value })} placeholder="https://example.com/image.png" required />

            <FormInput label="Redirect URL" value={form.redirectUrl} onChange={(e) => updateForm({ redirectUrl: e.target.value })} placeholder="https://example.com/landing" required />

            {/* Layout selector */}
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-zinc-400">Layout</label>
              <div className="grid grid-cols-3 gap-2">
                {AD_LAYOUTS.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => updateForm({ adType: l.value })}
                    className={`rounded-lg border p-2.5 text-left transition-all ${
                      form.adType === l.value
                        ? "border-white bg-white/[0.08] text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-zinc-500 hover:border-white/[0.1]"
                    }`}
                  >
                    <p className="text-[11px] font-semibold">{l.label}</p>
                    <p className="text-[9px] text-zinc-600 mt-0.5">{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormInput label="Button Text" value={form.buttonText} onChange={(e) => updateForm({ buttonText: e.target.value })} placeholder="Visit" />
              <FormInput label="Priority" type="number" value={form.priority} onChange={(e) => updateForm({ priority: e.target.value as unknown as number })} min={1} max={10} />
            </div>

            {/* Frequency selector — user friendly */}
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-zinc-400">
                How often to show per device
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {FREQUENCY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateForm({ maxImpressions: opt.value })}
                    className={`rounded-lg border px-2 py-2 text-center transition-all ${
                      form.maxImpressions === opt.value
                        ? "border-white bg-white/[0.08] text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-zinc-500 hover:border-white/[0.1]"
                    }`}
                  >
                    <p className="text-[11px] font-semibold">{opt.label}</p>
                    <p className="text-[8px] text-zinc-600 mt-0.5 hidden sm:block">{opt.desc}</p>
                  </button>
                ))}
              </div>
              {!FREQUENCY_OPTIONS.some(o => o.value === form.maxImpressions) && form.maxImpressions > 0 && (
                <p className="mt-1.5 text-[11px] text-zinc-500">Custom: {form.maxImpressions} times per device</p>
              )}
            </div>

            {/* Broadcast toggle */}
            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-[13px] font-medium text-zinc-300">Broadcast to verified users</p>
                <p className="text-[11px] text-zinc-600 mt-0.5">Show ad on every app open, even after PIN verified</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.broadcastToVerified}
                onClick={() => updateForm({ broadcastToVerified: !form.broadcastToVerified })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${form.broadcastToVerified ? "bg-white" : "bg-white/[0.1]"}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 rounded-full shadow-sm transition-transform mt-0.5 ${form.broadcastToVerified ? "translate-x-5 bg-black" : "translate-x-0.5 bg-zinc-500"}`} />
              </button>
            </div>

            {/* Mobile: Next → Preview button */}
            <div className="flex items-center gap-2 pt-2 lg:hidden">
              <Button variant="outline" size="sm" onClick={closeModal} type="button" className="flex-1">Cancel</Button>
              <Button size="sm" onClick={() => setStep("preview")} type="button" className="flex-1 gap-1.5">
                Preview <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Desktop: direct action buttons */}
            <div className="hidden lg:flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={closeModal} type="button">Cancel</Button>
              <Button size="sm" onClick={handleSubmit} type="button">{editingId ? "Save Changes" : "Create Ad"}</Button>
            </div>
          </div>

          {/* ── Preview ── */}
          {/* Desktop: always visible on the right */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-2 shrink-0">
            <AdPreview title={form.title} description={form.description} imageUrl={form.imageUrl} buttonText={form.buttonText} adType={form.adType} />
          </div>

          {/* Mobile: step 2 — full preview + action buttons */}
          {step === "preview" && (
            <div className="lg:hidden space-y-5">
              <div className="flex justify-center">
                <AdPreview title={form.title} description={form.description} imageUrl={form.imageUrl} buttonText={form.buttonText} adType={form.adType} />
              </div>

              {/* Summary */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Summary</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px]">
                  <span className="text-zinc-600">Layout</span>
                  <span className="text-zinc-300 capitalize">{form.adType}</span>
                  <span className="text-zinc-600">Button</span>
                  <span className="text-zinc-300">&quot;{form.buttonText}&quot;</span>
                  <span className="text-zinc-600">Priority</span>
                  <span className="text-zinc-300">{form.priority}</span>
                  <span className="text-zinc-600">Frequency</span>
                  <span className="text-zinc-300">{form.maxImpressions === 0 ? "Unlimited" : `${form.maxImpressions}x per device`}</span>
                  <span className="text-zinc-600">Broadcast</span>
                  <span className="text-zinc-300">{form.broadcastToVerified ? "Yes" : "No"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setStep("form")} type="button" className="flex-1 gap-1.5">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Edit
                </Button>
                <Button size="sm" onClick={handleSubmit} type="button" className="flex-1">
                  {editingId ? "Save Changes" : "Create Ad"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
