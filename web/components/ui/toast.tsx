"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastState {
  message: string | null;
  show: (msg: string) => void;
  clear: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  show: (msg) => set({ message: msg }),
  clear: () => set({ message: null }),
}));

export function ToastContainer() {
  const { message, clear } = useToast();

  useEffect(() => {
    if (message) {
      const t = setTimeout(clear, 3000);
      return () => clearTimeout(t);
    }
  }, [message, clear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-700 shadow-lg animate-fade-in-up">
      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      {message}
    </div>
  );
}
