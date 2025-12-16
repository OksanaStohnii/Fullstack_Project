import { create } from "zustand";
import type { Product } from "@/types/product";

type CartItem = Product;

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  add: (product) => set((s) => ({ items: [...s.items, product] })),

  remove: (id) => set((s) => ({ items: s.items.filter((p) => p.id !== id) })),

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((sum, p) => sum + Number(p.price), 0),
}));

export const useCartItems = () => useCartStore((s) => s.items);
export const useCartCount = () => useCartStore((s) => s.items.length);
