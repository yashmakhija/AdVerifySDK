"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { FormSelect } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import type { UserPin, ApiKey } from "@/lib/types";

export default function UserPinsPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToast();
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
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">User PINs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
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
            header: "App",
            render: (p: UserPin) => (
              <span className="text-muted-foreground">
                {p.apiKey?.appName || "-"}
              </span>
            ),
          },
          {
            key: "deviceId",
            header: "Device ID",
            render: (p: UserPin) => (
              <code className="rounded-lg bg-sky-50 border border-sky-100 px-2 py-0.5 text-xs text-sky-700 font-mono">
                {p.deviceId.slice(0, 12)}...
              </code>
            ),
          },
          {
            key: "pin",
            header: "PIN",
            render: (p: UserPin) => (
              <span className="font-mono font-medium text-foreground">
                {p.pin}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (p: UserPin) => (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                  p.isUsed
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                    : "bg-amber-50 text-amber-600 border-amber-200/60"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    p.isUsed ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {p.isUsed ? "Used" : "Pending"}
              </span>
            ),
          },
          {
            key: "created",
            header: "Created",
            render: (p: UserPin) => (
              <span className="text-muted-foreground">
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            ),
          },
          {
            key: "usedAt",
            header: "Used At",
            render: (p: UserPin) => (
              <span className="text-muted-foreground">
                {p.usedAt ? new Date(p.usedAt).toLocaleDateString() : "-"}
              </span>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            render: (p: UserPin) => (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => revoke(p.deviceId, p.apiKeyId)}
                className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 h-7 px-2"
              >
                Revoke
              </Button>
            ),
          },
        ]}
        data={filtered}
        keyExtractor={(p) => p.id}
        emptyMessage="No user PINs yet"
      />
    </div>
  );
}
