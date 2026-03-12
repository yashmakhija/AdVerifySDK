"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Sidebar } from "@/components/sidebar";
import { ToastContainer } from "@/components/ui/toast";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const verify = useAuthStore((s) => s.verify);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    verify().then((valid) => {
      if (!valid) {
        router.replace("/login");
      } else {
        setChecked(true);
      }
    });
  }, [token, verify, router]);

  if (!token || !checked) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <span className="text-sm">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-6xl">{children}</div>
      </main>
      <ToastContainer />
    </div>
  );
}
