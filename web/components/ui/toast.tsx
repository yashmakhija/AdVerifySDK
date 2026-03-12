"use client";

import { useToastStore } from "@/lib/store";
import { useEffect } from "react";

export function ToastContainer() {
  const { message, clearToast } = useToastStore();

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(clearToast, 3000);
    return () => clearTimeout(t);
  }, [message, clearToast]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 animate-in">
      <div className="rounded-lg bg-zinc-950 px-4 py-2.5 text-[13px] font-medium text-white shadow-lg">
        {message}
      </div>
    </div>
  );
}
