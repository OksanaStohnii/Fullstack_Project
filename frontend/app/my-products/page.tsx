"use client";

import { useEffect, useState } from "react";
import { productsApi } from "@/api/productsApi";
import type { Product } from "@/types/product";
import Link from "next/link";

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi
      .getMy()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    await productsApi.remove(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Products</h1>

        <Link
          href="/my-products/create"
          className="px-3 py-1.5 text-sm rounded bg-slate-900 text-white"
        >
          Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-slate-600">You have no products yet</p>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded p-3 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-slate-600">{p.price} €</div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/my-products/${p.id}/edit`}
                  className="text-sm underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 text-xs border rounded text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
