"use client";

import { useToastStore } from "@/lib/store";
import { useEffect } from "react";
import { Check } from "lucide-react";

export function ToastContainer() {
  const { message, clearToast } = useToastStore();

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(clearToast, 3000);
    return () => clearTimeout(t);
  }, [message, clearToast]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 animate-in">
      <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#111] px-4 py-2.5 text-[13px] font-medium text-white shadow-2xl shadow-black/40">
        <Check className="h-3.5 w-3.5 text-emerald-400" />
        {message}
      </div>
    </div>
  );
}
