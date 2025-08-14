"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { clearCart } from "@/lib/storeSlice";
import OrderSummary from "./OrderSummary";
import Link from "next/link";

export default function DisplayOrderSummary({ user }) {
  const products = useSelector((state) => state.products);
  const total = useSelector((state) => state.total);
  const router = useRouter();
  const dispatch = useDispatch();

  const popTost = useToast();

  const handleOrder = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order`, { method: "POST", credentials: "include", body: JSON.stringify({ products: products, total: total }) });
    if (res.status === 200) {
      popTost("Done", true);
      router.push("/profile");
      dispatch(clearCart());
    } else if (res.status === 400) {
      const msg = await res.json();
      popTost(msg.msg, false);
    } else if (res.status === 401) {
      popTost("login to continue", false);
    }
  };
  return (
    <div className="p-1">
      <div>
        <OrderSummary order={{ products: products, total: total }} />
        <div className="gap-4 sm:flex sm:items-center w-3/5 m-auto pb-28">
          <button className="w-full rounded-lg mb-3 border border-gray-600 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700">
            <Link href="/products">Return to Shopping</Link>
          </button>

          <button onClick={handleOrder} className="w-full rounded-lg mb-3 border border-gray-600 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700">
            Send the order
          </button>
        </div>
      </div>
    </div>
  );
}
