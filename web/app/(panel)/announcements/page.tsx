"use client";

import { useEffect, useState } from "react";
import { Bell, Trash2, Info, Zap, AlertTriangle } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import {
  Modal,
  FormInput,
  FormTextarea,
  FormSelect,
  ModalActions,
} from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import type { Announcement } from "@/lib/types";

const TYPE_CONFIG = {
  info: { label: "Info", variant: "default" as const, icon: Info },
  update: { label: "Update", variant: "success" as const, icon: Zap },
  warning: { label: "Warning", variant: "destructive" as const, icon: AlertTriangle },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AnnouncementsPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", type: "update" });

  async function load() {
    try {
      const data = await api<Announcement[]>("/admin/manage/announcements", { token });
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await api("/admin/manage/announcements", {
      method: "POST",
      token,
      body: form,
    });
    toast.show("Announcement posted");
    setModal(false);
    setForm({ title: "", content: "", type: "update" });
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this announcement?")) return;
    await api(`/admin/manage/announcements/${id}`, { method: "DELETE", token });
    toast.show("Announcement deleted");
    load();
  }

  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Post updates visible to all users on their dashboard"
        actionLabel="New Post"
        onAction={() => setModal(true)}
      />

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-[13px] text-zinc-600">
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <Bell className="mx-auto h-8 w-8 text-zinc-700" />
          <p className="mt-3 text-sm font-medium text-zinc-400">
            No announcements yet
          </p>
          <p className="mt-1 text-[12px] text-zinc-600">
            Post an update and all users will see it on their dashboard
          </p>
          <Button size="sm" className="mt-4" onClick={() => setModal(true)}>
            Post Announcement
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.info;
            const Icon = config.icon;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[14px] font-medium text-white">
                          {item.title}
                        </h3>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </div>
                      {item.content && (
                        <p className="mt-1.5 text-[13px] text-zinc-500 leading-relaxed">
                          {item.content}
                        </p>
                      )}
                      <p className="mt-2 text-[11px] text-zinc-600">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Post Announcement"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <FormInput
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="v2.1: Banner ads now supported"
            required
          />
          <FormTextarea
            label="Content (optional)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Describe the update, change, or notice..."
          />
          <FormSelect
            label="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="update">Update (green)</option>
            <option value="info">Info (gray)</option>
            <option value="warning">Warning (red)</option>
          </FormSelect>
          <ModalActions
            onClose={() => setModal(false)}
            submitLabel="Post"
          />
        </form>
      </Modal>
    </div>
  );
}
