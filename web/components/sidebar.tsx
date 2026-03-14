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
  Users,
  FileCode2,
  Smartphone,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/keys", label: "API Keys", icon: KeyRound },
  { href: "/ads", label: "Ads", icon: Megaphone },
  { href: "/pin", label: "PIN Config", icon: Lock },
  { href: "/user-pins", label: "User PINs", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/mt-manager", label: "MT Manager", icon: Smartphone },
  { href: "/docs", label: "SDK Docs", icon: FileCode2 },
];

export function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-zinc-200/80 bg-white transition-transform duration-200 md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-13 items-center justify-between px-4 border-b border-zinc-100">
          <Link href="/" className="text-[13px] font-bold tracking-tight text-zinc-900">
            AdVerify
          </Link>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                )}
              >
                <item.icon className={cn("h-[15px] w-[15px]", isActive ? "text-zinc-400" : "")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-100 p-2">
          <button
            onClick={logout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-700"
          >
            <LogOut className="h-[15px] w-[15px]" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
