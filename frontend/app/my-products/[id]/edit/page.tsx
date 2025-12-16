"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { productsApi } from "@/api/productsApi";
import type { Product } from "@/types/product";
import ProductForm from "@/app/components/products/ProductForm";

type Props = {
  params: { id: string };
};

export default function EditProductPage({ params }: Props) {
  const router = useRouter();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsApi
      .getById(productId)
      .then(setProduct)
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!product) return <p className="p-4">Product not found</p>;

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Edit product</h1>

      <ProductForm
        mode="edit"
        initialProduct={product}
        onSuccess={() => router.push("/my-products")}
      />
    </main>
  );
}
