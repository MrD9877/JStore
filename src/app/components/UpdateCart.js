"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/lib/storeSlice";

export default function UpdateCart() {
  const dispatch = useDispatch();
  const setuser = (data) => {
    dispatch(setCart(data));
  };
  const fetchCart = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, { credentials: "include" });
      const data = await res.json();
      setuser(data);
      console.log(data);
    } catch {}
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return <div></div>;
}
