"use client";

import { useEffect, useState } from "react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Modal, FormInput, FormSelect, FormTextarea } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import type { Ad, ApiKey } from "@/lib/types";

const EMPTY_AD = {
  apiKeyId: "",
  title: "",
  description: "",
  imageUrl: "",
  redirectUrl: "",
  adType: "interstitial",
  buttonText: "Visit",
  priority: 1,
};

export default function AdsPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [ads, setAds] = useState<Ad[]>([]);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_AD);

  async function load() {
    const [a, k] = await Promise.all([
      api<Ad[]>("/admin/ads", { token }),
      api<ApiKey[]>("/admin/keys", { token }),
    ]);
    setAds(Array.isArray(a) ? a : []);
    setKeys(Array.isArray(k) ? k : []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await api("/admin/ads", {
      method: "POST",
      token,
      body: {
        ...form,
        apiKeyId: Number(form.apiKeyId),
        priority: Number(form.priority),
      },
    });
    toast.show("Ad created");
    setModal(false);
    setForm(EMPTY_AD);
    load();
  }

  async function toggleAd(id: number, isActive: boolean) {
    await api(`/admin/ads/${id}`, {
      method: "PATCH",
      token,
      body: { isActive: !isActive },
    });
    load();
  }

  async function deleteAd(id: number) {
    if (!confirm("Delete this ad?")) return;
    await api(`/admin/ads/${id}`, { method: "DELETE", token });
    toast.show("Ad deleted");
    load();
  }

  return (
    <div>
      <PageHeader
        title="Ads"
        description="Manage ads across your apps"
        actionLabel="New Ad"
        onAction={() => setModal(true)}
      />

      <DataTable
        columns={[
          {
            key: "title",
            label: "Title",
            render: (ad: Ad) => (
              <span className="font-medium text-white">{ad.title}</span>
            ),
          },
          {
            key: "app",
            label: "App",
            render: (ad: Ad) => (
              <span className="text-zinc-500">
                {ad.apiKey?.appName || "-"}
              </span>
            ),
          },
          {
            key: "type",
            label: "Type",
            render: (ad: Ad) => (
              <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-xs font-medium text-zinc-400 capitalize">
                {ad.adType}
              </span>
            ),
          },
          {
            key: "impressions",
            label: "Impressions",
            render: (ad: Ad) => (
              <span className="text-zinc-500">
                {(ad._count?.impressions ?? 0).toLocaleString()}
              </span>
            ),
          },
          {
            key: "clicks",
            label: "Clicks",
            render: (ad: Ad) => (
              <span className="text-zinc-500">
                {(ad._count?.clicks ?? 0).toLocaleString()}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (ad: Ad) => (
              <Badge variant={ad.isActive ? "success" : "destructive"}>
                {ad.isActive ? "Active" : "Inactive"}
              </Badge>
            ),
          },
          {
            key: "actions",
            label: "Actions",
            render: (ad: Ad) => (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleAd(ad.id, ad.isActive)}
                  className="text-xs h-7 px-2"
                >
                  {ad.isActive ? "Disable" : "Enable"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteAd(ad.id)}
                  className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 h-7 px-2"
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
        data={ads}
        emptyMessage="No ads yet"
      />

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Create Ad">
        <form onSubmit={handleCreate} className="space-y-4">
          <FormSelect
            label="App"
            value={form.apiKeyId}
            onChange={(e) => setForm({ ...form, apiKeyId: e.target.value })}
            required
          >
            <option value="">Select app...</option>
            {keys.map((k) => (
              <option key={k.id} value={k.id}>
                {k.appName}
              </option>
            ))}
          </FormSelect>

          <FormInput
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <FormTextarea
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              required
            />
            <FormInput
              label="Redirect URL"
              value={form.redirectUrl}
              onChange={(e) => setForm({ ...form, redirectUrl: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FormSelect
              label="Type"
              value={form.adType}
              onChange={(e) => setForm({ ...form, adType: e.target.value })}
            >
              <option value="interstitial">Interstitial</option>
              <option value="banner">Banner</option>
              <option value="native">Native</option>
            </FormSelect>

            <FormInput
              label="Button Text"
              value={form.buttonText}
              onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
            />

            <FormInput
              label="Priority"
              type="number"
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value as unknown as number,
                })
              }
              min={1}
              max={10}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModal(false)} type="button">
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Create Ad
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
