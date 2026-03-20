"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Sidebar } from "@/components/sidebar";
import { ToastContainer } from "@/components/ui/toast";
import { PlanRequiredCard } from "@/components/ui/plan-gate";
import { usePlanGuard } from "@/lib/use-plan-guard";
import { Menu, Shield } from "lucide-react";

// Pages accessible without an active plan
const FREE_PAGES = ["/billing", "/profile"];

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { blocked, checked } = usePlanGuard();

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  if (!token) return null;

  const isFreePage = FREE_PAGES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  const showBlocked = checked && blocked && !isFreePage;

  return (
    <div className="flex h-screen bg-[#09090b]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-14 items-center gap-3 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl px-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
              <Shield className="h-3 w-3 text-black" />
            </div>
            <span className="text-[14px] font-semibold text-white">AdVerify</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto dark-scroll">
          <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 md:py-8">
            {showBlocked ? <PlanRequiredCard /> : children}
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
