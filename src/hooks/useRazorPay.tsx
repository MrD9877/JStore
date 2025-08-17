"use client";

import { Orders } from "razorpay/dist/types/orders";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
export default function useRazorPay({ method }: { method?: "upi" | "card" }) {
  const order = useRef<Orders.RazorpayOrder>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const openRazorpay = async () => {
    if (!order.current) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getOrderId`, { body: JSON.stringify({ method }), credentials: "include" });
        if (!res.ok) {
          // toast(res.statusText);
          return;
        }

        order.current = await res.json();
      } catch {
        // toast("Connection Error try again");
      }
    }
    if (!order.current) throw Error("NO OrderID");
    const orderId = order.current?.id;
    if (!orderId) {
      // toast("NO OrderID");
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
      handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
        try {
          // await updateOrder(response.razorpay_order_id);
          setSuccess(true);
        } catch (err) {
          console.log(err);
          // toast("Somthing went wrong");
        }
      },
      prefill: {
        // name: user?.displayName,
        // email: user?.email,
        // contact: user?.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return { pay: openRazorpay, success, order } as const;
}
