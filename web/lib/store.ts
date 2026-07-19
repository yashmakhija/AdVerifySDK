import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API_BASE } from "./api";

interface AuthState {
  token: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  avatar: string | null;
  planName: string | null;
  planExpiresAt: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verify: () => Promise<boolean>;
  setAvatar: (avatar: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      email: null,
      role: null,
      avatar: null,
      planName: null,
      planExpiresAt: null,

      login: async (email, password) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Invalid credentials");
        }

        const data = await res.json();
        set({
          token: data.token,
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar || null,
          planName: data.plan?.name || null,
          planExpiresAt: data.plan?.expiresAt || null,
        });
      },

      logout: () => set({ token: null, username: null, email: null, role: null, avatar: null, planName: null, planExpiresAt: null }),

      verify: async () => {
        const token = get().token;
        if (!token) return false;

        try {
          const res = await fetch(`${API_BASE}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) {
            set({ token: null, username: null, email: null, role: null, avatar: null });
            return false;
          }

          const data = await res.json();
          set({ username: data.username, email: data.email, role: data.role, avatar: data.avatar || null });
          return true;
        } catch {
          set({ token: null, username: null, email: null, role: null, avatar: null });
          return false;
        }
      },

      setAvatar: (avatar) => set({ avatar }),
    }),
    { name: "adverify-auth" }
  )
);

interface ToastState {
  message: string | null;
  show: (msg: string) => void;
  clearToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (message) => set({ message }),
  clearToast: () => set({ message: null }),
}));

interface PlanGateState {
  planBlocked: boolean;
  setPlanBlocked: (blocked: boolean) => void;
}

export const usePlanGateStore = create<PlanGateState>((set) => ({
  planBlocked: false,
  setPlanBlocked: (planBlocked) => set({ planBlocked }),
}));

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /** Sync store to the class already applied by the no-flash inline script. */
  hydrate: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "dark",
  setTheme: (theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      try {
        localStorage.setItem("adverify-theme", theme);
      } catch {}
    }
    set({ theme });
  },
  toggleTheme: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
  hydrate: () => {
    if (typeof document === "undefined") return;
    const theme: Theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    set({ theme });
  },
}));
