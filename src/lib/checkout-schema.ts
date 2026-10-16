import { z } from "zod";
import { PAYMENT_METHODS } from "@/types/order";

/**
 * Checkout input shared by the form (client validation) and the server action
 * (authoritative validation). Error messages are message keys under `checkout.errors`.
 */
export const checkoutItemSchema = z.object({
  productId: z.string().min(1).max(80),
  colorIndex: z.number().int().min(0).max(10),
  optionId: z.string().max(40).optional(),
  quantity: z.number().int().min(1).max(20),
});

export const customerSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  email: z.email("email").max(120, "email"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,20}$/, "phone"),
  address: z.string().trim().min(5, "address").max(200, "address"),
  city: z.string().trim().min(2, "city").max(60, "city"),
  notes: z.string().trim().max(300, "notes").optional(),
});

export const checkoutSchema = z.object({
  customer: customerSchema,
  paymentMethod: z.enum(PAYMENT_METHODS),
  coupon: z.string().trim().toUpperCase().max(30).optional(),
  items: z.array(checkoutItemSchema).min(1).max(50),
  /** Firebase ID token when the shopper is signed in; verified on the server. */
  idToken: z.string().max(5000).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CustomerInput = z.infer<typeof customerSchema>;

/** Demo coupons. Percent off the subtotal. */
export const COUPONS: Record<string, number> = {
  WELCOME10: 10,
  MARKETIO15: 15,
};
