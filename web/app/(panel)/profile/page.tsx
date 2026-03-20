"use client";

import { useState } from "react";
import { Check, Pencil, Link as LinkIcon } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";
import { FormInput, Modal, ModalActions } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { DEFAULT_AVATARS } from "@/lib/avatars";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const token = useAuthStore((s) => s.token)!;
  const username = useAuthStore((s) => s.username);
  const email = useAuthStore((s) => s.email);
  const role = useAuthStore((s) => s.role);
  const avatar = useAuthStore((s) => s.avatar);
  const setAvatar = useAuthStore((s) => s.setAvatar);
  const toast = useToastStore();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const [avatarModal, setAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  function openAvatarPicker() {
    setSelectedAvatar(avatar || "");
    setCustomUrl("");
    setUseCustom(false);
    setAvatarModal(true);
  }

  async function handleAvatarSave() {
    const url = useCustom ? customUrl : selectedAvatar;
    if (!url) return;
    setAvatarLoading(true);
    try {
      await api("/auth/profile", {
        method: "PATCH",
        token,
        body: { avatar: url },
      });
      setAvatar(url);
      toast.show("Avatar updated");
      setAvatarModal(false);
    } catch {
      toast.show("Failed to update avatar");
    } finally {
      setAvatarLoading(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.show("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.show("Password must be at least 6 characters");
      return;
    }
    setPwLoading(true);
    try {
      await api("/auth/change-password", {
        method: "POST",
        token,
        body: { currentPassword, newPassword },
      });
      toast.show("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.show("Failed to update password");
    } finally {
      setPwLoading(false);
    }
  }

  const activeAvatarUrl = useCustom ? customUrl : selectedAvatar;

  return (
    <div>
      <PageHeader title="Profile" description="Your account details" />

      {/* Profile Card */}
      <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <button onClick={openAvatarPicker} className="group relative">
            <UserAvatar src={avatar} name={username} size="lg" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Pencil className="h-4 w-4 text-white" />
            </div>
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-bold text-white truncate">
                {username}
              </h2>
              {role === "ADMIN" && <Badge variant="default">Admin</Badge>}
              {role === "USER" && <Badge variant="success">User</Badge>}
            </div>
            <p className="text-[13px] text-zinc-500 truncate">{email}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600 mb-1">
              Username
            </p>
            <p className="text-[14px] text-zinc-300 font-medium">{username}</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600 mb-1">
              Email
            </p>
            <p className="text-[14px] text-zinc-300 font-medium truncate">
              {email}
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600 mb-1">
              Role
            </p>
            <p className="text-[14px] text-zinc-300 font-medium">{role}</p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
        <h3 className="text-[14px] font-semibold text-white mb-4">
          Change Password
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
          <FormInput
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <FormInput
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <FormInput
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <div className="pt-2">
            <button
              type="submit"
              disabled={pwLoading}
              className="rounded-xl bg-white px-5 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50"
            >
              {pwLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Avatar Picker Modal */}
      <Modal
        isOpen={avatarModal}
        onClose={() => setAvatarModal(false)}
        title="Choose Avatar"
      >
        <div className="space-y-5">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <UserAvatar
                src={activeAvatarUrl || null}
                name={username}
                size="lg"
                className="!h-20 !w-20 !text-2xl"
              />
            </div>
          </div>

          {/* Grid */}
          <div>
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-600">
              Pick an avatar
            </p>
            <div className="grid grid-cols-4 gap-2.5">
              {DEFAULT_AVATARS.map((a) => (
                <button
                  key={a.url}
                  type="button"
                  onClick={() => {
                    setSelectedAvatar(a.url);
                    setUseCustom(false);
                  }}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-xl border-2 transition-all hover:scale-105",
                    !useCustom && selectedAvatar === a.url
                      ? "border-white shadow-lg shadow-white/10"
                      : "border-white/[0.06] hover:border-white/[0.15]"
                  )}
                >
                  <img
                    src={a.url}
                    alt={a.label}
                    className="h-full w-full object-cover"
                  />
                  {!useCustom && selectedAvatar === a.url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                        <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom URL */}
          <div>
            <button
              type="button"
              onClick={() => setUseCustom(!useCustom)}
              className="flex items-center gap-2 text-[12px] font-medium text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <LinkIcon className="h-3.5 w-3.5" />
              {useCustom ? "Use preset avatars" : "Use custom URL instead"}
            </button>
            {useCustom && (
              <div className="mt-2.5">
                <FormInput
                  label="Image URL"
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://example.com/my-avatar.jpg"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setAvatarModal(false)}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-zinc-400 transition-all hover:bg-white/[0.06]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAvatarSave}
              disabled={avatarLoading || !activeAvatarUrl}
              className="rounded-xl bg-white px-4 py-2 text-[13px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50"
            >
              {avatarLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
