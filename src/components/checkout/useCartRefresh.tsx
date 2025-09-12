"use client";
import { CartSchema } from "@/@types/product";
import { setCart } from "@/lib/storeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useCartRefresh() {
  const dispatch = useDispatch();
  const requestUpgrade = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/updatedCart`, { method: "GET", credentials: "include" });
      if (res.status == 200) {
        const data = await res.json();
        const cartData = await CartSchema.parseAsync(data);
        dispatch(setCart({ products: cartData }));
      }
    } catch {}
  };
  useEffect(() => {
    requestUpgrade();
  }, []);
}
