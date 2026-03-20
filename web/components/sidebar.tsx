"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";
import {
  LayoutDashboard,
  KeyRound,
  Megaphone,
  Lock,
  UserCheck,
  FileCode2,
  Smartphone,
  Settings,
  LogOut,
  X,
  Shield,
  Users,
  CreditCard,
  Receipt,
  Activity,
  Wallet,
} from "lucide-react";
import { UserAvatar } from "@/components/ui/user-avatar";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/billing", label: "Billing", icon: Wallet },
  { href: "/keys", label: "API Keys", icon: KeyRound },
  { href: "/ads", label: "Ads", icon: Megaphone },
  { href: "/pin", label: "PIN Config", icon: Lock },
  { href: "/user-pins", label: "User PINs", icon: UserCheck },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/mt-manager", label: "MT Manager", icon: Smartphone },
  { href: "/docs", label: "SDK Docs", icon: FileCode2 },
];

const MANAGE_NAV = [
  { href: "/users", label: "Users", icon: Users },
  { href: "/plans", label: "Plans", icon: CreditCard },
  { href: "/purchases", label: "Purchases", icon: Receipt },
  { href: "/activity", label: "Activity", icon: Activity },
];

export function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);
  const username = useAuthStore((s) => s.username);
  const email = useAuthStore((s) => s.email);
  const role = useAuthStore((s) => s.role);
  const avatar = useAuthStore((s) => s.avatar);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-white/[0.06] bg-black transition-transform duration-250 ease-out md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between px-5 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
              <Shield className="h-3.5 w-3.5 text-black" />
            </div>
            <span className="text-[14px] font-bold tracking-tight text-white">
              AdVerify
            </span>
          </Link>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-600 hover:bg-white/[0.06] hover:text-zinc-300 md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto dark-scroll">
          <div className="space-y-0.5">
            {NAV.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[16px] w-[16px]",
                      isActive ? "text-white" : "text-zinc-600"
                    )}
                  />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </div>

          <p className="px-3 pt-5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-700">
            Management
          </p>
          <div className="space-y-0.5">
            {MANAGE_NAV.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[16px] w-[16px]",
                      isActive ? "text-white" : "text-zinc-600"
                    )}
                  />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Profile + Logout */}
        <div className="border-t border-white/[0.06] p-3 space-y-1.5">
          <Link
            href="/profile"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150",
              pathname === "/profile"
                ? "bg-white/[0.08]"
                : "hover:bg-white/[0.04]"
            )}
          >
            <UserAvatar src={avatar} name={username} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-medium text-zinc-200 truncate">
                  {username}
                </p>
                {role === "ADMIN" && (
                  <span className="shrink-0 rounded bg-white/[0.08] px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-zinc-400">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-600 truncate">{email}</p>
            </div>
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-zinc-600 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-[15px] w-[15px]" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
