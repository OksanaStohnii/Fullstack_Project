"use client";

import { useState } from "react";
import { productsApi } from "@/api/productsApi";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types/product";

type Props =
  | { mode: "create"; initialProduct?: never; onSuccess: () => void }
  | { mode: "edit"; initialProduct: Product; onSuccess: () => void };

export default function ProductForm({
  mode,
  initialProduct,
  onSuccess,
}: Props) {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [description, setDescription] = useState(
    initialProduct?.description ?? ""
  );
  const [price, setPrice] = useState(
    initialProduct ? String(initialProduct.price) : ""
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);

    if (!name.trim() || !description.trim() || !price.trim()) {
      setError("Name, description and price are required");
      return;
    }

    const normalized = price.replace(",", ".");
    const priceNumber = Number(normalized);

    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      setError("Price must be a number ≥ 0");
      return;
    }

    setLoading(true);
    try {
      if (mode === "create") {
        const payload: CreateProductPayload = {
          name: name.trim(),
          description: description.trim(),
          price: priceNumber,
        };
        await productsApi.create(payload);
      } else {
        const payload: UpdateProductPayload = {
          name: name.trim(),
          description: description.trim(),
          price: priceNumber,
        };
        await productsApi.update(initialProduct.id, payload);
      }

      onSuccess();
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? "Request failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 space-y-4 bg-white">
      <h2 className="text-lg font-semibold">
        {mode === "create" ? "Create product" : "Edit product"}
      </h2>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="space-y-1">
        <label className="block text-sm font-medium">Name</label>
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="w-full border rounded px-2 py-1 text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Price</label>
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 19.99"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={submit}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium rounded bg-slate-900 text-white disabled:opacity-60"
        >
          {loading ? "Saving..." : mode === "create" ? "Create" : "Save"}
        </button>
      </div>
    </div>
  );
}
