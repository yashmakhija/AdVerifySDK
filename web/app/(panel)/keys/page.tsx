"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";
import { KeysTable } from "./_components/keys-table";
import { KeysCards } from "./_components/keys-cards";
import { CreateKeyModal } from "./_components/create-key-modal";
import { EmptyState } from "./_components/empty-state";
import type { ApiKey, User } from "@/lib/types";

export default function KeysPage() {
  const token = useAuthStore((s) => s.token)!;
  const role = useAuthStore((s) => s.role);
  const toast = useToastStore();

  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ appName: "", packageName: "", userId: "" });

  const isAdmin = role === "ADMIN";

  const load = useCallback(async () => {
    try {
      const data = await api<ApiKey[]>("/admin/keys", { token });
      setKeys(Array.isArray(data) ? data : []);
      if (isAdmin) {
        const u = await api<User[]>("/admin/manage/users", { token }).catch(() => []);
        setUsers(Array.isArray(u) ? u : []);
      }
    } finally {
      setLoading(false);
    }
  }, [token, isAdmin]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, string | number> = {
      appName: form.appName,
      packageName: form.packageName,
    };
    if (isAdmin && form.userId) body.userId = parseInt(form.userId);
    await api("/admin/keys", { method: "POST", token, body });
    toast.show("API key created");
    setModal(false);
    setForm({ appName: "", packageName: "", userId: "" });
    load();
  }

  async function handleToggle(id: number, isActive: boolean) {
    await api(`/admin/keys/${id}`, {
      method: "PATCH",
      token,
      body: { isActive: !isActive },
    });
    toast.show(isActive ? "Key disabled" : "Key enabled");
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this API key?")) return;
    await api(`/admin/keys/${id}`, { method: "DELETE", token });
    toast.show("API key deleted");
    load();
  }

  return (
    <div>
      <PageHeader
        title="API Keys"
        description="Manage API keys for your apps"
        actionLabel="New Key"
        onAction={() => setModal(true)}
      />

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-[13px] text-zinc-600">
          Loading...
        </div>
      ) : keys.length === 0 ? (
        <EmptyState onCreateClick={() => setModal(true)} />
      ) : (
        <>
          <KeysTable
            keys={keys}
            isAdmin={isAdmin}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
          <KeysCards
            keys={keys}
            isAdmin={isAdmin}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </>
      )}

      <CreateKeyModal
        isOpen={modal}
        onClose={() => setModal(false)}
        form={form}
        onFormChange={setForm}
        onSubmit={handleCreate}
        isAdmin={isAdmin}
        users={users}
      />
    </div>
  );
}
