"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Sidebar } from "@/components/sidebar";
import { ToastContainer } from "@/components/ui/toast";
import { PlanRequiredCard } from "@/components/ui/plan-gate";
import { usePlanGuard } from "@/lib/use-plan-guard";
import { BrandLogo } from "@/components/brand-logo";
import { Menu } from "lucide-react";

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
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-14 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-xl px-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <BrandLogo className="h-7 w-7" />
            <span className="text-[14px] font-semibold text-foreground">AdVerify</span>
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
