"use client";

import { useEffect, useState } from "react";
import { Users, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Modal, FormInput, FormSelect, ModalActions } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getRandomAvatar } from "@/lib/avatars";
import type { User } from "@/lib/types";

export default function UsersPage() {
  const token = useAuthStore((s) => s.token)!;
  const toast = useToastStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ email: "", username: "", password: "", role: "USER" });

  async function load() {
    try {
      const data = await api<User[]>("/admin/manage/users", { token });
      setUsers(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await api("/admin/manage/users", {
      method: "POST",
      token,
      body: { ...form, avatar: getRandomAvatar() },
    });
    toast.show("User created");
    setModal(false);
    setForm({ email: "", username: "", password: "", role: "USER" });
    load();
  }

  async function toggleActive(id: number, isActive: boolean) {
    await api(`/admin/manage/users/${id}`, {
      method: "PATCH",
      token,
      body: { isActive: !isActive },
    });
    toast.show(isActive ? "User deactivated" : "User activated");
    load();
  }

  async function deleteUser(id: number) {
    if (!confirm("Delete this user?")) return;
    await api(`/admin/manage/users/${id}`, { method: "DELETE", token });
    toast.show("User deleted");
    load();
  }

  function getActivePlan(user: User) {
    if (!user.purchases?.length) return null;
    const active = user.purchases.find((p) => p.status === "active");
    return active?.plan?.name || null;
  }

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage users and their plan assignments"
        actionLabel="New User"
        onAction={() => setModal(true)}
      />

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-[13px] text-zinc-600">
          Loading...
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <Users className="mx-auto h-8 w-8 text-zinc-700" />
          <p className="mt-3 text-sm font-medium text-zinc-400">No users yet</p>
          <p className="mt-1 text-[12px] text-zinc-600">Create your first user to get started</p>
          <Button size="sm" className="mt-4" onClick={() => setModal(true)}>
            Create User
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden lg:block rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                  <th className="px-5 py-3.5">Username</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Plan</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {users.map((u) => {
                  const plan = getActivePlan(u);
                  return (
                    <tr key={u.id} className="text-zinc-400 transition-colors hover:bg-white/[0.02]">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <UserAvatar src={u.avatar} name={u.username} size="sm" />
                          <span className="font-medium text-white">{u.username}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-zinc-500 text-[13px]">{u.email}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant={u.role === "ADMIN" ? "default" : "success"}>
                          {u.role}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        {plan ? (
                          <Badge variant="success">{plan}</Badge>
                        ) : (
                          <span className="text-[12px] text-zinc-600">No plan</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={u.isActive ? "success" : "destructive"}>
                          {u.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleActive(u.id, u.isActive)}
                            className="text-xs h-7 px-2.5 gap-1.5"
                          >
                            {u.isActive ? (
                              <><ToggleRight className="h-3.5 w-3.5" /> Deactivate</>
                            ) : (
                              <><ToggleLeft className="h-3.5 w-3.5" /> Activate</>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteUser(u.id)}
                            className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 h-7 px-2.5 gap-1.5"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-3 lg:hidden">
            {users.map((u) => {
              const plan = getActivePlan(u);
              return (
                <div key={u.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <UserAvatar src={u.avatar} name={u.username} size="sm" />
                        <div className="min-w-0">
                          <h3 className="font-medium text-white truncate">{u.username}</h3>
                          <p className="text-[11px] text-zinc-600 mt-0.5">{u.email}</p>
                        </div>
                      </div>
                      <Badge variant={u.isActive ? "success" : "destructive"} className="shrink-0">
                        {u.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={u.role === "ADMIN" ? "default" : "success"}>{u.role}</Badge>
                      {plan && <Badge variant="success">{plan}</Badge>}
                    </div>
                  </div>
                  <div className="flex border-t border-white/[0.06] divide-x divide-white/[0.06]">
                    <button
                      onClick={() => toggleActive(u.id, u.isActive)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-white/[0.03]"
                    >
                      {u.isActive ? (
                        <><ToggleRight className="h-3.5 w-3.5" /> Deactivate</>
                      ) : (
                        <><ToggleLeft className="h-3.5 w-3.5" /> Activate</>
                      )}
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Create User">
        <form onSubmit={handleCreate} className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
          <FormInput
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="john"
            required
          />
          <FormInput
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            required
          />
          <FormSelect
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </FormSelect>
          <ModalActions onClose={() => setModal(false)} submitLabel="Create User" />
        </form>
      </Modal>
    </div>
  );
}
