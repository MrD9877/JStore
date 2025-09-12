"use client";
import { CartSchema } from "@/@types/product";
import { setCart } from "@/lib/storeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCart() {
  const { products } = useSelector((state) => ({ products: state.products }));
  const dispatch = useDispatch();

  const updateCart = async (products) => {
    if (!products) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(products),
      });
    } catch (err) {
      console.log("error in saving cart items");
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, { credentials: "include" });
      const data = await res.json();
      console.log(data);
      if (data) {
        const cartData = await CartSchema.parseAsync(data);
        dispatch(setCart({ products: cartData }));
      } else {
        dispatch(setCart({ products: null }));
      }
    } catch (err) {
      dispatch(setCart({ products: null }));
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (products !== undefined) {
      updateCart(products);
    }
  }, [products]);

  return {};
}
