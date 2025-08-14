"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/lib/storeSlice";
import useCart from "@/hooks/useCart";
import { Toaster } from "react-hot-toast";

export default function UpdateCart() {
  const dispatch = useDispatch();
  useCart();
  const fetchCart = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, { credentials: "include" });
      const data = await res.json();
      dispatch(setCart(data));
      console.log(data);
    } catch {}
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const [isMount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return <div>{isMount && <Toaster position="top-center" reverseOrder={false} />}</div>;
}
