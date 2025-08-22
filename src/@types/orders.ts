import { DeliveryAddress } from "./user";

export type OrderItems = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  dimentions: {
    weight: number;
    length: number;
    height: number;
    breadth: number;
  };
};

export type OrderType = {
  username: string;
  orderId: string;
  items: OrderItems[];
  orderDate: number;
  razorpay: {
    id: string;
  };
  shiprocket?: {
    order_id: string;
  };
  status: string;
  promocode?: string;
  shippingFee?: number;
  amountPaid?: number;
  amountDue?: number;
  amount?: number;
  address: DeliveryAddress;
  paymentType: PaymentType;
};

export type PaymentType = "prepaid" | "cod";

export interface IOrder extends Document, OrderType {}
