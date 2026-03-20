"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api, ApiError } from "@/lib/api";
import type { PlanStatus } from "@/lib/types";

export function usePlanGuard() {
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.role);
  const [blocked, setBlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!token) {
      setChecked(true);
      return;
    }

    // Admins are never blocked
    if (role === "ADMIN") {
      setChecked(true);
      setBlocked(false);
      return;
    }

    api<PlanStatus>("/auth/plan-status", { token })
      .then((status) => {
        setBlocked(status.status === "expired" || status.status === "suspended");
      })
      .catch((err) => {
        if (err instanceof ApiError && err.code === "PLAN_REQUIRED") {
          setBlocked(true);
        }
      })
      .finally(() => setChecked(true));
  }, [token, role]);

  return { blocked, checked };
}
