"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { FormSelect } from "@/components/ui/modal";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { UserPin, ApiKey, PinStats } from "@/lib/types";

function pinStatus(
  p: UserPin
): { label: string; variant: "success" | "destructive" | "default" } {
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [pinStats, setPinStats] = useState<PinStats | null>(null);

  async function load() {
    const [p, k] = await Promise.all([
      api<UserPin[]>("/admin/user-pins", { token }),
      api<ApiKey[]>("/admin/keys", { token }),
    ]);
    setPins(Array.isArray(p) ? p : []);
    setKeys(Array.isArray(k) ? k : []);
  }

  async function loadStats(date?: string) {
    const query = date ? `?date=${date}` : "";
    const s = await api<PinStats>(`/admin/user-pins/stats${query}`, { token });
    setPinStats(s);
  }

  useEffect(() => {
    load();
    loadStats();
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
    loadStats(selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined);
  }

  async function expirePin(id: number) {
    if (!confirm("Force expire this PIN? The user will need to re-verify."))
      return;
    await api(`/admin/user-pins/${id}/expire`, {
      method: "POST",
      token,
    });
    toast.show("PIN expired");
    load();
    loadStats(selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined);
  }

  function handleDateSelect(date: Date | undefined) {
    setSelectedDate(date);
    setCalendarOpen(false);
    if (date) {
      loadStats(format(date, "yyyy-MM-dd"));
    } else {
      loadStats();
    }
  }

  function clearDate() {
    setSelectedDate(undefined);
    loadStats();
  }

  let filtered = filterKey
    ? pins.filter((p) => p.apiKeyId === Number(filterKey))
    : pins;

  if (selectedDate) {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    filtered = filtered.filter(
      (p) => format(new Date(p.createdAt), "yyyy-MM-dd") === dateStr
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            User PINs
          </h1>
          <p className="mt-0.5 text-[13px] text-zinc-500">
            View and manage user PIN verifications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 px-3 font-normal text-zinc-400"
                >
                  <CalendarIcon className="h-3.5 w-3.5 text-zinc-500" />
                  {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={{ after: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {selectedDate && (
              <button
                onClick={clearDate}
                className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="w-40">
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
      </div>

      {pinStats && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              {selectedDate ? format(selectedDate, "MMM d") : "Today"} Generated
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {pinStats.todayGenerated}
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              {selectedDate ? format(selectedDate, "MMM d") : "Today"} Used
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {pinStats.todayUsed}
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              Active PINs
            </p>
            <p className="mt-1 text-xl font-semibold text-emerald-400">
              {pinStats.totalActive}
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              Expired PINs
            </p>
            <p className="mt-1 text-xl font-semibold text-red-400">
              {pinStats.totalExpired}
            </p>
          </div>
        </div>
      )}

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
              <code className="rounded-md bg-white/[0.06] px-2 py-0.5 text-xs text-zinc-400 font-mono">
                {p.deviceId.slice(0, 12)}...
              </code>
            ),
          },
          {
            key: "pin",
            label: "PIN",
            render: (p: UserPin) => (
              <span className="font-mono font-medium text-white">
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
            render: (p: UserPin) => {
              const s = pinStatus(p);
              return (
                <div className="flex items-center gap-1">
                  {s.label === "Active" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => expirePin(p.id)}
                      className="text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 h-7 px-2"
                    >
                      Expire
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => revoke(p.deviceId, p.apiKeyId)}
                    className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 h-7 px-2"
                  >
                    Revoke
                  </Button>
                </div>
              );
            },
          },
        ]}
        data={filtered}
        emptyMessage="No user PINs yet"
      />
    </div>
  );
}
