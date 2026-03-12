import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      login: (username, password) => {
        set({ token: btoa(`${username}:${password}`) });
      },
      logout: () => set({ token: null }),
    }),
    { name: 'adverify-auth' }
  )
);
