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
  LogOut,
  ChevronRight,
} from "lucide-react";

const MAIN_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/keys", label: "API Keys", icon: KeyRound },
  { href: "/ads", label: "Ads", icon: Megaphone },
];

const CONFIG_NAV = [
  { href: "/pin", label: "PIN Config", icon: Lock },
  { href: "/user-pins", label: "User PINs", icon: Users },
  { href: "/docs", label: "SDK Docs", icon: FileCode2 },
];

function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
        isActive
          ? "bg-indigo-50 text-indigo-700"
          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-indigo-600" />
      )}
      <Icon
        className={cn(
          "h-[16px] w-[16px]",
          isActive ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-500"
        )}
      />
      <span className="flex-1">{label}</span>
      {isActive && (
        <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="flex h-screen w-60 flex-shrink-0 flex-col bg-white border-r border-zinc-200/80">
      <div className="px-5 py-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-600/20 transition-shadow group-hover:shadow-indigo-600/30">
            <span className="text-sm font-bold text-white leading-none">A</span>
          </div>
          <div>
            <span className="text-[15px] font-bold text-zinc-900 block leading-tight">
              Ad<span className="text-indigo-600">Verify</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div className="mb-1">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            Main
          </p>
          <div className="space-y-0.5">
            {MAIN_NAV.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={isActive(item.href)}
              />
            ))}
          </div>
        </div>

        <div className="my-3 mx-3 h-px bg-zinc-100" />

        <div>
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            Configuration
          </p>
          <div className="space-y-0.5">
            {CONFIG_NAV.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={isActive(item.href)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 ring-1 ring-indigo-100">
            <span className="text-[11px] font-bold text-indigo-600">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-zinc-700 truncate">
              Admin
            </p>
            <p className="text-[10px] text-zinc-400 truncate">
              admin@adverify.io
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-zinc-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
