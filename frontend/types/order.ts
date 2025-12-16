export type OrderItem = {
  productId: number;
};

export type Order = {
  id: number;
  customerId: number;
  totalPrice: number;
  items: {
    id: number;
    productId: number;
    purchasePrice: number;
  }[];
};

export type CreateOrderPayload = {
  items: OrderItem[];
};

export type UpdateOrderPayload = {
  items?: OrderItem[];
};
