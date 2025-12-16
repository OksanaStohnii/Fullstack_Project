import api from "./axiosInstance";
import type {
  Order,
  CreateOrderPayload,
  UpdateOrderPayload,
} from "@/types/order";

export const ordersApi = {
  async getAll(): Promise<Order[]> {
    const res = await api.get<Order[]>("/orders");
    return res.data;
  },

  async getById(id: number): Promise<Order> {
    const res = await api.get<Order>(`/orders/${id}`);
    return res.data;
  },

  async create(payload: CreateOrderPayload): Promise<Order> {
    const res = await api.post<Order>("/orders", payload);
    return res.data;
  },

  async update(id: number, payload: UpdateOrderPayload): Promise<Order> {
    const res = await api.patch<Order>(`/orders/${id}`, payload);
    return res.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/orders/${id}`);
  },
};
