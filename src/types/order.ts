export const ORDER_STATUSES = [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_METHODS = ["card", "cod", "whatsapp"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface OrderItem {
  productId: string;
  title: string;
  priceCents: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalCents: number;
  currency: "USD";
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  /** Firebase Auth uid when the customer was signed in. */
  userId?: string;
  createdAt: string;
}
