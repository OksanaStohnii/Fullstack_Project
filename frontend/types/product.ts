export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
}
