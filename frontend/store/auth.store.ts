import { create } from "zustand";

type AuthState = {
  token: string | null;
  hydrate: () => void;
  login: (token: string) => void;
  logout: () => void;
};

const KEY = "access_token";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  hydrate: () => {
    const token = localStorage.getItem(KEY);
    set({ token });
  },

  login: (token) => {
    localStorage.setItem(KEY, token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem(KEY);
    set({ token: null });
  },
}));

export const useIsAuth = () => useAuthStore((s) => Boolean(s.token));
export const useAuthToken = () => useAuthStore((s) => s.token);
