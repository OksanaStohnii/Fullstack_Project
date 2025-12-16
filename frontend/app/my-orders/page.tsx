"use client";

import { useEffect, useState } from "react";
import { ordersApi } from "@/api/ordersApi";
import { Order } from "@/types/order";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.getAll().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="p-4">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="p-4">You have no orders yet</p>;
  }

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-semibold">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 space-y-2 bg-white">
          <div className="font-medium">Order #{order.id}</div>

          <ul className="list-disc list-inside text-sm text-slate-700">
            {order.items.map((item) => (
              <li key={item.id}>Product ID: {item.productId}</li>
            ))}
          </ul>

          <div className="font-semibold">Total: {order.totalPrice} €</div>
        </div>
      ))}
    </main>
  );
}
