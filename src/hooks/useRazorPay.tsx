"use client";

import { Orders } from "razorpay/dist/types/orders";
import { use, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/components/checkout/CheckOutCard";
import useToast from "./useToast";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}
export type Notes = {
  userId: string;
  cartId: string;
};

export type OrderSuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };

export default function useRazorPay() {
  const order = useRef<Orders.RazorpayOrder>(null);
  const [success, setSuccess] = useState<OrderSuccess>();
  const context = use(Context);
  const toast = useToast();

  const openRazorpay = async () => {
    if (!context) throw Error("Impossible");
    if (!order.current) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getOrderId`, { method: "POST", body: JSON.stringify({ method: context.paymentMethod, type: context.paymentType, address: context.address, promocode: context.promocode }), credentials: "include" });
        if (!res.ok) {
          toast(res.statusText);
          return;
        }

        order.current = await res.json();
      } catch {
        toast("Connection Error try again");
      }
    }
    if (!order.current) throw Error("NO OrderID");
    const orderId = order.current?.id;
    if (!orderId) {
      toast("NO OrderID");
      return;
    }
    console.log(orderId);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_Id!,
      amount: Number(order.current.amount) * 100,
      currency: "INR",
      name: "Test Store",
      order_id: orderId,
      modal: {
        animation: true,
      },
      handler: function (response: OrderSuccess) {
        try {
          setSuccess(response);
        } catch (err) {
          console.log(err);
          toast("Somthing went wrong");
        }
      },
      prefill: {
        name: context.user?.name,
        email: context.user?.email,
        contact: context.user?.phonenumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return { pay: openRazorpay, success, order, setSuccess } as const;
}
