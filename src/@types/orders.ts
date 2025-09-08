import z from "zod";
import { CartItemSchema } from "./product";
import { DeliveryAddressSchema } from "./user";

const OrderStatus = z.enum(["created", "new", "packed", "shipped", "delivered"]);
const PaymentType = z.enum(["prepaid", "cod"]);

export type OrderType = z.infer<typeof OrderSchema>;

export const OrderSchema = z
  .object({
    username: z.string(),
    orderId: z.string(),
    items: z.array(CartItemSchema),
    orderDate: z.number(),
    razorpay: {
      id: z.string(),
      refundId: z.string().optional(),
    },
    shiprocket: z
      .object({
        order_id: z.string(),
      })
      .optional(),
    status: OrderStatus,
    promocode: z.string().optional(),
    shippingFee: z.number().optional(),
    amountPaid: z.number().optional(),
    amountDue: z.number().optional(),
    amount: z.number().optional(),
    address: DeliveryAddressSchema,
    paymentType: PaymentType,
  })
  .strip();

export const OrdersSchema = z.array(OrderSchema);

export type PaymentType = z.infer<typeof PaymentType>;

export interface IOrder extends Document, OrderType {}

export interface RazorpayWebhookEvent {
  entity: "event";
  account_id: string;
  event: "payment.authorized" | "payment.captured" | "order.paid" | "refund.created"; // fallback for other events
  contains: string[];
  payload: {
    payment?: {
      entity: RazorpayPayment;
    };
    order?: {
      entity: RazorpayOrder;
    };
  };
  created_at: number;
}

export interface RazorpayPayment {
  id: string;
  entity: "payment";
  amount: number;
  currency: string;
  status: "authorized" | "captured" | "failed" | string;
  order_id: string | null;
  invoice_id: string | null;
  international: boolean;
  method: "upi" | "card" | "netbanking" | "wallet" | string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string | null;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  notes: Record<string, string | number>;
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  created_at: number;
}

export interface RazorpayOrder {
  id: string;
  entity: "order";
  amount: number | string;
  amount_paid: number | string;
  amount_due: number | string;
  currency: string;
  receipt: string | null;
  offer_id?: string | null;
  status: "created" | "attempted" | "paid" | string;
  attempts: number;
  notes?: Record<string, string | number>;
  created_at: number;
}

export type Amount = {
  total: number;
  discount: number;
  shipping: number;
  subTotal: number;
};

export type RazorpayNotes = {
  username: string;
  promocode?: string;
  type: "prepaid" | "cod";
  orderId: string;
};
