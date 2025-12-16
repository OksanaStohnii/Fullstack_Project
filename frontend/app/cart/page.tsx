"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartItems, useCartStore } from "@/store/cart.store";
import { useAuthToken } from "@/store/auth.store";
import { ordersApi } from "@/api/ordersApi";

export default function CartPage() {
  const router = useRouter();
  const token = useAuthToken();

  const items = useCartItems();
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const total = useCartStore((s) => s.total);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateOrder = async () => {
    setError(null);

    if (!token) {
      router.push("/login");
      return;
    }

    if (items.length === 0) return;

    setLoading(true);
    try {
      await ordersApi.create({
        items: items.map((p) => ({ productId: p.id })),
      });

      clear();
      router.push("/my-orders");
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ?? e?.message ?? "Failed to create order";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p className="text-sm text-gray-600">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Cart</h1>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="space-y-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600">{p.price} €</div>
            </div>

            <button
              onClick={() => remove(p.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex items-center justify-between">
        <div className="text-lg font-semibold">
          Total: {total().toFixed(2)} €
        </div>

        <div className="flex gap-2">
          <button
            onClick={clear}
            disabled={loading}
            className="px-4 py-2 text-sm rounded border disabled:opacity-60"
          >
            Clear cart
          </button>

          <button
            onClick={handleCreateOrder}
            disabled={loading}
            className="px-4 py-2 text-sm rounded bg-slate-900 text-white disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create order"}
          </button>
        </div>
      </div>
    </main>
  );
}
