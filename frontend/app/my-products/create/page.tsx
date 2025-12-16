"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/app/components/products/ProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">My Products</h1>

      <ProductForm
        mode="create"
        onSuccess={() => router.push("/my-products")}
      />
    </main>
  );
}
