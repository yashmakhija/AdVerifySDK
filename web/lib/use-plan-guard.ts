"use client";

import { useEffect, useState } from "react";
import { useAuthStore, usePlanGateStore } from "@/lib/store";
import { api, ApiError } from "@/lib/api";
import type { PlanStatus } from "@/lib/types";

export function usePlanGuard() {
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.role);
  const setPlanBlocked = usePlanGateStore((s) => s.setPlanBlocked);
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
      setPlanBlocked(false);
      return;
    }

    api<PlanStatus>("/auth/plan-status", { token })
      .then((status) => {
        const isBlocked = status.status === "expired" || status.status === "suspended";
        setBlocked(isBlocked);
        setPlanBlocked(isBlocked);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.code === "PLAN_REQUIRED") {
          setBlocked(true);
          setPlanBlocked(true);
        }
      })
      .finally(() => setChecked(true));
  }, [token, role, setPlanBlocked]);

  return { blocked, checked };
}
