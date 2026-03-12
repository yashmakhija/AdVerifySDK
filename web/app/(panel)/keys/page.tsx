"use client";

import { useEffect, useState } from "react";
import { Copy, Check, KeyRound, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Modal, FormInput } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import type { ApiKey } from "@/lib/types";

function CopyableKey({ value }: { value: string }) {
  const toast = useToastStore();
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.show("API key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      title="Click to copy"
      className="group inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-mono text-xs text-zinc-600 transition-all hover:border-zinc-300 hover:bg-zinc-100 active:scale-[0.98] max-w-full"
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600" />
      )}
    </button>
  );
}

export default function KeysPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ appName: "", packageName: "" });

  async function load() {
    try {
      const data = await api<{ keys: ApiKey[] }>("/admin/keys", { token });
      setKeys(Array.isArray(data.keys) ? data.keys : []);
    } finally {
      setLoading(false);
    }
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
      method: "PUT",
      token,
      body: { isActive: !isActive },
    });
    toast.show(isActive ? "Key disabled" : "Key enabled");
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
        actionLabel="New Key"
        onAction={() => setModal(true)}
      />

      {loading ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-400">
          Loading...
        </div>
      ) : keys.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-12 text-center">
          <KeyRound className="mx-auto h-8 w-8 text-zinc-300" />
          <p className="mt-3 text-sm font-medium text-zinc-500">No API keys yet</p>
          <p className="mt-1 text-xs text-zinc-400">Create your first key to get started</p>
          <Button size="sm" className="mt-4" onClick={() => setModal(true)}>
            Create Key
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden lg:block rounded-xl border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  <th className="px-5 py-3.5">App</th>
                  <th className="px-5 py-3.5">Package</th>
                  <th className="px-5 py-3.5">API Key</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {keys.map((k) => (
                  <tr key={k.id} className="text-zinc-700 transition-colors hover:bg-zinc-50/60">
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-zinc-900">{k.appName}</span>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-500">{k.packageName}</td>
                    <td className="px-5 py-3.5">
                      <CopyableKey value={k.key} />
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={k.isActive ? "success" : "destructive"}>
                        {k.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKey(k.id, k.isActive)}
                          className="text-xs h-7 px-2.5 gap-1.5"
                        >
                          {k.isActive ? (
                            <><ToggleRight className="h-3.5 w-3.5" /> Disable</>
                          ) : (
                            <><ToggleLeft className="h-3.5 w-3.5" /> Enable</>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteKey(k.id)}
                          className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 h-7 px-2.5 gap-1.5"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile + Tablet */}
          <div className="flex flex-col gap-3 lg:hidden">
            {keys.map((k) => (
              <div
                key={k.id}
                className="rounded-xl border border-zinc-200 bg-white overflow-hidden"
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-medium text-zinc-900 truncate">{k.appName}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{k.packageName}</p>
                    </div>
                    <Badge variant={k.isActive ? "success" : "destructive"} className="shrink-0">
                      {k.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                      API Key
                    </p>
                    <CopyableKey value={k.key} />
                  </div>
                </div>

                <div className="flex border-t border-zinc-100 divide-x divide-zinc-100">
                  <button
                    onClick={() => toggleKey(k.id, k.isActive)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 active:bg-zinc-100"
                  >
                    {k.isActive ? (
                      <><ToggleRight className="h-3.5 w-3.5" /> Disable</>
                    ) : (
                      <><ToggleLeft className="h-3.5 w-3.5" /> Enable</>
                    )}
                  </button>
                  <button
                    onClick={() => deleteKey(k.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 active:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Create API Key">
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
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModal(false)} type="button">
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Create Key
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
