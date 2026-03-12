import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  username: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  verify: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      username: null,

      login: (username, password) => {
        set({ token: btoa(`${username}:${password}`), username });
      },

      logout: () => set({ token: null, username: null }),

      verify: async () => {
        const token = get().token;
        if (!token) return false;

        try {
          const res = await fetch("/api/admin/me", {
            headers: { Authorization: `Basic ${token}` },
          });

          if (!res.ok) {
            set({ token: null, username: null });
            return false;
          }

          const data = await res.json();
          set({ username: data.username });
          return true;
        } catch {
          set({ token: null, username: null });
          return false;
        }
      },
    }),
    { name: "adverify-auth" }
  )
);
