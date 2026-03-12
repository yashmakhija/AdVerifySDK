"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { Modal, FormInput } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import type { ApiKey } from "@/lib/types";

export default function KeysPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToast();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ appName: "", packageName: "" });

  async function load() {
    const data = await api<ApiKey[]>("/admin/keys", { token });
    setKeys(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await api("/admin/keys", { method: "POST", token, body: form });
    toast.show("API key created");
    setModal(false);
    setForm({ appName: "", packageName: "" });
    load();
  }

  async function toggleKey(id: number, isActive: boolean) {
    await api(`/admin/keys/${id}`, {
      method: "PATCH",
      token,
      body: { isActive: !isActive },
    });
    load();
  }

  async function deleteKey(id: number) {
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
        action={{ label: "New Key", onClick: () => setModal(true) }}
      />

      <DataTable
        columns={[
          {
            key: "appName",
            header: "App Name",
            render: (k: ApiKey) => (
              <span className="font-medium text-zinc-900">{k.appName}</span>
            ),
          },
          {
            key: "packageName",
            header: "Package",
            render: (k: ApiKey) => (
              <span className="text-zinc-500">{k.packageName}</span>
            ),
          },
          {
            key: "key",
            header: "API Key",
            render: (k: ApiKey) => (
              <code className="rounded-lg bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-xs text-indigo-700 font-mono">
                {k.key}
              </code>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (k: ApiKey) => <Badge active={k.isActive} />,
          },
          {
            key: "actions",
            header: "Actions",
            render: (k: ApiKey) => (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleKey(k.id, k.isActive)}
                  className="text-xs h-7 px-2"
                >
                  {k.isActive ? "Disable" : "Enable"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteKey(k.id)}
                  className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 h-7 px-2"
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
        data={keys}
        keyExtractor={(k) => k.id}
        emptyMessage="No API keys yet"
      />

      <Modal open={modal} onClose={() => setModal(false)} title="Create API Key">
        <form onSubmit={handleCreate} className="space-y-4">
          <FormInput
            label="App Name"
            value={form.appName}
            onChange={(e) => setForm({ ...form, appName: e.target.value })}
            required
          />
          <FormInput
            label="Package Name"
            value={form.packageName}
            onChange={(e) => setForm({ ...form, packageName: e.target.value })}
            placeholder="com.example.app"
            required
          />
          <Button type="submit" variant="gradient" className="w-full">
            Create Key
          </Button>
        </form>
      </Modal>
    </div>
  );
}
