"use client";

import { useEffect, useState } from "react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { FormSelect } from "@/components/ui/modal";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UserPin, ApiKey } from "@/lib/types";

function pinStatus(p: UserPin): { label: string; variant: "success" | "destructive" | "default" } {
  if (!p.isUsed) return { label: "Pending", variant: "default" };
  if (p.expiresAt && new Date(p.expiresAt) < new Date()) {
    return { label: "Expired", variant: "destructive" };
  }
  return { label: "Active", variant: "success" };
}

export default function UserPinsPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [pins, setPins] = useState<UserPin[]>([]);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [filterKey, setFilterKey] = useState<string>("");

  async function load() {
    const [p, k] = await Promise.all([
      api<UserPin[]>("/admin/user-pins", { token }),
      api<ApiKey[]>("/admin/keys", { token }),
    ]);
    setPins(Array.isArray(p) ? p : []);
    setKeys(Array.isArray(k) ? k : []);
  }

  useEffect(() => {
    load();
  }, []);

  async function revoke(deviceId: string, apiKeyId: number) {
    if (!confirm(`Revoke all PINs for device ${deviceId}?`)) return;
    await api("/admin/user-pins/revoke", {
      method: "POST",
      token,
      body: { deviceId, apiKeyId },
    });
    toast.show("Device revoked");
    load();
  }

  const filtered = filterKey
    ? pins.filter((p) => p.apiKeyId === Number(filterKey))
    : pins;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-950">
            User PINs
          </h1>
          <p className="mt-0.5 text-[13px] text-zinc-500">
            View and manage user PIN verifications
          </p>
        </div>
        <div className="w-48">
          <FormSelect
            label=""
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
          >
            <option value="">All Apps</option>
            {keys.map((k) => (
              <option key={k.id} value={k.id}>
                {k.appName}
              </option>
            ))}
          </FormSelect>
        </div>
      </div>

      <DataTable
        columns={[
          {
            key: "app",
            label: "App",
            render: (p: UserPin) => (
              <span className="text-zinc-500">
                {p.apiKey?.appName || "-"}
              </span>
            ),
          },
          {
            key: "deviceId",
            label: "Device ID",
            render: (p: UserPin) => (
              <code className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 font-mono">
                {p.deviceId.slice(0, 12)}...
              </code>
            ),
          },
          {
            key: "pin",
            label: "PIN",
            render: (p: UserPin) => (
              <span className="font-mono font-medium text-zinc-950">
                {p.pin}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (p: UserPin) => {
              const s = pinStatus(p);
              return <Badge variant={s.variant}>{s.label}</Badge>;
            },
          },
          {
            key: "expires",
            label: "Expires",
            render: (p: UserPin) => (
              <span className="text-zinc-500 text-xs">
                {!p.isUsed
                  ? "-"
                  : !p.expiresAt
                    ? "Never"
                    : new Date(p.expiresAt).toLocaleString()}
              </span>
            ),
          },
          {
            key: "created",
            label: "Created",
            render: (p: UserPin) => (
              <span className="text-zinc-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            ),
          },
          {
            key: "actions",
            label: "Actions",
            render: (p: UserPin) => (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => revoke(p.deviceId, p.apiKeyId)}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 h-7 px-2"
              >
                Revoke
              </Button>
            ),
          },
        ]}
        data={filtered}
        emptyMessage="No user PINs yet"
      />
    </div>
  );
}
