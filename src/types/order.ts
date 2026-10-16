import type { Locale } from "@/i18n/routing";
import type { LocalizedText } from "@/types/product";

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
  slug: string;
  title: LocalizedText;
  image: string;
  /** Chosen colour name, when the product has colours. */
  color?: LocalizedText;
  /** Chosen size/storage label, when the product has an option. */
  option?: string;
  /** Unit price including the option surcharge, read from the catalogue on the server. */
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
    city: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  coupon?: string;
  currency: "USD";
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  /** Language the order was placed in, for emails and the WhatsApp summary. */
  locale: Locale;
  /** Firebase Auth uid when the customer was signed in. */
  userId?: string;
  stripeSessionId?: string;
  createdAt: string;
}
