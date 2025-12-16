"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cart.store";
import { productsApi } from "@/api/productsApi";

export default function HomePage() {
  const addToCart = useCartStore((s) => s.add);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await productsApi.getAll();
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setError("Failed to load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      {loading && <p className="text-sm text-gray-600">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-sm text-gray-600">No products yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 space-y-2">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">{p.description}</div>

            <div className="flex items-center justify-between pt-2">
              <div className="font-semibold">{p.price} €</div>
              <button
                onClick={() => addToCart(p)}
                className="px-3 py-1.5 text-sm rounded bg-slate-900 text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
