"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Sidebar } from "@/components/sidebar";
import { ToastContainer } from "@/components/ui/toast";
import { Menu } from "lucide-react";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="flex h-screen bg-[var(--background)]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-13 items-center gap-3 border-b border-zinc-200/80 bg-white px-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 active:bg-zinc-200"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="text-[13px] font-semibold text-zinc-900">AdVerify</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 md:py-8">
            {children}
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
