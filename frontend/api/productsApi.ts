import api from "./axiosInstance";
import {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types/product";

export const productsApi = {
  async getAll(): Promise<Product[]> {
    const res = await api.get<Product[]>("/products");
    return res.data;
  },

  async getMy(): Promise<Product[]> {
    const res = await api.get<Product[]>("/products/my");
    return res.data;
  },

  async getById(id: number): Promise<Product> {
    const res = await api.get<Product>(`/products/${id}`);
    return res.data;
  },

  async create(payload: CreateProductPayload): Promise<Product> {
    const res = await api.post<Product>("/products", payload);
    return res.data;
  },

  async update(id: number, payload: UpdateProductPayload): Promise<Product> {
    const res = await api.patch<Product>(`/products/${id}`, payload);
    return res.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
